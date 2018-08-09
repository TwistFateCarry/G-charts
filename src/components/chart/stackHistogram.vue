<template>
  <div class="item">
    <div class="item_div">
      <p style="color:rgb(30, 163, 193);font-size:36px">{{type}}Chart</p>
      <svg ref='svg' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           :width="width" :height="height"></svg>
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
    name : "item",
    data() {
      return {
        width : 500,
        height : 500,
        svg : null,
        type : null,
        dataList : [
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
          left : 40
        },
        text : null,
        d3 : d3,
        textinness : 10
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
    watch : {
      text : {
        handler(val) {
          eval(val);
        },
        deep : true
      }
    },
    methods : {
      render() {
      },
      renderer() {
        this.svg = this.d3.select(this.$refs[ "svg" ]);
        this.svg.html("");
        this.keys = Object.keys(this.dataList[ 0 ]).slice(1);
        this.dataList.forEach(item => {
          item.total = 0;
          this.keys.forEach(current => {
            item.total += item[ current ];
          });
        });
        this.dataList.sort((a, b) => a.total - b.total);


        this.xScale = this.d3
          .scaleBand()
          .padding(0.1)
          .rangeRound([ 0, this.width - this.margin.left - this.textinness ])
          .domain(this.dataList.map(d => d.origin));

        this.yScale = this.d3
          .scaleLinear()
          .domain([ 0, this.d3.max(this.dataList.map(item => item.total)) ])
          .rangeRound([ this.height - this.margin.top * 2, 0 ]);

        this.group = this.svg
          .append("g")
          .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        this.group
          .append("g")
          .attr("class", "axis")
          .attr(
            "transform",
            "translate(0," + ( this.height - this.margin.top * 2 ) + ")"
          )
          .call(this.d3.axisBottom(this.xScale));

        this.group
          .append("g")
          .attr("class", "axis")
          .call(this.d3.axisLeft(this.yScale).ticks(8));

        this.group
          .append("g")
          .selectAll(".g")
          .data(d3.stack().keys(this.keys)(this.dataList))
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
          .transition()
          .duration(1000)
          .attr("height", d => {
            return this.yScale(d[ 0 ]) - this.yScale(d[ 1 ]);
          })
          .attr("y", d => this.yScale(d[ 1 ]));
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
