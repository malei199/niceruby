<template>
  <div class="main">
  	<div class="top main-con">
      违法和不良信息举报 
    </div>
    <div class="c-cl main-con"><span></span>文章信息</div>
    <div class="content main-con">
      <p class="activityInfo"><span>活动标题：</span>{{title}}</p>
      <p class="activityInfo"><span>主办方：</span>{{sponsor}}</p>
      <p class="activityInfo"><span>活动时间：</span>{{ActivityTime}}</p>
      <p class="activityInfo"><span>活动地点：</span>{{location}}</p>
    </div>
    <div class="c-cl main-con"><span></span>举报人信息</div>
     <div class="content main-con">
      <p class="activityInfo"><span>举报人：</span>{{username}}</p>
      <p class="activityInfo"><span>企业名称：</span>{{reportDetail.name}}</p>
      <p class="activityInfo"><span>联系邮箱：</span>{{reportDetail.email}}</p>
      <p class="activityInfo"><span>联系电话：</span>{{reportDetail.phone}}</p>
    </div>
    <div class="c-cl main-con"><span></span>举报原因</div>
    <div class="content main-con reportson">
      <p class="delete-reason">{{reportDetail.content}}</p>
      <p class="sign">举报人(签名/盖章)：</p>
      <p class="sign">举报日期：{{reportTime}}</p>
      <button class="submit hcl" @click="submit">打印</button>
      <p class="submit-desc">请打印，并签名或盖章后与相关材料电子版一起发送到 service@dreamtown.com</p>
    </div>
    <div class="printBox" style="display:none;">
      <div class="top main-con">
        违法和不良信息举报 
      </div>
      <div class="c-cl main-con"><span></span>文章信息</div>
      <div class="content main-con">
        <p class="activityInfo"><span>活动标题：</span>{{title}}</p>
        <p class="activityInfo"><span>主办方：</span>{{sponsor}}</p>
        <p class="activityInfo"><span>活动时间：</span>{{ActivityTime}}</p>
        <p class="activityInfo"><span>活动地点：</span>{{location}}</p>
      </div>
      <div class="c-cl main-con"><span></span>举报人信息</div>
       <div class="content main-con">
        <p class="activityInfo"><span>举报人：</span>{{username}}</p>
        <p class="activityInfo"><span>企业名称：</span>{{reportDetail.name}}</p>
        <p class="activityInfo"><span>联系邮箱：</span>{{reportDetail.email}}</p>
        <p class="activityInfo"><span>联系电话：</span>{{reportDetail.phone}}</p>
      </div>
      <div class="c-cl main-con"><span></span>举报原因</div>
      <div class="content main-con reportson">
        <p class="delete-reason">{{reportDetail.content}}</p>
        <p class="sign">举报人(签名/盖章)：</p>
        <p class="sign">举报日期：</p>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/js/api.js'
  import $ from 'jquery';
  import functionApi from '@/js/function.js';
  export default{
    data(){
      return{
        print:false,
        title:'',
        sponsor:'',
        ActivityTime:"",
        location:'',
        reportDetail:"",
        username:'',
        reportTime:'',
        form:{
          reason:'',
          reportpeople:'',
          reportname:'',
          email:'',
          phone:'',
        }
      }
    },
    methods:{
      submit() {
        // console.log(this.form)
        document.body.innerHTML = $('.printBox')[0].innerHTML;
        window.location.href = location.href;
        window.print();
      }
    },
    mounted() {
      let reportId = location.pathname.split('/')[2];
      api.activity.postReportDetail({id:reportId}).then(res => {
        console.log(res.data);
        this.reportDetail = res.data;
        this.title = res.data.activity.title;
        this.sponsor = res.data.activity.sponsor.join(',');
        let startDate = functionApi.moment.getDateFormate(res.data.activity.startOfActivity);
        let endDate = functionApi.moment.getDateFormate(res.data.activity.endOfActivity);
        this.reportTime = functionApi.moment.getListTime2(res.data.reportTime)
        if(startDate == endDate){
              this.ActivityTime = functionApi.moment.getListTime2(res.data.activity.startOfActivity) + '-' + functionApi.moment.getHMTime(res.data.activity.endOfActivity);
            }else{
              this.ActivityTime = functionApi.moment.getListTime2(res.data.activity.startOfActivity) + '-' + functionApi.moment.getListTime2(res.data.activity.endOfActivity);
            }
            this.location = res.data.activity.location.province + '·' + res.data.activity.location.city + '·' + res.data.activity.location.area;
            this.username = res.data.account.username;
      })
    }
  }
</script>

<style lang="scss" scoped>
	.main{background:#f3f7f9;padding-top:40px;padding-bottom:60px;
		.top{height:114px;border-bottom:1px solid #e3e9ee;background:#fff;text-align:center;color:#475469;font-size:30px;font-weight:bold;line-height:114px;}
    .main-con{margin:0 auto;width:1198px;}
    .c-cl{height:48px;line-height:48px;font-size:16px;color:#475469;font-weight:bold;
      border:1px solid #e3e9ee;border-top:0;padding-left:26px;width:1172px;
      span{display:inline-block;width:4px;height:14px;background:#c51e60;border-radius:3px;margin-right:10px;}
    }
    .reportson .delete-reason[data-v-28507b7e]{font-size:14px;width:100%;line-height: 26px;}
    .content{padding-left:50px;width:1106px;background:#fff;padding-right:42px;padding-bottom:36px;border:1px solid #e3e9ee;border-top:0;
      .title{color:#324057;font-size:16px;padding-top:30px; margin-bottom:16px;}
      .content-list{background:url(images/circle-icon.png) no-repeat left 9px;padding-left:20px;font-size:14px;color:#99a9be;line-height:29px;margin-bottom:11px;}
      .attention{color:#ff6a56;padding-top:40px;padding-bottom:15px;}
      .activityInfo{font-size:14px;color:#99a9be;height:43px;
        &:nth-child(1){padding-top:40px;}
        span{color:#324057;}
      }
    }
    .reportson{padding-top:20px;
      .delete-reason{line-height:30px;color:#99a9be;font-size:14px;margin-bottom:100px;}
      .sign{margin-left:70%;color:#475469;font-size:14px;margin-bottom:47px;}
      .submit{display:block;width:180px;height:50px;border:0;background:#5771e6;color:#fff;
        border-radius:7px;margin:0 auto;margin-top:60px;
      }
      .submit-desc{color:#c0ccda;font-size:12px;text-align:center;margin-top:23px;}
    }
    .report-reason{width:1000px;height:200px;border:0;border:1px solid #d3dce6;border-radius:10px;padding:10px;}
	}
  .top{height:114px;border-bottom:0px solid #e3e9ee;background:#fff;text-align:center;color:#475469;font-size:30px;font-weight:bold;line-height:114px;}
  .main-con{margin:0 auto;width:1198px;}
  .c-cl{height:48px;line-height:48px;font-size:34px;color:#475469;font-weight:bold;
    border:none;border-top:0;padding-left:26px;width:1172px;
    span{display:inline-block;width:4px;height:14px;background:#5771e6;border-radius:3px;margin-right:10px;}
  }
  .c-cl[data-v-28507b7e]{border:none;}
  .reportson .delete-reason[data-v-28507b7e]{font-size:28px;width:1000px;line-height:40px;}
  .content{padding-left:50px;width:1106px;background:#fff;padding-right:42px;padding-bottom:36px;border:0px solid #e3e9ee;border-top:0;
    .title{color:#324057;font-size:16px;padding-top:30px; margin-bottom:16px;}
    .content-list{background:url(images/circle-icon.png) no-repeat left 9px;padding-left:20px;font-size:14px;color:#99a9be;line-height:29px;margin-bottom:11px;}
    .attention{color:#ff6a56;padding-top:40px;padding-bottom:15px;}
    .activityInfo{font-size:14px;color:#99a9be;height:43px;font-size:28px;
      &:nth-child(1){padding-top:40px;}
      span{color:#324057;}
    }
  }
  .reportson{padding-top:20px;
    .delete-reason{line-height:30px;color:#99a9be;font-size:14px;margin-bottom:100px;}
    .sign{margin-left:50%;color:#475469;font-size:28px;margin-bottom:47px;}
    .submit{display:block;width:180px;height:50px;border:0;background:#5771e6;color:#fff;
      border-radius:7px;margin:0 auto;margin-top:60px;
    }
    .submit-desc{color:#c0ccda;font-size:12px;text-align:center;margin-top:23px;}
  }
  .report-reason{width:1000px;height:200px;border:0;border:1px solid #d3dce6;border-radius:10px;padding:10px;}
</style>