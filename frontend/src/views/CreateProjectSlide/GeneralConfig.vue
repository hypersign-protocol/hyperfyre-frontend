<style scoped>


.datetime-picker{
   background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    
    
}
.datetime-picker input#tj-datetime-input{
    display: none;
    border: none !important;
    min-width: none !important;
}
input[data-v-4bd11526]{
    display: none !important;   
}


</style>
</style>
<template>
  <div>
      <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="did" class="col-form-label">Project Id: </label>
            </div>
            <div class="col-auto">
                <input disabled  v-model="project._id" type="text"   id="did" class="form-control w-100" >
            </div>  
    </div>

   <div class="row g-3 align-items-center w-100  mt-4">
            <div class="col-auto mr-auto">
                <label for="projectName" class="col-form-label">Project Name: </label>
            </div>
            <div class="col-auto">
                <input v-model="project.projectName" type="text" placeholder="Project Name" id="projectName" class="form-control w-100" >
            </div>   
    </div>

    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="projectStatus" class="col-form-label">Project Status: </label>
            </div>
            <div class="col-auto">
                
                 <select class="form-control" v-model="project.projectStatus" style="width: 239px;">
                      <option value="true" >OPEN</option>
                      <option value="false">CLOSE</option>
                </select >
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
            <div class="col-auto ml-auto">
                <Datepicker 
                     
                      v-model="project.fromDate"
                       format="YYYY-MM-DD h:i:s"  />
            </div>  
    </div>



      
    <div class="row g-3 align-items-center w-100 mt-4">
            <div class="col-auto mr-auto">
                <label for="endDate" class="col-form-label">End Date: </label>
            </div>
            <div class="col-auto">
                
               <Datepicker 
    
    
                    v-model="project.toDate"
                       
                       
                       format="YYYY-MM-DD h:i:s" />
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
  mounted() {
      console.log(project)
  },
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
      },
    isProjectEditing: {
      type: Boolean
    }
  }
};


</script>

