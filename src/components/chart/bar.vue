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
  import { Bar } from "../../common/Bar";

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
            value : 70
          },
          {
            name : "香蕉",
            value : 30
          },
          {
            name : "橘子",
            value : 20
          },
          {
            name : "葡萄",
            value : 40
          },
          {
            name : "芒果",
            value : 20
          }
        ]
      };
    },
    created() {
      this.type = this.$route.query.type;
    },
    mounted() {
      new Bar({
        el : this.$refs[ "svg" ],
        hasAnimatetion : true,
        ascending : false,
        descending : true,
        hasHoverEvent : true,
        data : this.dataList
      });
    }
  };
</script>

<style>
  .item_div {
    float: left;
    width: 50%;
  }


</style>
