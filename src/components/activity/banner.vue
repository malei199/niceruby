<template>
  <div class="homebanner">
  	<div class="lefthide" :style="{width:bannerleftWidth+'px'}"></div>
  	<div class="righthide" :style="{width:bannerleftWidth+'px'}"></div>
    <swiper :options="swiperOption" >
      <swiper-slide  v-for="(item, index) in bannerData" class="swiperlist" :key="index" >
        <div class="f-cb slidelist" @click="swiperDetail(item.id)"  @mouseenter="hoverBtn(index)">
          <img src="./images/banner-prepare.png" class="banner-icon" v-if="item.state=='3'"/> 
          <img src="./images/banner-enroll.png" class="banner-icon" v-if="item.state=='4'"/>
          <img src="./images/banner-preheat.png" class="banner-icon" v-if="item.state=='5'"/>
          <img src="./images/banner-going.png" class="banner-icon" v-if="item.state=='6'"/>
          <img src="./images/banner-end.png" class="banner-icon" v-if="item.state=='7'"/> 
          <img  :src="item.cover" class="bannerImg"/>
          <div  class="swiper-slide-right">
            <p class="title">{{item.title}}</p>
            <p class="time">{{item.startOfActivity}}</p>
            <p class="address">{{item.location}}</p>
            <p class="line"></p>
            <div class="proccess-wrap">
              <div class="process-line">
                <div class="proccess-content" :style="{width:item.proccessContentLength}"></div>
              </div>
              <div class="text"><span>{{item.enrollCount}}人</span>已报名</div>
           </div>
           <div class="enrollBtn" :class="{hui:item.state!='4'}">立即报名</div>
         </div>
       </div>
     </swiper-slide>
    </swiper>
    <div class="swiper-pagination-me paginations" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
  import activityApi from '@/js/api.js';
  import functionApi from '@/js/function.js';
  export default{
    data(){
      return{
        routerpath: '',
        bannerData: [],
        bannerleftWidth:'',
        swiperOption: {
          pagination: '.swiper-pagination-me',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 2,
          slidesPerGroup:2,
          speed:1800,
          autoplayDisableOnInteraction: false,
          paginationClickable: true,
          loop: true,
          initialSlide: 2,
          spaceBetween: 22,
          simulateTouch: false,
          preventClicks: false,
          slideactived:0,
          
        }
      }
    },
    methods:{
      swiperDetail(id) {
        this.$router.push({path: '/activitydetail/' + id});
      },
      hoverBtn(index) {
      	this.slideactived = index;
      	
      }
    },
    mounted() {
    	let screenWidth = document.body.clientWidth;
       this.bannerleftWidth = (screenWidth-1200)/2;
       activityApi.activity.postCarouselList().then(res => {
        this.bannerData = res.data.data.carouselList;
        console.log(this.bannerData);
        for(let i = 0; i<this.bannerData.length; i++){
          this.bannerData[i].startOfActivity = functionApi.moment.getListTime(this.bannerData[i].startOfActivity);
          if(this.bannerData[i].enrollCheck == "0"){
              this.bannerData[i].enrollHui = true
          }else if(this.bannerData[i].enrollCheck == "1"){
            if(this.bannerData[i].state == '4' || this.bannerData[i].state == '5' || this.bannerData[i].state == '6' ){
              this.enrollText = '查看电子票';
            }
          }
          this.bannerData[i].location = this.bannerData[i].location.province + '·' + this.bannerData[i].location.city + '·' + this.bannerData[i].location.area;
          this.bannerData[i].proccessContentLength = (this.bannerData[i].enrollCount/this.bannerData[i].numberOfExpected)*100+'%';
        }  
      })
    }
  }
</script>

<style lang="scss">
.homebanner .swiper-container .swiper-slide .bannerImg{object-fit: cover;padding:0}
	.homebanner{background:url('images/banner-bg.png') no-repeat; width:100%; height:533px; background-size:cover; position:relative;
	.lefthide{position:absolute;width:138px;height:353px;top:65px;background:rgba(0,0,0,0.74);left:0;z-index:4}
	.righthide{position:absolute;width:138px;height:353px;top:65px;background:rgba(0,0,0,0.74);right:0;z-index:4}
    .swiper-container{width:1201px; padding-top:65px;overflow:visible;
      .swiper-slide{cursor:pointer;width:580px!important; height:343px; display:flex;  position:relative; background:transparent url(images/bannerlist-bg.png) no-repeat center;background-size:614px 360px; border:5px solid #c0ccda;
      	&:hover{border-color:#ff6a56;}
        .bannerImg{width:246px;height:343px; dislay:block;float:left;}
        .banner-icon{position:absolute; left:6px; top:6px;z-index:300}
        .swiper-slide-right{float:left; width:230px;margin-top:45px;margin-left:37px;
			.line{width:100%;height:1px;border-top:1px solid #e3e9ee;margin:15px 0;}
        }
        .title{width:100%; line-height:36px;height:72px;font-size:22px;color:#1f2d3d;font-weight:bold;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;}
        .time{width:183px;height:26px;background:url(images/time-icon.png) no-repeat left 3px;margin-top:28px;font-size:12px;color:#8895ab;padding-left:13px;}
        .address{width:183px;height:26px;background:url(images/address-icon.png) no-repeat left 3px;font-size:12px;color:#8895ab;padding-left:13px;white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;}
        .proccess-wrap{display:flex;
          .process-line{width:114px;border-radius:4px;height:8px;background:#d3dce6;overflow:hidden;margin-top:6px;}
          .proccess-content{background:#ff6a56;display:block;height:100%;}
          .text{color:#6d7787;font-size:12px;margin-left:5px;
            span{font-size:14px;color:#ff6a56;}
          }
        }
        .enrollBtn{border:0;background:#ff6a56 url(./images/button-icon.png) no-repeat 45px center;width:190px;height:40px;color:#fff;font-size:14px;border-radius:5px;margin-top:26px;text-align:center;line-height:40px;
          &.hui{background:#ccc url(images/button-icon.png) no-repeat 45px center;}
        }
      }
    }
    .swiper-button-prev{position:absolute; left:0; width:60px; height:60px; background:url(images/banner-pre-bg.png) no-repeat center;z-index:4;
      &:hover{background:url(images/banner-pre-active.png) no-repeat;}
    }
    .swiper-button-next{position:absolute; right:0; width:60px; height:60px; background:url(images/banner-next-icon.png) no-repeat center;z-index:4;
      &:hover{background:url(images/banner-next-icon-active.png) no-repeat;}
    }
    .swiper-pagination-me{position:absolute; left:45%; z-index:100; width:220px; margin-top:35px;
      .swiper-pagination-bullet{width:33px; display:block; height: 4px; margin-right:19px; border-radius:3px; display: inline-block; background: #d0e1e8;}
      .swiper-pagination-bullet-active{background:#c51e60; opacity:1;}
    }
  }
</style>