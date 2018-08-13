/**
 *
 * @Date: 2018/8/10
 * @author: twist
 *
 */

import * as d3 from "d3";
import { $ } from "./extend";

class Bar {
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
        return d.value + this.MAXTOP;
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
  }
}

export { Bar };