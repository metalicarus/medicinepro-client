<template>
  <div class="row">
    <div class="col-12" v-if="displayChart">
      {{ title }}
      <bar-chart
        style="height: 150px"
        :chart-data="blueBarChart.chartData"
        :gradient-color="blueBarChart.gradientColors"
        :gradient-stops="blueBarChart.gradientStops"
        :extra-options="blueBarChart.extraOptions"
      >
      </bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Charts/BarChart";

export default {
  components: { BarChart },
  props: {
    values: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initGraph();
  },
  data() {
    return {
      displayChart: false,
      blueBarChart: {
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10,
                  padding: 20,
                  fontColor: "#9e9e9e"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  padding: 20,
                  fontColor: "#9e9e9e"
                }
              }
            ]
          }
        },
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: []
            }
          ]
        },
        gradientColors: [
          "rgba(29,140,248,0.2)",
          "rgba(29,140,248,0.0)",
          "rgba(29,140,248,0)"
        ],
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  methods: {
    initGraph() {
      this.blueBarChart.chartData.labels = this.values.filter(
        (element, index, self) => {
          return index === self.indexOf(element);
        }
      );
      var counts = {};
      this.values.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      var max = 0;
      Object.getOwnPropertyNames(counts).forEach(e => {
        if (counts[e] > max) max = counts[e];
        this.blueBarChart.chartData.datasets[0].data.push(counts[e]);
      });
      this.blueBarChart.extraOptions.scales.yAxes[0].ticks.suggestedMax =
        max + 10;

      this.displayChart = true;
    }
  }
};
</script>

<style scoped></style>
