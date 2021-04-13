<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <h5 class="card-category">Seleção do arquivo</h5>
                <h2 class="card-title">Arquivo JSON</h2>
              </div>
            </div>
          </template>
          <div class="col-lg-6 col-sm-12 border">
            <base-input
              label="Arquivo"
              type="file"
              accept="application/JSON"
              @change="onFileChange"
              placeholder="Click aqui e selecione o arquivo desejado"
            >
              <small slot="helperText" class="form-text text-muted"
                >Click aqui e selecione o arquivo desejado.</small
              >
              <template #helperText>
                <small class="form-text text-muted"
                  >Click aqui e selecione o arquivo desejado.</small
                >
              </template>
            </base-input>
          </div>
        </card>
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
                  class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  :key="property"
                >
                  <div class="font-icon-detail-blue">
                    <h5>{{ property }}</h5>
                    <p>{{ getJsonValueByProperty(property) }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-sm-12 col-lg-3"
                  v-for="property in joinProperties"
                  :key="property"
                >
                  <repetition-graph
                    :title="property"
                    :values="getJsonValueByArrayProperty(property)"
                  />
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
import BaseInput from "@/components/Inputs/BaseInput";
import Expand from "@/components/Expand";
import KeysList from "@/components/KeysList";
import RepetitionGraph from "@/components/RepetitionGraph";

export default {
  components: { RepetitionGraph, KeysList, Expand, BaseInput, Card },
  data() {
    return {
      jsonFile: "",
      singleProperties: [],
      selectedProperties: [],
      joinProperties: []
    };
  },
  methods: {
    onFileChange(e) {
      this.jsonFile = "";
      this.singleProperties = [];
      this.selectedProperties = [];
      this.joinProperties = [];
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file) {
      let reader = new FileReader();
      reader.onload = e => {
        let json = JSON.parse(e.target.result);
        this.jsonFile = json;
        let properties = Object.getOwnPropertyNames(json);
        properties.forEach(property => {
          if (Array.isArray(json[property])) {
            this.joinProperties.push(property);
          } else {
            this.singleProperties.push(property);
          }
        });
      };
      reader.readAsText(file);
    },
    getJsonValueByProperty(property) {
      return this.jsonFile[property].toString();
    },
    getJsonValueByArrayProperty(property) {
      return this.jsonFile[property];
    },
    keylist(v) {
      this.selectedProperties = [...v];
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
