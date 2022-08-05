<template>
  <div class="overflow-hidden" style="text-align: center; padding-top: 20px">
    <h1>404: Page Not Found</h1>
  </div>
</template>

<script>
import config from "../config";
export default {
  created() {
    document.title = `${config.appName} - 404`;
  },
};
</script>
