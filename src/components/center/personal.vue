<template>
	<div class="wrap">
    <div class="m-detailwrap" style="margin-top:0px;">
      <ul class="more">
        <li>资料</li>
      </ul>
      <div class="datumbox">
        <div class="datum-detail f-fl">
          <div class="userpic f-fl">
            <img :src="accountData.avatar" alt="">
            <span class="vipicon"></span>
          </div>
          <dl class="datumcon f-fl">
            <dt v-if="accountData.realname != ''">{{accountData.realname}}</dt>
            <dt v-if="accountData.realname == ''">{{accountData.usernick}}</dt>
            <dt>
              <dd class="company" v-if="accountData.company != ''">{{accountData.company}}</dd>
              <dd class="company" v-if="accountData.company == ''">暂未填写</dd>
              <dd class="job" v-if="accountData.job != ''">{{accountData.job}}</dd>
            </dt>
            <dt>
              <dd class="accounttype" v-if="accountData.accountType == 'p1'">园区用户</dd>
              <dd class="attestation" v-if="accountData.accountType == 'p1'">已认证</dd>
              <dd class="accounttype" v-if="accountData.accountType != 'p1'">非园区用户</dd>
              <dd class="attestation" v-if="accountData.accountType != 'p1'">未认证</dd>
              <dd class="bindstate" v-if="accountData.phone != ''">已绑定</dd>
              <dd class="bindstate" v-if="accountData.phone == ''">未绑定</dd>
              <dd class="datumprogress">
                <span class="progressLine" :style="{width:accountData.datumProgress}"></span>
              </dd>
              <dd class="bfb">{{accountData.datumProgress}}</dd>
            </dt>
          </dl>
        </div>
        <a href="javascript:void(0)" class="improve-datum hfcl">完善资料</a>
      </div>
    </div>
    <ul class="m-detailwrap-area f-cb">
      <li class="remanentMoneybox f-fl">
        <div class="symoney">
          <h4>余额</h4>
          <div class="money f-fl">9686.32<span>元</span></div>
          <div class="buttonbox f-fr">
            <el-button class="f-fl hbtn" type="primary">充值</el-button>
            <el-button class="f-fr">挂失</el-button>
          </div>
          <div class="warnmessage"><i>!</i>根据园区要求，卡片仅供持卡人再园区内消费使用。</div>
        </div>
        <div class="detail">
          <h4>明细</h4>
          <dl>
            <dt>
              <dd class="f-fl">12:20</dd><dd class="f-fr">-15.5元</dd>
            </dt>
            <dt>
              <dd class="f-fl">13:10</dd><dd class="f-fr">+1000元</dd>
            </dt>
             <dt>
              <dd class="f-fl">13:10</dd><dd class="f-fr">+1000元</dd>
            </dt>
            <dt class="more">
              <dd class="f-fl">更多</dd>
            </dt>
          </dl>
        </div>
      </li>
      <li class="announcement f-fr">
        <ul class="infotab">
          <li class="f-fl" :class="{'infoactive':infoindex == 1}" @click="toggleinfo('1')">公告</li>
          <li class="f-fl" :class="{'infoactive':infoindex == 2}" @click="toggleinfo('2')">消息</li>
          <li class="f-fr infomore"></li>
        </ul>
        <ul class="infocon" v-if="infoindex == 1">
          <li>
            <div class="time f-fl">2017.07.15</div>
            <div class="title f-fr">公告公告公告公告公告公告公告公告</div>
          </li>
          <li>
            <div class="time f-fl">2017.07.15</div>
            <div class="title f-fr">公告公告公告公告公告公告公告公告</div>
          </li>
          <li>
            <div class="time f-fl">2017.07.15</div>
            <div class="title f-fr">公告公告公告公告公告公告公告公告</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="m-detailwrap" style="margin-top:10px;">
      <ul class="more">
        <li>常用</li>
      </ul>
      <div class="commonToolbox">
        <dl>
          <dt v-for="(item,index) in commontools" class="f-fl">
            <dd>{{item.tool}}</dd>
            <dd>
              <img :src="item.icon" alt="">
            </dd>
            <dd>{{item.descripe}}</dd>
          </dt>
        </dl>
      </div>
    </div>
    <div class="m-detailwrap" style="margin-top:10px;">
      <ul class="more">
        <li>账户中心</li>
      </ul>
      <div class="acountbox">
        <dl>
          <dt v-for="(value,key) in accountInfo" :class="key">
            <dd v-for="(val,k) in value" v-if="k!='revise'" :class="k">{{val}}</dd>
            <dd v-if="key == 'telphone' && value.revise == 'false'" class="setbtn disabled">去修改</dd>
            <dd v-if="key == 'telphone' && value.revise == 'true'" class="setbtn" @click="">去修改</dd>
            <dd v-if="key == 'password' && value.revise == 'false'" class="setbtn disabled">去修改</dd>
            <dd v-if="key == 'password' && value.revise == 'true'" class="setbtn" @click="">去修改</dd>
          </dt>
        </dl>
      </div>
    </div>
		<div class="m-detailwrap m-more">
      <ul class="more">
        <li>推荐活动</li>
        <li style="cursor:pointer;" @click="skipToList">更多</li>
      </ul>
      <div class="m-list f-cb">
        <p v-if="tableData.length==0" style="margin:0 auto;margin-bottom:20px">暂无数据</p>
        <div class="m-child f-fl" v-for="(item, index) in tableData" @mouseenter="maskShow(index)" @mouseleave="maskFade(index)" v-if="index < 4">
          <div class="m-img">
            <img class="cover" :src="item.cover" />
            <div class="tag" :class="{enroll:item.state=='报名中', prepare:item.state=='预备中', going:item.state=='进行中', end:item.state=='已结束', Preheat:item.state=='预热中'}">{{item.state}}</div>
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
            <div class="time f-fl">{{item.startOfActivity}}</div>
            <a class="btn f-fl" href="javascript:void(0)" @click="skipToManage(item.id)">管理</a>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import $ from 'jquery';
import Vue from 'vue'
import api from '@/js/api.js'
import activityApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
	data() {
		return {
			tableData: [],
      types: ['已发布', '已取消', '草稿'],
      actived: 1,
      stateactived: 0,
      filterdata: {},
      total: 0,
      currentPage: 1,
      listIndex: -1,
      dialogFormVisible: false,
      dialogShow: false,
      drawtag: true,
      infoindex:'1',
      accountData:{
        usernick:'',
        realname:'',
        company:'',
        job:'',
        accountType:'',
        telphone:'',
        avatar:'',
        datumProgress:'',
        passwordProgress:''
      },
      commontools:[
      {
        tool:'创建活动',
        icon:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/webcreate.png',
        descripe:'说明说明说明说明'
      },
      {
        tool:'发布的活动',
        icon:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/webpub.png',
        descripe:'说明说明说明说明'
      },
      {
        tool:'参与的活动',
        icon:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/webcanyu.png',
        descripe:'说明说明说明说明'
      },
      {
        tool:'我的关注',
        icon:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/webfocus.png',
        descripe:'说明说明说明说明'
      },
      {
        tool:'我的收藏',
        icon:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/webfavor.png',
        descripe:'说明说明说明说明'
      }],
      accountInfo:{
        account:{
          title:'登录账号:',
          titlestate:'13735873222',
          message:'用户名在经注册流程确认后，后期系统将无法变更！',
        },
        telphone:{
          title:'绑定手机:',
          titlestate:'13735872322',
          message:'用户名在经注册流程确认后，后期系统将无法变更！',
          revise:'true'
        },
        password:{
          title:'账号密码:',
          titlestate:'风险中等',
          message:'用户名在经注册流程确认后，后期系统将无法变更！',
          revise:'false'
        },
        park:{
          title:'园区认证:',
          titlestate:'未认证',
          message:'用户名在经注册流程确认后，后期系统将无法变更！',
        }
      }
		}
	},
	methods:{
    toggleinfo(index){
      this.infoindex = index;
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
      // this.$router.push({path: '/activitylist/manage/' + id});
      setTimeout(() => {
        window.location.pathname = '/activitylist/manage/' + id;
      }, 1000)
    },
    skipToList() {
      this.$router.push({ path: '/activitylist/' });
    },
    editActivity() {
      this.$router.push({ path: '/activitylist/edit/' + this.activityId });
    },
    getPersonalInfo() {
      var huicyeuser = JSON.parse(localStorage.getItem('huicyeuser'));
      if(huicyeuser){
        this.accountData.usernick = huicyeuser.name ? huicyeuser.name : '';
        this.accountData.realname = huicyeuser.profile.realname ? huicyeuser.profile.realname : '';
        this.accountData.company = huicyeuser.profile.company ? huicyeuser.profile.company : '';
        this.accountData.job = huicyeuser.profile.jobInfo ? huicyeuser.profile.jobInfo.position : '';
        this.accountData.accountType = huicyeuser.profile.accountType ? huicyeuser.profile.accountType : '';
        this.accountData.telphone = huicyeuser.profile.phone ? huicyeuser.profile.phone : '';
        this.accountData.avatar = huicyeuser.profile.avatar ? huicyeuser.profile.avatar : '';
        this.accountData.datumProgress = '40%';
        //this.accountData.passwordProgress = huicyeuser.nickname;
        console.log(this.accountData)
      }else{
        this.$router.push({path:'/login'});
      }
    },
    getActivityList(t) {
      activityApi.user.postPublishedList(t).then(res => {
        this.tableData = res.data.activityList;
        this.total = res.data.count;
        const states = ['', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].startOfActivity = functionApi.moment.getMDHMTime(this.tableData[i].startOfActivity);
          for (let j = 0; j < states.length; j++) {
            if (this.tableData[i].state == j) {
              this.tableData[i].state = states[j];
            }
          }
        }
      })
    },
	},
  mounted() {
  	this.filterdata = {
      limit: 12,
      skip: 0,
      states: ['1', '3', '4', '5', '6', '7']
    };
    this.getPersonalInfo();
    this.getActivityList(this.filterdata);
  }
}
</script>
<style lang="scss" scoped>
.wrap{width: 1000px;
  margin: 0 auto;
  .m-detailwrap-area{width:1000px;margin-top:10px;
    h4{color:#324057;font-size:14px;height:48px;line-height:48px;border-bottom: 1px solid #e3e9ee;padding-left:30px;}
    .remanentMoneybox{width:692px;height:198px;border-radius: 6px;background:#fff;border:1px solid #e3e9ee;overflow: hidden;display:flex;
      .symoney{width:444px;height:100%;border-right:1px solid #e3e9ee;
        h4{margin-bottom:28px;}
        .money{font-size:48px;line-height:48px;height:48px;font-weight:bold;color:#1f2d3d;margin-left:30px;span{font-size: 14px;}}
        .buttonbox{width:150px;margin-right:30px;height:30px;}
        button{width:70px;height:30px;line-height:30px;padding:0;}
        .warnmessage{clear:both;margin-left:30px;height:14px;line-height:14px;font-size: 12px;color:#8895ab;padding-top:26px;
          i{display:inline-block;height:14px;line-height:14px;color:#fff;width:14px;background-color:#8895aa;border-radius: 50%;text-indent:4px;margin-right:2px;}
        }
      }
      .detail{width:247px;height:100%;
        dl{border-left:1px dashed #e3e9ee;height:100%;margin-left:40px;padding-top:13px;
          dt{height:30px;line-height:30px;overflow: hidden;width:180px;margin-left:-4px;
            &:before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#d3dce6;float:left;margin-top:12px;margin-right:12px;}
            dd{color:#9ba5b8;}
            &:nth-of-type(1) dd{color:#334056;}
            &:nth-of-type(1):before{background-color:#334056;}
            &.more dd{color:#334056;cursor:pointer;}
          }
        }
      }
    }
    .announcement{width:293px;height:198px;border-radius: 6px;background:#fff;border:1px solid #e3e9ee;overflow: hidden;
      .infotab{font-size:14px;height:48px;line-height:48px;border-bottom: 1px solid #e3e9ee;padding-left:40px;
        li{margin-right:17px;color:#b2bfd0;cursor: pointer;
          &.infoactive{color:#324057;font-weight:bold;}
          &.infomore{height:48px;width:20px;
            background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/wqmore.png) center center no-repeat;
          }
        }
      }
      .infocon{padding:0 30px;width:233px;height:150px;overflow: hidden;
        li{height:50px;width:233px;overflow: hidden;
          .time{line-height:50px;height:50px;font-size: 12px;color:#8895ab;width:63px;overflow: hidden;}
          .title{line-height:50px;height:50px;font-size: 12px;color:#5d687b;width:143px;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;
            cursor:pointer;
            &:hover{color:#000;}
          }
        }
      }
    }
  }
	.m-detailwrap {
    margin-top: 30px;
    border: 1px solid #e3e9ee;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    background: #fff;
    .datumbox{height:143px;padding:24px 60px;box-sizing:border-box;
      .datum-detail{
        .userpic{height:94px;width:94px;position:relative;
          img{display:block;height:94px;width:94px;border-radius: 50%;}
          span{display:block;position:absolute;width:23px;height:24px;right:0;bottom:0;
            background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/vipicon.png) center center no-repeat;
          }
        }
        .datumcon{margin:0;padding:0;margin-left:20px;
          dt{margin:0;padding:0;
            dd{float:left;}
            &:nth-of-type(1){height:36px;line-height:36px;font-weight: bold;font-size:24px;color:#2c3e50;}
            &:nth-of-type(2){height:28px;line-height:28px;font-size: 14px;color:#909cb1;
              .job{margin-left:5px;}
            }
            &:nth-of-type(3){height:28px;line-height:28px;
              dd{margin-right:20px;padding-left:15px;font-size:12px;color:#6d7787;}
              .accounttype{background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/yuanqu.png) left center no-repeat;}
              .attestation{background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/renzheng.png) left center no-repeat;}
              .bindstate{background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/bangding.png) left center no-repeat;}
              .datumprogress{width:100px;height:8px;position: relative;border-radius: 15px;background-color:#d3dce6;margin-top:11px;padding:0px;
                .progressLine{height:8px;background-color:#c51e60;position: absolute;top:0;left:0;border-radius: 15px;}
              }
              .bfb{padding-left:0px;}
            }
          }
        }
      }
      .improve-datum{color:#5875ea;font-size:14px;float:right;margin-top:32px;line-height:22px;padding-left:20px;
        background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/webedit.png) left center no-repeat;
      }
    }
    .commonToolbox{height:208px;
      dl{height:100%;}
      dt{width:197px;height:100%;border-right:1px dashed #d5dfe4;
        &:nth-last-child(1){border:none;}
        dd{width:110px;text-align:center;margin:0 auto;
          &:nth-of-type(1){font-size: 14px;color:#324057;line-height:20px;height:20px;overflow:hidden;margin-top:35px;margin-bottom:10px;}
          &:nth-of-type(2){cursor:pointer;}
          &:nth-of-type(3){color:#99a9be;font-size: 12px;height:22px;line-height:22px;margin-top:20px;}
        }
      }
    }
    .acountbox{
      dt{padding-left:40px;height:134px;border-bottom:1px dashed #e3e9ee;padding-top:40px;
        &:nth-last-child(1){border:none;}
        dd{font-size:14px;height:36px;
          &:nth-of-type(1){font-weight:bold;color:#5d687b;line-height:36px;float:left;margin-right:5px;}
          &:nth-of-type(2){font-weight:bold;color:#5d687b;line-height:36px;}
          &:nth-of-type(3){color:#a7b4c7;line-height:36px;}
          &.setbtn{color:#c92d6b;font-size: 14px;border:1px solid #edbbcf;height:38px;line-height: 38px;width:78px;text-align: center;
            cursor:pointer;border-radius: 6px;float:right;margin-top:-44px;margin-right:50px;
          }
          &.disabled{color:#727c8d;border:1px solid #c0ccda;cursor: not-allowed;}
        }
        &.password .titlestate,&.park .titlestate{color:#c51e60;}
      }
    }
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
          color: #5771e6;
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
          color: #5771e6;
        }
      }
      .activityInfo {
        font-size: 14px;
        color: #8895ab;
        margin-top: 10px;
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
          background: #5771e6;
          border: 1px solid #a0adf6;
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
        margin-left: 118px;
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
          color: #5771e6;
        }
        .activity-tag {
          position: absolute;
          left: -80px;
          top: 200px;
          width: 140px;
          height: 140px;
          background: #ccc;
          /*&.enroll {
            background: url(images/enroll.png) no-repeat;
          }
          &.check {
            background: url(images/check.png) no-repeat;
          }
          &.going {
            background: url(images/going.png) no-repeat;
          }
          &.prepare {
            background: url(images/prepare.png) no-repeat;
          }
          &.Preheat {
            background: url(images/preheat.png) no-repeat;
          }
          &.end {
            background: url(images/end.png) no-repeat;
          }
          &.cancel {
            background: url(images/cancel.png) no-repeat;
          }*/
        }
        img {
          width: 156px;
          height: 218px;
          border: 1px solid #d8dfe6;
          border-radius: 4px;
          display: block;
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
            top: 0;
            left: 0;
            width: 68px;
            height: 24px;
            border-top-left-radius: 6px;
            border-bottom-right-radius: 6px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            &.enroll {
              background: #fd9d6d;
            }
            &.going {
              background: #6cd28a;
            }
            &.prepare {
              background: #798deb;
            }
            &.Preheat {
              background: #ff8876
            }
            &.end {
              background: #b6babe
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
            margin-left: 15px;
          }
          .btn {
            background: #ebeefc;
            font-size: 12px;
            color: #5771e6;
            padding: 5px 12px;
            border-radius: 5px;
            border: 1px solid #a0adf6;
            margin-top: -38px;
            margin-left: 133px;
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
</style>