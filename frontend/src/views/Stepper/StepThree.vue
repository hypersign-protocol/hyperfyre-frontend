<style scoped>
input,
input:focus,
input:read-only {
  background: none;
  padding: 0px;
  outline: none !important;
  border: 0;
  box-shadow: none;
}
input::placeholder {
  opacity: 0.1;
}
input:read-only {
  background: none;
  padding: 0px;
  font-weight: bolder;
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

div.form > div {
  width: calc(50% - 50px);
  margin: 20px 0px;
}
</style>
<template>
  <div>
    <p class="text-right w-100">Step 3 of 3</p>
    <div>
      <h4 class="text-left my-4">Please fill out the folowing information</h4>

      <form class="d-flex">
        <div class="avatar-upload">
          <label for="avatar">
            <div class="">
              <img width="100px" :src="stepTwoData.imgLink" />
            </div>
          </label>
          <input
            readonly
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
              readonly
              v-bind:value="data.value"
              class="form-control"
              :placeholder="data.placeholder"
            />
          </div>

          <div class="w-100">
            <!--             
            <div class="d-flex align-items-end">
              <label>Applying for galaxy tier ?*</label>
              <div class="d-flex mx-5">
                <div>
                  <label for="galaxyTierYes">YES</label>
                  <input
                    disabled
                    id="galaxyTierYes"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
                <div class="mx-3">
                  <label for="galaxyTierNo">NO</label>
                  <input
                    disabled
                    id="galaxyTierNo"
                    name="galaxyTier"
                    type="radio"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          --></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// This components will have the content for each stepper step.

export default {
  name: "StepThree",
  props: {
    stepTwoData: {
      type: Object,
    },
  },

  mounted() {
    console.log("asd");
    console.log(this.stepTwoData);
  },
};
</script>
