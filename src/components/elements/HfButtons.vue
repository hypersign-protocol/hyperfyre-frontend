<template>
  <button :class="customClass ? `${customClass}` : 'btn btn-primary button-theme'" :style="buttonThemeCss"
  @click="emitExecuteAction()"
  >
    {{name}} 
    <span v-if="iconClass"><i :class="iconClass"></i></span>
  </button>
</template>

<script>
import config from "../../config"
export default {
    props:{
      name:String,
      iconClass: {
        type: String,
        require: false
      }, 
      customClass:{
        type:String,
        require:false
      }
    },
    computed:{
      buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     },
    },
    methods:{
      emitExecuteAction(){
        this.$emit("executeAction")          
      },
    }
};
</script>

<style >
.button-theme {
  background-color:  var(--button-bg-color);
  border-collapse:  var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}
</style>
