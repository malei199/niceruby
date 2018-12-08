<template>
  <div class="comp-full-table">
    <ft-head :tStyle='init_body.header.style' :tEmit='init_body.header.emit' :tAutoStyle='init_body.header.autoStyle' :titleH3='init_body.header.titleH3' @headclick='emitHeadClick' v-if="init_body.header.showHead == true"></ft-head>
    <ft-body :tBodyAutoStyle='tBodyStyle' :tTableData='init_body.data' :tEmit='init_body.emit' :tWidth='init_body.width' @tdclick="emitTdClick" @trclick="emitTrClick" :tFillData="init_body.fillData"></ft-body>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      tStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      tAutoStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      tBodyStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      tInit: {
        type: Object,
        default() {
          return {
            header: {},
            data: [],
            emit: false
          };
        }
      }
    },
    data() {
      return {
        init_body: {
          header: {
            showHead: true,
            titleH3: "",
            autoStyle: {},
            style: {},
            emit: false
          },
          data: [],
          emit: false
        }
      };
    },
    methods: {
      emitTdClick(con, jsEvent) {
        this.$emit("tdClick", con, jsEvent);
      },
      emitTrClick(con, jsEvent) {
        this.$emit("trClick", con, jsEvent);
      },
      emitHeadClick(con, jsEvent) {
        this.$emit("headClick", con, jsEvent);
      },
      init_f() {
        this.init_body.header.showHead =
          this.tInit.header.showHead == undefined
            ? this.init_body.header.showHead
            : this.tInit.header.showHead;
        this.init_body.data = this.tInit.data;
        this.init_body.emit = this.tInit.emit;
        this.init_body.header.titleH3 = this.tInit.header.titleH3;
        this.init_body.width = this.tInit.width;
        this.init_body.header.autoStyle = this.tInit.header.tAutoStyle;
        this.init_body.header.style = this.tInit.header.tStyle;
        this.init_body.header.emit = this.tInit.header.emit;
        this.init_body.fillData = this.tInit.fillData;
      }
    },
    components: {
      "ft-head": require("./components/header"),
      "ft-body": require("./components/body")
    },
    watch: {
      "tInit.header.emit": function() {
        this.init_f();
      },
      "tInit.data": function() {
        this.init_f();
      }
    },
    computed: {},
    mounted() {
      this.init_f();
    }
  };
</script>
<style lang="scss">
  .comp-full-table {
    width: 1050px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    border-radius: 3px;
  }
</style>