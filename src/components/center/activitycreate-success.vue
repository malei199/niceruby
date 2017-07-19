<template>
  <div class="activitycreate">
  	<div class="g-section">
  		<p class="m-title f-cb">
  			<span class="line f-db f-fl"></span>
  			<span class="name f-db f-fl">发布活动</span>
  		</p>
  		<div class="m-detailwrap">
  			<div class="m-success">
  				<img class="m-img" src="../../images/createSuccess.png"/>
	  			<p class="m-name">发布成功！</p>
	  			<p class="m-tip">活动经审核后，方可进行报名；</p>
					<p class="m-tip">如非私密活动，经审核后活动将在【梦想小镇】官网和APP展示！</p>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
  export default {
    name: 'activitypublish',
    data() {
			return {
				form: {
					title: '',
				}
			}
		},
		methods: {
		
		},
		mounted() {
		}
  }
</script>

<style lang="scss" scoped>
	.activitycreate{
		.g-section{width:1000px; margin:0 auto; padding:25px 0;
			.m-title{height:16px;
				.line{width:5px; height:16px; border-radius:5px; background:#5771e6; margin-right:9px;}
				.name{font-size:16px; color:#3b4857; font-weight:bold; line-height:16px;}
			}
			.m-detailwrap{margin-top:30px; border:1px solid #e3e9ee; box-shadow:0 0 12px rgba(0, 0, 0, 0.05); border-radius:6px; background:#fff;
				.m-success{padding:122px 0; margin:0 auto; text-align:center;
					.m-img{display:block; width:169px; height:156px; margin:0 auto;}
					.m-name{font-size:30px; color:#3b4857; font-weight:bold; line-height:60px; margin-top:20px; margin-bottom:10px; }
					.m-tip{font-size:14px; color:#8895ab; line-height:28px;}
				}
			}
		}
	}
</style>