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
      return Object.values(symptomsInterval.days).map(({ date }) =>
        date.toISOString()
      );
    },
    yAxis() {
      const days = Object.values(symptomsInterval.days);

      return days.map((day, i) => day.quant - (i >= 1 ? days[i - 1].quant : 0));
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
          text: "TAXA DE VARIAÇÃO DE FOTOPSIAS POR DIA",
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
          width: 2,
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: "datetime",
          categories: this.xAxis,
        },
        markers: {
          size: 3,
        },
      };
    },
  },
});
</script>
