<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdil-information</v-icon>
        {{ data.title }}
      </div>
      <template v-slot:actions>
        <img src="@/assets/images/check.svg" v-if="done" />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <div v-html="data.value"></div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import marked from "marked";
export default {
  name: "InfoText",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  data() {
    return {
      visible: false,

      done: false,
    };
  },
  mounted() {
    this.data.value = marked(this.data.value);
  },
};
</script>
