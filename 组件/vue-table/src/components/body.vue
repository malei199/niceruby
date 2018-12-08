<template >
  <div class="table-body">
    <section class="table-body-table" :style='tBodyAutoStyle'>
      <div class="table-body-td">
        <ul>
          <li v-for="(t_tr,index) in tableData" :key="index" class="table-li-td" @click="trClick(t_tr,$event)" :class="{warp:t_tr.warp == true,nowarp:t_tr.warp == false,t_center:t_tr.align != 'left',t_left: t_tr.align == 'left',line:t_tr.line == true,noLine:t_tr.line == false}">
            <div v-for="(t_td,index_td) in t_tr.data" class="table-dd" :key="index_td" :style="autoStyle[index][index_td].t_style">
              <span v-if='t_tr.align == "left"' class="table-dd-label">{{t_td.label}}</span>
              <span :style="autoStyle[index][index_td].em_style" class="table-dd-con" @click="tdClick(t_td.list,$event)">{{t_td.list.toString()}}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      tBodyAutoStyle: {},
      tEmit: {
        type: Boolean,
        default: false
      },
      tWidth: {
        type: Number
      },
      tFillData: {
        type: Object,
        default() {
          return {};
        }
      },
      tTableData: {
        type: Array,
        default: [
          // emit: false,
          // data: [
          // {
          //   item: 0,
          //   align: "left",
          //   warp: false,
          //   style: {},
          //   data: [
          //     {
          //       width: "auto",
          //       t_style: {}
          //     }
          //   ]
          // }
        ]
      }
    },
    data() {
      return {
        tableData: [{ data: [{ width: "auto", list: "" }] }],
        autoStyle: [[{ t_style: "", em_style: "" }]],
        tolWidth: 0,
        fillData: {}
      };
    },
    watch: {
      tEmit: function() {
        this.init();
      }
    },
    computed: {},
    methods: {
      tdClick(con, jsEvent) {
        this.$emit("tdclick", con, jsEvent);
      },
      trClick(con, jsEvent) {
        this.$emit("trclick", con, jsEvent);
      },
      init() {
        this.autoStyleInit();
        this.calcStyle();
      },
      autoStyleInit() {},
      //计算每一行中每个元素的宽度
      calcTable(item) {
        //获取自定义内容个数,此功能搁置
        let itemLeg = item.data.length;
        //预留有设置宽度数量，设置宽度总值，重新计算总宽度可用范围
        let hasWidth = 0;
        let hasWidthNum = 0;
        let actWidth = this.tolWidth - itemLeg - 1;
        //循环取出设置宽度总值
        for (let i = 0; i < itemLeg; i++) {
          if (item.data[i].width != "auto") {
            hasWidth += 1;
            hasWidthNum = hasWidthNum + parseInt(item.data[i].width);
          }
        }
        hasWidth = itemLeg - hasWidth;
        //分配未设置宽度宽度
        for (let i = 0; i < itemLeg; i++) {
          if (item.data[i].width == "auto") {
            item.data[i].width = parseInt(actWidth / hasWidth);
          }
        }
      },
      //检查预留数据
      checkData(item, data) {
        if (!item.item) {
          item.item = 0;
        }
        if (!item.align) {
          item.align = "left";
        }
        if (!item.warp) {
          item.warp = false;
        }
        if (!item.line) {
          item.line = true;
        }
        if (!item.data) {
          item.data = [];
        }
        for (let i = 0; i < item.data.length; i++) {
          if (!item.data[i].style) {
            item.data[i].style = {};
          }
          if (!item.data[i].width) {
            item.data[i].width = "auto";
          }
          if (data.length > 0) {
            if (
              this.fillData.data[data[i].field] == null ||
              this.fillData.data[data[i].field] == undefined
            ) {
              this.fillData.data[data[i].field] = "";
            }
            item.data[i].list = this.fillData.data[data[i].field];
          }
        }
      },
      //循环所有数据
      calcStyle() {
        this.tableData = this.tTableData;
        this.fillData = this.tFillData;
        this.tolWidth = this.tWidth;
        console.log(this.fillData);
        for (let i = 0; i < this.tableData.length; i++) {
          this.checkData(this.tableData[i], this.fillData.Template[i]);
          this.calcTable(this.tableData[i]);
          this.autoStyle.push(this.calcTdStyle(this.tableData[i]));
        }
      },
      //计算td样式
      calcTdStyle(item) {
        let item_style = [];
        for (let ii = 0; ii < item.data.length; ii++) {
          let t_style = item.data[ii].width.toString();
          let em_style = item.data[ii].style;
          if (t_style != "auto" && t_style.indexOf("%") == -1) {
            t_style = { width: t_style + "px" };
          } else if (t_style != "auto" && t_style.indexOf("%") != -1) {
            t_style = { width: t_style };
          }
          //拼接样式内容，t_style为每行样式，em_style为list内容样式
          t_style = {
            t_style: t_style,
            em_style: em_style
          };
          item_style.push(t_style);
        }
        return item_style;
      }
    },
    mounted() {
      this.autoStyle = [];
      this.init();
    }
  };
</script>
<style lang="scss">
  .table-body {
    .table-body-table {
      .table-li-td {
        overflow: hidden;
        border-left: 1px solid #c0ccda;
        border-right: 1px solid #c0ccda;
        border-bottom: 1px solid #c0ccda;
      }
      .table-dd {
        float: left;
        &.nowarp {
          height: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.warp {
          white-space: wrap;
        }
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .nowarp {
        .table-dd {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .table-dd-label {
          height: 36px;
          line-height: 36px;
          color: #324057;
          font-size: 13px;
          width: 116px;
          text-align: right;
        }
        .table-dd-con {
          height: 36px;
          line-height: 36px;
          font-size: 13px;
          color: #8492a6;
          margin-left: 50px;
        }
      }
      .warp {
      }
      .t_center {
        .table-dd {
          text-align: center;
        }
        .table-dd-con {
          margin-left: 0;
        }
      }
      .t_left {
        .table-dd {
          text-align: left;
        }
      }
      .line {
        .table-dd {
          border-right: 1px solid #c0ccda;
          &:last-child {
            border-right: none;
          }
        }
      }
      .noLine {
        .table-dd {
          border-right: none;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
</style>