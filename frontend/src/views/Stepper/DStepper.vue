<template>
  <div class="d-stepper">
    <loading
      :active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <div class="header w-100 text-left text-white">
      <div class="logo bg-white d-inline-block p-3 px-5">
        <img width="120px" :src="projectDetails.logoUrl" />
      </div>
      <div class="text mx-auto  py-3 text-left">
        <h4>
          Apply to
          <span class="text-uppercase">{{ projectDetails.projectName }}</span>
          Whitelist
        </h4>
        <p>{{ step == 0 ? stepOneData.line1 : stepTwoData.line1 }}</p>
        <p>{{ step == 0 ? stepOneData.line2 : stepTwoData.line2 }}</p>
      </div>
    </div>

    <div v-if="showStepper" class="steps-container">
      <div
        v-if="step + 1 !== 4"
        class="steps-indicator d-flex align-items-center"
      >
        <p class="heading my-0">
          {{
            step + 1 == 1
              ? "Rules"
              : step + 1 == 2
              ? "Please fill the form"
              : "Please confirm your data"
          }}
        </p>

        <p class="text-right ml-auto my-0">Step {{ step + 1 }} of 3</p>
      </div>
      <div class="steps">
        <div class="d-stepper-header d-flex justify-content-around">
          <div
            class="step-number-content text-center"
            :class="{ active: step == i }"
            v-for="(stepItem, i) in steps"
            :key="i"
          >
            <div
              class="step-number align-items-center justify-content-center mx-auto"
              :class="stepNumberClasses(i)"
            >
              <i v-if="step > i" class="fas fa-check"></i>
              <i
                v-else-if="step === i && fatalError"
                class="fas fa-exclamation"
              ></i>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <div class="mt-1 small">{{ stepItem.name }}</div>
          </div>
        </div>

        <b-card
          class="my-0 border-0 overflow-hidden"
          bg-variant="light"
          no-body
          :class="{ 'border-danger': error, 'shake-error': shake }"
          v-loading="loading"
        >
          <b-card-body class="w-100 border-0 d-block">
            <div v-if="steps[step].icon" class="d-none d-sm-block"></div>
            <div>
              <!-- <h3>{{ step + 1 }}. {{ steps[step].name }}</h3>
            <p class="text-muted">{{ steps[step].desc }}</p> -->

              <div v-if="!fatalError">
                <transition :name="effect" mode="out-in">
                  <keep-alive>
                    <component
                      :projectDetails="projectDetails"
                      :stepOneData="stepOneData"
                      :stepTwoData="stepTwoData"
                      :store="store"
                      :state="state"
                      :step="step"
                      :setState="setState"
                      ref="step"
                      :is="stepComponent"
                      @loading="loadingAction"
                      @error="errorHandler"
                      @fatal-error="blockStepper"
                      @can-continue="nextStepAction"
                      @set-step="setStep"
                    />
                  </keep-alive>
                </transition>
              </div>
              <div v-else>{{ fatalErrorMsg }}</div>
            </div>
          </b-card-body>
        </b-card>

        <div class=" d-flex btn-container" v-if="!fatalError">
          <b-button
            v-if="step > 0 && step < steps.length - 1"
            variant="dark"
            :disabled="loading"
            class="text-primary back-btn"
            @click="backStep"
          >
            <i class="fas fa-angle-double-left"></i> Back
          </b-button>

          <b-button
            v-if="step < steps.length - 1"
            variant="dark"
            class="ml-2 next-btn"
            @click="nextStep"
            :disabled="loading"
          >
            {{ step + 1 == 3 ? "Submit" : "Next" }}
          </b-button>

          <b-button
            v-if="steps[step].confirm"
            variant="success"
            class="ml-2"
            @click="$emit('confirm')"
            >{{ steps[step].confirm }}</b-button
          >
        </div>
      </div>
    </div>
    <div v-else class="steps-container no-stepper" style="height:100px">
      <h2 class="text-center w-100 text-danger">Project Id Not found</h2>
    </div>

    <div class="footer">
      <div class="rule w-75 mx-auto" />
      <div class="d-flex justify-content-between align-items-center">
        <div class="footer-logo">
          <p class="m-0 text-white" style="font-weight: bold">Powered By</p>
          <a href="">
            <img width="120px" :src="require('../../assets/footerLogo.png')" />
          </a>
        </div>
        <div class="social d-flex">
          <div>
            <a href="https://t.me/hypersignchain" target="_blank">
              <img
                width="30px"
                :src="require(`../../assets/telegramIcon.png`)"
              />
            </a>
          </div>
          <div class="mx-3">
            <a href="https://twitter.com/hypersignchain" target="_blank">
              <img width="30px" :src="require(`../../assets/instaIcon.png`)" />
            </a>
          </div>
          <div>
            <a href="https://twitter.com/hypersignchain" target="_blank">
              <img
                width="30px"
                :src="require(`../../assets/twitterIcon.png`)"
              />
            </a>
          </div>
        </div>
        <div class="logo-partner"></div>
      </div>
    </div>
    <vue-recaptcha
      v-if="step + 1 == 3"
      ref="recaptcha"
      size="invisible"
      :sitekey="$config.recaptchaSiteKey"
      :loadRecaptchaScript="true"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
    ></vue-recaptcha>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import VueRecaptcha from "vue-recaptcha";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "DStepper",

  components: { Loading, VueRecaptcha },
  props: {
    steps: { type: Array, default: () => [] },
    initialState: { type: Object, default: () => ({}) },
    stepOneData: {
      type: Object,
    },
    stepTwoData: {
      type: Object,
    },
  },

  data() {
    return {
      showStepper: true,
      data: this.stepTwoData,
      store: {
        state: this.initialState,
        setState: this.setState,
        resetState: this.resetState,
      },
      step: 0,
      loading: false,
      error: false,
      fatalError: false,
      fatalErrorMsg: "",
      effect: "in-out-translate-fade",
      shake: false,
      isLoading: false,
      authToken: localStorage.getItem("authToken"),
      fullPage: true,
      projectDetails: {},
      projectId: ""
    };
  },

  created() {
    if (
      !this.$route.query.projectId ||
      this.$route.query.projectId == "undefined"
    ) {
      this.showStepper = false;
      return;
    }


    this.projectId = this.$route.query.projectId;
    const userDid = JSON.parse(localStorage.getItem("user")).id;
    

    this.checkIfAlreadyFilled(userDid);
    this.fetchProjectData();
  },
  mounted() {
    this.data =
      this.step == 0 || this.step == 0 ? this.stepOneData : this.stepTwoData;

    
  },

  computed: {
    activeStep() {
      return this.steps[this.step];
    },
    stepComponent() {
      return this.steps[this.step].component;
    },
    iconClasses() {
      if (!this.activeStep.icon) return "";
      else if (/\s/.test(this.activeStep.icon)) return this.activeStep.icon;
      return `fas ${this.activeStep.icon}`;
    },
  },

  methods: {
    setStep(step) {
      if (step >= 1 && step <= this.steps.length) this.step = step - 1;
    },
    resetState() {
      this.store.state = {
        ...this.initialState,
      };
    },
    setState(key, value) {
      this.store.state = {
        ...this.store.state,
        [key]: value,
      };
    },
    errorHandler(payload) {
      this.error = payload;
      this.shake = payload;
      setTimeout(() => {
        this.shake = !payload;
      }, 750);
    },
    blockStepper(msg) {
      this.resetParams();
      this.fatalErrorMsg = msg;
      this.fatalError = true;
    },
    resetParams() {
      this.error = false;
      this.loading = false;
      this.fatalErrorMsg = "";
      this.fatalError = false;
    },
    stepNumberClasses(i) {
      return {
        "bg-primary text-white": this.step === i && !this.fatalError,
        "bg-success text-white": this.step > i && !this.fatalerror,
        "bg-danger text-white": this.fatalError && this.step === i,
        "text-primary": this.step < i,
      };
    },
    nextStep() {
      const step = this.step + 1;
      const data = step == 1 ? this.stepOneData : this.stepTwoData;

      let gotoNextPage = false;

      if (step == 1) {
        const isAllChecked = data.rules.every((rule) => rule.checked);
        const tweetFilled =
          data.rules[1].tweetUrl.trim().length !== 0 ? true : false;

        if (isAllChecked && tweetFilled) {
          gotoNextPage = true;
          this.slideToNextPage(gotoNextPage);
        } else {
          this.$notify({
            group: "foo",
            title: "Error",
            type: "error",
            text: "Please follow all the rules and provide a tweet URL",
          });
        }
      } else if (step == 2) {
        const isAllFilled = data.formData.every((input) => input.value.length);
        if (isAllFilled) {
          gotoNextPage = true;
          this.slideToNextPage(gotoNextPage);
        } else {
          this.$notify({
            group: "foo",
            title: "Error",
            type: "error",
            text: "Please fill the form properly",
          });
        }
      } else if (step == 3) {
        this.$refs.recaptcha.execute();
      }
    },

    slideToNextPage(gotoNextPage) {
      if (gotoNextPage) {
        if (!this.$refs.step.nextStep) return this.nextStepAction();

        if (this.$refs.step.nextStep()) {
          if (!this.loading) {
            this.nextStepAction();
          }
        }
      }
    },

    nextStepAction() {
      this.effect = "in-out-translate-fade";
      this.resetParams();
      if (this.step < this.steps.length - 1) this.step++;
    },
    backStep() {
      this.effect = "out-in-translate-fade";
      this.resetParams();
      if (this.step > 0) this.step--;
    },
    loadingAction(status) {
      this.loading = status;
      //if (!status) this.nextStepAction();
    },
    async saveInvestor(data, recaptchaToken) {
      try {
        let investor = {};
        const did = JSON.parse(localStorage.getItem("user")).id;

        this.isLoading = true;

        // BUILDING UP THE INVESTOR OBJECT, TO SEND TO API
        for (let i in data) {
          investor[data[i].id] = data[i].value;
        }
        investor.projectId = this.projectId;
        investor.did = did;

        investor.tweetUrl = this.stepOneData.rules[1].tweetUrl;

        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?rcToken=${recaptchaToken}`;
        let headers = {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${this.authToken}`
        };

        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(investor),
          headers,
        });
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }
        const json = await resp.json();
        console.log(json);

        this.isLoading = false;
        this.slideToNextPage(true);
        this.$notify({
          group: "foo",
          title: "Success",
          type: "success",
          text: "Successfully Signed Up",
        });
      } catch (err) {
        console.log("ERROR", err);
        this.$notify({
          group: "foo",
          title: "Something went wrong",
          type: "error",
          text: err.message,
        });
        this.isLoading = false;
      } finally {
        console.log("FINALLY ");
        // this.isLoading = false;
        // this.clear();
      }
    },

    async checkIfAlreadyFilled(userDid) {
      try {
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?did=${userDid}&projectId=${this.projectId}`;
        let headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.authToken}`
        };

        const res = await fetch(url, {
          headers,
          method: "GET"
        });

        if (res.status !== 200) {
          throw new Error(res.statusText);
        }

        const resData = await res.json();
        
        if (resData.length > 0) {
          this.step = 3;
        }
      } catch (e) {
        console.log(e);
      } finally {
        // this.isLoading = false;
        // this.clear();
      }
    },

    onCaptchaExpired: function() {
      console.log("Captcha expired");
      this.$refs.recaptcha.reset();
    },

    onCaptchaVerified: function(recaptchaToken) {
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();
      this.saveInvestor(this.stepTwoData.formData, recaptchaToken);
    },
    async fetchProjectData() {
      try {
        console.log("fetching the project detials. ...... ")
        console.log(this.authToken)
        this.isLoading = true;

        if (!this.$route.query.projectId) throw new Error("No project found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.projectId}`;

        console.log(url);

        let headers = {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${this.authToken}`
        };
        console.log(headers)
        const resp = await fetch(url, {
          headers,
          method: "GET"
        });

        console.log("RESP", resp);
        if (resp.status != 200) {
          throw new Error(resp.statusText);
        }

        const json = await resp.json();
        this.projectDetails = { ...json };

        for (let i in this.stepOneData.rules) {
          this.stepOneData.rules[i].text = this.stepOneData.rules[
            i
          ].text.replace("projectName", this.projectDetails.projectName);
        }
        // console.log(newStepOneDat);

        // this.project.fromDate = this.formateDate(this.project.fromDate);
        // this.project.toDate = this.formateDate(this.project.toDate);
        // this.projectFetched = true;
        // this.notifySuccess(
        //   "Project is fetched. ProjectName " + json.projectName
        // );
      } catch (e) {
        console.log(e);
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.d-stepper .d-stepper-header {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: none !important;
}

.d-stepper .d-stepper-header::before {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #ddd;
  top: 20px;
  left: 0;
  content: " ";
}

.d-stepper .step-number {
  background: #e9e9e9;
  border-radius: 50%;
  text-align: center;
  height: 40px;
  width: 40px;
  display: flex;
}
.d-stepper .step-number-content {
  transition: transform 0.2s;
  z-index: 2;
  width: 68px;
}

.d-stepper .step-number-content div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.d-stepper .step-number-content.active {
  transform: scale(1.25);
}

.in-out-translate-fade-enter-active,
.in-out-translate-fade-leave-active {
  transition: all 0.15s;
}
.in-out-translate-fade-enter,
.in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translateX(100px);
}
.in-out-translate-fade-leave-active {
  transform: translateX(-100px);
}

.out-in-translate-fade-enter-active,
.out-in-translate-fade-leave-active {
  transition: all 0.15s;
}
.out-in-translate-fade-enter,
.out-in-translate-fade-leave-active {
  opacity: 0;
}
.out-in-translate-fade-enter {
  transform: translateX(-100px);
}
.out-in-translate-fade-leave-active {
  transform: translateX(100px);
}
.card.my-4 {
  border: 0;
}

.header,
.footer {
  background-color: rgba(58, 58, 58, 1);
}
.header {
  height: 275px;
}
.footer {
  padding: 10px 30px;
}
.header .logo {
  border-bottom-right-radius: 20px;
}
.header .text {
  width: 70%;
}
div.rule {
  border-bottom: 1px solid #ffffff;
  padding-top: 20px;
  margin-bottom: 20px;
}
.steps-container {
  min-height: 60vh;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}

.steps-container.no-stepper {
  min-height: 60vh;
}
.steps-container .steps {
  width: 100%;
}

.btn-container {
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 20px;
}
.btn-container button {
  border-radius: 25px;
  width: 120px;
  background-color: rgb(58, 58, 58);
  color: #ffffff !important;
}
.steps-indicator {
  position: absolute;
  top: 60px;
  font-weight: bolder;
  z-index: 100;
  width: 100%;
}
.steps-indicator .heading {
  font-size: 22px;
}
</style>
