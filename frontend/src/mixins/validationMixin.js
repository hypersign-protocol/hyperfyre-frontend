export default {
  methods: {
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
          this.notifyError("Please follow all the rules and provide a tweet URL")
        
        }
      } else if (step == 2) {
        const isAllFilled = data.formData.every((input) => input.value.length);
        const twitterHandle = data.formData.filter((x) =>
          x.label.toLowerCase().includes("twitter")
        )[0];
        const telegramHandle = data.formData.filter((x) =>
          x.label.toLowerCase().includes("telegram")
        )[0];
        const ethAddress = data.formData.filter((x) =>
          x.id.toLowerCase().includes("eth")
        )[0];
        const ethAddressValidate = ethAddress.value.startsWith("0x");
        let twitterHandleValidate = false;
        let telegramHandleValidate = false;

        if (
          twitterHandle.value.match(/^[a-zA-Z0-9_]{1,15}/) !== null &&
          twitterHandle.value.match(/^[a-zA-Z0-9_]{1,15}/)[0] ==
            twitterHandle.value
        ) {
          data.formData[2].errMsg = "";
          twitterHandleValidate = true;
        } else {
          data.formData[2].errMsg = "Please enter a valid username (without @)";
          twitterHandleValidate = false;
        }

        if (
          telegramHandle.value.match(/^[a-zA-Z0-9_]{5,15}/) !== null &&
          telegramHandle.value.match(/^[a-zA-Z0-9_]{5,15}/)[0] ==
            telegramHandle.value
        ) {
          data.formData[3].errMsg = "";
          telegramHandleValidate = true;
        } else {
          data.formData[3].errMsg =
            "Please Enter a valid Telegram Id (without @)";
          telegramHandleValidate = false;
        }

        if (!ethAddressValidate) {
          data.formData[4].errMsg = "Please enter a valid Eth Address";
        } else {
          data.formData[4].errMsg = "";
        }

        if (
          isAllFilled &&
          twitterHandleValidate &&
          telegramHandleValidate &&
          ethAddressValidate
        ) {
          gotoNextPage = true;
          this.slideToNextPage(gotoNextPage);
        } else {;
          this.notifyError("Please follow all the rules and provide a tweet URL");
        }
      } else if (step == 3) {
        this.$refs.recaptcha.execute();
      }
    },
  },
};
