<template>
  <div class="row">
    <div class="col-sm-12">
      <base-checkbox
        inline
        class="mb-3"
        v-for="key in keys"
        :key="key"
        @input="countChecked(key)"
        :disabled="disableCheckbox(key)"
      >
        {{ key }}
      </base-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keys: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      required: false,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      checked: []
    };
  },
  methods: {
    disableCheckbox(value) {
      if (this.limit === 0) return false;
      if (this.checked.includes(value)) return false;
      return !(this.checked.length < this.limit);
    },
    countChecked(key) {
      if (this.checked.includes(key)) {
        this.checked = this.checked.filter(e => {
          return e !== key;
        });
      } else {
        this.checked.push(key);
        if (this.limit !== 0 && this.checked.length >= this.limit) {
          this.$emit("update:keylist", this.checked);
        }
      }
    }
  }
};
</script>
