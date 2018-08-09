<template>
    <div class="item">
      <div class="item_div">
        <p style="color:rgb(30, 163, 193);font-size:36px">{{type}}Chart</p>
        <svg ref='svg' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="width" :height="height"></svg>
      </div>
      <div class="item_div">
        <div>当前d3版本{{d3.version}}.</div>
        <div>this指向当前组件.</div>
        <textarea rows="59" cols="99" v-model="text"></textarea>
      </div>
    </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "item",
  data() {
    return {
      width: 500,
      height: 500,
      svg: null,
      type: null,
      dataList: [
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
      colorList: d3.schemeCategory10,
      margin: {
        top: 20,
        left: 40
      },
      text: null,
      d3: d3,
      textinness:10
    };
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    let text = this.render();
    this.text = text;
  },
  watch: {
    text: {
      handler(val) {
        eval(val);
      },
      deep: true
    }
  },
  methods: {
    render() {
      return `this.svg = this.d3.select(this.$refs["svg"]);
      this.svg.html('');

    this.xScale = this.d3.scaleLinear()
      .rangeRound([this.width - this.margin.left - this.textinness, 0])
      .domain([this.d3.max(this.dataList.map(function (d) {
        return d.value +30
      })), 0]);
    this.yScale = this.d3.scaleBand()
      .rangeRound([0, this.height - this.margin.left])
      .paddingOuter(0.3)
      .paddingInner(0.3)
      .domain(this.dataList.map(function (d) {
        return d.name
      }));

    this.group = this.svg.append('g')
      .attr("transform", \`translate(${this.margin.left},${
        this.margin.top
      })\`);

    this.xAxis = this.group.append('g')
      .attr('class', 'xAxis_barChart')
      .attr('transform', 'translate(0,' + (this.height-this.margin.top * 2) + ')')
      .call(this.d3.axisBottom(this.xScale));

    this.yAxis = this.group.append('g')
      .attr('class', 'yAxis_barChart')
      .call(this.d3.axisLeft(this.yScale).ticks(5));

    this.group.selectAll('column')
      .data(this.dataList)
      .enter()
      .append('rect')
      .attr('class', 'column')
      .attr('x', 1)
      .attr('y', (d) => this.yScale(d.name))
      .attr('width', 1)
      .attr('height', this.yScale.bandwidth())
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500 / 3)
      .attr('width', (d) => this.xScale(d.value))
      .attr('fill', (d, i) => this.colorList[i])
    `;
    }
  }
};
</script>

<style scoped>
.item_div {
  float: left;
  width: 50%;
}
</style>
