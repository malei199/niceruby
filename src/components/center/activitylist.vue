<template>
  <div class="activitylist">
    <p class="m-title f-cb">
     <!--  <span class="line f-db f-fl"></span> -->
      <!-- <span class="name f-db f-fl">我的发布</span> -->
    </p>
  	<router-view></router-view>
  </div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
  .dialog-wrap{width:100%;height:100%;position:fixed;left:0;top:0;bottom:0;right:0;
    background:rgba(0,0,0,0.4);overflow:hidden;}
	.activitylist{width:1000px; margin:0 auto;
    .m-title{height:16px;height:0px;
      .line{width:5px; height:16px; border-radius:5px; background:#5771e6; margin-right:9px;}
      .name{font-size:16px; color:#3b4857; font-weight:bold; line-height:16px;}
    }
  }
</style>