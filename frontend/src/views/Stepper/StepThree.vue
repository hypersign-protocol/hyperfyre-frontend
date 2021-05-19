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
  opacity: 0;
}
input:read-only {
  background: none;
  padding: 0px;
  font-weight: bolder;
  color: grey;
}
label {
  font-weight: bold;
  text-align: left;
  display: block;
  text-transform: uppercase;
  color: rgb(58, 58, 58);
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

          <!-- <vue-recaptcha sitekey="Your key here"></vue-recaptcha> -->

          <vue-recaptcha 
                  ref="recaptcha" 
                  size="invisible" 
                  :sitekey="$config.recaptchaSiteKey" 
                  :loadRecaptchaScript="true" 
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
            ></vue-recaptcha>

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
import VueRecaptcha from "vue-recaptcha";
// This components will have the content for each stepper step.

export default {
  name: "StepThree",
  props: {
    stepTwoData: {
      type: Object,
    },
  },
  data(){
    return {
      recaptchaSiteKey: ""
    }
  },
  components: {
    VueRecaptcha,
  },

  mounted() {
    console.log(this.$config);
    console.log(this.stepTwoData);
  },
  methods: {
    onCaptchaExpired: function () {
      console.log('Captcha expired')
      this.$refs.recaptcha.reset();
    },
    onCaptchaVerified: function (recaptchaToken) {
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();
      // this.signup(recaptchaToken)
    },
  }
};
</script>
