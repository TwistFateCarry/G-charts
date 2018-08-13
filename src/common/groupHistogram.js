/**
 *
 * @Date: 2018/8/10
 * @author: twist
 *
 */
import * as d3 from "d3";
import { $ } from "./extend";


class GroupHistogram {
  constructor(option) {
    let o = {
      el : null,
      width : 500,
      height : 500,
      data : [
        {
          name : "苹果",
          children : [
            {
              origin : "山西",
              value : 120
            },
            {
              origin : "陕西",
              value : 133
            }
          ]
        },
        {
          name : "香蕉",
          children : [
            {
              origin : "山西",
              value : 90
            },
            {
              origin : "陕西",
              value : 133
            }
          ]
        },
        {
          name : "橘子",
          children : [
            {
              origin : "山西",
              value : 99
            },
            {
              origin : "陕西",
              value : 233
            }
          ]
        },
        {
          name : "葡萄",
          children : [
            {
              origin : "山西",
              value : 77
            },
            {
              origin : "陕西",
              value : 323
            }
          ]
        },
        {
          name : "芒果",
          children : [
            {
              origin : "山西",
              value : 69
            },
            {
              origin : "陕西",
              value : 133
            }
          ]
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
      MAXTOP : 10,
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

    let arr = [];
    this.itemNameList = [];
    this.data.forEach(item => {
      item.children.forEach(current => {
        arr.push(current.value);
        this.itemNameList.push(current.origin);
      });
    });

    this.max = d3.max(arr);
    this.addXAxis();
    this.addYAxis();
    this.innerScale();
    this.addGroupHistogram();
  }

  addXAxis() {
    this.xScale = d3.scaleBand()
      .rangeRound([ 0, this.width - this.margin.left - 10 ])
      .domain(this.data.map(d => d.name));

    if (!this.hasXAxis.show) return;

    this.group
      .append("g")
      .attr("class", "axis")
      .attr(
        "transform",
        "translate(0," + ( this.height - this.margin.top - this.margin.bottom ) + ")"
      )
      .call(d3.axisBottom(this.xScale));
  }

  addYAxis() {
    this.yScale = d3.scaleLinear()
      .domain([ 0, this.max + this.MAXTOP ])
      .rangeRound([ this.height - this.margin.top - this.margin.bottom, 0 ]);
    if (!this.hasYAxis.show) return;

    this.group
      .append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(this.yScale).ticks(this.hasYAxis.ticks));
  }

  innerScale() {
    this.xScale1 = d3
      .scaleBand()
      .rangeRound([ 0, this.xScale.bandwidth() ])
      .domain(this.itemNameList)
      .padding(0.05);
  }

  addGroupHistogram() {
    this.group
      .selectAll(".g")
      .data(this.data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${this.xScale(d.name)},0)`)
      .selectAll(".rect")
      .data(d => d.children)
      .enter()
      .append("rect")
      .attr("class", "rect")
      .attr("x", d => {
        return this.xScale1(d.origin);
      })
      .attr("y", this.height - this.margin.top * 2)
      .attr("width", d => {
        return this.xScale1.bandwidth();
      })
      .attr("height", 1)
      .attr("fill", (d, i) => this.colorList[ i ]);


    if (!this.hasAnimatetion) {
      this.group.selectAll(".rect")
        .attr("height", d => {
          return this.height - this.margin.top - this.margin.bottom - this.yScale(d.value);
        })
        .attr("y", d => this.yScale(d.value));
    } else {
      this.animate();
    }
  }

  animate() {
    this.group.selectAll(".rect")
      .transition()
      .duration(1000)
      .attr("height", d => {
        return this.height - this.margin.top - this.margin.bottom - this.yScale(d.value);
      })
      .attr("y", d => this.yScale(d.value));
  }


}

export { GroupHistogram };
