<template>
  <card>
    <template slot="header">
      <div class="row">
        <div class="col-sm-6" :class="'text-left'">
          <h5 class="card-category">{{ subtitle }}</h5>
          <h2 class="card-title">{{ title }}</h2>
        </div>
      </div>
    </template>
    <div class="row" v-if="displayComparableInput">
      <div class="col-sm-12 col-lg-2">
        <input
          type="number"
          placeholder="Comparable"
          class="form-control"
          min="0"
          v-model="comparableContability"
        />
      </div>
    </div>
    <div class="row">
      <div :class="comparableContability > 0 ? 'col-sm-12 col-lg-6' : 'col-12'">
        <label class="control-label text-left">Arquivo principal</label>
        <input
          type="file"
          id="main"
          class="form-control"
          @change="onFileChange"
        />
      </div>
      <div
        class="col-lg-6 col-sm-12"
        v-for="(i, index) in comparableRules"
        :key="index"
      >
        <label class="control-label text-left"
          >Arquivo comparável nº {{ i }}</label
        >
        <input
          type="file"
          :id="i"
          class="form-control"
          @change="onFileChange"
          :disabled="comparableDisabled"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <base-button type="info" class="btn-block" @click="process"
          >Processar...</base-button
        >
      </div>
    </div>
  </card>
</template>

<script>
import Card from "@/components/Cards/Card";

export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    comparable: {
      type: Number,
      required: false,
      default: () => {
        return 0;
      }
    },
    displayComparableInput: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      comparableContability: 1,
      comparableDisabled: true,
      jsonFiles: {
        main: undefined,
        comparables: []
      }
    };
  },
  computed: {
    comparableRules() {
      if (this.displayComparableInput)
        return parseInt(this.comparableContability);
      if (this.comparable === 0)
        throw new Error("Prop comparable is mandatory");
      return parseInt(this.comparable);
    }
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0], e.target.id);
    },
    readFile(file, inputId) {
      let reader = new FileReader();
      reader.onload = e => {
        let json = JSON.parse(e.target.result);
        if (inputId === "main") {
          this.jsonFiles.main = json;
          this.jsonFiles.comparables = [];
          this.comparableDisabled = false;
        } else {
          if (this.comparableValidate(json, inputId)) {
            this.jsonFiles.comparables[`${inputId}`] = json;
          } else {
            document.getElementById(inputId).value = null;
          }
        }
      };
      console.log(this.jsonFiles);
      reader.readAsText(file);
    },
    comparableValidate(json, inputId) {
      let result = true;
      let properties = Object.getOwnPropertyNames(json);
      let mainProperties = Object.getOwnPropertyNames(this.jsonFiles.main);
      properties.forEach(property => {
        if (!mainProperties.includes(property)) {
          result = false;
          this.$notify({
            type: "danger",
            message: `O arquivo comparável nº ${inputId} contém uma propriedade inválida ${property}`
          });
        }
      });
      return result;
    },
    process() {
      if (this.jsonFiles.main === undefined) {
        this.$notify({
          type: "danger",
          message: "Arquivo principal pendente!"
        });
      } else if (
        this.comparable > 0 &&
        this.jsonFiles.comparables.length === 0
      ) {
        this.$notify({
          type: "danger",
          message: "Arquivo comparável pendente!"
        });
      } else {
        this.$emit("submit:form", this.jsonFiles);
      }
    }
  }
};
</script>

<style scoped></style>
