import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/app";
import example from "../components/example.vue";
import histogram from "../components/chart/histogram";
import triangle from "../components/chart/triangle";
import bar from "../components/chart/bar";
import groupHistogram from "../components/chart/groupHistogram";
import stackHistogram from "../components/chart/stackHistogram";
import volume from "../components/chart/volume";

Vue.use(Router);
export default new Router({
  routes : [
    {
      path : "/",
      component : Home
    },
    {
      path : "/example",
      component : example
    },
    {
      path : "/histogram",
      component : histogram
    },
    {
      path : "/triangle",
      component : triangle
    },
    {
      path : "/bar",
      component : bar
    },
    {
      path : "/groupHistogram",
      component : groupHistogram
    },
    {
      path : "/stackHistogram",
      component : stackHistogram
    },
    {
      path : "/volume",
      component : volume
    }
  ]
});
