<template>
  <div class="main">
  	<div class="top main-con">
      违法和不良信息举报 
    </div>
    <div class="c-cl main-con"><span></span>受理范围</div>
    <div class="content main-con">
      <p class="title">活动稿件内容 :</p>
      <p class="content-list">企业、个人等负面信息</p>
      <p class="content-list">内容侵权</p>
      <p class="title">违法和不良信息 :</p>
      <p class="content-list">垃圾广告： 垃圾推广信息，违禁物品信息举报</p>
      <p class="content-list">色情淫秽： 色情图片、色情文字内容，低俗内容举报</p>
      <p class="content-list">政治反动： 违反国家相关法律法规内容举报</p>
      <p class="content-list">钓鱼诈骗： 木马病毒、钓鱼信息，诈骗信息举报</p>
    </div>
    <div class="c-cl main-con"><span></span>举报资料提交说明</div>
    <div class="content main-con">
      <p class="attention">为了能够尽量缩短您要求删除稿件时间，减少不必要的麻烦，请您首先认真阅读以下信息：</p>
      <p class="content-list">此页面仅作为稿件举报使用，填写信息必须真实有效。提交后，必须打印并签名或加盖公章。请将签名或加盖公章的文件发送到service@dreamtown.com进行删除申请。</p>
      <p class="content-list">申请删除新闻稿件需理由充足，针对删除的内容做逐一说明。申请新闻稿件删除，需附原发媒体撤稿函，加盖原发媒体公章后有效。</p>
      <p class="content-list">举报人要求删除的稿件是由梦想小镇转载其他网站的新闻信息，则还需申请人出示被转载网站或原创首发网站提供的“原发媒体撤稿函”一份。</p>
      <p class="content-list">以企业（公司）名义申请者，除完整填写举报资料外，还需出示单位（公司）营业执照、经办人身份证件、工作证等原件的数码文件（或加盖公章的复印件原件）。</p>
      <p class="content-list">以个人名义申请者，除完整填写举报资料外，还需提供本人身份证复印件、删除稿件的原因证明。</p>
      <p class="content-list">如属于委托删稿（帖），必须出示相关委托公证证明，证明双方的授权委托关系，并单独填写委托人相关信息。</p>
      <p class="content-list">为了方便查找，请您在电子邮件主题中，一定要注明申请人姓名或申请企业名称。  样例：张三三（浙江菜根信息科技有限公司）申请删除梦想小镇活动。</p>
      <p class="content-list">客服收到您明确完整的举报材料，并核实举报人身份与举报内容的真实与合法性后，会在1个工作日之内进行审核，并交予相关部门在3个工作日内进行处理。如提交的投诉材料不符合要求的，无确凿证据，则视为投诉未成功，对应部门不予处理。。</p>
      <p class="content-list">举报人提交的证件必须齐全，电子版证件和材料必须清晰，否则将不予处理。</p>
    </div>
    <div class="c-cl main-con"><span></span>活动说明</div>
    <div class="content main-con">
      <p class="activityInfo"><span>活动标题：</span>{{activitDetail.title}}</p>
      <p class="activityInfo"><span>主办方：</span>{{activitDetail.sponsor}}</p>
      <p class="activityInfo"><span>活动时间：</span>{{activitDetail.ActivityTime}}</p>
      <p class="activityInfo"><span>活动地点：</span>{{activitDetail.location}}</p>
    </div>
    <div class="c-cl main-con"><span></span>举报人信息</div>
    <div class="content main-con report">
      <div class="reportlist">
        <p class="repor-title">举报人：</p>
        <input type="text" v-model="username" disabled="true" >
      </div>
      <div class="reportlist">
        <p class="repor-title">姓名/企业名称：</p>
        <input type="text" placeholder="请填写您的真实姓名" v-model="form.name">
        <p class="form-error" v-if="usernameerrorShow">请填写您的真实姓名</p>
      </div>
      <div class="reportlist">
        <p class="repor-title">联系邮箱：</p>
        <input type="text" placeholder="请填写您的联系邮箱" v-model="form.email">
        <p class="form-error" v-if="emailerrorShow">请填写联系邮箱</p>
      </div>
      <div class="reportlist">
        <p class="repor-title">联系电话：</p>
        <input type="text" placeholder="请填写您的联系电话" v-model="form.phone">
        <p class="form-error" v-if="phoneerrorShow">请填写联系电话</p>
      </div>
    </div>
    <div class="c-cl main-con"><span></span>举报原因</div>
    <div class="content main-con reportson">
      <textarea class="report-reason" v-model="form.content"></textarea>
      <p class="form-error" v-if="contenterrorShow">请填写举报原因</p>
      <button class="submit hcl" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js'
  import functionApi from '@/js/function.js';
  import isLogin from '@/js/islogin.js';
  export default{
    data(){
      return{
        activityId: '',
        username: '',
        activityId:'',
        username:"",
        usernameerrorShow:false,
        phoneerrorShow:false,
        emailerrorShow:false,
        contenterrorShow:false,
        form:{
          name:'',
          email:'',
          phone:'',
          content:'',
        },
        activitDetail: {}
      }
    },
    methods:{
      submit() {
        const huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("先请登录");
          this.$router.push({path:'/login'})
        }else if(this.form.name==''||this.form.email==''||this.form.phone==''||this.form.content=='') {
          this.$message.error('请填写完整表单信息');
        }else{
          this.activityId = location.pathname.split('/')[2];
          this.form.activityId = this.activityId;
          activityApi.activity.activityreport(this.form).then(res => {
            this.$router.push({path:'/activityreport-success/' + res.data.data.id});
          })
        }
      }
    },
    mounted() {
      this.activityId = location.pathname.split('/')[2];
      if(localStorage.getItem('huicyeuser')){
        this.username = JSON.parse(localStorage.getItem('huicyeuser')).name;
      }
      activityApi.activity.postDetail({id: this.activityId}).then(res => {
        this.activitDetail = res.data;
        this.activitDetail.sponsor = this.activitDetail.sponsor.join(',');
        let startDate = functionApi.moment.getDateFormate(this.activitDetail.startOfActivity);
        let endDate = functionApi.moment.getDateFormate(this.activitDetail.endOfActivity);
        if(startDate == endDate){
          this.activitDetail.ActivityTime = functionApi.moment.getListTime2(this.activitDetail.startOfActivity) + '-' + functionApi.moment.getHMTime(this.activitDetail.endOfActivity);
        }else{
          this.activitDetail.ActivityTime = functionApi.moment.getListTime2(this.activitDetail.startOfActivity) + '-' + functionApi.moment.getListTime2(this.activitDetail.endOfActivity);
        }
        this.activitDetail.location = this.activitDetail.location.province + '·' + this.activitDetail.location.city + '·' + this.activitDetail.location.area;
      })
    }
  }
</script>

<style lang="scss" scoped>
	.main{background:#f3f7f9;padding-top:40px;padding-bottom:60px;
		.top{height:114px;border-bottom:1px solid #e3e9ee;background:#fff;text-align:center;color:#475469;font-size:30px;font-weight:bold;line-height:114px;}
    .main-con{margin:0 auto;width:1198px;}
    .form-error{color:#d00;font-size:12px}
    .c-cl{height:48px;line-height:48px;font-size:16px;color:#475469;font-weight:bold;
      border:1px solid #e3e9ee;border-top:0;padding-left:26px;width:1172px;
      span{display:inline-block;width:4px;height:14px;background:#c51e60;border-radius:3px;margin-right:10px;}
    }
    .content{padding-left:50px;width:1106px;background:#fff;padding-right:42px;padding-bottom:36px;border:1px solid #e3e9ee;border-top:0;
      .title{color:#324057;font-size:16px;padding-top:30px; margin-bottom:16px;}
      .content-list{background:url(images/circle-icon.png) no-repeat left 9px;padding-left:20px;font-size:14px;color:#99a9be;line-height:29px;margin-bottom:11px;}
      .attention{color:#ff6a56;padding-top:40px;padding-bottom:15px;}
      .activityInfo{font-size:14px;color:#99a9be;height:43px;
        &:nth-child(1){padding-top:40px;}
        span{color:#324057;}
      }
    }
    .reportson{padding-top:40px;
      .submit{display:block;width:180px;height:50px;border:0;background:#5771e6;color:#fff;
        border-radius:7px;margin:0 auto;margin-top:60px;
      }
    }
    .report-reason{width:1000px;height:200px;border:0;border:1px solid #d3dce6;border-radius:10px;padding:10px;}
    .report{display:flex;flex-wrap:wrap;padding-top:39px;
      .reportlist{width:50%;margin-bottom:21px;
        .repor-title{color:#324057;margin-bottom:10px;padding-left:12px;}
        input{border:0;border:1px solid #d3dce6;width:478px;height:34px;border-radius:8px;
          padding:0 10px;font-size:14px;color:#475469;
        }
      }
    }
	}
</style>