/**
 *
 * @Date: 2018/8/14
 * @author: twist
 *
 */
import * as d3 from "d3";
import { $ } from "./extend";

class Donuts3D {
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
  };

  init() {
    this.svg = d3.select(this.el);
    this.svg.html("");
    this.R = Math.min(this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom);
    this.radius = this.R / 2;

    this._data = d3.pie().sort(null).value(d => d.value)(this.data);

    this.group = this.svg.append("g")
      .attr("transform", `translate(${( this.width - this.R ) / 2 + this.radius},${( this.width - this.R ) / 2 + this.radius})`);
    this.processData();
    this.addPieTop();
    this.addPieOuter();
    this.addPieInner();
    if (this.hasText) this.addText();
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

  getPercent(d) {
    return ( d.endAngle - d.startAngle > 0.2 ?
      Math.round(1000 * ( d.endAngle - d.startAngle ) / ( Math.PI * 2 )) / 10 + "%" : "" );
  }

  addPieTop() {
    this.group.selectAll(".topPath")
      .data(this._data)
      .enter()
      .append('path')
      .attr('class','topPath')
      .attr('fill',(d,i)=>this.colorList[i])
      .attr('stroke',(d,i)=>this.colorList[i])
      .attr('d',d=>{

      })
    if (this.hasAnimatetion) this.animate();
  }

  addPieOuter() {
    if (this.hasAnimatetion) this.animate();
  }

  addPieInner() {
    if (this.hasAnimatetion) this.animate();
  }

  addText() {
    this.getPercent();
  }

  animate() {
  }


}

export { Donuts3D };