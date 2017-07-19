<template>
  <div class="center">
    <div class="left-nav">
      <img class="logo" src="http://huicye.image.alimmdn.com/FED/huicye-webadvance/hcylogo.png" @click="goindex"/>
      <el-row v-for="(nav, index) in $router.options.routes" v-if='!nav.hidden && $route.matched.length && $route.matched[0].path===nav.path' :key="index">
        <el-col :span="24">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="(item, index) in nav.children" v-if="!item.hidden">
              <el-submenu :index="item.path" v-if="!item.leaf">
                <template slot="title">
                  <i :class="'el-icon-'+item.icon"></i>{{item.name}}
                </template>
                <template></template>
                <el-menu-item :index='nav.path + "/"+item.path+"/"+child.path' v-for='(child, index) in item.children' v-if="!child.hidden" :key="index">+{{child.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf" :index='nav.path + "/"+item.path+"/"+item.children[1].path'>
                <i :class="'el-icon-'+item.icon"></i>{{item.name}}
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="right-content">
      <div class="m-head f-fb">
        <div class="s-search f-fl">
          <input class="s-ipt" type="text" placeholder="请输入搜索的关键词" />
          <a href="javascript:void(0)" class="s-icon f-db"></a>
        </div>
        <ul class="s-option f-fr f-db">
          <li>
            <a class="item f-db" href="javascript:void(0)" @click="backHome">
              <i class="icon icon4"></i>客服
            </a>
          </li>
          <li>
            <a class="item f-db" href="javascript:void(0)">
              <i class="icon icon2"></i>消息
            </a>
          </li>
          <li>
            <a class="item f-db" href="javascript:void(0)">
              <i class="icon icon1"></i>官网
            </a>
          </li>
          <li>
            <a class="item f-db" href="javascript:void(0)">
              <img src="userPic" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="m-content">
        <transition>
          <router-view></router-view>
        </transition>
        <div class="footer">
          <p class="info">Copyright©2015-2017 浙江菜根信息科技有限公司 , All Rights Reserved  ©浙ICP备15008399号</p>
        </div>
      </div>
    </div>
    <back-to></back-to>
  </div>
</template>

<script>
  import BackTo from '../pub/backtop.vue'
  import $ from 'jquery'
  export default{
    components: {
      'back-to': BackTo,
    },
    data(){
      return{
        avatar: '',
        name: ''
      }
    },
    methods:{
      checkRouter(path){
        this.$router.push({path: path});
      },
      goindex(){
        location.pathname = 'activity';
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出登录吗?', '提示', {
        }).then(() => {
          localStorage.removeItem('huicyeuser');
          let autoLogin = JSON.parse(localStorage.getItem('autoLogin'));
          autoLogin.loginOut = true;
          localStorage.setItem('autoLogin',JSON.stringify(autoLogin));
          _this.$router.push('/login');
        })
      },
      backHome(){
        this.$router.push({path: '/activity'});
      },
      initCss(){
      }
    },
    mounted() {
      this.initCss();
      $('.center').css('min-height',$(window).height());
      $('.m-content>.content').css('min-height',($(window).height()-238));
      let dreamuser = localStorage.getItem('dreamuser');
      /*if(JSON.parse(dreamuser).profile.avatar){
        this.avatar = JSON.parse(dreamuser).profile.avatar;
      }else{*/
        this.avatar = 'http://121.196.233.212:3001/images/user_avatar-default2.png';
      //}
      //this.name = JSON.parse(dreamuser).name;
    }
  }
</script>

<style scoped lang='scss'>
  .center{width:100%;background:#f3f7f9;display:flex;height:100%;
    .left-nav{width:220px; min-height:800px;  background:#1f2d3d;
      .logo{display:block;margin:60px auto;cursor:pointer;}
      .el-menu-vertical-demo{background:none;}    
    }
    .right-content{width:100%;
      .m-head{background:#fff; height:81px; width:100%;
        .s-search{position:relative; margin-top:22px; margin-left:8.3%; background:none; width:294px; height:36px; border-radius:4px;
          .s-ipt{margin-left:26px; width:274px; height:36px;line-height:36px; border:none; background:#fff; padding:0 10px; font-size:14px; color:#666;}
          .s-icon{position:absolute; top:10px; left:12px; background:url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/search.png') left center no-repeat; width:16px; height:16px;}
        }
        .s-option{margin-top:30px; margin-right:100px;
          li{float:left;
            .item{font-size:14px; color:#99a9be; padding-left:38px;
              .icon{display:block; float:left; background:url('images/centerIcon.png') no-repeat; width:16px; height:16px; margin-right:8px;
                &.icon1{background-position:0 -19px;}
                &.icon2{background-position:0 -40px;}
                &.icon3{background-position:0 -60px;}
                &.icon4{background:url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/kefu.png') left center no-repeat;}
              }
              .userPic{width:32px;height: 32px;border-radius: 50%;}
            }
          }
        }
      }
      .m-content{position:relative; background:#f3f7f9; min-height:600px; box-shadow:0 0 12px rgba(0, 0, 0, 0.05) inset;
        .footer{padding:35px 0 60px 0;
          .info{width:100%; height:22px;line-height:22px;text-align:center; font-size:12px; color:#b2bfd0;}
        }
        .content{padding-top:40px;}
      }
    }
  }
</style>