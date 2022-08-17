<template>
  <!-- <button class="btn btn-primary button-theme" :style="buttonThemeCss"
  @click="clickBtn"
  >
  {{name}}</button> -->
  <div class="btn btn-primary button-theme" :style="buttonThemeCss"
  @click="emitExecuteAction()"
  >
  {{name}} <span v-if="iconClass"><i :class="iconClass"></i></span></div>
</template>

<script>
import config from "../../config"
export default {
    props:{
      name:String,
      iconClass: {
        type: String,
        require: false
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
    created(){
      console.log(this.name)
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
.theme {
  background-color: #363740;
  border-collapse: #363740;
  color: whitesmoke;
  border: 0;
}
</style>
