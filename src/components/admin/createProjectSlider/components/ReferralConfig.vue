<style scoped>
  .slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 15px; /* Specified height */
  background: #8080806e; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 10px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background:#fcedc8; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 10px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background: #fcedc8; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
.usageDiv {
  height: calc(1.5em + 0.75rem + 2px);
padding: 0.375rem 0.75rem;
}
</style>

<template>
  <div>
    <div class="row g-3 align-items-center w-100 mt-4">
      <div class=" text-left col-lg-5 col-md-5 text-left">
        <tool-tips infoMessage="Points the referee earns with each referral"></tool-tips> <label for="refereePoint" class="col-form-label">Referee Points<span style="color: red">*</span>: </label>
      </div>
      <div class="col-lg-7 col-md-7 px-0">
        <input
          v-model="project.refereePoint"
          type="number"
          id="refereePoint"
          class="form-control w-100"
        />
      </div>
    </div>

    <div class="row g-3 align-items-center w-100  mt-4">
      <div class="col-lg-5 col-md-5 text-left">
        <tool-tips infoMessage="Points the referred person earns when he/she fills the form using referral link"></tool-tips><label for="referralPoint" class="col-form-label"
          >Referral Points<span style="color: red">*</span>:
        </label>
      </div>
      <div class=" col-lg-7 col-md-7 px-0">
        <input
          v-model="project.referralPoint"
          type="number"
          placeholder=""
          id="referralPoint"
          class="form-control w-100"
        />
      </div>
    </div>


    <div class="row g-3 align-items-center w-100  mt-4">
      <div class="col-lg-5 col-md-5 text-left">
        <tool-tips infoMessage="% of tasks a user must do in order to receieve referral points."></tool-tips><label for="referralPoint" class="col-form-label"
          >Difficulty Level (%) :
        </label>
      </div>
      <div class=" col-lg-7 col-md-7 px-0">
        <div class="row" style="margin-left:0.6%">
          <input
          v-model="project.referralDifficulty"
          type="range"
          placeholder=""
          id="referralDifficulty"
          class="col-sm-10 form-control slider"
          min="30" max="100"
          step="10"
        />
        <small class="col-sm-2" style="color:grey">{{ project.referralDifficulty }} %</small>
        </div>
        
      </div>
    </div>
    <div
        class="row g-3 align-items-center w-100  mt-4"
      >
        <div class="text-left col-lg-3 col-md-3 usageDiv">
          <tool-tips infoMessage="Number of participants can use a referral link"></tool-tips>
          <label for="referralUsageLimit"
          >Referral Usage Limit:</label>
      </div>                    
              
        <div class="col-lg-2 col-md-2 ml-5 text-right">          
          <b-form-checkbox v-model="project.isReferralLimitEnabled" name="check-button" switch></b-form-checkbox>
          </div>  
          <div class="col-lg-2 col-md-2 px-0">
          <input
          v-if="project.isReferralLimitEnabled === true"
          v-model="project.referralUsageLimit"
          type="number"          
          id="referralUsageLimit"
          class="form-control w-100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToolTips from "../../../basic/toolTips.vue";
export default {
  name: "ReferralConfig",
  components: { ToolTips },
  data() {
    return {
      
    };
  },
  props: {
    project:{
          type: Object
      },
  },
};
</script>
