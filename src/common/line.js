/**
 *
 * @Date: 2018/8/12
 * @author: twist
 *
 */

import * as d3 from "d3";
import { $ } from "./extend";

class Line {
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
    this.addLine();
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
      .attr("id", "" + this.lineClipId)
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 1)
      .attr("height", this.height)
      .transition()
      .duration(3000)
      .attr("width", this.height);
  }

  addLine() {
    this.lineClipId = new Date().getTime();
    this.group
      .selectAll(".circle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", d => this.xScale(d.name))
      .attr("cy", d => this.yScale(d.value))
      .attr("r", 10)
      .attr("fill", (d, i) => this.colorList[ i ]);

    this.group
      .selectAll(".lineCircle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", "lineCircle")
      .attr("cx", d => this.xScale(d.name))
      .attr("cy", d => this.yScale(d.value))
      .attr("r", 10)
      .attr("stroke", (d, i) => this.colorList[ i ])
      .attr("stroke-width", "4")
      .attr("fill", "none");

    this.group
      .selectAll(".lineOuterCircle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("class", "lineOuterCircle")
      .attr("cx", d => this.xScale(d.name))
      .attr("cy", d => this.yScale(d.value))
      .attr("r", 10)
      .attr("stroke", "rgb(0,0,0)")
      .attr("opacity", "0.1")
      .attr("stroke-width", "4")
      .attr("fill", "none");

    this.line = d3
      .line()
      .x(d => this.xScale(d.name))
      .y(d => this.yScale(d.value));
    if (this.lineType === "curve") this.line.curve(d3.curveCatmullRom.alpha(1));

    this.group
      .append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "rgb(82,180,255)")
      .attr("opacity", "0.3")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", this.lineThickness)
      .attr("d", this.line)
      .attr("clip-path", "url(#" + this.lineClipId + ")");

    if (this.hasAnimatetion) this.animate();
  }

}

export { Line };