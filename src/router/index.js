import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/index";
import example from "@/components/example.vue";
import histogram from "@/components/chart/histogram";
import triangle from "@/components/chart/triangle";
import bar from "@/components/chart/bar";
import groupHistogram from "@/components/chart/groupHistogram";
import stackHistogram from "@/components/chart/stackHistogram";
import volume from "@/components/chart/volume";
import line from "@/components/chart/line";
import area from "@/components/chart/area";
import pie from "@/components/chart/pie";
import donuts from "@/components/chart/donuts";
import donuts3D from "@/components/chart/donuts3D";

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
    },
    {
      path : "/line",
      component : line
    },
    {
      path : "/area",
      component : area
    },
    {
      path : "/pie",
      component : pie
    },
    {
      path : "/donuts",
      component : donuts
    },
    {
      path : "/donuts3D",
      component : donuts3D
    }
  ]
});
