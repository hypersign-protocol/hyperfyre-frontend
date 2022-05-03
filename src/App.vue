<template>
  <v-app dark>
    <v-main class="black">
      <v-container class="bg-black pa-0" fluid>
        <router-view />
        <Notification></Notification>
        <RightSlider></RightSlider>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Notification from "@/components/Notification";
import RightSlider from "@/components/RightSlider";
export default {
  components: {
    Notification,
    RightSlider,
  },
};
</script>
