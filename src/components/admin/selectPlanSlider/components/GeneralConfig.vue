<style scoped>
.datetime-picker {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
.datetime-picker input {
  background-color: red !important;
  min-width: 0px !important;
}
.datetime-picker input#tj-datetime-input {
  display: none;
  border: none !important;
  min-width: none !important;
}
</style>

<template>
  <div>
    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
      <div class="text-left col-lg-3 col-md-3 text-left">
        <label for="did" class="col-form-label">Event Id: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <input disabled v-model="project._id" type="text" id="did" class="form-control w-100" />
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <label for="projectName" class="col-form-label">Event Name<span style="color: red">*</span>: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <input
          v-model="project.projectName"
          type="text"
          placeholder="Demo Giveaway"
          id="projectName"
          class="form-control w-100"
        />
      </div>
    </div>

    <div v-if="isProjectEditing" class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <label for="projectStatus" class="col-form-label">Status: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <select class="form-control" v-model="project.projectStatus">
          <option value="true">OPEN</option>
          <option value="false">CLOSE</option>
        </select>
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <label for="logoUrl" class="col-form-label">Banner URL<span style="color: red">*</span>: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <input
          v-model="project.logoUrl"
          type="text"
          placeholder="of size 600x300"
          id="logoUrl"
          class="form-control w-100"
        />
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <label for="startDate" class="col-form-label">Start Date<span style="color: red">*</span>: </label>
      </div>

      <div class="col-lg-9 col-md-9 px-0 datepicker">
        <datepicker v-model="project.fromDate" name="fromDate" format="YYYY-MM-DD h:i:s" />
      </div>
    </div>

    <div class="row g-3 align-items-center w-100 mt-4">
      <div class="col-lg-3 col-md-3 text-left">
        <label for="endDate" class="col-form-label">End Date<span style="color: red">*</span>: </label>
      </div>
      <div class="col-lg-9 col-md-9 px-0">
        <!-- <input disabled  v-model="project.toDate" type="text"   id="fromDate" class="form-control w-100" > -->
        <Datepicker class="datepicker" v-model="project.toDate" name="toDate" format="YYYY-MM-DD h:i:s" />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datetimepicker";

export default {
  name: "GeneralConfig",
  components: { Datepicker },
  data() {
    return {
      themeColorLocal: this.themeColor,
      fontColorLocal: this.fontColor,
    };
  },
  props: {
    project: {
      type: Object,
    },
    themeColorDefault: {
      type: String,
    },
    fontColorDefault: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    themeColor: {
      type: String,
    },
    isProjectEditing: {
      type: Boolean,
    },
  },
};
</script>
