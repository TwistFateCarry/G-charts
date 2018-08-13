<template>
  <div class="item">
    <div class="item_div">
      <p style="color:rgb(30, 163, 193);font-size:36px">{{type}}Chart</p>
      <svg ref='svg' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           :width="width" :height="height"></svg>
    </div>
    <div class="item_div">
      <textarea cols="99" rows="59">
      import * as d3 from "d3";
      import { $ } from "./extend";


      class Histogram {
        constructor(option) {
          let o = {
            el : null,
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
            colorList : d3.schemeCategory10,
            margin : {
              top : 20,
              left : 40,
              right : 20,
              bottom : 20
            },
            textInness : 10,
            hasXAxis : {
              show : true,
              ticks : 6
            },
            hasYAxis : {
              show : true,
              ticks : 6
            },
            MAXTOP : 30,
            hasAnimatetion : true
          };
          if (!option.el) o.el = d3.select("body").append("svg");
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
          this.addHistogram();
        }

        processData() {
          if (this.ascending) {
            this.data.sort((a, b) => a.value - b.value);
          }
          if (this.descending) {
            this.data.sort((a, b) => b.value - a.value);
          }
        }

        addXAxis() {
          this.xScale = d3.scaleBand()
            .rangeRound([ 0, this.width - this.margin.left - this.margin.right ])
            .paddingOuter(0.3)
            .paddingInner(0.3)
            .domain(this.data.map((d) => d.name));

          if (!this.hasXAxis.show) return;

          this.xAxis = this.group
            .append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${this.height -
            this.margin.top - this.margin.bottom})`)
            .call(d3.axisBottom(this.xScale));
        }

        addYAxis() {
          this.yScale = d3.scaleLinear()
            .rangeRound([ this.height - this.margin.left, 0 ])
            .domain([ 0, d3.max(this.data.map((d) => d.value + 30)) ]);
          if (!this.hasYAxis.show) return;

          this.yAxis = this.group
            .append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(this.yScale).ticks(this.hasYAxis.ticks));
        }

        animate() {
          this.group.selectAll(".histogram")
            .transition()
            .duration(1000)
            .delay((d, i) => i * 500 / 3)
            .attr("height", d => {
              return this.height - this.yScale(d.value) - this.margin.top - this.margin.bottom;
            })
            .attr("y", d => this.yScale(d.value));
        }

        addHistogram() {
          this.group
            .selectAll(".histogram")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "histogram")
            .attr("x", d => this.xScale(d.name))
            .attr("y", this.height - this.margin.top - this.margin.bottom)
            .attr("width", this.xScale.bandwidth())
            .attr("height", 1)
            .attr("fill", (d, i) => this.colorList[ i ]);


          if (!this.hasAnimatetion) {
            this.group.selectAll(".histogram")
              .attr("height", d => {
                return this.height - this.yScale(d.value) - this.margin.top - this.margin.bottom;
              });
          } else {
            this.animate();
          }

        }

      }

      export { Histogram };

      </textarea>
    </div>
  </div>
</template>
<script>
  import { Histogram } from "../../common/histogram";

  export default {
    name : "histogram",
    data() {
      return {
        width : 500,
        height : 500,
        type : null,
        dataList : [
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
        ]
      };
    },
    created() {
      this.type = this.$route.query.type;
    },
    mounted() {
      new Histogram({
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

<style scoped>
  .item_div {
    float: left;
    width: 50%;
  }
</style>
