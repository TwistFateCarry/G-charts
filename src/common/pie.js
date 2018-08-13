/**
 *
 * @Date: 2018/8/13
 * @author: twist
 *
 */

import * as d3 from "d3";
import { $ } from "./extend";

class Pie {
  constructor(option) {
    let o = {
      el :null,
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
      colorList : d3.schemeCategory10,
      textInness : 20,
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
    this.R = this.width - this.margin.left - this.margin.right;
    this.radius = this.R / 2;
    this.pie = d3.pie().sort(null).value(d => d.value);
    this.path = d3.arc().outerRadius(this.radius).innerRadius(0);

    this.transition = d3.arc().outerRadius(1).innerRadius(0);
    this.label = d3.arc().outerRadius(this.radius + this.textInness).innerRadius(this.radius + this.textInness);

    this.group = this.svg.append("g")
      .attr("transform", `translate(${( this.width - this.R ) / 2 + this.radius},${( this.width - this.R ) / 2 + this.radius})`);
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
    this.paths.transition()
      .duration(500)
      .delay((d, i) => i * 200)
      .attr("d", this.path);
  }

  addArc() {
    this.arc = this.group.selectAll(".pie")
      .data(this.pie(this.data))
      .enter()
      .append("g")
      .attr("class", ".pie");
    this.paths = this.arc.append("path")
      .attr("d", this.transition)
      .attr("class", "piePath")
      .attr("fill", (d, i) => this.colorList[ i ]);

    this.arc.append("text")
      .attr("transform", d => `translate(${this.label.centroid(d)})`)
      .attr("dy", "-.5em")
      .attr("dx", "3")
      .attr("font-size", 12)
      .style("text-anchor", "middle")
      .text(d => d.data.name);
    if (this.hasAnimatetion) {
      this.animate();
    } else {
      this.arc.selectAll(".piePath").attr("d", this.path);
    }
  }

}

export { Pie };