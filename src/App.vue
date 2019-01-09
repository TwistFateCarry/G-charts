<template>
  <div id="app">
    <a
      href="https://github.com/TwistFateCarry/G-charts"
      target="_blank"
      style="position: fixed; right: 0; top: 0; z-index: 3;"
    >
      <img src="./assets/github.png" alt>
    </a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h3 {
  font-size: 16px;
  font-weight: 900;
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
