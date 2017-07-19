<template>
  <div class="news">
    <div class="con-b">
      <news-banner></news-banner>
    </div>
    <div class="content">
      <news-list></news-list>
      <news-right></news-right>
    </div>
  </div>
</template>

<script>
import NewsBanner from "./banner.vue"
import NewsList from "./list.vue"
import NewsRight from "./right.vue"
import activityApi from '@/js/api.js'
import functionApi from '@/js/function.js'
export default {
  components: {
    'news-banner': NewsBanner,
    'news-list': NewsList,
    'news-right': NewsRight
  },
  data() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
.news {
  background: #f3f6f9;
  width: 100%; // margin: 0 auto;
  overflow: hidden;
  .con-b {
    background: #fff;
  }
  .content {
    width: 1192px;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>