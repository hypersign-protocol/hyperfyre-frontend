<template>
  <div class="d-stepper">
    <loading
      :active="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <div class="header w-100 text-left text-white">
      <div class="logo bg-white d-inline-block p-3 px-5">
        <img
          width="120px"
          src="https://thumb.tildacdn.com/tild3065-3765-4865-b331-393637653931/-/resize/150x/-/format/webp/hypersign_Yellow.png"
        />
      </div>
      <div class="text mx-auto  py-3 text-left">
        <h4>Apply to HYPERSIGN's Whitelist</h4>
        <p>{{ step == 0 ? stepOneData.line1 : stepTwoData.line1 }}</p>
        <p>{{ step == 0 ? stepOneData.line2 : stepTwoData.line2 }}</p>
      </div>
    </div>

    <div class="steps-container">
      <div class="steps-indicator d-flex align-items-center">
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
            <div v-if="steps[step].icon" class="d-none d-sm-block">
              <i class="fas fa-fw fa-3x mr-4" :class="iconClasses"></i>
            </div>
            <div>
              <!-- <h3>{{ step + 1 }}. {{ steps[step].name }}</h3>
            <p class="text-muted">{{ steps[step].desc }}</p> -->

              <div v-if="!fatalError">
                <transition :name="effect" mode="out-in">
                  <keep-alive>
                    <component
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
            <i class="fas fa-angle-double-right"></i>
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
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "DStepper",
  components: { Loading },
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
      data: this.stepOneData,
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
    };
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
        if (isAllChecked) {
          gotoNextPage = true;
          this.slideToNextPage(gotoNextPage);
        } else {
          this.$notify({
            group: "foo",
            title: "Error",
            type: "error",
            text: "Please follow all the rules and check",
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
        this.saveInvestor(data.formData)
          .then(async (res) => {
            console.log(res);
            if (res.status !== 200) {
              throw new Error(res.statusText);
            }
            const json = await res.json();
            console.log("JSON RESP", json);
            this.isLoading = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("projectId");
            localStorage.removeItem("user");
            gotoNextPage = true;
            this.$notify({
              group: "foo",
              title: "Success",
              type: "success",
              text: "Successfully Signed Up",
            });
            this.slideToNextPage(gotoNextPage);
          })
          .catch((er) => {
            this.isLoading = false;
            this.$notify({
              group: "foo",
              title: "Something went wrong",
              type: "error",
              text: er.message,
            });
          });
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
    async saveInvestor(data) {
      let investor = {
        did: "did:hs:TEqweqweqwe12",
        email: "",
        name: "",
        ethAddress: "",
        twitterHandle: "",
        telegramHandle: "",
        hasTwitted: false,
        hasJoinedTGgroup: false,
        projectId: "",
        tweetUrl:
          "https://twitter.com/VishwasBAnand1/status/1378516089466843137?s=20",
      };

      try {
        this.isLoading = true;

        // BUILDING UP THE INVESTOR OBJECT, TO SEND TO API
        for (let i in data) {
          investor[data[i].id] = data[i].value;
        }
        investor.projectId = this.$route.query.projectId;

        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        return fetch(url, {
          method: "POST",
          body: JSON.stringify(investor),
          headers,
        });
      } catch (e) {
        // this.notifyErr(e.message);
      } finally {
        // this.isLoading = false;
        // this.clear();
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
  height: 300px;
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
  min-height: 80vh;
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
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
