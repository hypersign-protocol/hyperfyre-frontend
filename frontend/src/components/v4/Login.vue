<template>
  <div class="logincontent">
    <h4>Login Component</h4>
    <button @click="$emit('AuthDataReceieved', authToken)">Login With Hypersign</button>
  </div>
</template>

<script>
export default {
  props: {},
  data(){
      return {
          authToken: "xdfhsfsdfdsdfsdf"
      }
  }
};
</script>

<style scoped>
.logincontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 500px;
  background: rgb(241, 212, 212);
  border-radius: 20px;
}
</style>
