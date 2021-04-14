<template>
  <div class="row">
    <div class="col-12" v-if="displayChart">
      <line-chart
        style="height: 250px"
        :chart-data="purpleLineChart.chartData"
        :gradient-color="purpleLineChart.gradientColors"
        :gradient-stops="purpleLineChart.gradientStops"
        :extra-options="purpleLineChart.extraOptions"
      >
      </line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
export default {
  components: { LineChart },
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
      purpleLineChart: {
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          title: {
            display: true,
            text: this.title
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
              label: "Real Data",
              fill: true,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: []
            },
            {
              label: "CPU",
              fill: true,
              borderColor: "#1cde15",
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
      this.purpleLineChart.chartData.labels = this.values.filter(
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
        this.purpleLineChart.chartData.datasets[0].data.push(counts[e]);
        this.purpleLineChart.chartData.datasets[1].data.push(
          counts[e] + Math.floor(Math.random() * 10)
        );
      });
      this.purpleLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMax =
        max + 10;

      this.displayChart = true;
    }
  }
};
</script>

<style scoped></style>
