<style scoped>
h3 {
  font-size: 15px;
}
</style>
<template>
  <div>
    <h3>THANK YOU FOR SIGNING UP</h3>
    <p>We will send you an email about the next steps</p>
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
