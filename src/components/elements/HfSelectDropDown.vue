<template>
  <div>
    <b-form-select
      v-model="selected"
      @input="selectOption"
      :placeholder="placeholder"
      :text-field="textField"
      :value-field="valueField"
      :options="options"
    ></b-form-select>
  </div>

</template>

<script>
import EventBus from "../../eventBus"
export default {
  name: "HfSelectDropDown",
  data() {
    return {
      selected: null
    }
  },
  props: {
    placeholder: {
      type: String,
      require: false,
    },
    options: {
      type: Array,
      require: false,
    },
    textField: {
      type: String,
      require: false,
    },
    valueField: {
      type: String,
      require: false,
    },
  },
  mounted(){
    EventBus.$on("resetOption",()=>{
      this.selected = null
    });
    EventBus.$on("setOption",(type)=>{
      this.selected = type
    });
  },
  methods: {
    selectOption(e) {
      this.selected = e
      this.$emit("selected", this.selected);
    },
  },
};
</script>

<style></style>
