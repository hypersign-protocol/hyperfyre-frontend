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
    EventBus.$on("resetForFresh",()=>{
      this.selected = null
    })
    EventBus.$on("resetOption",(type)=>{
      for(let i=1;i<this.options.length;i++){
        if(this.options[i].value === type){
          return this.selected = this.options[0].value
        }
      }
    });
    EventBus.$on("setOption",(type)=>{
      const elm = this.options.find(x => {
        if(x && x.value === type){
          return x;
        }
      })
      
      // console.log(elm)
      this.selected = elm.value;
      // for(let i=1;i<this.options.length;i++){
      //   if(this.options[i].value === type){
      //     return this.selected = type
      //   }
      // }
    });
    EventBus.$on("setForParticipant",(type)=>{
      this.selected = type;
    })
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
