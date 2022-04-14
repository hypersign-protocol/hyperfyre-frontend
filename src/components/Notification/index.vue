<template>
  <div v-if="item">
    <v-snackbar
      v-model="show"
      :right="true"
      :top="true"
      :color="item.type"
      :timeout="6000"
    >
      <template v-slot:action="{ attrs }">
        <v-btn icon color="#fff">
          <v-icon v-bind="attrs" color="#fff" small @click="show = false">
            mdi-close
          </v-icon>
        </v-btn>
      </template>
      <span v-if="item.message"> {{ item.message }}</span>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      componentName: "snackbar",
      options: {},
    };
  },
  computed: {
    list() {
      return this.$store.state.snackbar.list;
    },
    item() {
      return this.$store.state.snackbar.item;
    },
    show: {
      get() {
        return this.$store.state.snackbar.item;
      },
      set() {
        this.$store.commit("snackbar/RESET_SNACKBAR");
      },
    },
  },
};
</script>
