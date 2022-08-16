<template>
  <!-- <button class="btn btn-primary button-theme" :style="buttonThemeCss"
  @click="clickBtn"
  >
  {{name}}</button> -->
  <div class="btn btn-primary button-theme" :style="buttonThemeCss"
  @click="clickHere">
  {{name}}</div>
</template>

<script>
import config from "../../config"
export default {
    props:{
      name:String
    },
    computed:{
     
      // name(){
      //   if(name =="Create"){
      //     name = name + `<i class="fas fa-plus text-white"></i>`
      //   }
      // },
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
        clickHere(){
          if(this.name ==="Create"){
            this.$emit("openCreateSidebar")
          }
          if(this.name === "Export"){
            this.$emit("exportAll")
          }
          
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
