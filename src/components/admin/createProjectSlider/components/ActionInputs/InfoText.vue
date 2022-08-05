<template>
  <b-card no-body class="action-wrap">
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/info.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="markdown">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="v-md-editor" v-html="data.value" style="padding: 10px"></div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
// import eventBus from "../../../eventBus.js";
// import {
//   isValidURL,
//   isValidText,
//   isEmpty,
// }
// from "../../../mixins/fieldValidationMixin";

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
    };
  },
  mounted() {
    // eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
    this.data.value = marked(this.data.value);
  },
};
</script>
