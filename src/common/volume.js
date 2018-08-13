/**
 *
 * @Date: 2018/8/10
 * @author: twist
 *
 */

import * as d3 from "d3";
import { $ } from "./extend";

class Volume {
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
          value : 30
        },
        {
          name : "葡萄",
          value : 70
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
      hasAnimatetion : true,
      xOffset : 20,
      inclineAngle : 15,
      mainColorList : [ "#f6e242", "#ebec5b", "#d2ef5f", "#b1d894", "#97d5ad", "#82d1c0", "#70cfd2", "#63c8ce", "#50bab8", "#38a99d" ],
      topColorList : [ "#e9d748", "#d1d252", "#c0d75f", "#a2d37d", "#83d09e", "#68ccb6", "#5bc8cb", "#59c0c6", "#3aadab", "#2da094" ],
      rightColorList : [ "#dfce51", "#d9db59", "#b9d54a", "#9ece7c", "#8ac69f", "#70c3b1", "#65c5c8", "#57bac0", "#42aba9", "#2c9b8f" ]
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
    this.addVolume();
  }

  processData() {
    if (this.ascending) {
      this.data.sort((a, b) => a.value - b.value);
    }
    if (this.descending) {
      this.data.sort((a, b) => b.value - a.value);
    }
  }

  static processPoint(xLinearScale, data) {
    const angle = Math.PI / 2.3;
    for ( let i = 0 ; i < data.length ; i++ ) {
      let d = data[ i ];
      let depth = 10;
      d.ow = xLinearScale.bandwidth() * 0.7;
      d.ox = xLinearScale(d.name);
      d.oh = 1;
      d.p1 = {
        x : Math.cos(angle) * d.ow,
        y : -Math.sin(angle) - depth
      };
      d.p2 = {
        x : d.p1.x + d.ow,
        y : d.p1.y
      };
      d.p3 = {
        x : d.p2.x,
        y : d.p2.y + d.oh
      };
    }
  }

  addXAxis() {
    this.xScale = d3.scaleBand()
      .range([ 0, this.width - this.margin.left - this.margin.right ])
      .paddingInner(0.3)
      .paddingOuter(0.3)
      .domain(this.data.map(d => d.name));
    if (!this.hasXAxis.show) return;

    let transform = d3.geoTransform({
      point : function (x, y) {
        this.stream.point(x, y);
      }
    });

    let path = d3.geoPath()
      .projection(transform);

    this.xAixs = d3.axisBottom(this.xScale)
      .ticks(this.hasXAxis.ticks);
    let xAxisg = this.svg.append("g").call(this.xAixs)
      .attr("transform", `translate(${this.margin.left},${this.height - this.margin.top - this.margin.bottom})`);

    xAxisg.select("path").remove();
    xAxisg.selectAll("line").remove();

    xAxisg.append("path")
      .datum({
        type : "Polygon",
        coordinates : [
          [
            [ this.xOffset, 0 ],
            [ 0, this.inclineAngle ],
            [ this.width - this.margin.left - this.xOffset, this.inclineAngle ],
            [ this.width - this.margin.left, 0 ],
            [ this.xOffset, 0 ]
          ]
        ]
      })
      .attr("d", path)
      .attr("fill", "rgb(187,187,187)");

    xAxisg.selectAll("text")
      .attr("font-size", "14px")
      .attr("fill", "#646464")
      .attr("transform", `translate(0,${this.xOffset})`);
    //一次处理所有点位置
    this.constructor.processPoint(this.xScale, this.data);
  }

  addYAxis() {
    this.yScale = d3.scaleLinear()
      .domain([ 0, d3.max(this.data.map(item => item.value + this.MAXTOP)) ])
      .range([ this.height - this.margin.top - this.margin.bottom - this.xOffset, 0 ]);
    if (!this.hasYAxis.show) return;
    //定义Y轴比例尺以及刻度
    this.yAxis = this.group.append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(this.yScale))
      .attr("transform", `translate(0,0)`);

    //删除原Y轴路径和tick
    this.yAxis.select("path").remove();
    this.yAxis.selectAll("line").remove();
  }

  animate() {
    this.outGroup.transition()
      .duration(2500)
      .attr("transform", (d) => `translate(${d.ox + this.margin.left + ( this.xOffset - this.inclineAngle ) },${ this.yScale(d.value) - ( this.xOffset - this.inclineAngle )})`);

    this.outGroup.selectAll(".transparentPath")
      .transition()
      .duration(2500)
      .attr("height", d => {
        return this.height - this.margin.top - this.yScale(d.value);
      });

    this.outGroup.selectAll(".transparentPathRight")
      .transition()
      .duration(2500)
      .attr("d", d => "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + ( d.p3.y + this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + "," + ( this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + ",0");
  }

  addVolume() {
    this.outGroup = this.svg.selectAll(".outGroup")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "outGroup")
      .attr("transform", d => `translate(${d.ox + this.margin.left + ( this.xOffset - this.inclineAngle )},${this.height - this.margin.top - this.margin.bottom + ( this.inclineAngle - 1 )})`);

    this.outGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("class", "transparentPath")
      .attr("width", d => d.ow)
      .attr("height", d => d.oh)
      .style("fill", (d, i) => this.mainColorList[ i ]);

    this.outGroup.append("path")
      .attr("class", "transparentPathTop")
      .attr("d", (d) => "M0,0 L" + d.p1.x + "," + d.p1.y + " L" + d.p2.x + "," + d.p2.y + " L" + d.ow + ",0 L0,0")
      .style("fill", (d, i) => this.topColorList[ i ]);

    this.outGroup.append("path")
      .attr("class", "transparentPathRight")
      .attr("d", (d) => "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + d.p3.y + " L" + d.ow + "," + d.oh + " L" + d.ow + ",0")
      .style("fill", (d, i) => this.rightColorList[ i ]);

    if (!this.hasAnimatetion) {
      this.outGroup.attr("transform", (d) => `translate(${d.ox + this.margin.left + ( this.xOffset - this.inclineAngle ) },${ this.yScale(d.value) - ( this.xOffset - this.inclineAngle )})`);
      this.outGroup.selectAll(".transparentPath").attr("height", d => this.height - this.margin.top - this.yScale(d.value));
      this.outGroup.selectAll(".transparentPathRight")
        .attr("d", d => "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + ( d.p3.y + this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + "," + ( this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + ",0");
    } else {
      this.animate();
    }
  }
}

export { Volume };