<template>
  <div class="enrolllist">
    <div class="toobar">
      <el-button type="info" class="portexcel" @click="export2Excel" :disabled="infoBtn">导出</el-button>
      <el-col :span="5">
        <div class="search-box">
          <input placeholder="请输入你要查找的内容" v-model="searchContent" @click="handleIconClick">
        </div>
      </el-col>
    </div>
    <!-- 报名，预热 -->
    <div class="content">
      <el-table :data='tableData' @selection-change="selsChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="票号" min-width="190"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号码" min-width="120"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column prop="enrollTime" label="报名时间" width="155"></el-table-column>
        <!-- 报名，预热 -->
        <el-table-column prop="state" label="状态" :filters="[{ text: '有效票', value: '有效票' }, { text: '已取消', value: '已取消' }]"
        :filter-method="filterTag" v-if="activity_state == 4 || activity_state == 5">
          <template scope="scope">
            <el-tag :type="scope.row.state === '有效票' ? 'havedate': 'haveleave'" close-transition>{{scope.row.state}}</el-tag>
            <div class="lookbtn" @click="handleDetail(scope.row)"></div>
          </template>
        </el-table-column>
        <!-- 进行 -->
        <el-table-column prop="state" label="状态" :filters="[{ text: '已签到', value: '已签到' },{ text: '有效票', value: '有效票' }, { text: '已取消', value: '已取消' }]"
        :filter-method="filterTag" v-if="activity_state == 6">
          <template scope="scope">
            <el-tag :type="scope.row.state === '有效票' ? (scope.row.state === '已签到' ? 'havesure' :'havedate'): 'haveleave'" close-transition>{{scope.row.state}}</el-tag>
            <div class="lookbtn" @click="handleDetail(scope.row)"></div>
          </template>
        </el-table-column>
        <!-- 结束 -->
        <el-table-column prop="state" label="状态" :filters="[{ text: '已签到', value: '已签到' },{ text: '已过期', value: '已过期' }, { text: '已取消', value: '已取消' }]" :filter-method="filterTag" v-if="activity_state == 7">
          <template scope="scope">
            <el-tag :type="scope.row.state === '已过期' ? (scope.row.state === '已签到' ? 'havesure' :'havenodate'): 'haveleave'" close-transition>{{scope.row.state}}</el-tag>
            <div class="lookbtn" @click="handleDetail(scope.row)"></div>
          </template>
        </el-table-column>
        <!-- 取消 -->
        <el-table-column prop="state" label="状态" :filters="[{ text: '已失效', value: '已失效' }, { text: '已取消', value: '已取消' }]"
        :filter-method="filterTag" v-if="activity_state == 10">
          <template scope="scope">
            <el-tag :type="scope.row.state === '已失效' ? 'havelose': 'haveleave'" close-transition>{{scope.row.state}}</el-tag>
            <div class="lookbtn" @click="handleDetail(scope.row)"></div>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total,prev, pager,next,sizes" :total="total"></el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
import activityApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
  props: {
    activitystate: '',
    activityId: ''
  },
  data() {
    return {
      listIndex: -1,
      tableData: [{ title: '测试' }, { title: '测试' }],
      sels: [],
      currentPage: 1,
      total: 0,
      pageSizes: [],
      pageSize: 10,
      page: 1,
      activity_state:'',
      searchContent: "",
      infoBtn: true,
      filterdata: {
        limit: 10,
      }
    }
  },
  methods: {
    selsChange: function (sels) {
      this.sels = sels;
      const len = this.sels.length;
      if (len > 0) {
        this.infoBtn = false;
      } else {
        this.infoBtn = true;
      }
    },
    handleIconClick(ev) {
    },
    filterTag(value, row) {
      return row.state === value;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filterdata.skip = (val - 1) * 10;
      this.filterdata.id = this.activityId;
      this.getEnrollList(this.filterdata)
    },
    handleSizeChange(val) {
      this.filterdata.limit = val;
      this.filterdata.id = this.activityId;
      this.pageSize = val;
      this.getEnrollList(this.filterdata)
    },
    handleDetail(row) {
      console.log(row)
      localStorage.setItem('accountId', row.account.id);
      localStorage.setItem('enrollId', row.id);
      localStorage.setItem('activityId', this.activityId);
      this.$router.push({ path: '/nav1/active/enrolldetail/' + row.id })
    },
    export2Excel: function () {
      if (this.sels.length > 0) {
        const ids = this.sels.map(item => item.id);
        let selsData = [];
        for (let i = 0; i < ids.length; i++) {
          for (let j = 0; j < this.tableData.length; j++) {
            if (ids[i] == this.tableData[j].id) {
              selsData.push(this.tableData[j]);
            }
          }
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/js/export2Excel');
          const tHeader = ['票号', '姓名', '手机号码', '公司', '报名时间', '状态'];
          const filterVal = ['id', 'name', 'phone', 'company', 'enrollTime', 'state'];
          const data = this.formatJson(filterVal, selsData);
          export_json_to_excel(tHeader, data, '报名表单');
        })
      }

    },
    getEnrollList(t) {
      //待审核1，预备中3，报名中4，预热中5，进行中6，已结束7，已取消10
      activityApi.activity.postEnrollList(t).then(res => {
        console.log(res)
        this.tableData = res.data.enrollList;
        this.total = res.data.count;
        console.log(res.data.enrollList)
        this.pageSizes = [];
        for (let i = 10; i < this.total; i += 10) {
          this.pageSizes.push(i);
        }
        this.pageSizes.push(this.total);
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].enrollTime = functionApi.moment.getListTime(this.tableData[i].enrollTime);
          this.tableData[i].accountname = this.tableData[i].account.name;
          //this.tableData[i].phone = '暂无';
          //this.tableData[i].company = '暂无';

          // 有效票：用户已报名产生的电子票，还没签到
          // 已签到：通过正常的签到流程
          // 已取消：用户取消报名后的电子票状态
          // 已过期：活动已结束，但电子票没有签到
          // 已失效：活动被发布者取消
          if(this.activitystate == '报名中' || this.activitystate == '预热中' || this.activitystate == '进行中'){
            if(this.tableData[i].state == '2'){
              this.tableData[i].state = '已取消';
            }else{
              if(this.tableData[i].signState == '1'){
              this.tableData[i].state = '已签到';
              }else if(this.tableData[i].signState == '0'){
                this.tableData[i].state = '有效票';
              }
            }  
          }else if(this.activitystate == '已取消'){
            if(this.tableData[i].state == '2'){
              this.tableData[i].state = '已取消';
            }else{
              this.tableData[i].state = '已失效';
            }
          }else if(this.activitystate == '已结束'){
            if(this.tableData[i].signState == '0'){
              this.tableData[i].state = '已过期';
            }else if(this.tableData[i].signState == '1'){
              if(this.tableData[i].state == '2'){
                this.tableData[i].state = '已取消';
              }else{
                this.tableData[i].state = '已签到';
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    let activityId = location.pathname.split('/')[3];
    const filterdata = {
      id: activityId,
      limit: 10,
      skip: (this.page - 1) * 10
    };
    var self = this;
    activityApi.activity.postDetail({ id: activityId }).then(res => {
      self.activity_state = res.data.state;
      self.getEnrollList(filterdata);
    });
  }
}
</script>

<style>
.el-pagination .el-pagination__sizes {
  margin-left: 10px;
}
</style>
<style lang="scss" scoped>
.enrolllist {
  overflow: hidden;
}

.portexcel {
  width: 100px;
  background: url(images/portexcel-icon.png) no-repeat 15px center;
  border: 0;
  border: 1px solid #abb8f2;
  float: left;
  border-radius: 4px;
  width: 88px;
  height: 28px;
  line-height: 28px;
  padding: 0;
  color: #5771e6;
  font-size: 12px;
  margin-right: 20px;
  margin-left: 30px;
  &:hover {
    background: url(images/portexcel-icon.png) no-repeat 15px center;
    color: #5771e6;
    border: 1px solid #abb8f2;
  }
  &.el-button--info {
    background: url(images/portexcel-icon.png) no-repeat 15px center;
    color: #5771e6;
    border: 1px solid #abb8f2;
  }
  &.is-disabled {
    background: rgb(238, 238, 246);
    border-color: rgb(209, 211, 229);
    color: rgb(191, 193, 217);
  }
}

.toobar {
  height: 28px;
  padding-top: 30px;
  .el-button{
    color:#5d687b;
    border-color:#d3dce6;
    background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/daochu.png) 22px center no-repeat;
    padding-left: 8px;
  }
  .is-disabled{color:#999;opacity:0.5;}
}

.content {
  background: #fff;
  width: 100%;
  .lookbtn{height:20px;width:50px;position:absolute;top:50%;margin-top:-10px;cursor:pointer;z-index:10;}
}

.toolbar {
  text-align: center;
  margin: 20px 0 30px 0;
}

.search-box {
  width: 238px;
  height: 28px;
  border: 1px solid #d3dce6;
  border-radius: 4px;
  overflow: hidden;
  background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/search.png) no-repeat 16px center;
  input {
    border: 0;
    height: 28px;
    line-height: 28px;
    color: #b2bfd0;
    font-size: 12px;
    margin-left: 40px;
  }
}
</style>