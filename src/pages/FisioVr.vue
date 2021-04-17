<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card-json-input
          title="Arquivo Json"
          subtitle="Seleção dos arquivos"
          :display-comparable-input="true"
          @submit:form="print"
        />
      </div>
    </div>
    <div class="row" v-if="jsonFile !== ''">
      <div class="col-12">
        <card type="">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <h5 class="card-category">Visualização de resultados</h5>
                <h2 class="card-title">Resultados</h2>
              </div>
            </div>
          </template>
          <div class="col-12">
            <card>
              <template slot="header">
                <h5 class="title">Dados Gerais</h5>
                <p class="category">
                  Dados encontrados durante a primeira etapa de análise
                </p>
              </template>
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
                        :keys="singleProperties"
                        @update:keylist="keylist"
                      />
                    </template>
                  </expand>
                </div>
              </div>
              <div class="row">
                <div
                  v-for="property in selectedProperties"
                  class="font-icon-list col-3"
                  :key="property"
                >
                  <div class="font-icon-detail-blue">
                    <mini-table
                      :title="property"
                      :objects="getJsonValueByPropertyTimeline(property)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-sm-12 col-lg-3"
                  v-for="property in joinProperties"
                  :key="property"
                >
                  <repetition-bar-chart
                    :title="property"
                    :objects="getJsonValueByPropertyTimeline(property)"
                  />
                </div>
              </div>
              <div class="row">
                <div
                  class="col-sm-12 col-lg-3"
                  v-for="property in joinProperties"
                  :key="property"
                >
                  <!--                  <repetition-line-chart-->
                  <!--                    :title="property"-->
                  <!--                    :values="getJsonValueByArrayProperty(property)"-->
                  <!--                  />-->
                </div>
              </div>
            </card>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Cards/Card";

import Expand from "@/components/Expand";
import KeysList from "@/components/KeysList";
import RepetitionBarChart from "@/components/RepetitionBarChart";
import RepetitionLineChart from "@/components/RepetitionLineChart";
import CardJsonInput from "@/components/CardJsonInput";
import MiniTable from "@/components/MiniTable";

export default {
  components: {
    MiniTable,
    CardJsonInput,
    RepetitionLineChart,
    RepetitionBarChart,
    KeysList,
    Expand,
    Card
  },
  data() {
    return {
      comparable: 0,
      jsonFile: "",
      singleProperties: [],
      selectedProperties: [],
      joinProperties: [],
      objectKeys: [],
      struct: {
        title: undefined,
        subtitle: undefined,
        value: undefined,
        isMainValue: false
      }
    };
  },
  computed: {
    toIntComparable() {
      return parseInt(this.comparable);
    }
  },
  methods: {
    getJsonValueByPropertyTimeline(property) {
      let result = [];
      this.objectKeys.forEach(key => {
        let clone = { ...this.struct };
        if (key === "main") {
          clone.isMainValue = true;
          clone.title = "principal";
          clone.value = this.jsonFile[key][property];
        } else {
          clone.isMainValue = false;
          clone.title = "comparável nº" + key;
          clone.value = this.jsonFile.comparables[key][property];
        }
        result.push(clone);
      });
      return result;
    },

    keylist(v) {
      this.selectedProperties = [...v];
    },
    print(e) {
      this.jsonFile = e;
      this.objectKeys = ["main", ...Object.keys(e.comparables)];
      let keys = Object.keys(e.main);
      keys.forEach(key => {
        if (!Array.isArray(e.main[key])) {
          this.singleProperties.push(key);
        } else {
          this.joinProperties.push(key);
        }
      });
    }
  }
};
</script>
<style>
.font-icon-detail-blue {
  padding: 45px 0 30px;

  min-height: 50px;
}
</style>
