<style scoped>
h3 {
  font-size: 15px;
}
</style>
<template>
  <div>
    <h2>Thank You!</h2>
    <h3>You are successfully registered,<h3></h3>You will receive a confirmation email if you qualify.</h3>
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
