<style scoped>
h3 {
  font-size: 15px;
}
</style>
<template>
  <div>
    <h2>Thank You!</h2>
    <h3>Your data has been successfully saved and is under verfication.<h3></h3>Once verified, you will receive whitelisting credential in your email.</h3>
  </div>
</template>

<script>
// This components will have the content for each stepper step.

export default {
  name: "StepFour",
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("credentials");
      localStorage.removeItem("userData");
      window.location.href = "/";
    },
  },
};
</script>
