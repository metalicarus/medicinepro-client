<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <h5 class="card-category">Selecione um paciente</h5>
                <h2 class="card-title">Paciente</h2>
              </div>
            </div>
          </template>
          <div class="col-lg-6 col-sm-12">
            <base-input>
              <select class="form-control" id="patient" v-model="patient">
                <option v-for="patient in patients" :key="patient">
                  {{ patient }}
                </option>
              </select>
            </base-input>
          </div>
        </card>
      </div>
    </div>
    <div class="row" v-if="patient !== null">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <h5 class="card-category">
                  Gráfico de performance do paciente selecionado
                </h5>
                <h2 class="card-title">
                  Performance do paciente {{ patient }}
                </h2>
              </div>
              <!--<div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <template>
                    <label
                      v-for="(option, index) in bigLineChartCategories"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      :class="{ active: bigLineChart.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="bigLineChart.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                </div>
              </div> !-->
            </div>
            <div class="row">
              <div class="col-sm-12">
                <expand
                  :title="'Seleção de propriedades'"
                  :sub-title="
                    'Selecione as propriedades desejadas para o gráfico'
                  "
                >
                  <template #expandBody>
                    <keys-list
                      :keys="columns"
                      :limit="2"
                      @update:keylist="keylist"
                    />
                  </template>
                </expand>
              </div>
            </div>
          </template>
          <line-chart
            class=" "
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
            :height="150"
          />
        </card>
      </div>
    </div>
    <!--<div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary "></i> 763,215
            </h3>
          </template>
          <line-chart
            class="chart-area"
            chart-id="green-line-chart"
            :chart-data="greenLineChart.chartData"
            :gradient-colors="greenLineChart.gradientColors"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
      <div class="col-lg-4">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info "></i> 3,500€
            </h3>
          </template>
          <bar-chart
            class="chart-area"
            chart-id="blue-bar-chart"
            :chart-data="blueBarChart.chartData"
            :gradient-stops="blueBarChart.gradientStops"
            :extra-options="blueBarChart.extraOptions"
          >
          </bar-chart>
        </card>
      </div>
      <div class="col-lg-4">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success "></i> 12,100K
            </h3>
          </template>
          <line-chart
            class="chart-area"
            chart-id="purple-line-chart"
            :chart-data="purpleLineChart.chartData"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
    </div> !-->
    <div class="row" v-if="patient !== null">
      <!--<div class="col-lg-6 col-md-12">
        <card type="tasks">
          <template slot="header">
            <template v-if="!isRTL">
              <h6 class="title d-inline">Tasks(5)</h6>
            </template>
            <template v-else>
              <h6 class="title d-inline">الشحنات</h6>
            </template>
            <template v-if="!isRTL">
              <p class="card-category d-inline">Today</p>
            </template>
            <drop-down tag="div" :class="isRTL ? 'float-left' : ''">
              <button
                aria-label="Settings menu"
                data-toggle="dropdown"
                class="dropdown-toggle btn-rotate btn btn-link btn-icon"
                :class="isRTL ? 'pl-5' : ''"
              >
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <a href="#pablo" class="dropdown-item">Action</a>
                <a href="#pablo" class="dropdown-item">Another Action</a>
                <a href="#pablo" class="dropdown-item">Something else</a>
              </ul>
            </drop-down>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>!-->
      <div class="col-lg-12 col-md-12">
        <card class="card">
          <h4 slot="header" class="card-title">
            Seleção de Colunas
          </h4>
          <div>
            <task-list />
          </div>
        </card>
      </div>
      <div class="col-lg-12 col-md-12">
        <card class="card">
          <h4 slot="header" class="card-title">
            Registros Reabilitação Pulmonar
          </h4>
          <div class="table-responsive">
            <base-table
              :data="tableData"
              :columns="columns"
              table-class="text-left"
              thead-classes="text-primary text-left"
            />
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";

import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import config from "@/config";
// import json from "@/data/pulmonary.json";
import json from "@/data/pulmonaryDuplicated.json";
import BaseTable from "@/components/BaseTable";
import BaseInput from "@/components/Inputs/BaseInput";
import KeysList from "@/pages/Dashboard/KeysList";
import Expand from "@/pages/Dashboard/Expand";
export default {
  components: {
    Expand,
    KeysList,
    BaseTable,
    Card,
    LineChart,
    BarChart,
    BaseInput,
    TaskList
  },
  data() {
    return {
      json: json,
      patient: null,
      // bigLineChartCategories: ["Accounts", "Purchases", "Sessions"],
      bigLineChart: {
        allData: [
          /*[100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]*/
        ],
        activeIndex: 0,
        chartData: { datasets: [{}] },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      }
      /*greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },*/
      /*blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      },*/
      /*purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)"
        ],
        gradientStops: [1, 0.4, 0]
      }*/
    };
  },
  computed: {
    columns() {
      return Object.getOwnPropertyNames(this.json[0]);
    },
    tableData() {
      return [];
    },
    patients() {
      let keys = [];
      this.json.forEach(e => {
        if (!keys.includes(e.NOME)) keys.push(e.NOME);
      });
      return keys;
    }
  },
  methods: {
    keylist(v) {
      console.log(v);
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance Ideal",
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          },
          {
            fill: true,
            label: "Performance do paciente",
            borderColor: config.colors.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.danger,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index + 1]
          }
        ],
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ]
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted() {
    //this.initBigChart(0);
  }
};
</script>
<style></style>
