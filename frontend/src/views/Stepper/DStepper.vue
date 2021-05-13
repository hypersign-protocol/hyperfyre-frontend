<template>
  <div class="d-stepper">
    <div class="header w-100 text-left text-white">
      <div class="logo bg-white d-inline-block p-3 px-5">
        <img
          width="150px"
          src="https://thumb.tildacdn.com/tild3065-3765-4865-b331-393637653931/-/resize/150x/-/format/webp/hypersign_Yellow.png"
        />
      </div>
      <div class="text mx-auto  py-3 text-left">
        <h4>Apply to HYPERSIGN's Whitelist</h4>
        <p>{{ stepOneData.line1 }}</p>
        <p>{{ stepOneData.line2 }}</p>
      </div>
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
                    :data="stepOneData"
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

      <div class=" d-flex justify-content-end" v-if="!fatalError">
        <b-button
          v-if="step > 0"
          variant="light"
          :disabled="loading"
          class="text-primary"
          @click="backStep"
        >
          <i class="fas fa-angle-double-left"></i> Atrás
        </b-button>

        <b-button
          v-if="step < steps.length - 1"
          variant="dark"
          class="ml-2"
          @click="nextStep"
          :disabled="loading"
        >
          Next
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

    <div class="footer">
      <div class="rule w-75 mx-auto" />
      <div class="d-flex">
        <div class="footer-logo">
          <p class="m-0 text-white" style="font-weight: bold">Powered By</p>
          <img width="150px" :src="require('../../assets/footerLogo.png')" />
        </div>
        <div class="social"></div>
        <div class="logo-partner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DStepper",
  props: {
    steps: { type: Array, default: () => [] },
    initialState: { type: Object, default: () => ({}) },
    stepOneData: {
      type: Object,
    },
  },
  data() {
    return {
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
      if (!this.$refs.step.nextStep) return this.nextStepAction();

      if (this.$refs.step.nextStep()) {
        if (!this.loading) {
          this.nextStepAction();
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
.footer {
  padding: 20px 30px;
}
.header .logo {
  border-bottom-right-radius: 20px;
}
.header .text {
  width: 70%;
}
div.rule {
  border-bottom: 1px solid #ffffff;
  padding-top: 60px;
  margin-bottom: 30px;
}
.steps {
  min-height: 50vh;
  width: 60%;
  margin: 0 auto;
}
</style>
