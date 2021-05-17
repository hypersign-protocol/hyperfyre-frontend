<style scoped>
input,
input:focus {
  background-color: rgb(236, 238, 245);
  color: rgb(58, 58, 58);
  outline: none !important;
  border: 0;
  box-shadow: none;
}
label {
  font-weight: bold;
  text-align: left;
  display: block;
  text-transform: uppercase;
}
input::placeholder {
  color: rgb(171, 176, 199);
}
.avatar-upload {
  margin-top: 20px;
}
div.form {
  margin-left: 50px;
}
form {
  margin-top: 100px;
}

div.form > div {
  width: calc(50% - 50px);
  margin: 20px 0px;
}
</style>
<template>
  <div>
    <div>
      <form class="d-flex">
        <div class="avatar-upload">
          <label for="avatar">
            <div class="">
              <img width="100px" :src="stepTwoData.imgLink" />
            </div>
          </label>
          <input
            v-on:change="stepTwoData.handleImageChange"
            type="file"
            accept="image/*"
            id="avatar"
            class="d-none"
          />
        </div>

        <div class="form d-flex flex-wrap justify-content-between">
          <div
            :class="[data.fullWidth ? 'w-100' : '']"
            v-for="(data, idx) in stepTwoData.formData"
            :key="idx"
          >
            <label class="form-label">{{ data.label }}</label>
            <input
              v-model="stepTwoData.formData[idx].value"
              class="form-control"
              :placeholder="data.placeholder"
            />
          </div>

          <div class="w-100">
            <!-- <div class="d-flex align-items-end">
              <label>Applying for galaxy tier ?*</label>
              <div class="d-flex mx-5">
                <div>
                  <label for="galaxyTierYes">YES</label>
                  <input
                    checked
                    id="galaxyTierYes"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
                <div class="mx-3">
                  <label for="galaxyTierNo">NO</label>
                  <input
                    id="galaxyTierNo"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
              </div>
        
         
            </div> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// This components will have the content for each stepper step.

export default {
  name: "StepTwo",
  props: {
    stepTwoData: {
      type: Object,
    },
  },
};
</script>
