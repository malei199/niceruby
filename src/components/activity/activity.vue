<template>
  <div class="main">
    <activity-banner></activity-banner>
    <div class="wrap">
      <div class="create-activity" @click="activityCreate">
        <span>发布活动</span>
      </div>
      <div class="select_nav">
        <div class="select-item" :class="{'nav-active':navindex == 1}" @click="changenav('1')">
          <template>
            <el-select v-model="navdata.city" placeholder="全部地区" popper-class="indexserch" @change="searchActivity">
                <el-option
                  v-for="(item,index) in options3"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
          </template>
        </div>
        <div class="select-item" :class="{'nav-active':navindex == 2}" @click="changenav('2')">
          <template>
            <el-select v-model="navdata.type" placeholder="全部类型" popper-class="indexserch" @change="searchActivity">
              <el-option
                v-for="(item,index) in activitySubject"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="select-item" :class="{'hfcl': newactivity==1}" @click="searchActivity('new')">最新活动</div>
        <div class="select-item" :class="{'nav-active':navindex == 3}" @click="changenav('3')">
          <template>
            <el-select v-model="navdata.state" placeholder="正在报名" popper-class="indexserch" @change="searchActivity">
              <el-option
                v-for="item in activitystate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="select-item search" @click="showSearchInput">搜索活动</div>
        <div class="onSearch" v-show="onSearch==1">
          <span class="onSearchIcon" @click="searchActivity('enter')"></span>
          <input type="text" placeholder="请输入您要搜索的内容" v-model='navdata.searchContent' @keyup.enter="searchActivity('enter')">
          <span class="close" @click="hideSearchInput"></span>
        </div>
      </div>
      <div class="activity-list">
        <div class="warnmessage" v-if="showwarnmessage == true">未找到相关数据，请更改搜索条件！</div>
        <ul class="f-cb">
          <li class="activity-item" v-for="(item, index) in tableData"  @mouseenter="maskShow(index)" @mouseleave="maskFade(index)">    
            <div class="fadewrap">
              <img class="cover" :src="item.cover" alt="">
              <img class="imgcover" src="./images/jianbian.png" alt="" v-if="index != listIndex">
              <div class="state">
                <img src="./images/dticon.png" alt="">
                <span>{{item.state}}</span>
              </div>
              <div class="title" v-if="index != listIndex">{{ item.title}}</div>    
              <transition name='fade'>
                <div class="fade-mask" v-if="index == listIndex" @click="skipToDetail(item.id)">
                  <div class="title">{{ item.title}}</div>
                  <img src="./images/eye.png" alt="" class="eye">
                </div>
              </transition>
            </div>
            <div class="infobox">
              <div class="address">{{item.city}}/{{item.startOfActivity}}</div>
              <div class="tag" :class="{distag: item.isEnrolled !='0'}" :data-tag="item.isEnrolled" @click="enrollActivity($event, item.id)">报名</div>
            </div>  
            
          </li>
        </ul>
        <div class="loadmore" @click="loadmore" v-if="tableData.length<total"></div>
      </div>
      
    </div>
   <div class="bottom-part">
      <img class="bottomtext" src="./images/bottomtext.png" alt=""/>
      <a href="javascript:void(0)" class="pub-btn" @click="activityCreate">发布活动</a>
   </div>
  </div>
</template>

<script>
import ActivityBanner from "./banner.vue"
import activityApi from '@/js/api.js'
import functionApi from '@/js/function.js'
export default{
  components: {
    'activity-banner': ActivityBanner
  },
  data () {
    return{
      tableData: [],
      filterdata: {},
      total:'',
      listIndex: '-1',
      onSearch: 0,
      navindex: '1',
      newactivity: '0',
      showwarnmessage: false,
      activitySubject: ['全部类型','创业', '金融', '互联网', '科技', '教育', '运动', '公益', '营销', '音乐', '电影', '读书', '时尚', '健康', '职场', '艺术', '旅行'],
      //待审核1，预备中3，报名中4，预热中5，进行中6，已结束7，已取消10
      activitystate:[{value:'',label:'全部状态'},{value:'3',label:'预备中'},{value:'4',label:'正在报名'},{value:'5',label:'预热中'},{value:'6',label:'进行中'},{value:'7',label:'已结束'}],
      navdata:{
        city:'全国地区',
        type:'全部类型',
        state:'',
        order:'',
        searchContent: ''
      },
      options3: ['全国地区','杭州','金华']
    }
  },
  methods:{
    searchActivity(t) {
      if(t == 'new'){
        console.log(this.newactivity)
        if(this.newactivity == '1'){
          this.newactivity = 0;
          this.filterdata.order = ["state ASC", "created DESC"];
        }else{
          this.newactivity = 1;
          this.filterdata.order = ["publish DESC"];
        }
      }
      if(this.navdata.state == ''){
        this.filterdata.states = ['3','4','5','6','7'];
      }else{
        this.filterdata.states = [this.navdata.state];
      }
      this.filterdata.subject = this.navdata.type;
      this.filterdata.city = this.navdata.city;
      this.filterdata.title = this.navdata.searchContent;
      if(this.navdata.city == '全国地区'){
        delete this.filterdata.city;
      }
      if(this.navdata.type == '全部类型'){
        delete this.filterdata.subject;
      }
      this.tableData=[];
      this.filterdata.limit = 12;
      this.filterdata.skip = 0;
      if(t == "enter"){
        // this.onSearch = 0;
      }
      this.getActivityList(this.filterdata);
    },
    changenav(index) {
      this.navindex = index;
    },
    maskShow(index){
      this.listIndex = index;
    },
    maskFade(index){
     this.listIndex = -1;
    },
    activityCreate(){
      this.$router.push({path:'/nav1/active/activitycreate'});
    },
    showSearchInput(){
      this.onSearch = 1;
    },
    hideSearchInput(){
      this.onSearch = 0;
    },
    skipToDetail(id){
        location.pathname = '/activitydetail/'+id;
      },
    enrollActivity(e, id){
      let huicyeuser = localStorage.getItem('huicyeuser');
      if(!huicyeuser){
        alert("请先登录！");
        this.$router.push({path:'/login'});
      }else{
        if($(e.target).attr('data-tag') == '0'){
          this.$router.push({path: '/activitydetail/' + id});
        }
      }
    },
    loadmore(){
      this.filterdata.skip = this.tableData.length;
      if(this.tableData.length == this.total){
        return;
      }
      this.getActivityList(this.filterdata);
    },
    getActivityList(t){
      activityApi.activity.postList(t).then(res => {
        console.log(res);
        this.tableData = this.tableData.concat(res.data.activityList);
        this.total = res.data.count;
        if(this.tableData.length==0){
          this.showwarnmessage = true;
          return;
        }else{
          this.showwarnmessage = false;
        }
        const states = ['草稿', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
        for(let i = 0; i < this.tableData.length; i++){
          this.tableData[i].title = functionApi.subStringNum(this.tableData[i].title,52);
          this.tableData[i].startOfActivity = functionApi.moment.getDateFormatepoint(this.tableData[i].startOfActivity);
          this.tableData[i].city = this.tableData[i].location.city;
          if(this.tableData[i].state=='10'){
            this.tableData[i].state = '已取消'
          }
          for(let j = 0; j < states.length; j++){
            if(this.tableData[i].state == j){
              this.tableData[i].state = states[j];
            }
          }
          if(this.tableData[i].state == '报名中'){
            if(!this.tableData[i].isEnrolled){
              this.tableData[i].isEnrolled = '0';
            }
          }else{
            this.tableData[i].isEnrolled = '1';
          }
        }  
      })
    }
  },
  mounted(){
    this.filterdata = {
        limit: 12,
        skip:0,
        states:['3','4','5','6','7'],
        order: ["state ASC", "created DESC"]
    };
    this.getActivityList(this.filterdata);
  }
}
</script>

<style lang="scss" scoped>
.main{width:100%;background-color:#f3f7f9;min-width:1100px;
  .wrap{width:1090px;margin:0 auto;border:1px solid #e3e9ee;background-color:#fff;padding:45px 55px;position:relative;
   .create-activity{width:126px;height:126px;background:url(./images/create.png) no-repeat;background-size: cover;position:absolute;top:-60px;left:50%;margin-left:-63px;cursor:pointer;color:#fff;text-align:center;
    span{display:block;line-height:20px;width:38px;font-size: 16px;margin-top:43px;margin-left:44px;font-weight:bold;}
   }
  }
  .select_nav{height:58px;width:1088px;border:1px solid #e7ecf0;margin-bottom:45px;margin-top:25px;position: relative;
    .select-item{width:216px;height:58px;border-right:1px solid #e7ecf0;float:left;line-height:58px;text-align:center;font-size:14px;color:#5d687b;font-size:14px;color:#5d687b;cursor:pointer;
      .el-select{margin-top: 10px;}
    }
    .search{background: url('./images/search-icon.png') 73px center no-repeat;cursor:pointer;border-right: none;text-indent: 25px;}
    .onSearch{position:absolute;top:0;right:1px;width:435px;background-color:#fff;height:58px;
      .onSearchIcon{float:left;width:20px;height:58px;margin-left:33px;cursor:pointer;
        background: url('./images/searching.png') center center no-repeat;
      }
      input{height:58px;border:none;padding:0 5px;width:330px;color:#5d687b;}
      .close{float:right;width:20px;height:58px;margin-right:20px;cursor:pointer;
        background: url('./images/close.png') center center no-repeat;
      }
    }
  }
  .activity-list{width:1090px;position: relative;
    .warnmessage{text-align:center;font-size:16px;color:#5d687b;}
    ul{width:1090px;}
    .activity-item{width:240px;height:390px;float:left;margin-right:43px;margin-bottom:43px;position:relative;overflow: hidden;
      .cover{height:337px;width:240px;margin:0;object-fit:cover;}
      &:hover{ box-shadow:0 0 20px rgba(0, 0, 0, 0.5);
        .cover{transform: scale(1.1);transition: 0.2s;}
      };
      .imgcover{height:337px;width:240px;position: absolute;top:0;left:0;}
      .infobox{border:1px solid #d8dfe6;border-top:0px;width:202px;height:52px;position:absolute;bottom:0;left:0;padding:0 18px;
        .address{height:16px;line-height:16px;font-size:12px;color:#8895ab;float: left;margin-top:18px;background:url(./images/dticon.png) left center no-repeat;padding-left:15px;
        }
        .tag{float:right;height:22px;line-height: 22px;border-radius: 5px;border:1px solid #c51e60;
          background-color:#f3d2df;margin-top:14px;color:#c51e60;padding: 0 9px;font-size: 12px;cursor:pointer;
        }
        .distag{background-color:#c0ccda;border-color:#c0ccda;color:#fff;}
      }
      .state{height:24px;line-height:24px;padding:0 10px;background-color:#000;opacity:0.7;border-radius: 5px;position:absolute;top:10px;left:10px;color:#fff;font-size:12px;
        span{padding-left:3px;}
      }
      .title{width:210px;font-size:14px; color:#fff; height:44px; line-height:22px;text-align:justify; overflow:hidden;position:absolute;top:275px;left:15px;font-weight: bold;}
      .uptitle{top:75px;}
      .fade-enter-active, .fade-leave-active { transition: all .3s ease; }
      .fade-enter, .fade-leave-active { transform: translateY(337px); }
      .fadewrap{width:240px;height:337px;position: absolute;top:0;left:0;overflow:hidden;cursor:pointer;}
      .fade-mask{width:240px;height:337px;background-color:rgba(0,0,0,0.5 );position: absolute;top:0;left:0;cursor:pointer;
        .eye{position: absolute;top:195px;left:50%;margin-left:-45px;}
        .title{top:75px;}
      }
    }
    .activity-item:nth-of-type(4n+4){margin-right:0px;}
    .loadmore{width:74px;height:74px;background:url(./images/load.png) no-repeat;background-size: cover;position:absolute;bottom:-83px;left:50%;margin-left:-37px;cursor:pointer;}
  } 
  .bottom-part{position:relative; background:url("./images/bottombg.png") center center no-repeat; width:100%; background-size:cover;height:200px; background-size:cover; margin:0 auto;margin-top:90px;
    .bottomtext{position:absolute; left:50%; margin-left:-176px; top:50px; width:352px; height:24px;}
    .pub-btn{position:absolute; left:50%; margin-left:-115px; top:55%; width:236px; height:38px;color:#fff; text-align: center;border:1px solid #fff;line-height:38px;border-radius: 5px;
    }
  }
}
</style>