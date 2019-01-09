/**
 *
 * @Date: 2018/8/13
 * @author: twist
 *
 */

import * as d3 from "d3";
import { $ } from "./extend";

class Donuts {
  constructor(option) {
    let o = {
      el: null,
      width: 500,
      height: 500,
      data: [
        {
          name: "苹果",
          value: 40
        },
        {
          name: "香蕉",
          value: 30
        },
        {
          name: "橘子",
          value: 20
        },
        {
          name: "葡萄",
          value: 40
        },
        {
          name: "芒果",
          value: 20
        }
      ],
      margin: {
        top: 20,
        left: 40,
        right: 20,
        bottom: 20
      },
      colorList: d3.schemeCategory10,
      textInness: 20,
      hasAnimatetion: true,
      outerInness: 20,
      innerInness: 70
    };
    if (!option.el) o.el = d3.select("body").append("svg");
    $.extend(true, o, option);
    $.extend(true, this, o);
    this.init();
  }

  init() {
    this.svg = d3.select(this.el);
    this.svg.html("");
    this.R =
      Math.min(this.width, this.height) - this.margin.left - this.margin.right;
    this.radius = this.R / 2;
    this.pie = d3
      .pie()
      .sort(null)
      .value(d => d.value);
    this.path = d3
      .arc()
      .outerRadius(this.radius - this.outerInness)
      .innerRadius(this.radius - this.innerInness);
    this.group = this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${(this.width - this.R) / 2 + this.radius},${(this.width -
          this.R) /
          2 +
          this.radius})`
      );

    this.processData();
    this.addArc();
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

  animate() {
    let color ='#BBD628';
    console.log(d3.color('#BBD628').brighter())
    let _me = this;
    this.arc = this.group
      .selectAll(".pie")
      .data(this.pie(this.data))
      .enter()
      .append("g")
      .attr("class", ".pie");

    this.paths = this.arc
      .append("path")
      .attr("class", "piePath")
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        let interpolate = d3.interpolate(
          {
            startAngle: 0,
            endAngle: 0
          },
          d
        );
        return t => _me.path(interpolate(t));
      })
      .attrTween("fill", (d, i) => {
        let interpolate = d3.interpolate("#000", this.colorList[i]);
        return t => interpolate(t);
      })

    this.arc
      .append("text")
      .attr("transform", d => `translate(${this.path.centroid(d)})`)
      .attr("font-size", 12)
      .style("text-anchor", "middle")
      .text(d => d.data.name);
  }

  addArc() {
    if (this.hasAnimatetion) {
      this.animate();
    } else {
      this.arc = this.group
        .selectAll(".pie")
        .data(this.pie(this.data))
        .enter()
        .append("g")
        .attr("class", ".pie");
      this.paths = this.arc
        .append("path")
        .attr("d", this.path)
        .attr("class", "piePath")
        .attr("fill", (d, i) => this.colorList[i]);

      this.arc
        .append("text")
        .attr("transform", d => `translate(${this.path.centroid(d)})`)
        .attr("dy", "-.5em")
        .attr("dx", "3")
        .attr("font-size", 12)
        .style("text-anchor", "middle")
        .text(d => d.data.name);
    }
  }
}

export { Donuts };
