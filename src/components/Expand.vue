<template>
  <div class="row">
    <div class="col-12 text-left">
      <card type="nav-tabs">
        <h4 class="card-title">{{ title }}</h4>
        <h5 class="card-category">{{ subTitle }}</h5>
        <div :class="expand ? '' : 'hide'">
          <slot name="expandBody" />
        </div>
      </card>
    </div>
    <div class="col-12">
      <base-button
        type="info"
        class="btn-block"
        simple
        id="expandBodyButton"
        @click="expand = !expand"
      >
        <i :class="icon"></i>
      </base-button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Cards/Card";
export default {
  components: { Card },
  props: {
    title: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    subTitle: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      expand: true
    };
  },
  computed: {
    icon() {
      if (this.expand) return "tim-icons icon-minimal-up";
      return "tim-icons icon-minimal-down";
    }
  },
  methods: {}
};
</script>
<style>
.hide {
  display: none;
}
</style>
