<template>
  <div class="activitymanage">
    <!-- <p class="m-title f-cb">
      <span class="line f-db f-fl"></span>
      <span class="name f-db f-fl" v-if="pathname=='activitylist'">我的发布</span>
      <span class="name f-db f-fl" v-if="pathname=='activityenroll'">我参与的</span>
    </p> -->
    <p class="m-detailwrap-title">电子票详情</p>
    <div class="m-detailwrap">
      <div class="content main-con activity-manage">
        <div class="content-left">
          <p class="title" @click="skipToDetail(activityDetail.id)">{{activityDetail.title}}</p>
          <p class="activityInfo">
            <span>姓名：</span>{{activityDetail.enrollName}}</p>
          <p class="activityInfo">
            <span>公司：</span>{{activityDetail.enrollCompany}}</p>
          <p class="activityInfo">
            <span>联系电话：</span>{{activityDetail.enrollPhone}}</p>
          <p class="activityInfo">
            <span>活动时间：</span>{{ActivityTime}}</p>
          <p class="activityInfo">
            <span>报名时间：</span>{{activityDetail.ActivityEnrollTime}}</p>
          <p class="activityInfo">
            <span>门票种类：</span>{{activityDetail.cost=='0'?'免费':'收费'}}</p>
          <div class="attention">
            <span>注意事项：</span>
            <div>
              <p>1. 本活动凭电子票入场，一人一票一次性，请勿复制或转寄他人；</p>
              <p>2. 请将签到二维码截图保存至手机或打印携带，或下载【梦想小镇APP】于个人中心查看；</p>
              <P>3. 本活动由梦想小镇提供票券服务，其拥有最终解释权。</P>
            </div>
          </div>
          <div class="btn-box">
            <button class="draw-btn edit" v-if="activityDetail.state=='草稿'">编辑</button>
            <button class="draw-btn delete" v-if="activityDetail.state=='草稿'">删除</button>
          </div>
        </div>
        <div class="activity-cover">
          <qrcode class="qrcode" :size="196" :value="qrcodeValue"></qrcode>
          <div class="qr-bottom">
            <p class="desc">票号：</p>
            <p class="enrollId">{{enrollId}}</p>
          </div>
        </div>
      </div>
      <div v-if="pathname=='activityenroll'">
        <button class="cancelbtn" :class="{'hui': activityDetail.state!='报名中'}" :disabled="activityDetail.state!='报名中'" @click="cancelenroll">{{enrollText}}</button>
      </div>
      <div v-if="pathname=='activitylist'" style="text-align:center;margin:50px;">
        <button @click="goback" class="goback">返回</button>
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
            <div class="tag" :class="{enroll:item.state=='报名中',
                  prepare:item.state=='预备中', going:item.state=='进行中', end:item.state=='已结束',
                  Preheat:item.state=='预热中',cancel:item.state=='已取消'}">
              <span>{{item.state}}</span>
            </div>
            <div class="bottom-mask">
              <p class="title">{{item.title}}</p>
            </div>
            <div class="bottom-mask">
              <p class="title">{{item.title}}</p>
            </div>
            <transition name='fade'>
              <div class="fade-mask" v-if="index == listIndex" :id="item.id" @click="skipToDetail(item.id)">
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
  </div>
</template>

<script>
import activityApi from '@/js/api.js';
import functionApi from '@/js/function.js';
import Qrcode from 'v-qrcode/src/index'
export default {
  data() {
    return {
      tabChanges: ['活动管理', '报名管理'],
      tableData: [],
      cancelerrorshow: '',
      title: '',
      actived: 0,
      sponsor: '',
      qrcodeValue: '',
      pathname: '',
      ActivityTime: "",
      location: '',
      states: ['草稿', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'],
      reportDetail: "",
      enrollId: '',
      enrollText: '',
      codes: '',
      form: {
        content: ''
      },
      rules: {
        content: [{ required: true, message: '请填写取消原因', trigger: 'blur' }]
      },
      filterdata: {},
      activityDetail: {},
      listIndex: -1,
    }
  },
  components: {
    Qrcode
  },
  methods: {
    getActivityList(t) {
      activityApi.user.postPublishedList(t).then(res => {
        this.tableData = res.data.activityList;
        this.total = res.data.count;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].title = functionApi.subStringNum(this.tableData[i].title,52);
          this.tableData[i].startOfActivity = functionApi.moment.getDateFormatepoint(this.tableData[i].startOfActivity);
          this.tableData[i].city = this.tableData[i].location.city;
          if (this.tableData[i].state == '10') {
            this.tableData[i].state = '已取消'
          }
          for (let j = 0; j < this.states.length; j++) {
            if (this.tableData[i].state == j) {
              this.tableData[i].state = this.states[j];
            }
          }
        }
      })
    },
    goback() {
      this.$router.go(-1);
    },
    cancel() {
      this.dialogFormVisible = false
    },
    cancelenroll() {
      let id = localStorage.getItem('activityId');
      activityApi.activity.postCancelEnroll({ id: id }).then(res => {
        console.log(res.data)
        if (res.data.msg == '该用户未报名') {
          this.$message({
            showClose: true,
            message: '该用户未报名',
            type: 'error'
          });
        } else if (res.data.result == 'success') {
          this.$message({
            showClose: true,
            message: '取消报名成功',
            type: 'success'
          });
          setTimeout(function () {
            location.pathname = '/activityenroll';
          }, 1500)
        } else {
          this.$message({
            showClose: true,
            message: '该活动状态下不能取消',
            type: 'error'
          });
        }
      })
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
              setTimeout(() => {
                this.$router.go(-1)
              }, 1500)
            }
          })
        } else {
          return false;
        }
      });
    },
    maskShow(index) {
      this.listIndex = index;
    },
    maskFade(index) {
      this.listIndex = -1;
    },
    skipToDetail(id) {
      this.$router.push({ path: '/activitydetail/' + id });
    },
    skipToManage(id) {
      this.$router.push({ path: '/activitylist/manage/' + id });
    },
    skipToList() {
      this.$router.push({ path: '/nav1/active/activitylist/' });
    },
    getrouter() {
      this.pathname = window.location.pathname.split('/')[1];
    }
  },
  mounted() {
    this.getrouter();
    this.filterdata = {
      limit: 12,
      skip: 0,
      states: ['1', '3', '4', '5', '6', '7']
    };
    this.getActivityList(this.filterdata);
    let id = localStorage.getItem('activityId');
    let enrollId = localStorage.getItem('enrollId');
    this.enrollId = enrollId;
    let value = {
      "id": id,
      "enrollCode": enrollId
    };
    this.qrcodeValue = JSON.stringify(value);
    const states = ['草稿', '待审核', '', '预备中', '报名中', '预热中', '进行中', '已结束'];
    //localStorage.removeItem('accountId');
    const accountId = localStorage.getItem('accountId');
    activityApi.activity.postDetail({ id: id, accountId: accountId }).then(res => {
      console.log(res)
      this.activityDetail = res.data;
      this.title = res.data.title;
      console.log(this.activityDetail.enrollment)
      for (let i = 0; i < this.states.length; i++) {
        if (this.activityDetail.state == i) {
          this.activityDetail.state = this.states[i]
        }
      }
      this.activityDetail.sponsor = res.data.sponsor.join(',');
      if (this.activityDetail.coSponsor) {
        this.activityDetail.coSponsor = res.data.coSponsor.join(',');
      }


      if (this.activityDetail.enrollment.name) {
        this.activityDetail.enrollName = this.activityDetail.enrollment.name;
      } else {
        this.activityDetail.enrollName = '暂无';
      }
      if (this.activityDetail.enrollment.phone) {
        this.activityDetail.enrollPhone = this.activityDetail.enrollment.phone;
      } else {
        this.activityDetail.enrollPhone = '暂无';
      }

      if (this.activityDetail.enrollment.company) {
        this.activityDetail.enrollCompany = this.activityDetail.enrollment.company;
      } else {
        this.activityDetail.enrollCompany = '暂无';
      }

      // console.log(this.tableData[i]);
      if (this.activityDetail.state == '预备中') {
        this.enrollText = '未签到'
      } else if (this.activityDetail.state == '报名中') {
        this.enrollText = '取消报名'
      } else if (this.activityDetail.state == '预热中') {
        this.enrollText = '活动未开始'
      } else if (this.activityDetail.state == '进行中' && this.activityDetail.enrollment.signState == '0') {
        this.enrollText = '未签到'
      } else if (this.activityDetail.state == '进行中' && this.activityDetail.enrollment.signState == '1') {
        this.enrollText = '已签到'
      } else if (this.activityDetail.state == '已结束') {
        this.enrollText = '已过期'
      }
      if (this.activityDetail.state == '10') {
        this.activityDetail.state = '已取消'
        this.enrollText = '已过期'
      }
      if (this.activityDetail.state == '11') {
        this.activityDetail.state = '已下架'
        this.enrollText = '已下架'
      }
      console.log(this.activityDetail.state);
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
      this.location = res.data.location.province + '·' + res.data.location.city + '·' + res.data.location.area;
    })
  }
}
</script>

<style lang="scss" scoped>
.activitymanage {
  width: 1000px;
  margin: 0 auto;
  padding: 0px 0;
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
  .m-detailwrap-title {
    margin-top: 0px;
    background: #fbfdff;
    border: 1px solid #e3e9ee;
    border-bottom: 0;
    border-radius: 5px 5px 0 0;
    font-size: 14px;
    color: #475469;
    font-weight: bold;
    height: 48px;
    padding-left: 31px;
    line-height: 48px;
    color: #c51e60;
    font-weight: bold;
    background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/jvxing.png) no-repeat;
    background-position:58px bottom;
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
          color: #5771e6;
        }
      }
    }
    .content {
      background: #fff;
      padding: 0 55px 0 60px;
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
      .content-left {
        .title {
          width: 503px;
        }
      }
      .attention {
        display: flex;
        font-size: 14px;
        span {
          display: block;
          width: 85px;
          color: #3b4857
        }
        p {
          color: #8895ab;
          margin-bottom: 20px;
          line-height: 20px;
        }
      }
      .activityInfo {
        font-size: 14px;
        color: #8895ab;
        height: 43px;
        &:nth-child(1) {
          padding-top: 40px;
        }
        span {
          display: inline-block;
          color: #324057;
          margin-right: 12px;
          width: 70px;
          text-align: right;
        }
        .privacy {
          display: inline;
          color: #b2bfd0;
        }
      }
      .cancel-btn {
        border: 0;
        width: 140px;
        height: 50px;
        color: #fff;
        background: #5771e6;
        border-radius: 5px;
        margin-left: 400px;
        margin-bottom: 50px
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
        margin-left: 0px;
        margin-top: 40px;
        position: relative;
        border: 1px solid #d3dce6;
        border-radius: 3px;
        height: 280px;
        width: 230px;
        text-align: center;
        padding-top: 11px;
      }
      .qrcode {
        margin: 18px -12px 0 18px;
      }
      .qr-bottom {
        display: flex;
        border-top: 1px dashed #d3dce6;
        padding: 0 14px;
        padding-top: 15px;
        height: 58px;
        .desc {
          width: 90px;
        }
      }

      .enrollId {
        font-size: 14px;
        color: #6d7787;
        line-height: 20px;
        padding: 0 14px;
        text-align: left;
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

.goback {
  color: #fff;
  background: #5771e6;
  color: #fff;
  border: 0;
  width: 138px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #a0adf6;
}

.cancelbtn {
  margin-left: 425px;
  margin-top: 20px;
  margin-bottom: 40px;
  background: #5771e6;
  color: #fff;
  border: 0;
  width: 138px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #a0adf6;
  &.hui {
    background: #c0ccda;
    border: 0
  }
}

.el-dialog {
  background: #f7f8fa
}

.areatext {
  width: 709px;
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
    border: 1px solid #ccd4f7
  }
}
</style>