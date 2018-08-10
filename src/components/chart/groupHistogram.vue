<template>
  <div class="item">
    <div class="item_div">
      <p style="color:rgb(30, 163, 193);font-size:36px">{{type}}Chart</p>
      <svg ref='svg' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           :width="width" :height="height"></svg>
    </div>
    <div class="item_div">
    </div>
  </div>
</template>
<script>
  import { GroupHistogram } from "../../common/groupHistogram";

  export default {
    name : "item",
    data() {
      return {
        width : 500,
        height : 500,
        type : null,
        dataList : [
          {
            name : "苹果",
            children : [
              {
                origin : "山西",
                value : 120
              },
              {
                origin : "陕西",
                value : 133
              }
            ]
          },
          {
            name : "香蕉",
            children : [
              {
                origin : "山西",
                value : 90
              },
              {
                origin : "陕西",
                value : 133
              }
            ]
          },
          {
            name : "橘子",
            children : [
              {
                origin : "山西",
                value : 99
              },
              {
                origin : "陕西",
                value : 233
              }
            ]
          },
          {
            name : "葡萄",
            children : [
              {
                origin : "山西",
                value : 77
              },
              {
                origin : "陕西",
                value : 323
              }
            ]
          },
          {
            name : "芒果",
            children : [
              {
                origin : "山西",
                value : 69
              },
              {
                origin : "陕西",
                value : 133
              }
            ]
          }
        ]
      };
    },
    created() {
      this.type = this.$route.query.type;
    },
    mounted() {
      new GroupHistogram({
        el : this.$refs[ "svg" ],
        hasAnimatetion : true,
        ascending : false,
        descending : true,
        hasHoverEvent : true,
        data : this.dataList
      });
    },
    watch : {
      text : {
        handler(val) {
        },
        deep : true
      }
    }
  };
</script>

<style scoped>
  .item_div {
    float: left;
    width: 50%;
  }
</style>
