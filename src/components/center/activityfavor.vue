<template>
  <div class="activityfavor">
    <p class="m-title f-cb">
      <span class="line f-db f-fl hcl"></span>
      <span class="name f-db f-fl">我的收藏</span>
    </p>
    <div class="m-detailwrap">
      <ul class="type-list">
        <li>全部</li>
      </ul>
      <div class="content-list" v-if="statelistShow">
      </div>
      <div class="m-list f-cb">
        <p v-if="tableData.length==0" style="margin:0 auto;margin-bottom:20px">暂无数据</p>
        <div class="m-child f-fl" v-for="(item, index) in tableData" @mouseenter="maskShow(index)" @mouseleave="maskFade(index)">
          <div class="m-img">
            <img class="cover":src="item.cover"/>
            <div class="tag" :class="{enroll:item.state=='报名中',
            prepare:item.state=='预备中', going:item.state=='进行中', end:item.state=='已结束',
            Preheat:item.state=='预热中',cancel:item.state=='已取消'}" v-if="statelistShow">{{item.state}}</div>
            <div class="bottom-mask">
              <p class="title">{{item.title}}</p>
            </div>
            <transition name='fade'>
              <div class="fade-mask" v-if="index == listIndex" @click="skipToDetail(item.id)">
                <img class="eye" src="http://huicye.image.alimmdn.com/FED/huicye-webadvance/maskEye.png" />
              </div>
            </transition>
          </div>
          <div class="info f-cb">
            <div class="time f-fl">{{item.startOfActivity}}</div>
            <a class="btn f-fl" href="javascript:void(0)" v-if="statelistShow" @click="skipToManage(item.id)">查看</a>
            <a class="btn f-fl" href="javascript:void(0)" v-if="!statelistShow">删除</a>
          </div>
        </div>
      </div>
      <div class="m-pagination">
        <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="12" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default{
    data() {
      return{
        tableData: [],
        types: ['已发布', '已取消', '草稿'],
        states: ['全部', '预备中','报名中','预热中','进行中','已结束'],
        actived: 0,
        stateactived: 0,
        filterdata: {},
        total: 0,
        currentPage: 1,
        listIndex: -1,
        statelistShow: true
      }
    },
    methods:{
      filterBtn(index) {
        this.stateactived = index;
        if(index == 0){
          this.filterdata.states = ["3", "4", "5", "6", "7"];
          this.getActivityList(this.filterdata);
        }else{
          this.filterdata.states = [index + 2];
          this.getActivityList(this.filterdata);
        }
      },
      maskShow(index){
        this.listIndex = index;
      },
      maskFade(index){
       this.listIndex = -1;
      },
      skipToDetail(id){
        this.$router.push({path: '/activitydetail/' + id});
      },
      skipToManage(id){
        this.$router.push({path: '/activitydetail/' + id});
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.filterdata.skip = (val-1)*12;
        this.getActivityList(this.filterdata)
      },
      getActivityList(t){
        activityApi.activity.postgetActivityFavorite(t).then(res => {
          console.log(res);
          this.tableData = res.data.data.activityList;
          this.total = res.data.data.count;
          const states = ['', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
          for(let i = 0; i < this.tableData.length; i++){
            this.tableData[i].startOfActivity = functionApi.moment.getMDHMTime(this.tableData[i].startOfActivity);
            if(this.tableData[i].state=='10'){
              this.tableData[i].state = '已取消'
            }
            for(let j = 0; j < states.length; j++){
              if(this.tableData[i].state == j){
                this.tableData[i].state = states[j];
              }
            }
          }
        })
      }
    },
    mounted() {
      this.filterdata = {
        limit: 12,
        skip: 0,
      };
      this.getActivityList(this.filterdata);
    }
  }
</script>

<style lang="scss" scoped>
  .activityfavor{width:1000px; margin:0 auto; padding:25px 0;
    .m-title{height:16px;
      .line{width:5px; height:16px; border-radius:5px; background:#5771e6; margin-right:9px;}
      .name{font-size:16px; color:#3b4857; font-weight:bold; line-height:16px;}
    }
    .m-detailwrap{margin-top:30px; border:1px solid #e3e9ee; box-shadow:0 0 12px rgba(0, 0, 0, 0.05); border-radius:6px; background:#fff;
      .type-list{display:flex; height:49px; border-bottom:1px solid #e3e9ee; background:#fbfdff; border-top-left-radius:6px; border-top-right-radius:6px;
        li{ font-size:14px; color:#475469; padding:0 25px; line-height:48px; cursor:pointer;font-weight:bold;
          &.active{color:#5771e6;}
        }
      }
      .content-list{margin:30px 45px;
        .state-list{display:flex; color:#475469;
          li{width:99px; height:38px; font-size:14px; color:#5771e6; text-align:center; line-height:38px; cursor:pointer; border:1px solid #d5dbfa; border-right:none;
            &:first-child{border-top-left-radius:6px; border-bottom-left-radius:6px;}
            &:last-child{border-right:1px solid #d5dbfa; border-top-right-radius:6px; border-bottom-right-radius:6px;}
            &.stateactive{background:#5771e6;color:#fff;}
          }
        }
      }
      .m-list{ padding:16px 0px 0 44px; display:flex; flex-wrap:wrap;
        .m-child{width:201px; height:328px; border-radius:5px; margin-right:36px; margin-bottom:40px;
          &:nth-child(3n){margin-right:42px;}
          &:nth-child(4n){margin-right:0;}
          .m-img{position:relative; overflow:hidden; cursor:pointer;
            .cover{display:block; width:201px; height:281px; object-fit:cover; border-top-left-radius:6px; border-top-right-radius:6px;}
            .tag{position:absolute; top:0; left:0; width:68px; height:24px; border-top-left-radius:6px; border-bottom-right-radius:6px;  font-size:12px; color:#fff; text-align:center; line-height:24px;
              &.enroll{background:#ff6a56;}
              &.going{background:#6bc474;}
              &.prepare{background:#798deb;}
              &.Preheat{background:#f88339}
              &.end{background:#8895ab}
              &.cancel{background:#aebac9}
              &.outline{background:#c0ccda}
            }
            .bottom-mask{position:absolute; bottom:0; background:url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/amask.png') repeat-x; width:201px; height:239px;
              .title{font-size:14px; color:#fafafa; font-weight:bold; line-height:28px; padding:170px 10px 0 10px; text-align:justify; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; }
            }
            .fade-enter-active, .fade-leave-active { transition: all .3s ease; }
            .fade-enter, .fade-leave-active { transform: translateY(281px); }
            .fade-mask{position:absolute; top:0; left:0; z-index:99; width:201px; height:281px; background:rgba(0, 0, 0, 0.6);
              .eye{position:absolute; top:50%; left:50%; z-index:100; margin-top:-45px; margin-left:-45px; width:90px; height:90px;}
            }
          }
          &:hover{ 
            .cover{ transform: scale(1.1);  -webkit-transform: scale(1.1); -moz-transform: scale(1.1); -ms-transform: scale(1.1); -webkit-transition: -webkit-transform 0.2s; -moz-transition: -moz-transform 0.2s; -ms-transition: -moz-transform 0.2s; transition: transform 0.2s;}
          }
          .info{width:199px; height:53px; border:1px solid #dfe4ea; border-top:none; border-bottom-left-radius:6px; border-bottom-right-radius:6px;
            .time{font-size:12px; color:#8895ab; line-height:53px; background:url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/city.png') no-repeat 0 21px; padding-left:17px; margin-left:15px;}
            .btn{background:#ebeefc; font-size:12px; color:#5771e6; padding:5px 12px; border-radius:5px; border:1px solid #a0adf6; margin-top:-38px; margin-left:133px;
              &.hui{background:#c0ccda; border:1px solid #d3dce6;}
            }
          }
        }
      }
      .m-pagination{width:100%; text-align:center; padding-bottom:40px;}
    }
  }
</style>