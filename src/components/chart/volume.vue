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
          },
          {
            name : "橙子",
            value : 44
          }
        ],
        colorList : d3.schemeCategory10,
        margin : {
          top : 20,
          left : 40
        },
        text : null,
        d3 : d3
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

        var mainColorList = ['#f6e242', '#ebec5b', '#d2ef5f', '#b1d894', '#97d5ad', '#82d1c0', '#70cfd2', '#63c8ce', '#50bab8', '#38a99d'];
        var topColorList = ['#e9d748', '#d1d252', '#c0d75f', '#a2d37d', '#83d09e', '#68ccb6', '#5bc8cb', '#59c0c6', '#3aadab', '#2da094'];
        var rightColorList = ['#dfce51', '#d9db59', '#b9d54a', '#9ece7c', '#8ac69f', '#70c3b1', '#65c5c8', '#57bac0', '#42aba9', '#2c9b8f'];

        this.svg = this.d3.select(this.$refs[ "svg" ]);
        this.svg.html("");


        this.transfrom = this.d3.geoTransform({
          point : function (x, y) {
            this.stream.point(x, y);
          }
        });

        this.path = this.d3.geoPath()
          .projection(this.transfrom);

        this.xScale = this.d3.scaleBand()
          .domain(this.dataList.map(item => item.name))
          .range([ 0, this.width - this.margin.left ]);

        this.xAxis = this.d3.axisBottom(this.xScale)
          .ticks(this.dataList.length);


        //绘制X轴
        let xAxisG = this.svg.append("g")
          .call(this.xAxis)
          .attr("transform", "translate(" + ( this.margin.left - 20 ) + "," + ( this.height - this.margin.top * 2 ) + ")");

        //删除原X轴
        xAxisG.select("path").remove();
        xAxisG.selectAll("line").remove();
        //绘制新的立体X轴
        xAxisG.append("path")
          .datum({
            type : "Polygon",
            coordinates : [
              [
                [ 20, 0 ],
                [ 0, 15 ],
                [ this.width - this.margin.left, 15 ],
                [ this.width - this.margin.left + 20, 0 ],
                [ 20, 0 ]
              ]
            ]
          })
          .attr("d", this.path)
          .attr("fill", "rgb(187,187,187)");
        xAxisG.selectAll("text")
          .attr("font-size", "14px")
          .attr("fill", "#646464")
          .attr("transform", "translate(0,20)");


        this.yScale = this.d3.scaleLinear()
          .domain([ 0, this.d3.max(this.dataList.map(item => item.value + 30)) ])
          .range([ this.height - this.margin.top * 2, 0 ]);

        this.yScale = this.d3.scaleLinear()
          .domain([ 0, this.d3.max(this.dataList, d => {
            return d.value * 1;
          }) * 1.2 ])
          .range([ this.height - this.margin.top * 2, 0 ]);

        //定义Y轴比例尺以及刻度
        let yAxis = this.d3.axisLeft(this.yScale)
          .ticks(6);

        //绘制Y轴
        let yAxisG = this.svg.append("g")
          .call(yAxis)
          // .attr("transform", "translate(" + ( this.margin.left - 10 ) + "," + this.margin.top + ")");
          .attr("transform", "translate(" + ( this.margin.left - 10 ) + ",0)");

        yAxisG.selectAll("text")
          .attr("font-size", "18px")
          .attr("fill", "#636363");

        //删除原Y轴路径和tick
        yAxisG.select("path").remove();
        yAxisG.selectAll("line").remove();

        dataProcessing(this.xScale, this.dataList);

        function dataProcessing(xLinearScale, data) {
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


        function getRandomColor() {

          return "#" + Math.floor(Math.random() * 16777215).toString(16);
        }


        let g = this.svg.selectAll(".g")
          .data(this.dataList)
          .enter()
          .append("g")
          .attr("transform", (d) => `translate(${d.ox + this.margin.left},${this.height - this.margin.top * 2 + 14})`);

        g.transition()
          .duration(2500)
          .attr("transform", (d) => `translate(${d.ox + this.margin.left},${ this.yScale(d.value) - 5})`);

        g.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("class", "transparentPath")
          .attr("width", d => d.ow)
          .attr("height", d => d.oh)
          .style("fill", (d,i)=>mainColorList[i])
          .transition()
          .duration(2500)
          .attr("height", d => this.height - this.margin.top - this.yScale(d.value));

        g.append("path")
          .attr("class", "transparentPathTop")
          .attr("d", (d) => "M0,0 L" + d.p1.x + "," + d.p1.y + " L" + d.p2.x + "," + d.p2.y + " L" + d.ow + ",0 L0,0")
          .style("fill", (d,i)=>topColorList[i]);

        g.append("path")
          .attr("class", "transparentPathRight")
          .attr("d", (d) => "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + d.p3.y + " L" + d.ow + "," + d.oh + " L" + d.ow + ",0")
          .style("fill", (d,i)=>rightColorList[i])
          .transition()
          .duration(2500)
          .attr("d", d => "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + ( d.p3.y + this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + "," + ( this.height - this.margin.top - this.yScale(d.value) ) + " L" + d.ow + ",0");
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
