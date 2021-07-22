<style scoped>
.datetimepicker{
    border: 1px solid;
}
</style>
</style>
<template>
  <div>
   <div class="row g-3 align-items-center w-100">
            <div class="col-auto mr-auto">
                <label for="projectName" class="col-form-label">Project Name: </label>
            </div>
            <div class="col-auto">
                <input v-model="project.projectName" type="text" placeholder="Project Name" id="projectName" class="form-control w-100" >
            </div>   
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="logoUrl" class="col-form-label">Logo URL: </label>
            </div>
            <div class="col-auto">
                <input v-model="project.logoUrl" type="text" placeholder="Logo URL" id="logoUrl" class="form-control w-100" >
            </div>  
    </div>

      
    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="startDate" class="col-form-label">Start Date: </label>
            </div>
            <div class="col-auto">
                <Datepicker 
                      name="uniquename"
                      v-model="project.fromDate"
                      input-class="form-control datetimepicker" format="YYYY-MM-DD h:i:s" width="100%"/>
            </div>  
    </div>



      
    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="endDate" class="col-form-label">End Date: </label>
            </div>
            <div class="col-auto">
               <Datepicker 
                      name="uniquename"
                       v-model="project.toDate"
                      input-class="form-control datetimepicker" format="YYYY-MM-DD h:i:s" width="100%"/>
            </div>  
    </div>


      
    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="themeColor" class="col-form-label">Theme Color: </label>
            </div>
            <div class="col-auto">
                <input v-model="themeColor" type="text" :placeholder="themeColorDefault" id="themeColor" class="form-control w-100" >
            </div>  
    </div>


      
    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="fontColor" class="col-form-label">Font Color: </label>
            </div>
            <div class="col-auto">
                <input  v-model="fontColor" type="text"  :placeholder="fontColorDefault" id="fontColor" class="form-control w-100" >
            </div>  
    </div>

    
</b-form>

      
  </div>
</template>

<script>
import Datepicker from 'vuejs-datetimepicker'


export default {
  name: "GeneralConfig",
  components: {Datepicker},
  props:{
      project:{
          type: Object
      },
      themeColorDefault: {
          type: String
      },
      fontColorDefault:{
          type: String
      },
      fontColor: {
          type: String
      },
      themeColor: {
          type : String
      }


  }

  
};
</script>

