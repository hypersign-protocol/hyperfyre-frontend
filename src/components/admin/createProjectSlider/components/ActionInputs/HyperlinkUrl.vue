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
          <img src="../../../assets/external-link.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" @click="update()" v-if="!done">
            <img src="../../../assets/plus.svg" />
            {{ data.score }}
          </b-badge>
          <img
            class="check-mark"
            src="../../../assets/check-circle-fill.svg"
            height="25px"
            v-if="done"
          />
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="extlink">
              <button class="btn text-black center"  >
                <a :href="data.value" v-bind:class="{isDisabled : done}"  @click="isClicked()" target="_blank">
                  {{data.value}}
                  <img
                    src="../../../assets/external-link.svg"
                    height="20px"
                    width="20px"
                    :href="data.value"
                    target="_blank"
                  />
                </a>
              </button> 
            </div>
          </b-col>
        </b-row>

        <b-row v-if="!done">
					<b-col cols="12" sm="12" md="12" >
						<button class="btn btn-link center"  @click="update()">Continue</button>
					</b-col>
				</b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<style>
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}

.center{
  display: block; margin-left: auto;margin-right: auto
}

</style>
<script>
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import { truncate } from "../../../mixins/fieldValidationMixin";
export default {
  name: "HyperlinkUrl",
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
      done: this.data.isDone,
      hasClicked: false,
      disableClass: ""
    };
  },
  mounted() {
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    update() {
      if (!this.hasClicked) {
        return this.notifyErr(Messages.EVENT_ACTIONS.URL_NOT_VISITED);
      } else {
        this.$emit("input", this.data.value);
      }
    },
    isClicked() {
      this.hasClicked = true;
    },
    disableInput(data) {
      this.done = data;
    },
    truncate1(str, number){
      return truncate(str, number)
    }
  },
  mixins: [notificationMixins],
};
</script>
