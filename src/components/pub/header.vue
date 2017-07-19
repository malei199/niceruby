<template>
<div class="head">
<div class="top">
    <div class="f-fl logo">
    	<img src="../../images/logo.png">
    </div>
    <ul class="f-fl nav-list">
    	<li class="f-fl address">杭州</li>
    	<li v-for="(item,index) in navlists" :class="{active:index==actived}" class="f-fl" @click="golist(item.path,index)">{{item.text}}</li>
    </ul>
		<div class="search f-fl">
			<input type="text" class="f-fl f-fs1"/>
			<span class="search-btn f-fl"></span>
		</div>
		<ul class="my-center f-fr">
			<i class="line f-fl"></i>
			<li class="f-fl message f-tac" @click="openInfo">消息
				<div class="unreadNum" v-show="$store.state.unreadNum!=''">{{$store.state.unreadNum}}</div>
			</li>
			<i class="line f-fl"></i>
			<li class="f-fl phone f-tac">客户端</li>
			<i class="line f-fl"></i> 
			<li class="f-fl avatar f-tac" @click="goPerson">
			  <img class="userPic" v-if="!isLogin" src="../../images/defaultAvatar.png" alt="">
				<img class="userPic" v-else src="../../images/my-icon.png" alt="">
				<span v-if="!isLogin">我的</span>
				<span v-if="isLogin" v-text="userName"></span>
				<div class="pemenu" v-if="isLogin">
					<a href="javascript:void(0)" @click="goPerson">个人中心</a>
					<a href="javascript:void(0)" @click="outLogin($event)">退出登录</a>
				</div>
			</li>
		</ul>
		</div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
  	return {
  		navlists:[{text:'资讯',path:'/news'},{text:'活动',path:'/activity'},
			{text:'金融',path:''},{text:'集市',path:''},{text:'发现',path:''}],
			actived:0,
			showPeInfo:false,
			actived:'1'
  	}
  },
  computed:{
		isLogin() {
			let huicyeuser = localStorage.getItem('huicyeuser');
      if(huicyeuser){
        return true;
      }
		},
		userName() {
			let huicyeuser = JSON.parse(localStorage.getItem('huicyeuser'));
			if(huicyeuser){
				return huicyeuser.name;
			}
		}
  },
	methods:{
		golist(path,index) {
			this.actived = index;
			this.$router.push({path:path})
		},
		openInfo () {
      _MEIQIA('showPanel');
    },
		goPerson() {
			let huicyeuser = localStorage.getItem('huicyeuser');
      if(!huicyeuser){
        alert("请先登录！");
        this.$router.push({path:'/login'});
      }else{
        this.$router.push({path:'/nav1'});
      }
		},
		outLogin(e) {
			e.stopPropagation();
			localStorage.removeItem('huicyeuser');
			let autoLogin = JSON.parse(localStorage.getItem('autoLogin'));
			autoLogin.loginOut = true;
			localStorage.setItem('autoLogin',JSON.stringify(autoLogin));
			this.$router.push({path:'/login'});
		}
	},
	mounted() {
		let autoLogin = JSON.parse(localStorage.getItem('autoLogin'));
		if(autoLogin){
			var nowTime = new Date().getTime()/1000;
			var intervalTime7 = nowTime - autoLogin.loginTime - 24*7*3600;
			var intervalTime1 = nowTime - autoLogin.loginTime - 24*7*3600;
			//设置自动登录，登录7天失效
			if(intervalTime7 > 0 && autoLogin.loginHandel == true){
      	localStorage.removeItem('huicyeuser');
      //未设置自动登录，登录一天失效
			}else if(intervalTime1 > 0 && autoLogin.loginHandel != true){
				localStorage.removeItem('huicyeuser');
			}
		}
		
	}
}
</script>

<style lang='scss' scoped>
	.head{width:100%;border-bottom:6px solid #e3e9ee;}
	.top{width:1200px;height:87px;background:#fff; margin:0 auto;}
	.logo{
		img{margin-top:24px;}
	}
	.nav-list{margin-left:37px;font-size:14px;color:#324057;line-height: 87px;
		li{width:62px;height:100%;text-align:center;cursor:pointer}
		.active{color:#c51e60}
		.address{background:url(../../images/address-trangle.png) no-repeat  55px center}
	}
	.search{height:34px;width:260px;margin-top:27px;margin-left:81px;
		input{width:187px;height:32px;padding:0 15px; border:0;border:1px solid #dde1e6;border-right:0;
		border-radius:3px 0 0 3px;color:#aab5c1;}
		span{display:inline-block;width:40px;height:34px;background:#c51e60 url(../../images/search-icon.png) no-repeat center;
				border-radius:3px;
		}
	}
.my-center{margin-top:10px;height:100%;width:158px;width:251px;
	li{width:77px;height:28px;padding-top:36px;color:#68737d;font-size:12px}
	.line{height:30px;border-left:1px solid #e3e9ee;margin-top:20px;}
	.message{background:url(../../images/message.png) no-repeat center 10px;position:relative;cursor: pointer;
		.unreadNum{font-size:12px;color:#fff;background-color:red;position:absolute;border-radius: 3px;padding:1px 3px;top:6px;right:19px;}
	}
	.phone{background:url(../../images/phone.png) no-repeat center 10px}
	.avatar{position:relative;cursor:pointer;padding-top:10px;
		.userPic{display: block;height:23px;width:23px;overflow: hidden;border-radius: 50%;margin:0 auto;margin-bottom:2 px;}
		.pemenu{width:67px;position: absolute;top:50px;left:-1px;background:#fff;z-index:9999;display:none;padding:0 5px;
			a{display:block;width:67px;height:30px;line-height:30px;text-align: center;cursor:pointer;color:#ccc;font-size:12px;
				&:nth-of-type(1){margin-top:10px;border-bottom:1px solid #e9e9e9;}
				&:nth-of-type(2){margin-bottom:5px;}
				&:hover{color:#333;}
			}
		}
		&:hover .pemenu{display:block;}
	}
}
</style>
