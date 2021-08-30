<template lang="pug">
apexchart(type="line", height="100%", :options="chartOptions", :series="series")
</template>

<script lang="ts">
import Vue from "vue";
import rawData from "../data";
import { IntervalDays } from "../models/IntervalDays";
import { Day } from "../models/Day";

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
      return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    },
    yAxis() {
      return Object.values(symptomsInterval.days)
        .reduce((r: Day[][], day) => {
          const weekday = day.date.getDay();

          if (!r[weekday]) r[weekday] = [];

          r[weekday].push(day);

          return r;
        }, [])
        .map((days: Day[]) =>
          days
            .map(({ quant }) => quant)
            .reduce((r: number, quant: number) => (r += quant), 0)
        );
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
          text: "FOTOPSIAS POR DIA DA SEMANA",
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
        markers: {
          size: 3,
        },
      };
    },
    height() {
      return document.documentElement.clientHeight - 15;
    },
  },
});
</script>
