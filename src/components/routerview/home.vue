<template>
   <div class="home-wrap">
      <div class="flex-wrap">
        <div class="header">
          <activity-header></activity-header>
        </div>
        <div class="center">
          <transition>
            <router-view></router-view>
          </transition>
        </div>
        <div class="footer">
        <activity-footer></activity-footer>
        </div>
      <back-to></back-to>
    </div>
  </div>
</template>

<script>
  import ActivityHeader from '@/components/pub/header.vue'
  import ActivityFooter from '@/components/pub/footer.vue'
  import BackTo from '@/components/pub/backtop.vue'
  export default {
    components: {
      'activity-header': ActivityHeader,
      'activity-footer': ActivityFooter,
      'back-to':BackTo
    },
    data(){
      return{
        routerpath: '',
      }
    },
  }
</script>

<style scoped lang="scss">
.home-wrap{width:100%;max-width:1920px;margin:0 auto;min-width: 1320px;overflow: hidden;
.flex-wrap{margin:0 auto;min-width: 1320px;}
}
</style>