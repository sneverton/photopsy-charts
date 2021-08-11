<template lang="pug">
apexchart(type="line", height="100%", :options="chartOptions", :series="series")
</template>

<script lang="ts">
import Vue from "vue";
import rawData from "../data";
import { IntervalDays } from "../models/IntervalDays";

declare module "vue/types/vue" {
  interface Vue {
    xAxis: [];
    yAxis: [];
  }
}

const symptomsInterval = new IntervalDays(
  new Date(rawData[0][0]),
  new Date(rawData[rawData.length - 1][0])
);

symptomsInterval.addMomentEvents(rawData);

export default Vue.extend({
  computed: {
    xAxis() {
      return Array.from({ length: 24 }, (v, i) => i + "h");
    },
    yAxis() {
      return Object.values(symptomsInterval.days)
        .map((day) => day.hours)
        .reduce((r, hours) => {
          if (!r.length) {
            r = hours;
          } else {
            hours.forEach((h, i) => (r[i] = r[i].concat(h)));
          }

          return r;
        }, [])
        .map((hour) => hour.reduce((r, { quant }) => r + quant, 0))
        .map((quant) => quant);
    },
    series() {
      return [
        {
          data: this.yAxis,
        },
      ];
    },
    chartOptions() {
      return {
        title: {
          text: "FOTOPSIAS POR HORA",
          align: "center",
          offsetY: 20,
        },
        chart: {
          type: "line",
          height: "100%",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 3,
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: "categories",
          categories: this.xAxis,
        },
      };
    },
    height() {
      return document.documentElement.clientHeight - 15;
    },
  },
});
</script>
