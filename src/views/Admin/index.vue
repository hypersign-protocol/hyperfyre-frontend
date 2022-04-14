<template>
  <v-app dark class="black">
    <the-header />
    <the-menu />
    <v-main class="black pt-0">
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import TheMenu from "@/components/TheMenu";
export default {
  components: {
    TheHeader,
    TheMenu,
  },
};
</script>
