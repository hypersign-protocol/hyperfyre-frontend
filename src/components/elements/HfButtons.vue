<template>
  <button :class="customClass ? `${customClass}` : 'btn button-theme'" :style="buttonThemeCss"
  :title="title"
  @click="emitExecuteAction()"
  >
  <span v-if="iconClass"><i :class="iconClass"></i></span>  
  {{name}} 
  </button>
</template>

<script>
import config from "../../config"
export default {
    props:{
      name:{
        type: String,
        require:true
      },
      iconClass: {
        type: String,
        require: false
      }, 
      customClass:{
        type:String,
        require:false
      },
      title:{
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

.button-theme:hover{
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>
