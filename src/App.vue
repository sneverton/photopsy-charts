<template lang="pug">
v-app
  v-main.blue.d-flex.align-center
    grid-list.pa-4(col-width="280px")
      v-card.text-center.pa-4.font-weight-bold.d-flex.align-center.justify-center(
        v-for="({ title, component }, i) in charts",
        @click="openChart(component)",
        :key="i"
      )
        | {{ title }}
  v-dialog(v-model="dialog", fullscreen, hide-overlay, scrollable)
    v-card
      v-card-text
        component(:is="chartSelected")
</template>

<script lang="ts">
import Vue from "vue";
import ChartDays from "./components/ChartDays.vue";
import ChartHour from "./components/ChartHour.vue";
import ChartWeekdays from "./components/ChartWeekdays.vue";
import ChartDaysAWeek from "./components/ChartDaysAWeek.vue";

export default Vue.extend({
  data: () => ({
    dialog: false,
    chartSelected: "",
    charts: [
      {
        title: "FOTOPSIAS POR DIA",
        component: "ChartDays",
      },
      {
        title: "FOTOPSIAS POR DIA POR HORA",
        component: "ChartHour",
      },
      {
        title: "FOTOPSIAS POR DIA POR SEMANA",
        component: "ChartWeekdays",
      },
      {
        title: "FOTOPSIAS POR DIA POR SEMANA",
        component: "ChartDaysAWeek",
      },
    ],
  }),
  methods: {
    openChart(chart: string) {
      this.chartSelected = chart;
      this.dialog = true;
    },
  },
  components: {
    ChartDays,
    ChartHour,
    ChartWeekdays,
    ChartDaysAWeek,
  },
});
</script>

<style>
html,
body {
  margin: 0;
}

.w-100 {
  width: 100%;
}
.h-100 {
  height: 100%;
}
</style>
