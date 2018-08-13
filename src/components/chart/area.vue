<template>
  <div class="item">
    <div class="item_div">
      <p style="color:rgb(30, 163, 193);font-size:36px">{{type}}Chart
        <br>
        <button @click="btnClick">当前折线类型:{{areaType}}</button>
      </p>
      <svg ref='svg' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           :width="width" :height="height"></svg>
    </div>
    <div class="item_div">
      <div>The code for you.</div>
      <textarea cols="99" rows="59">
      </textarea>
    </div>
  </div>
</template>
<script>
  import { Area } from "../../common/area";

  export default {
    name : "lineChart",
    data() {
      return {
        width : 500,
        height : 500,
        type : null,
        areaType : "Curve",
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
      this.svg = new Area({
        el : this.$refs[ "svg" ],
        hasAnimatetion : true,
        ascending : false,
        descending : true,
        data : this.dataList,
        lineThickness : 2,
        areaType : this.areaType
      });
    },
    methods : {
      btnClick() {
        this.svg = null;
        if (this.areaType === "curve") {
          this.areaType = "Broken line";
        } else {
          this.areaType = "curve";
        }
        this.svg = new Area({
          el : this.$refs[ "svg" ],
          hasAnimatetion : true,
          ascending : false,
          descending : true,
          data : this.dataList,
          lineThickness : 2,
          areaType : this.areaType
        });
      }
    }
  };
</script>

<style>
  .item_div {
    float: left;
    width: 50%;
  }


</style>
