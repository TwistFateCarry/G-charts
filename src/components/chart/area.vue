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

        import * as d3 from "d3";
        import { $ } from "./extend";

        class Area {
          constructor(option) {
            let o = {
              el : document.body,
              width : 500,
              height : 500,
              data : [
                {
                  name : "苹果",
                  value : 40
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
              ],
              margin : {
                top : 20,
                left : 40,
                right : 20,
                bottom : 20
              },
              hasXAxis : {
                show : true,
                ticks : 6
              },
              hasYAxis : {
                show : true,
                ticks : 6
              },
              MAXTOP : 30,
              hasAnimatetion : true,
              color : "steelblue",
              gradient : {
                from : "#000",
                to : "#fff"
              },
              areaType : "Curve"
            };

            $.extend(true, o, option);
            $.extend(true, this, o);
            this.init();

          }

          init() {
            this.svg = d3.select(this.el);
            this.svg.html("");
            this.group = this.svg.append("g")
              .attr("transform", `translate(${this.margin.left},${
                this.margin.top
                })`);
            this.processData();
            this.addXAxis();
            this.addYAxis();
            this.addArea();
          }

          processData() {
            if (this.ascending) {
              this.data.sort((a, b) => a.value - b.value);
              return;
            }
            if (this.descending) {
              this.data.sort((a, b) => b.value - a.value);
            }
          }

          addXAxis() {
            //x轴比例尺
            this.xScale = d3
              .scaleBand()
              .rangeRound([ 0, this.width - this.margin.left - this.margin.right ])
              .paddingInner(1)
              .domain(this.data.map(d => d.name));
            if (!this.hasXAxis.show) return;
            this.xAxis = this.group
              .append("g")
              .attr(
                "transform",
                "translate(0," + ( this.height - this.margin.top - this.margin.bottom ) + ")"
              )
              .call(d3.axisBottom(this.xScale));
          }

          addYAxis() {
            this.yScale = d3
              .scaleLinear()
              .rangeRound([ this.height - this.margin.bottom - this.margin.top, this.margin.top ])
              .domain([ 0, d3.max(this.data.map(d => d.value + 30)) ]);

            if (!this.hasYAxis.show) return;
            this.yAxis = this.group
              .append("g")
              .call(d3.axisLeft(this.yScale).ticks(5));
          }

          animate() {
            this.group
              .append("defs")
              .append("clipPath")
              .attr("id", "" + this.areaClipId)
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 1)
              .attr("height", this.height)
              .transition()
              .duration(3000)
              .attr("width", this.width);
          }

          addArea() {
            let area = d3
              .area()
              .x(d => this.xScale(d.name))
              .y1(d => this.yScale(d.value));
            if (this.areaType === "curve") area.curve(d3.curveCatmullRom.alpha(1));//如果需要设置曲线放开代码即可.

            let linearGradientId = new Date().getTime();
            this.areaClipId = new Date().getTime();
            this.svg
              .append("defs")
              .html(
                "<linearGradient id=" +
                linearGradientId +
                " x1=\"0%\" x2=\"0%\" y1=\"0%\" y2=\"100%\">\n" +
                "        <stop offset=\"0%\" stop-color=" +
                this.gradient.from +
                "></stop>\n" +
                "        <stop offset=\"100%\" stop-color=" +
                this.gradient.to +
                " stop-opacity=\"0\"></stop>\n" +
                "      </linearGradient>"
              );

            area.y0(this.yScale(0));
            this.group
              .append("path")
              .datum(this.data)
              .attr("class", "area")
              .attr("d", area)
              .attr("clip-path", `url(#${this.areaClipId})`);
            if (this.hasGradient) {
              this.group.select(".area").attr("fill", "url(#" + linearGradientId + ")");
            } else {
              this.group.select(".area").attr("fill", this.color);
            }

            if (this.hasAnimatetion) this.animate();
          }

        }

        export { Area };
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
