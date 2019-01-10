<template>
  <div class="design">
    <a
      class="design_item"
      v-for="(item, index) in list"
      :key="item.name"
      :href="`/#/${item.name}?type=${item.name}`"
    >
      <img :src="item.imgUrl" alt>
      <p>{{item.name}}</p>
    </a>
  </div>
</template>
<script>
import histogram from "../assets/histogram.png";
import triangle from "../assets/triangle.png";
import bar from "../assets/bar.png";
import group from "../assets/group.png";
import stack from "../assets/stack.png";
import volume from "../assets/volume.gif";
import line from "../assets/line.png";
import area from "../assets/area.png";
import pie from "../assets/pie.png";
import donutsPie from "../assets/donutsPie.png";
import donuts3D from "../assets/donuts3D.png";

export default {
  name: "design",
  data() {
    return {
      list: [
        {
          name: "histogram",
          router: "./histogram",
          imgUrl: histogram
        },
        {
          name: "triangle",
          router: "./triangle",
          imgUrl: triangle
        },
        {
          name: "bar",
          router: "./bar",
          imgUrl: bar
        },
        {
          name: "groupHistogram",
          router: "/groupHistogram",
          imgUrl: group
        },
        {
          name: "stackHistogram",
          router: "/stackHistogram",
          imgUrl: stack
        },
        {
          name: "volume",
          router: "/volume",
          imgUrl: volume
        },
        {
          name: "line",
          router: "/line",
          imgUrl: line
        },
        {
          name: "area",
          router: "/area",
          imgUrl: area
        },
        {
          name: "pie",
          router: "/pie",
          imgUrl: pie
        },
        {
          name: "donuts",
          router: "/donuts",
          imgUrl: donutsPie
        },
        {
          name: "donuts3D",
          router: "/donuts3D",
          imgUrl: donuts3D
        }
        // {
        //   name : "bubbles",
        //   router : "/bubbles",
        //   imgUrl : volume
        // },
        // {
        //   name : "scatter",
        //   router : "/scatter",
        //   imgUrl : volume
        // },
        // {
        //   name : "map",
        //   router : "/map",
        //   imgUrl : volume
        // }
      ]
    };
  },
  mounted() {},
  methods: {
    goItem(i) {
      this.$router.push(`./${this.list[i].name}?type=${this.list[i].name}`);
    }
  }
};
</script>
<style scoped>
.design {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.design_item {
  width: 30%;
  height: 300px;
  padding: 10px;
  box-shadow: 0 0 15px -6px #000;
  flex: 0 0 30%;
  margin: 10px;
}

.design_item > img {
  max-height: 256px;
}
</style>


