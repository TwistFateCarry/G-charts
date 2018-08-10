<template>
  <div class="hello">
    <div>This is logo.(runing</div>
    <h1>{{ msg }}</h1>
    <div>
      这是一个基于d3.js和threejs封装的图表组件工作平台. <br> <br>
      除了常用的折柱饼以外,还有一些创意性的图表提供给大家使用. <br> <br>
      该站当前d3使用5.5版本,threejs使用93开发者版本.
    </div>
    <h2 @click="goDetail">
      开始使用.
    </h2>
  </div>
</template>

<script>
  export default {
    name : "app",
    data() {
      return {
        msg : "Welcome to Gchart Stations."
      };
    },
    methods : {
      goDetail() {
        this.$router.push("./example");
      }
    }
  };
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  h2 {
    color: #42b983;
  }
</style>
