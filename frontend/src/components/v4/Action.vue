<template>
  <div class="actioncontent">
    <h4>Action Component</h4>
    <ul>
        <li> {{ actionType }}</li>
        <li> {{ title }}</li>
        <li> Score: {{ score }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    actionType: String,
    title: String,
    placeHolder: String,
    isMandatory: Boolean,
    value: String,
    score: Number,
  },
};
</script>

<style scoped>
.actioncontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 150px;
  background: rgb(234, 241, 212);
  border-radius: 20px;
}
</style>
