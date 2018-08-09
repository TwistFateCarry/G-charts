<template>
  <div class="design">
    <div class="design_item" @click="goItem(index)" v-for="(item,index) in list" :key="item.name">
      <img :src='item.imgUrl' alt="">
      <div style="color:#42b983">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  import histogram from "../assets/histogram.png";
  import triangle from "../assets/triangle.png";
  import bar from "../assets/bar.png";
  import group from "../assets/group.png";
  import stack from "../assets/stack.png";
  import volume from '../assets/volume.png'
  export default {
    name : "design",
    data() {
      return {
        list : [
          {
            name : "histogram",
            router : "./histogram",
            imgUrl : histogram
          },
          {
            name : "triangle",
            router : "./triangle",
            imgUrl : triangle
          },
          {
            name : "bar",
            router : "./bar",
            imgUrl : bar
          },
          {
            name : "groupHistogram",
            router : "/groupHistogram",
            imgUrl : group
          },
          {
            name : "stackHistogram",
            router : "/stackHistogram",
            imgUrl : stack
          },
          {
            name : "volume",
            router : "/volume",
            imgUrl : volume
          },
          {
            name : "line",
            router : "./line",
            imgUrl : volume
          },
          {
            name : "area",
            router : "./area",
            imgUrl : volume
          },
          {
            name : "bubbles",
            router : "./bubbles",
            imgUrl : volume
          },
          {
            name : "scatter",
            router : "./scatter",
            imgUrl : volume
          },
          {
            name : "map",
            router : "./map",
            imgUrl : volume
          }
        ]
      };
    },
    mounted() {
    },
    methods : {
      goItem(i) {
        this.$router.push(`./${this.list[ i ].name}?type=${this.list[ i ].name}`);
      }
    }
  };
</script>
<style scoped>
  .design_item {
    width: 30%;
    display: inline-block;
  }

  .design_item > img {
    width: 50%;
  }
</style>


