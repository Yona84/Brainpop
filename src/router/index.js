import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Home_V2 from "../views/Home_V2.vue";
import Vuesax from "vuesax";
import axios from "axios";
import VueAxios from "vue-axios";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";

Vue.use(Vuesax);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/API_V2",
    name: "home_V2",
    component: Home_V2
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
