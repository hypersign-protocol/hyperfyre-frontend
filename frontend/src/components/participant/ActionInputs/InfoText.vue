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
          <img src="../../../assets/question-circle-fill.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">

        
      <b-card-body class="user-details">
          
        <b-row>
            
          <b-col cols="12" sm="12" md="12" >
              {{data.value}}
            <!-- <div class="follow">
              <b-form-input
                 type="textarea"
                :placeholder="data.placeHolder"
                v-model="data.value"
                :disabled="done"
                :required="data.isManadatory"
              ></b-form-input>
            </div> -->
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
  },
};
</script>
