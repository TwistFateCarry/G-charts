/**
 *
 * @Date: 2018/8/10
 * @author: twist
 *
 */
import * as d3 from "d3";
import { $ } from "./extend";
import createTip from "./createTip";


class Triangle {
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
    this.addHistogram();
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
      .rangeRound([ this.height - 40, 0 ])
      .domain([ 0, d3.max(this.data.map((d) => d.value + 30)) ]);
    if (!this.hasYAxis.show) return;

    this.yAxis = this.group
      .append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(this.yScale).ticks(this.hasYAxis.ticks));
  }

  animate() {
    this.group.selectAll(".triangle")
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500 / 3)
      .attr("d", d => {
        let arr = [];
        let a = {};
        a.centerX = this.xScale.bandwidth() / 2;
        a.centerY = this.height - this.yScale(d.value);
        a.end = this.xScale.bandwidth();
        arr.push("M" + a.centerX);
        arr.push(" ");
        arr.push(0);
        arr.push(" L" + a.centerX * 2);
        arr.push(" ");
        arr.push(a.centerY);
        arr.push(" ");
        arr.push("L0 ");
        arr.push(a.centerY);
        arr.push("Z");
        return arr.join("");
      })
      .attr("transform", d => {
        return (
          "translate(" +
          this.xScale(d.name) +
          "," +
          ( this.yScale(d.value) - this.margin.top - this.margin.bottom ) +
          ")"
        );
      });
  }

  addHistogram() {
    let _me = this;
    this.group
      .selectAll(".triangle")
      .data(this.data)
      .enter()
      .append("path")
      .attr("class", "triangle")
      .attr("d", () => {
        let arr = [];
        let a = {};
        a.centerX = this.xScale.bandwidth() / 2;
        a.centerY = 1;
        a.end = this.xScale.bandwidth();
        arr.push("M" + ( a.centerX + 20 ));
        arr.push(" ");
        arr.push(0);
        arr.push(" L" + a.centerX * 2);
        arr.push(" ");
        arr.push(a.centerY);
        arr.push(" ");
        arr.push("L0 ");
        arr.push(a.centerY);
        arr.push("Z");
        return arr.join("");
      })
      .attr("transform", d => {
        return (
          "translate(" +
          this.xScale(d.name) +
          "," +
          ( this.height - this.margin.top - this.margin.bottom ) +
          ")"
        );
      })
      .attr("fill", (d, i) => this.colorList[ i ]);

    if (!this.hasAnimatetion) {
      this.group.selectAll(".triangle")
        .attr("d", d => {
          let arr = [];
          let a = {};
          a.centerX = this.xScale.bandwidth() / 2;
          a.centerY = this.height - this.yScale(d.value);
          a.end = this.xScale.bandwidth();
          arr.push("M" + a.centerX);
          arr.push(" ");
          arr.push(0);
          arr.push(" L" + a.centerX * 2);
          arr.push(" ");
          arr.push(a.centerY);
          arr.push(" ");
          arr.push("L0 ");
          arr.push(a.centerY);
          arr.push("Z");
          return arr.join("");
        })
        .attr("transform", d => {
          return (
            "translate(" +
            this.xScale(d.name) +
            "," +
            ( this.yScale(d.value) - this.margin.top - this.margin.bottom ) +
            ")"
          );
        });
    } else {
      this.animate();
    }

    if (!this.hasHoverEvent) return;

    this.group.selectAll(".triangle")
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
    ary.push("<h1>名称: " + info.name + "</h1>");
    ary.push("<h2>值: " + info.value);
    ary.push("</div>");
    return ary.join("");
  }

}

export { Triangle };
