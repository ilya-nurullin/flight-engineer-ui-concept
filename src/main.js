import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "./routes"

import "./main.scss"

import $ from "jquery"
window.jQuery = window.$ = Vue.prototype.$jQuery = $;

Vue.use(VueRouter)

window.router = new VueRouter({
  linkActiveClass: "active",
   routes
});

window.$Vue = new Vue({
  router,
  el: '#app'
});