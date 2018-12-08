<template >
  <div class="table-head">
    <section class="table-body-h3" :style='initStyle' @click="headClick(titleH3,$event)">
      {{titleH3}}
    </section>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      tStyle: {
        type: Object,
        default() {
          return {
            bgColor: "",
            mTop: 0
          };
        }
      },
      tEmit: {
        type: Boolean,
        default: false
      },
      tAutoStyle: {
        type: Object,
        default() {
          return {
            "background-color": "",
            "margin-top": 0
          };
        }
      },
      titleH3: ""
    },
    data() {
      return {
        initStyle: {}
      };
    },
    watch: {
      tEmit: function() {
        this.autoStyleInit();
      },
      "tStyle.bgColor": function() {
        this.autoStyleInit();
      }
    },
    computed: {},
    methods: {
      headClick(con, jsEvent) {
        this.$emit("headclick", con, jsEvent);
      },
      init() {
        this.autoStyleInit();
      },
      //所有的样式初始化,这里反复调用用的同方法，后续需分开
      autoStyleInit() {
        this.tAutoStyle["background-color"] = this.tStyle.bgColor;
        this.tAutoStyle["margin-top"] = this.tStyle.mTop + "px";
        //在直接引用tAutoStyle在:style中，会出现created中变化，dom不变化问题，所以再次赋值给预留的initStyle;
        this.initStyle = this.tAutoStyle;
      }
    },
    mounted() {
      // this.init();
    }
  };
</script>
<style lang="scss">
  .table-head {
    .table-body-h3 {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      border: 1px solid #c0ccda;
      padding-left: 15px;
      color: #3b4857;
      font-size: 16px;
    }
  }
</style>