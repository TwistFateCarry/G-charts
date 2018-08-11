<template>
  <div id="app">
    <router-view/>
    <h3>定制化服务或技术交流请email至hangxuguang@360.cn</h3>
    <h3><a href="https://github.com/TwistFateCarry/TwistFateCarry.github.io" target="blank">Github</a></h3>
  </div>
</template>

<script>
  export default {
    name : "App"
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }

  #tip-hill-div {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    width: 100px;
  }

  #tip-hill-div > h1 {
    font-size: 14px;
    text-align: center;
  }

  #tip-hill-div > h2 {
    font-size: 12px;
    text-align: center;
  }
</style>
