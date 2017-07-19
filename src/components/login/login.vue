<template>
	<div class="login">
		<div class="login-pub">
			<ul class="login-tab f-cb" v-if="resetPwd == false">
				<li @click='ShowLogin' :class="{active:login}">登录</li>
				<li></li>
				<li @click='ShowRegister' :class="{active:!login}">注册</li>
			</ul>
			<div class="resetPwd" v-if="resetPwd == true">重置密码</div>
		</div>
		<div class="login-wrap" v-if="login && resetPwd == false">
			<div class="username">
				<span>用户名</span>
				<input type="text" placeholder="请输入用户名" v-model="loginData.username">
			</div>
			<div class="password">
				<span>密码</span>
				<input type="password" placeholder="请输入密码" v-model="loginData.password">
			</div>
			<div class="loginHelp">
				<div class="autologin">
					<input type="checkbox" id="autologin" v-model="loginInfo.loginHandel">
					<label for="autologin">7天自动登录</label>
				</div>
				<div class="forget" @click="resetPassword">
					忘记密码?
				</div>
			</div>
			<a class="imlogin" href="javascript:void(0)" @click="goLogin">立即登录</a>
		</div>
		<div class="register-wrap" v-if="!login || resetPwd == true">
			<div class="telphone">
				<span>手机号码</span>
				<input type="text" placeholder="请输入手机号码" v-model="registerData.phonenumber" :class="{error:phoneWarnText != '正确'}" @blur="checkTelphone(registerData.phonenumber)">
				<i class="warn" v-if="phoneWarnText != '正确'">{{phoneWarnText}}</i>
			</div>
			<div class="checkcode">
				<span>验证码</span>
				<input type="text" placeholder="验证码" v-model="registerData.code">
				<a href="javascript:void(0)" class="getcode" @click="getcode" v-if="timeflag==true">获取验证码</a>
				<a href="javascript:void(0)" class="getcode disabled" v-if="timeflag==false">{{times}}秒后重新发送</a>
				<i class="warn" v-if="codestate == '0'">输入验证码</i>
				<i class="warn" v-if="codestate == '1'">验证码错误</i>
			</div>
			<div class="first-password">
				<span>密码1</span>
				<input type="password" placeholder="请输入密码" v-model="registerData.password1">
				<i class="warn" v-if="passWordGo == 1">密码不能为空</i>
			</div>
			<div class="second-password">
				<span>密码2</span>
				<input type="password" placeholder="再次输入密码" v-model="registerData.password2">
				<i class="warn" v-if="passWordGo == 2">两次输入密码不一样</i>
			</div>
			<a class="imregister" href="javascript:void(0)" @click="goregister" v-if="resetPwd == false">立即注册</a>
			<a class="imsummit" href="javascript:void(0)" v-if="resetPwd == true" @click="goresetPwd">提交</a>
		</div>
	</div>
</template>

<script>
import api from '@/js/api.js'
export default {
	data() {
		return {
			login: true,
			loginData: {
				username: '',
				password: ''
			},
			loginInfo: {
				loginUserId: '',
				loginUser: '',
				loginHandel: '',
				loginTime: '',
				loginOut: ''
			},
			registerData: {
				phonenumber: '',
				code: '',
				password1: '',
				password2: '',
			},
			resetPwd: false,
			timeflag: true,
			times: 60,
			phoneWarnText: '正确',
			passWordGo: "",
			codestate: ""
		}
	},
	methods: {
		ShowLogin() {
			this.login = true;
		},
		ShowRegister() {
			this.login = false;
		},
		setAutoLogin(userId) {
			this.loginInfo.loginTime = new Date().getTime() / 1000;
			this.loginInfo.loginUserId = userId;
			this.loginInfo.loginUser = this.loginData.username;
			this.loginInfo.password = this.loginData.password;
			this.loginInfo.loginOut = false;
			var autoLogin = localStorage.getItem('autoLogin');
			console.log(autoLogin)
			if (!autoLogin) {
				localStorage.setItem("autoLogin", JSON.stringify(this.loginInfo));
			} else {
				localStorage.removeItem('autoLogin');
				localStorage.setItem("autoLogin", JSON.stringify(this.loginInfo));
			}
		},
		goLogin() {
			var self = this;
			api.user.login(this.loginData).then(res => {
				res.profile.accountType = res.accountType;
				const user = {
					id: res.id,
					name: res.username,
					token: res.token.id,
					profile: res.profile
				};
				localStorage.setItem("huicyeuser", JSON.stringify(user));
				self.setAutoLogin(user.id);
				//location.pathname = '/activity';
				this.$router.go(-1);
			}).catch(res => {
				this.$message.error('用户名或密码错误');
			})
		},
		resetPassword() {
			this.resetPwd = true;
		},
		checkTelphone(num) {
			var rules = '/^1[34578]\d{9}$/';
			if (num == "") {
				this.phoneWarnText = "手机号码不能为空"
			} else if (!(/^1[34578]\d{9}$/.test(num))) {
				this.phoneWarnText = "请输入正确的手机号码"
			} else if (/^1[34578]\d{9}$/.test(num)) {
				this.phoneWarnText = "正确"
			}
		},
		showCountDown() {
			this.timeflag = false;
			let time = setInterval(() => {
				this.times--;
				if (this.times <= 0) {
					clearInterval(time);
					this.times = 60;
					this.timeflag = true;
				}
			}, 1000);
		},
		goresetPwd() {
			this.checkTelphone(this.registerData.phonenumber);
			if (this.registerData.code == "") {
				this.codestate = 0;
				return;
			} else {
				this.codestate = "";
			}
			let forgetdata = {
				verifyId: this.verifyId,
				password: this.registerData.password1
			};
			const verifyData = {
				verifyId: this.verifyId,
				code: this.registerData.code
			};
			if (this.registerData.password1 == "") {
				this.passWordGo = 1;
				return;
			} else {
				this.passWordGo = '';
			}
			if (this.registerData.password1 != this.registerData.password2) {
				this.passWordGo = 2;
				return;
			} else {
				this.passWordGo = '';
			}
			api.user.verifycode(verifyData).then(res => {//校验验证码
				if (res.result == 'success') {
					api.user.resetPwd(forgetdata).then(res => {//
						console.log(res);
						if (res.result == 'success') {
							this.$notify({
								title: '成功', message: '重置成功', type: 'success'
							});
							location.reload();
						}
					})
				} else {
					this.codestate = 1;
				}
			})
		},
		getcode() {
			this.checkTelphone(this.registerData.phonenumber);
			if (this.phoneWarnText != "正确") {
				return;
			}
			if (this.phoneWarnText == "正确") {
				if (this.resetPwd == false) {
					api.user.checkPhone({ phone: this.registerData.phonenumber }).then(res => {
						console.log(res);
						if (res.isSigned == '1') {
							this.phoneWarnText = '该手机号已被注册';
						} else {
							if (this.timeflag == true) {
								this.showCountDown();
								api.user.getcode({ phone: this.registerData.phonenumber }).then(res => {
									console.log(res);
									this.verifyId = res.data.verifyId;
								})
							}
						}
					})
				} else {//忘记密码获取验证码
					api.user.getCodeforget({ username: this.registerData.phonenumber }).then(res => {
						console.log(res);
						if (res.isSigned == '0') {
							// this.$message.error('该手机号未被注册');
							this.phoneWarnText = '该手机号未被注册';
						} else {
							if (this.timeflag == true) {
								this.showCountDown();
							}
							this.verifyId = res.verifyId;
						}
					})
				}
			}
		},
		goregister() {
			this.checkTelphone(this.registerData.phonenumber);
			if (this.phoneWarnText != "正确") {
				return;
			}
			//判断验证码是否为空
			if (this.registerData.code == "") {
				this.codestate = 0;
				return;
			} else {
				this.codestate = '';
			}
			//判断密码是否为空
			if (this.registerData.password1 == "") {
				this.passWordGo = 1;
				return;
			} else {
				this.passWordGo = "";
			}
			//判断两次密码是否输入一致
			if (this.registerData.password1 != this.registerData.password2) {
				this.passWordGo = 2;
				return;
			} else {
				this.passWordGo = "";
			}
			const registerParam = {
				verifyId: this.verifyId,
				code: this.registerData.code,
				password: this.registerData.password1
			};
			console.log(registerParam);
			api.user.createuser(registerParam).then(res => {
				console.log(res)
				if (res.result == 'success') {
					this.$notify({
						title: '成功', message: '注册成功', type: 'success'
					});
					location.reload();
				} else if (res.msg == '验证码错误') {
					this.codestate = 1;
				}
			})
		}
	},
	mounted() {
		let autoLogin = JSON.parse(localStorage.getItem('autoLogin'));
		if (autoLogin) {
			//渲染上次登录账户
			this.loginData.username = autoLogin.loginUser;
			this.loginData.password = autoLogin.password;
			this.loginInfo.loginHandel = autoLogin.loginHandel;

			//获取当前时间
			var nowTime = new Date().getTime() / 1000;
			var intervalTime = nowTime - autoLogin.loginTime - 24 * 7 * 3600;
			//设置登录时间小于7天时，自动登录
			if (intervalTime < 0 && autoLogin.loginHandel == true && !autoLogin.loginOut) {
				this.goLogin();
			}
		}
	}
}

</script>

<style lang="scss" scoped>
.login {
	width: 400px;
	margin: 100px auto;
	background-color: #f6f6f6;
	padding: 50px 0;
	border-radius: 15px;
}

.login-pub {
	width: 400px;
	.login-tab {
		margin-left: 119px;
		margin-top: 10px;
		li {
			width: 80px;
			float: left;
			color: #fff;
			font-size: 30px;
			font-weight: bold;
			color: #ccc;
			cursor: pointer;
			text-align: center;
			height: 34px;
			line-height: 34px;
			&:nth-of-type(2) {
				width: 2px;
				height: 34px;
				background-color: #ccc;
			}
		}
		.active {
			color: blue;
		}
	}
	.resetPwd {
		width: 180px;
		height: 40px;
		line-height: 40px;
		font-size: 30px;
		color: blue;
		text-align: center;
		margin: 0 auto;
		margin-top: 10px;
	}
}

.login-wrap,
.register-wrap {
	width: 350px;
	margin: 0 auto;
	margin-top: 50px;
}

.login-wrap {
	.username,
	.password {
		height: 50px;
		span {
			display: inline-block;
			height: 50px;
			width: 60px;
			font-size: 14px;
			color: #000;
			line-height: 50px;
			text-align: justify;
		}
		input {
			height: 40px;
			width: 250px;
			font-size: 14px;
			padding: 0 10px;
		}
	}
	.loginHelp {
		width: 350px;
		margin: 0 auto;
		padding-top: 15px;
		height: 30px;
		.autologin {
			float: left;
			width: 150px;
			height: 30px;
			line-height: 30px;
			cursor: pointer;
			input {
				float: left;
				margin: 5px 5px;
				padding: 0;
				cursor: pointer;
				height: 20px;
				width: 20px;
			}
			label {
				display: inline-block;
				height: 30px;
				cursor: pointer;
				color: blue;
			}
		}
		.forget {
			float: right;
			color: green;
			cursor: pointer;
		}
	}
}

.imlogin,
.imregister,
.imsummit {
	display: block;
	height: 50px;
	line-height: 50px;
	width: 100%;
	border-radius: 10px;
	background-color: blue;
	color: #fff;
	font-size: 14px;
	text-align: center;
	cursor: pointer;
	margin-top: 20px;
	&:hover {
		color: #ccc;
	}
}

.register-wrap {
	.telphone,
	.first-password,
	.checkcode,
	.second-password {
		min-height: 50px;
		span {
			float: left;
			height: 50px;
			width: 60px;
			font-size: 14px;
			color: #000;
			line-height: 50px;
		}
		input {
			float: left;
			height: 40px;
			margin: 0;
			padding: 0;
			border: 1px solid #ccc;
			width: 250px;
			font-size: 14px;
			padding: 0 10px;
			margin-top: 4px;
		}
		.error {
			border-color: red;
		}
		i {
			clear: left;
			font-style: normal;
			display: block;
			height: 16px;
			line-height: 16px;
			color: red;
			font-size: 12px;
			margin-left: 60px;
		}
	}
	.checkcode {
		input {
			width: 50px;
		}
		.getcode {
			display: inline-block;
			height: 40px;
			line-height: 40px;
			width: 180px;
			text-align: center;
			background-color: blue;
			color: #fff;
			border-radius: 5px;
			float: right;
			margin-top: 5px;
			margin-right: 15px;
			cursor: pointer;
		}
		.disabled {
			background-color: #999;
			color: #333;
			cursor: not-allowed;
		}
	}
}
</style>