import Vue from "vue";
import App from "./App.vue";
import VueApexCharts from "vue-apexcharts";
import vuetify from "./plugins/vuetify";
// import VueGrid from "@sneverton/vue-grid";
import VueGrid from "@sneverton/vue-grid";
import "@sneverton/vue-grid/dist/vue-grid.css";

Vue.config.productionTip = false;

Vue.use(VueApexCharts);
Vue.use(VueGrid);
Vue.component("apexchart", VueApexCharts);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
