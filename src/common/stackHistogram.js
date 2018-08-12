/**
 *
 * @Date: 2018/8/10
 * @author: twist
 *
 */
import * as d3 from "d3";
import { $ } from "./extend";
import createTip from "./createTip";


class StackHistogram {
  constructor(option) {
    let o = {
      el : document.body,
      width : 500,
      height : 500,
      data : [
        {
          origin : "广西",
          "2years" : 300,
          "3years" : 700,
          "4years" : 1300,
          "5years" : 700,
        },
        {
          origin : "广东",
          "2years" : 300,
          "3years" : 700,
          "4years" : 1300,
          "5years" : 900,
        },
        {
          origin : "浙江",
          "2years" : 300,
          "3years" : 700,
          "4years" : 300,
          "5years" : 700,
        },
        {
          origin : "附件",
          "2years" : 300,
          "3years" : 700,
          "4years" : 1300,
          "5years" : 500,
        },
        {
          origin : "云南",
          "2years" : 300,
          "3years" : 700,
          "4years" : 200,
          "5years" : 700,
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
    this.addStackHistogram();
  }

  processData() {
    this.keys = Object.keys(this.data[ 0 ]).slice(1);
    this.data.forEach(item => {
      item.total = 0;
      this.keys.forEach(current => {
        item.total += item[ current ];
      });
    });
    if (this.ascending) {
      this.data.sort((a, b) => a.total - b.total);
    }
    if (this.descending) {
      this.data.sort((a, b) => b.total - a.total);
    }
  }

  addXAxis() {
    this.xScale = d3.scaleBand()
      .padding(0.1)
      .rangeRound([ 0, this.width - this.margin.left - this.margin.right ])
      .domain(this.data.map(d => d.origin));

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
      .domain([ 0, d3.max(this.data.map(item => item.total * 1.2)) ])
      .rangeRound([ this.height - this.margin.top - this.margin.bottom, 0 ]);

    if (!this.hasYAxis.show) return;

    this.group
      .append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(this.yScale).ticks(8));
  }

  animate() {
    this.group.selectAll(".stackHistogram")
      .transition()
      .duration(1000)
      .attr("height", d => {
        return this.yScale(d[ 0 ]) - this.yScale(d[ 1 ]);
      })
      .attr("y", d => this.yScale(d[ 1 ]));
  }

  addStackHistogram() {
    let _me = this;

    this.group
      .append("g")
      .selectAll(".g")
      .data(d3.stack().keys(this.keys)(this.data))
      .enter()
      .append("g")
      .attr("fill", (d, i) => this.colorList[ i ])
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => this.xScale(d.data.origin))
      .attr("y", this.height - this.margin.top * 2)
      .attr("width", this.xScale.bandwidth())
      .attr("height", 1)
      .attr("class", "stackHistogram");

    if (!this.hasAnimatetion) {
      this.group.selectAll(".stackHistogram")
        .attr("height", d => {
          return this.yScale(d[ 0 ]) - this.yScale(d[ 1 ]);
        })
        .attr("y", d => this.yScale(d[ 1 ]));
    } else {
      this.animate();
    }

    if (!this.hasHoverEvent) return;

    this.group.selectAll(".stackHistogram")
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
    d3.select(self).attr("opacity", 0.7);
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
    ary.push("<h1>名称: " + info.data.origin + "</h1>");
    ary.push("<h2>值: " + info[ 0 ] + "-" + info[ 1 ]);
    ary.push("</div>");
    return ary.join("");
  }
}

export { StackHistogram };
