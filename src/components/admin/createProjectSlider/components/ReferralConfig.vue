<style scoped>

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
