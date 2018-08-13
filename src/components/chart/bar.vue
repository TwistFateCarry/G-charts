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
        import createTip from "./createTip";

        class Bar {
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
              MAXTop : 30,
              hasAnimatetion : true,
              hasHoverEvent : true
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
            this.addBar();
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
            this.xScale = d3.scaleLinear()
              .rangeRound([ this.width - this.margin.left - this.margin.right, 0 ])
              .domain([ d3.max(this.data.map((d) => {
                return d.value + this.MAXTop;
              })), 0 ]);
            if (!this.hasXAxis.show) return;
            this.xAxis = this.group.append("g")
              .attr("class", "xAxis")
              .attr("transform", "translate(0," + ( this.height - this.margin.top - this.margin.bottom ) + ")")
              .call(d3.axisBottom(this.xScale).ticks(this.hasXAxis.ticks));
          }

          addYAxis() {
            this.yScale = d3.scaleBand()
              .rangeRound([ 0, this.height - this.margin.left ])
              .paddingOuter(0.3)
              .paddingInner(0.3)
              .domain(this.data.map((d) => d.name));

            if (!this.hasYAxis.show) return;
            this.yAxis = this.group.append("g")
              .attr("class", "yAxis")
              .call(d3.axisLeft(this.yScale));
          }

          animate() {
            this.group.selectAll(".bar")
              .transition()
              .duration(1000)
              .delay((d, i) => i * 500 / 3)
              .attr("width", (d) => this.xScale(d.value))
              .attr("fill", (d, i) => this.colorList[ i ]);
          }

          addBar() {
            let _me = this;
            this.group.selectAll(".bar")
              .data(this.data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", 1)
              .attr("y", (d) => this.yScale(d.name))
              .attr("width", 1)
              .attr("height", this.yScale.bandwidth())
              .attr("fill", (d, i) => this.colorList[ i ]);
            if (!this.hasAnimatetion) {
              this.group.selectAll(".bar")
                .attr("width", (d) => this.xScale(d.value))
                .attr("fill", (d, i) => this.colorList[ i ]);
            } else {
              this.animate();
            }

            if (!this.hasHoverEvent) return;

            this.group.selectAll(".bar")
              .on("mouseenter", function (d) {
                let self = this;
                _me.enter(d, self);
              })
              .on("mouseleave", function () {
                let self = this;
                _me.leave(self);
              });
          }

          enter(d, self) {
            d3.select(self).attr("opacity", 0.8);
            // 添加 div
            createTip.target = this;
            createTip.longer = new Date().getTime();
            createTip.exist = false;
            //获取坐标
            createTip.winEvent = {
              x : event.clientX,
              y : event.clientY - 20
            };
            createTip.boxHeight = 50;
            createTip.boxWidth = 80;

            //hide
            createTip.ClearDiv();
            //show
            createTip.hoverTimerFn(this.createTooltipTableData(d), self);
          }

          leave(self) {
            d3.select(self).attr("opacity", 1);
            createTip.target = null;
            createTip.ClearDiv();
          }

          createTooltipTableData(info) {
            let ary = [];
            ary.push("<div id='tip-hill-div'>");
            ary.push("<h1>名称: " + info.name + "</h1>");
            ary.push("<h2>值: " + info.value);
            ary.push("</div>");
            return ary.join("");
          }
        }

        export { Bar };
      </textarea>
    </div>
  </div>
</template>
<script>
  import { Bar } from "../../common/bar";

  export default {
    name : "barChart",
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
