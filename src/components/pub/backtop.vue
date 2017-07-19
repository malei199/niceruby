<template>
  <div class="contact-wrap"  id="a" :style="{right:marginL+'px'}">
    <div class="item back-top" @click="backTop" v-if="contactShow"><img src="./images/backto-icon.png"></div>
    <div class="item call" @click="openInfo">
      <img src="./images/call-icon.png">
      <div id="unreadNum" v-show="$store.state.unreadNum!=''">{{$store.state.unreadNum}}</div>
    </div>
    
    <div class="item follow-us" @click="showDownload($event)">
      <img src="./images/code-icon.png">
      <div class="download-content" v-if="isshowDown">
        <p class="title">梦想小镇APP下载</p>
        <p class="phone-text">iPhone / android / iPad</p>
        <img src="./images/code-icon.jpg">
      </div>
    </div> 
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
  	data() {
  	  return {
        scrolled: false,
        contactShow:false,
        backTopWidth:'',
        marginL:"",
        unreadNum:"",
        isshowDown:false,
  	  }
  	},
    methods:{
      backTop() {
        let height = document.body.scrollTop || document.documentElement.scrollTop;
        let time = setInterval(() => {
          height -= 100;
          height < 100 ? height = 0 : height;
          if(document.documentElement.scrollTop){
            document.documentElement.scrollTop = height;
          }else{
            document.body.scrollTop = height;
          }
          if(height<=0){
            clearInterval(time);
          }
        }, 20)
      },
      showDownload() {
          this.isshowDown = this.isshowDown==true?false:true;
      },
      handleScroll () {
        this.scrolled = window.scrollY > 0;
        if(window.scrollY >= 400){
          this.contactShow = true;
        }else{
          this.contactShow = false;
        }
      },
      openInfo () {
        _MEIQIA('showPanel');
      },
      talkload () {
        var self = this;
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(huicyeuser){
          (function(m, ei, q, i, a, j, s) {
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
            };
            j = ei.createElement(q),
                s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = '//static.meiqia.com/dist/meiqia.js?_=t';
            s.parentNode.insertBefore(j, s);
          })(window, document, 'script', '_MEIQIA');
          _MEIQIA('entId', '31189');
          _MEIQIA('withoutBtn');
          var clientId = JSON.parse(localStorage.getItem('huicyeuser')).id;
          _MEIQIA('clientId', clientId);
          _MEIQIA('getUnreadMsg', self.yourFunction);
        }else{
          (function(m, ei, q, i, a, j, s) {
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
            };
            j = ei.createElement(q),
                s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = '//static.meiqia.com/dist/meiqia.js?_=t';
            s.parentNode.insertBefore(j, s);
          })(window, document, 'script', '_MEIQIA');
          _MEIQIA('entId', '31189');
          _MEIQIA('withoutBtn');
          var clientId = (new Date()).getTime();
          _MEIQIA('clientId', clientId);
          _MEIQIA('getUnreadMsg', self.yourFunction);
        }
      },
      yourFunction(msg) {
        var text = '',
            num = 0;
        if (msg === 'hasBeenRead') { // 消息已被阅读
            num = 0;
        } else if (typeof(msg) === 'object') {
            var unreadNum = document.getElementById('unreadNum').innerHTML,
                lastMsg = msg[msg.length - 1];
            num = isNaN(+unreadNum) ? msg.length : +unreadNum + msg.length;
            // content_type 是消息的类型：
            // text（文字）、photo（图片）、file（文件）
            // content 是消息的内容
            if (lastMsg.content_type === 'text') {
                // 文字消息中可能会存在表情图片，由于路径问题
                // 将文字消息中的图片处理为文字'[表情]'
                text = lastMsg.content.replace(
                    /<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '[表情]'
                );
            } else if (lastMsg.content_type === 'photo') {
                text = '[图片]';
            } else if (lastMsg.content_type === 'file') {
                text = '[文件]';
            } else {
                text = '[新消息]';
            }
        }
        // 未读消息数量
        this.$store.dispatch('getTalkNum', num);
    }
    },
    mounted() {
      const self = this;
      window.addEventListener('scroll', this.handleScroll);
      let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
      this.backTopWidth = (screenWidth-1200)/2;
      this.marginL = (this.backTopWidth-60)/2;
      this.talkload();
      $(document).click(function(event){
         // 设置目标区域
         var _con = $('.follow-us');   // 设置目标区域
      if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
                self.isshowDown = false
        }    
      });
    }
    
  }
</script>

<style lang="scss" scoped>
  .contact-wrap{ position:fixed; width:50px; height:156px; bottom:10px; right:0; z-index:100;
  	.item{ margin-bottom:15px; color:#aab5c1; font-size:12px; text-align:center;
      &.back-top{ position:absolute; top:0;  cursor:pointer; width:50px; height:50px;
      }
      &.call{ position:absolute; top:52px;  cursor:pointer; width:50px; height:50px; 
        border-right:0;
      }
      &.follow-us{ position:absolute; top:104px; position:relative; cursor:pointer; width:50px; height:50px;  
      }
    }
    .download-content{font-size:14px;border:1px solid #eee;position:absolute;z-index:1000;background:#fff;padding:15px;width:160px;text-align:center;left:-199px;top:-196px;box-shadow:0 4px 8px 0 rgba(7,17,27,.5);
            .title{font-weight:bold;color:#000;margin-top:10px;}
            .phone-text{color:#666;margin:7px 0;}
            img{width:130px;height:130px;}
          }
    #unreadNum{color:#fff;position: absolute;top:0;left:0;background-color:red;padding:1px 3px;font-size: 12px;border-radius:3px;}
  }
</style>
