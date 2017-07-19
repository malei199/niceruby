<template>
  <div class="activitymanage">
    <!-- <p class="m-title f-cb">
      <span class="line f-db f-fl"></span>
      <span class="name f-db f-fl">我的发布</span>
    </p> -->
    <div class="m-detailwrap">
      <ul class="tab-change" v-if="activityDetail.state == '草稿' || activityDetail.state == '待审核'">
        <li v-for="(item, index) in tabChanges" :class="{active:index == actived}" @click="tabChange(index)" v-if="index < 1">{{item}}</li>
      </ul>
      <ul class="tab-change" v-else>
        <li v-for="(item, index) in tabChanges" :class="{active:index == actived}" @click="tabChange(index)">{{item}}</li>
      </ul>
      <activity-enroll v-if="!activityDetailShow" :activitystate="activityDetail.state" :activityId="activityDetail.id"></activity-enroll>
      <div class="content main-con activity-manage" v-if="activityDetailShow">
        <div>
          <p class="title" href='javascript:;' @click="goDetail(activityDetail.id)">{{activityDetail.title}}</p>
          <p class="activityInfo indent">
            <span>活动状态：</span>{{activityDetail.state}}</p>
          <p class="activityInfo indent">
            <span>活动时间：</span>{{ActivityTime}}</p>
          <p class="activityInfo indent">
            <span>报名时间：</span>{{activityDetail.ActivityEnrollTime}}</p>
          <p class="activityInfo indent" v-if="activityDetail.sponsor">
            <span>主办单位：</span>{{activityDetail.sponsor}}</p>
          <p class="activityInfo indent" v-else>
            <span>主办单位：</span>未填写</p>
          <p class="activityInfo indent" v-if="activityDetail.coSponsor" style="display:none;">
            <span>协办单位：</span>{{activityDetail.coSponsor}}</p>
          <!--<p class="activityInfo indent" v-else>
                          <span>协办单位：</span>未填写</p>-->
          <p class="activityInfo indent">
            <span>活动地点：</span>{{location}}</p>
          <p class="activityInfo">
            <span>报名人数：</span>{{activityDetail.enrollCount}} 人已报名
            <span class="num" v-if="activityDetail.numberOfExpected != -1">（限额{{activityDetail.numberOfExpected}}人）</span>
            <span class="num" v-else>（不限人数）</span>
          </p>
          <p class="activityInfo">
            <span>隐私设置：</span>{{activityDetail.privacy=='0'?'公开活动':'隐私活动'}}
            <span class="privacy" v-if="activityDetail.privacy=='1'">（本活动为内部活动，将不会在梦想小镇网站及APP公开显示）</span>
          </p>
          <p class="activityInfo">
            <span>活动费用：</span>{{activityDetail.cost=='0'?'免费':'收费'}}</p>
          <p class="activityInfo indent" v-if="generalizeurl!=''">
            <span>推广链接：</span>
            <a :href="generalizeurl" style="text-decoration: underline;" target="_blank" class="hfcl">{{generalizeurl}}</a>
          </p>
          </p>
          <p class="activityInfo" v-if="activityDetail.contact!=''">
            <span>联系人：</span>{{activityDetail.contact}}</p>
          <p class="activityInfo" v-else>
            <span>联系人：</span>未填写</p>
          <p class="activityInfo" v-if="activityDetail.phonenumber!=''">
            <span>联系方式：</span>{{activityDetail.phonenumber}}</p>
          <p class="activityInfo" v-else>
            <span>联系方式：</span>未填写</p>
          <button class="cancelbtn" :class="{iscancel:activityDetail.state=='预热中'||
                                  activityDetail.state=='报名中',canceledtext:activityDetail.state!='预热中'||activityDetail.state!='报名中'
                                }" @click="cancelbtn" v-if="activityDetail.state!='草稿'">
            <span class="iscancel" v-if="activityDetail.state=='报名中'||activityDetail.state=='预热中'">取消发布</span>
            <span class="canceledtext" v-if="activityDetail.state=='已取消'">活动已取消</span>
            <span class="canceledtext" v-if="activityDetail.state=='已结束'">活动已结束</span>
            <span class="canceledtext" v-if="activityDetail.state=='进行中'">活动进行中</span>
            <span class="canceledtext" v-if="activityDetail.state=='已下架'">活动已下架</span>
            <span class="canceledtext" v-if="activityDetail.state=='待审核'">活动待审核</span>
          </button>
  
          </button>
          <div class="btn-box">
            <button class="draw-btn edit hbtn" v-if="activityDetail.state=='草稿'" @click="editActivity">编辑</button>
            <button class="draw-btn delete hcbtn" v-if="activityDetail.state=='草稿'" @click="handleDel">删除</button>
          </div>
        </div>
        <div class="activity-cover" v-if="generalizeurl!=''">
          <qrcode class="qrcode" :size="180" :value="qrcodeValue"></qrcode>
          <a href="javascript:void(0)" class="qtext" @click="printEwm">导出签到二维码</a>
          <!-- <div class="activitycover">
            <img :src="activityDetail.cover" alt="">
          </div> -->
          <div class="activity-tag" :class="{enroll:activityDetail.state=='报名中',
                                    prepare:activityDetail.state=='预备中', going:activityDetail.state=='进行中', end:activityDetail.state=='已结束',cancel:activityDetail.state=='已取消',check:activityDetail.state=='待审核',
                                    Preheat:activityDetail.state=='预热中'}"></div>
        </div>
      </div>
    </div>
    <div class="m-detailwrap m-more">
      <ul class="more">
        <li>往期发布</li>
        <li style="cursor:pointer;" @click="skipToList"></li>
      </ul>
      <div class="m-list f-cb">
        <p v-if="tableData.length==0" style="margin:0 auto;margin-bottom:20px">暂无数据</p>
        <div class="m-child f-fl" v-for="(item, index) in tableData" @mouseenter="maskShow(index)" @mouseleave="maskFade(index)" v-if="index < 4">
          <div class="m-img">
            <img class="cover" :src="item.cover" />
            <div class="tag" :class="{enroll:item.state=='报名中', prepare:item.state=='预备中', going:item.state=='进行中', end:item.state=='已结束', Preheat:item.state=='预热中'}">
            <span>{{item.state}}</span>
            </div>
            <div class="bottom-mask">
              <p class="title">{{item.title}}</p>
            </div>
            <transition name='fade'>
              <div class="fade-mask" v-if="index == listIndex" :id="item.id" @click="skipToDetail">
                <img class="eye" src="http://huicye.image.alimmdn.com/FED/huicye-webadvance/eye.png" :id="item.id" />
              </div>
            </transition>
          </div>
          <div class="info f-cb">
            <div class="time f-fl">{{item.city}}&nbsp;/&nbsp;{{item.startOfActivity}}</div>
            <a class="btn f-fl" href="javascript:void(0)" @click="skipToManage(item.id)">管理</a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" size="cancelDialog">
      <div class="form-box">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="content">
            <el-input type="textarea" :rows="9" placeholder="请填写活动取消原因(200字以内)" v-model="form.content" auto-complete="off" class="areatext"></el-input>
          </el-form-item>
        </el-form>
      </div>
  
      <div class="btn-wrap">
        <button class="confirm btn" @click="confirm('form')">确定</button>
        <button class="btn" @click="cancel">取消</button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="drawdialogFormVisible" size="tinyX">
      <div class="dialog-top-draw">
        <div class="close" @click="closeDrawDialog"></div>
        <div class="title">删除草稿</div>
        <p class="desc">草稿删除后不可恢复确定删除？</p>
      </div>
      <div class="btn-wrap-draw">
        <button class="confirm-draw btn-draw" @click="deletedrawBtn()">确定</button>
      </div>
    </el-dialog>
    <!--startprint-->
    <div class="ewmBox">
      <qrcode class="qrcode" :size="500" :value="qrcodeValue"></qrcode>
    </div>
    <!--endprint-->
  </div>
</template>

<script>
import activityApi from '@/js/api.js'
import functionApi from '@/js/function.js'
import Qrcode from 'v-qrcode/src/index'
import ActivityEnroll from './activity-enroll'
import $ from 'jquery'
export default {
  data() {
    return {
      activityId: location.pathname.split('/')[3],
      tabChanges: ['活动管理', '报名管理'],
      tableData: [],
      qrcodeValue: '',
      activityDetailShow: true,
      title: '',
      actived: 0,
      sponsor: '',
      generalizeurl: '',
      ActivityTime: "",
      location: '',
      reportDetail: "",
      linkShow: '',
      username: '',
      form: {
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请填写取消原因', trigger: 'blur' }]
      },
      filterdata: {},
      activityDetail: {},
      listIndex: -1,
      dialogFormVisible: false,
      drawdialogFormVisible: false,
    }
  },
  components: {
    'activity-enroll': ActivityEnroll,
    'qrcode': Qrcode
  },
  methods: {
    tabChange(index) {
      this.actived = index;
      index == 0 ? this.activityDetailShow = true : this.activityDetailShow = false;
    },
    printEwm() {
      var canvas = $('.ewmBox').find('canvas').get(0);
      var src = canvas.toDataURL('image/jpg');
      var newWindow = window.open("打印二维码", "_blank");
      newWindow.document.write('<img src=' + src + ' style="border:1px solid #000;padding:20px;margin-left:70px;margin-top:100px;" alt="" /><p style="font-size:28px;margin-left:280px;">扫描签到</p>');
      newWindow.document.close();
      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 100);
    },
    handleDel(id) {
      this.drawdialogFormVisible = true
    },
    closeDrawDialog() {
      this.drawdialogFormVisible = false
    },
    getActivityList(t) {
      activityApi.user.postPublishedList(t).then(res => {
        this.tableData = res.data.activityList;
        this.total = res.data.count;
        const states = ['', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].title = functionApi.subStringNum(this.tableData[i].title,52);
          this.tableData[i].startOfActivity = functionApi.moment.getDateFormatepoint(this.tableData[i].startOfActivity);
          this.tableData[i].city = this.tableData[i].location.city;
          for (let j = 0; j < states.length; j++) {
            if (this.tableData[i].state == j) {
              this.tableData[i].state = states[j];
            }
          }
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    confirm(formName) {
      this.form.activityId = this.activityDetail.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          activityApi.activity.postcancel(this.form).then(res => {
            this.dialogFormVisible = false;
            if (res.data.result == 'success') {
              this.$message({
                showClose: true,
                message: '取消成功',
                type: 'success'
              });
            } else {
              this.$message.error('当前状态下活动不能取消');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deletedrawBtn() {
      activityApi.activity.postDel({ id: this.activityId }).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      })
      this.drawdialogFormVisible = false
    },
    cancelbtn() {
      const huicyeuser = localStorage.getItem('huicyeuser');
      if (!huicyeuser) {
        alert("请先登录");
        this.$router.push({'path':'/login'});
      } else {
        if (this.activityDetail.state == '预热中' || this.activityDetail.state == '报名中') {
          this.dialogFormVisible = true;
        }
      }
    },
    maskShow(index) {
      this.listIndex = index;
    },
    maskFade(index) {
      this.listIndex = -1;
    },
    goDetail(id) {
      this.$router.push({ path: '/activitydetail/' + id });
    },
    skipToDetail(e) {
      let id = e.target.getAttribute('id');
      this.$router.push({ path: '/activitydetail/' + id });
    },
    skipToManage(id) {
      setTimeout(() => {
        window.location.pathname = '/activitylist/manage/' + id;
      }, 0)
    },
    skipToList() {
      this.$router.push({ path: '/nav1/active/activitylist/' });
    },
    editActivity() {
      this.$router.push({ path: '/nav1/active/activityedit/' + this.activityId });
    }
  },
  mounted() {
    this.filterdata = {
      limit: 12,
      skip: 0,
      states: ['1', '3', '4', '5', '6', '7']
    };
    this.getActivityList(this.filterdata);
    let activityId = location.pathname.split('/')[3];
    let value = {
      "id": activityId,
      "activityCode": activityId
    };
    this.qrcodeValue = JSON.stringify(value);

    const states = ['草稿', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
    activityApi.activity.postDetail({ id: activityId }).then(res => {
      this.activityDetail = res.data;
      console.log(this.activityDetail)
      this.title = res.data.title;
      if (this.activityDetail.state == '10') {
        this.activityDetail.state = '已取消';
      }
      if (this.activityDetail.state == '11') {
        this.activityDetail.state = '已下架';
      }
      for (let i = 0; i < states.length; i++) {
        if (this.activityDetail.state == i) {
          this.activityDetail.state = states[i]
        }
      }
      if (this.activityDetail.state != "草稿" && this.activityDetail.state != '待审核') {
        //this.generalizeurl = 'http://www.huicye.com:3098/activitydetail/' + activityId;
        this.generalizeurl = 'http://activity.dream-town.cn/activitydetail/' + activityId;
      }
      if (this.activityDetail.state == '报名中' || this.activityDetail.state == '预热中' || this.activityDetail.state == '预备中' || this.activityDetail.state == '已结束' || this.activityDetail.state == '进行中') {
        this.linkShow = true
      } else {
        this.linkShow = false;
      }
      this.activityDetail.sponsor = res.data.sponsor.join('，');
      if (this.activityDetail.coSponsor) {
        this.activityDetail.coSponsor = res.data.coSponsor.join('，');
      }
      let startDate = functionApi.moment.getDateFormate(res.data.startOfActivity);
      let endDate = functionApi.moment.getDateFormate(res.data.endOfActivity);
      if (startDate == endDate) {
        this.ActivityTime = functionApi.moment.getListTime2(res.data.startOfActivity) + '-' + functionApi.moment.getHMTime(res.data.endOfActivity);
      } else {
        this.ActivityTime = functionApi.moment.getListTime2(res.data.startOfActivity) + '-' + functionApi.moment.getListTime2(res.data.endOfActivity);
      }
      let startEnrollDate = functionApi.moment.getDateFormate(res.data.startOfEnrollment);
      let endEnrollDate = functionApi.moment.getDateFormate(res.data.endOfEnrollment);
      if (startEnrollDate == endEnrollDate) {
        this.activityDetail.ActivityEnrollTime = functionApi.moment.getListTime2(res.data.startOfEnrollment) + '-' + functionApi.moment.getHMTime(res.data.endOfEnrollment);
      } else {
        this.activityDetail.ActivityEnrollTime = functionApi.moment.getListTime2(res.data.startOfEnrollment) + '-' + functionApi.moment.getListTime2(res.data.endOfEnrollment);
      }
      this.location = res.data.location.province + ' · ' + res.data.location.city + ' · ' + res.data.location.area;
    })
  }
}
</script>

<style lang="scss" scoped>
.activitymanage {
  width: 1000px;
  margin: 0 auto;
  padding: 0px 0;
  .ewmBox {
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: none;
    padding-top: 30px;
    padding-left: 30px;
  }
  .m-title {
    height: 16px;
    .line {
      width: 5px;
      height: 16px;
      border-radius: 5px;
      background: #5771e6;
      margin-right: 9px;
    }
    .name {
      font-size: 16px;
      color: #3b4857;
      font-weight: bold;
      line-height: 16px;
    }
  }
  .m-detailwrap {
    border: 1px solid #e3e9ee;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    background: #fff;
    &.m-more {
      margin-top: 9px;
    }
    .tab-change {
      display: flex;
      height: 49px;
      border-bottom: 1px solid #e3e9ee;
      background: #fbfdff;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      li {
        font-size: 14px;
        color: #475469;
        padding: 0 25px;
        line-height: 48px;
        cursor: pointer;
        &.active {
          color: #c51e60;
          font-weight: bold;
          background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/jvxing.png) bottom center no-repeat;
        }
      }
    }

    .content {
      background: #fff;
      padding: 0 60px;
      border-radius: 0 0 6px 6px;
      .title {
        color: #3b4857;
        font-size: 24px;
        padding-top: 33px;
        font-weight: bold;
        margin-bottom: 22px;
        cursor: pointer;
        &:hover {
          color: #c51e60;
        }
      }
      .activityInfo {
        font-size: 14px;
        color: #99a9be;
        height:18px;line-height:18px;
        margin-top: 20px;
        &:nth-child(1) {
          padding-top: 40px;
        }
        span {
          display: inline-block;
          color: #324057;
          margin-right: 12px;
          width: 70px;
          text-align: right;
          &.num {
            width: 120px;
            text-align: left;
            color: #8895ab;
          }
        }
        .privacy {
          display: inline;
          color: #b2bfd0;
        }
      }
      .indent {
        position: relative;
        padding-left: 82px;
        span {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .cancelbtn {
        border: 0;
        width: 140px;
        height: 50px;
        color: #fff;
        border-radius: 5px;
        margin-left: 365px;
        margin-bottom: 50px;
        margin-right: 13px;
        &.canceledtext {
          background: #ccc;
        }
        &.iscancel {
          background: #c51e60;
          border: 1px solid #c51e60;
        }
      }
      .btn-box {
        display: flex;
      }
      .draw-btn {
        border: 0;
        width: 140px;
        height: 50px;
        color: #fff;
        background: #5771e6;
        border-radius: 5px;
        margin-bottom: 50px;
        &.edit {
          margin-left: 294px;
          margin-right: 18px;
          border: 1px solid #ccd4f7
        }
        &.delete {
          background: #fff;
          color: #5771e6;
          border: 1px solid #ccd4f7
        }
      }
    }
    .activity-manage {
      display: flex;
      .activity-cover {
        margin-left: 110px;
        margin-top: 40px;
        position: relative;
        border: 1px solid #d3dce6;
        height: 240px;
        .qrcode {
          display: block;
          width: 180px;
          height: 180px;
          padding: 15px 0 15px 15px;
        }
        .qtext {
          display: block;
          border-top: 1px dashed #d3dce6;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
          color: #c51e60;
        }
        .activity-tag {
          position: absolute;
          left: -63px;
          top: 158px;
          width: 140px;
          height: 140px;
          background: #ccc;
          &.enroll {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/enroll.png) no-repeat;
          }
          &.check {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/check.png) no-repeat;
          }
          &.going {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/going.png) no-repeat;
          }
          &.prepare {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/prepare.png) no-repeat;
          }
          &.Preheat {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/preheat.png) no-repeat;
          }
          &.end {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/end.png) no-repeat;
          }
          &.cancel {
            background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/cancel.png) no-repeat;
          }
        }
        .activitycover{
          width: 160px;
          height: 221px;
          img{object-fit: cover;width: 160px;
          height: 221px;}
        }
      }
    }
    .more {
      font-weight: bold;
      border-radius: 6px 6px 0 0;
      height: 48px;
      color: #475469;
      line-height: 48px;
      display: flex;
      justify-content: space-between;
      background: #fbfdff;
      font-size: 14px;
      border-bottom: 1px solid #e3e9ee;
      padding: 0 30px;
      li:nth-of-type(1){
        color:#475469;
      }
      li:nth-of-type(2){
        height:48px;width:20px;
        background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/wqmore.png) center center no-repeat;
      }
    }
    .m-list {
      background: #fff;
      padding: 45px 44px 20px 44px;
      display: flex;
      flex-wrap: wrap;
      .m-child {
        width: 201px;
        height: 328px;
        border-radius: 5px;
        margin-right: 31px;
        margin-bottom: 30px;
        &:nth-child(3n) {
          margin-right: 42px;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
        .m-img {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          .cover {
            display: block;
            width: 201px;
            height: 281px;
            object-fit: cover;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          .tag {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 70px;
            height: 24px;
            border-radius:6px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            background:rgba(0,0,0,0.7);
            span{display:inline-block;text-indent:13px;}
            &.enroll span{
              background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/baoming.png) left center no-repeat;          
            }
            &.going span{
              background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/jingxing.png) left center no-repeat;
            }
            &.prepare span{
              background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/yubei.png) left center no-repeat;
            }
            &.Preheat span{
              background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/city.png) left center no-repeat;
            }
            &.end span{
              background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/city.png) left center no-repeat;
            }
          }
          .bottom-mask {
            position: absolute;
            bottom: 0;
            background: url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/amask.png') repeat-x;
            width: 201px;
            height: 239px;
            .title {
              font-size: 12px;
              color: #fafafa;
              font-weight: bold;
              line-height: 22px;
              padding: 170px 10px 0 10px;
              text-align: justify;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: all .3s ease;
          }
          .fade-enter,
          .fade-leave-active {
            transform: translateY(281px);
          }
          .fade-mask {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            width: 201px;
            height: 281px;
            background: rgba(0, 0, 0, 0.6);
            .eye {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 100;
              margin-top: -45px;
              margin-left: -45px;
              width: 90px;
              height: 90px;
            }
          }
        }
        &:hover {
          .cover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -ms-transform: scale(1.1);
            -webkit-transition: -webkit-transform 0.2s;
            -moz-transition: -moz-transform 0.2s;
            -ms-transition: -moz-transform 0.2s;
            transition: transform 0.2s;
          }
        }
        .info {
          width: 199px;
          height: 53px;
          border: 1px solid #dfe4ea;
          border-top: none;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          .time {
            font-size: 12px;
            color: #8895ab;
            line-height: 53px;
            background: url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/city.png') no-repeat 0 21px;
            padding-left: 17px;
            margin-left: 10px;
          }
          .btn {
            background: #fdf6f9;
            font-size: 12px;
            color: #c51e60;
            padding: 5px 12px;
            border-radius: 5px;
            border: 1px solid #edbbcf;
            margin-top: -40px;
            margin-left: 140px;
            &.hui {
              background: #c0ccda;
              border: 1px solid #d3dce6;
            }
          }
        }
      }
    }
  }
}

.el-dialog {
  background: #f7f8fa
}

.form-box {
  height: 280px;
}

.areatext {
  width: 709px;
  display: block;
  margin-left: 40px;
  margin-top: 40px;
}

.btn-wrap {
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #e3e9ee;
  background: #fff;
  padding-bottom: 42px;
  padding-top: 50px;
  .btn {
    width: 140px;
    height: 50px;
    border: 0;
    border-radius: 5px;
    margin-right: 12px;
    background: #eaeffc;
    color: #5771e6;
    border: 1px solid #bcc6f5
  }
  .confirm {
    background: #5771e6;
    color: #fff;
    border: 1px solid #ccd4f7;
  }
}

.el-dialog {
  .title {
    color: #fff;
    height: 30px;
    background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/delete-icon.png) no-repeat center;
    font-size: 20px;
    padding-top: 137px;
  }
  .dialog-top-draw {
    background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/dialog-bg.png) repeat-X;
    text-align: center;
    .close {
      float: right;
      margin-right: 20px;
      cursor: pointer;
      width: 37px;
      height: 30px;
      background: url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/draw-close-icon.png) no-repeat
    }
  }
  .desc {
    height: 40px;
    color: #b7c6f8;
    font-size: 12px;
    margin-top: 20px;
  }
  .btn-wrap-draw {
    height: 84px;
    padding-top: 55px;
    padding-left: 20px;
    .confirm-draw {
      background: #5771e6!important;
      width: 117px;
      height: 38px;
      border: 0;
      color: #fff!important;
      margin-left: 150px;
      border-radius: 5px;
    }
  }
}

.qrcode {
  display: block;
  width: 180px;
  height: 180px;
  padding: 15px 0 15px 15px;
}
</style>