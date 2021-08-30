<template lang="pug">
.h-100
  .text-h6.text-center.pt-3 FOTOPSIAS POR DIA POR SEMANA
  grid-container.h-100(rows="200px 200px 200px")
    div(v-for="(item, i) in xAxis")
      apexchart(
        :key="i",
        :options="chartOptions(i)",
        :series="series(i)",
        type="line",
        height="100%"
      )
</template>

<script lang="ts">
import Vue from "vue";
import rawData from "../data";
import { IntervalDays } from "../models/IntervalDays";
import { Day } from "../models/Day";
import { addDays } from "date-fns";

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

const days = Object.values(symptomsInterval.days);

let weeks: Day[][] = [];

for (const day of days) {
  if (
    !weeks.length ||
    !weeks[weeks.length - 1] ||
    weeks[weeks.length - 1].length === 7
  ) {
    weeks.push([]);
  }

  weeks[weeks.length - 1].push(day);
}

weeks = weeks.map((week) => {
  if (week.length === 7) return week;

  while (week.length < 7) {
    const d = week[week.length - 1].date;
    week.push(new Day(addDays(d, 1)));
  }

  return week;
});

export default Vue.extend({
  computed: {
    xAxis() {
      return weeks.map((week) => week.map((day) => day.date.toISOString()));
    },
    yAxis() {
      return weeks.map((week) => week.map((day) => day.quant));
    },
    series() {
      return (i: number) => {
        const yAxys: number[] = this.yAxis[i];

        return [
          {
            name: "Semana " + (i + 1),
            data: yAxys,
          },
        ];
      };
    },
    chartOptions() {
      return (i: number) => ({
        title: {
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
          type: "datetime",
          categories: this.xAxis[i],
        },
        markers: {
          size: 3,
        },
      });
    },
  },
});
</script>
