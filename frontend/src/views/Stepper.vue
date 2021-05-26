<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.card-header {
  background: aliceblue;
  padding: 0px;
}
.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}
.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}
.card {
  border-radius: 10px;
}
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #007bff;
  color: #fff;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #007bff;
  background-color: #007bff;
  margin: 1px 0;
}
.d-stepper-header {
  display: none !important;
}
</style>
<template>
  <section class="stepper-section">
    <d-stepper
      :stepOneData="stepOneData"
      :stepTwoData="stepTwoData"
      :steps="steps"
      :initial-state="{ name: 'Carlos', users: [] }"
    >
      <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
    </d-stepper>
  </section>
</template>

<script>
import StepOne from "./Stepper/StepOne.vue";
import StepTwo from "./Stepper/StepTwo.vue";
import DStepper from "./Stepper/DStepper.vue";
import StepThree from "./Stepper/StepThree.vue";
import StepFour from "./Stepper/StepFour.vue";
const avatarLabel = require("../assets/avatarUploadLabel.png");

export default {
  name: "Stepper",
  components: {
    DStepper,
  },

  data() {
    return {
      stepOneData: {
        line1:
          "To get selected and to enter the private token sale please follow the rules carefully",
        line2:
          "All information needs to be provided in order to get whitelisted for the Presale",

        rules: [
          {
            id: 1,
            text: "Please follow projectName on twitter",
            checked: false,
          },
          {
            id: 2,
            text: "Tweet ",
            checked: false,
            showTweetInput: true,
            tweetUrl: "",
          },
          {
            id: 3,
            text: "Join the projectName's telegram group ",
            checked: false,
          },
        ],
      },

      stepTwoData: {
        line1:
          "To get selected and to enter the private token sale please follow the rules carefully",
        line2:
          "All information needs to be provided in order to get whitelisted for the Presale",
        imgLink: avatarLabel,
        formData: [
          {
            label: "Full Name*",
            placeholder: "Enter full name",
            value: "",
            id: "name",
            disabled: true,
          },
          {
            label: "Email Address*",
            placeholder: "someone@somewhere.com",
            value: "",
            id: "email",
            disabled: true,
          },
          {
            label: "Twitter Handle*",
            placeholder: "@mytwitterhandle",
            value: "",
            id: "twitterHandle",
          },
          {
            label: "Telegram Handle*",
            placeholder: "@mytelegramhandle",
            value: "",
            id: "telegramHandle",
          },
          {
            label: "Ethereum  Address*",
            placeholder: "0x",
            fullWidth: true,
            value: "",
            id: "ethAddress",
          },
        ],

        handleImageChange: (e) => {
          const file = e.target.files[0];
          this.stepTwoData.imgLink = URL.createObjectURL(file);
        },
      },

      steps: [
        {
          disabled: false,
          active: true,
          component: StepOne,
        },
        {
          disabled: false,
          active: false,
          component: StepTwo,
        },
        {
          disabled: false,
          active: false,
          component: StepThree,
        },
        {
          disabled: false,
          active: false,
          component: StepFour,
        },
      ],
    };
  },

  mounted() {
    const usrStr =
      localStorage.getItem("user") ||
      '{"name": "Hypersign", "email": "hypersign@email.com" }';
    const user = JSON.parse(usrStr);

    this.stepTwoData.formData[0].value = user.name;
    this.stepTwoData.formData[1].value = user.email;
  },
};
</script>
