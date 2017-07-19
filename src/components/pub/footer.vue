<template>
  <div class="footer">
  	<div class="m-footercontainer f-ma">
  		<dl class="m-section f-cb">
  			<dd class="item f-fl">
  				<ul class="f-cb">
  					<li class="list"><a href="javascript:void(0)">关于我们</a></li>
  					<li class="list"><a href="javascript:void(0)">入驻小镇</a></li>
  					<li class="list"><a href="javascript:void(0)">版权申明</a></li>
  					<li class="list"><a href="javascript:void(0)">法律条文</a></li>
  					<li class="list"><a href="javascript:void(0)">联系我们</a></li>
  				</ul>
  				<p class="info">Copyright©2015-2017 浙江菜根信息科技有限公司 , All Rights Reserved</p>
          <p class="info">©浙ICP备15008399号</p>
  			</dd>
  			<dd class="item f-fl">
          <p class="phonenumber"><a href="tel:0571-88889999">0571-88889999</a></p>
  				<p class="phonetext">客服热线</p>
  			</dd>
  			<dd class="item f-fl">
  				<i class="m-icon num"></i>
  				<p class="title">公众号</p>
  			</dd>
  			<dd class="item f-fl">
  				<i class="m-icon app"></i>
  				<p class="title">客户端</p>
  			</dd>
  			<dd class="item f-fl">
  				<i class="m-icon share"></i>
  				<p class="title">立即分享</p>
  			</dd>
  			<dd class="item f-fl">
  				<i class="m-icon tel"></i>
  				<p class="title">在线客服</p>
  			</dd>
  		</dl>
  	</div>
  	<div class="m-bottom">
  		<img src="../../images/bottomIcon.png" />
  		<span class="ddne">浙公网安备 33011002011732号</span>
  		<span>技术支持：浙江菜根信息科技有限公司</span>
  	</div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.footer{width:100%; height:357px; background:#303b4c;
		.m-footercontainer{position:relative; padding:82px 0; border-bottom:1px solid #454e5e;
			.m-section{ width:1200px; height:72px; margin:0 auto;
				.item{ height:72px; border-right:1px solid #454e5e;
          &:nth-of-type(1){margin-left:18px;}
					.list{float:left; margin-right:40px; height:24px; line-height:24px;
						a{font-size:14px; color:#d3dce6;}
					}
					.info{font-size:12px; color:#5d687b; height:20px; line-height:20px; margin:5px 32px 0 0;}
					.phonetext{font-size:14px; color:#d3dce6; padding-left:35px; height:24px; line-height:24px; margin-top:22px}
					.phonenumber{width:176px; height:26px; line-height:26px; text-align:center;;
						a{font-size:14px; color:#5d687b; }
					}
					.m-icon{display:block; background:url("../../images/footerIcon.png") no-repeat; width:25px; height:25px; margin-left:50px;
						&.num{background-position:0 0;}
						&.app{background-position:0 -31px;}
						&.share{background-position:0 -62px;}
						&.tel{background-position:0 -91px;}
					}
					.title{font-size:14px; color:#5d687b; line-height:22px; width:124px; text-align:center; margin-top:25px;}
				}
			}
		}
		.m-bottom{height:120px; line-height:120px; text-align:center; margin:0 auto;
			img{display:inline-block; vertical-align:middle; width:11px; height:12px;}
			span{display:inline-block; font-size:12px; color:#5d687b; height:12px; line-height:12px; padding:0 7px 0 3px;
				&.ddne{border-right:1px solid #5d687b;}
			}
		}
	}
</style>
