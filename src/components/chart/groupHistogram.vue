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
          children: [
            {
              origin: "山西",
              value: 120
            },
            {
              origin: "陕西",
              value: 133
            }
          ]
        },
        {
          name: "香蕉",
          children: [
            {
              origin: "山西",
              value: 90
            },
            {
              origin: "陕西",
              value: 133
            }
          ]
        },
        {
          name: "橘子",
          children: [
            {
              origin: "山西",
              value: 99
            },
            {
              origin: "陕西",
              value: 233
            }
          ]
        },
        {
          name: "葡萄",
          children: [
            {
              origin: "山西",
              value: 77
            },
            {
              origin: "陕西",
              value: 323
            }
          ]
        },
        {
          name: "芒果",
          children: [
            {
              origin: "山西",
              value: 69
            },
            {
              origin: "陕西",
              value: 133
            }
          ]
        }
      ],
      colorList: d3.schemeCategory10,
      margin: {
        top: 20,
        left: 40
      },
      text: null,
      d3: d3,
      textinness: 10
    };
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    // let text = this.render();
    // this.text = text;
    this.renderer();
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
    render() {},
    renderer() {
      this.svg = this.d3.select(this.$refs["svg"]);
      this.svg.html("");

      let arr = [];
      let itemNameList = [];
      this.dataList.forEach(item => {
        item.children.forEach(current => {
          arr.push(current.value);
          itemNameList.push(current.origin);
        });
      });

      this.max = this.d3.max(arr);

      this.xScale = this.d3
        .scaleBand()
        .rangeRound([0, this.width - this.margin.left - 10])
        .domain(this.dataList.map(d => d.name));

      this.xScale1 = this.d3
        .scaleBand()
        .rangeRound([0, this.xScale.bandwidth()])
        .domain(itemNameList)
        .padding(0.05);

      this.yScale = this.d3
        .scaleLinear()
        .domain([0, this.max])
        .rangeRound([this.height - this.margin.top * 2, 0]);

      this.group = this.svg
        .append("g")
        .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

      this.group
        .selectAll("g")
        .data(this.dataList)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${this.xScale(d.name)},0)`)
        .selectAll(".rect")
        .data(d => d.children)
        .enter()
        .append("rect")
        .attr("x", d => {
          return this.xScale1(d.origin);
        })
        .attr("y", this.height - this.margin.top * 2)
        .attr("width", d => {
          return this.xScale1.bandwidth();
        })
        .attr("height", 1)
        .attr("fill", (d, i) => this.colorList[i])
        .transition()
        .duration(1000)
        .attr("height", d => {
          return this.height - this.margin.top * 2 - this.yScale(d.value);
        })
        .attr("y", d => {
          return this.yScale(d.value);
        });

      this.group
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(0," + (this.height - this.margin.top * 2) + ")"
        )
        .call(this.d3.axisBottom(this.xScale));

      this.group
        .append("g")
        .attr("class", "axis")
        .call(this.d3.axisLeft(this.yScale).ticks(8));
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
