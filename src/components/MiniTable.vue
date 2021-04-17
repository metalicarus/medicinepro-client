<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <h4>{{ title }}</h4>
        <ul class="timeline">
          <li v-for="(object, index) in objects" :key="index">
            <a target="_blank" href="#">{{ object.title }}</a>
            <a href="#" class="float-right">{{ object.subtitle }}</a>
            <p>
              {{ object.value }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniTable",
  props: {
    title: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    objects: { type: Array, required: true }
  }
};
</script>

<style scoped>
ul.timeline {
  list-style-type: none;
  position: relative;
}
ul.timeline:before {
  content: " ";
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}
ul.timeline > li {
  margin: 20px 0;
  padding-left: 20px;
}
ul.timeline > li:before {
  content: " ";
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #22c0e8;
  left: 20px;
  width: 20px;
  height: 20px;
  z-index: 400;
}
</style>
