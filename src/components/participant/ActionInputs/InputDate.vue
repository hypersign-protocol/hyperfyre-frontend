<template>
	<b-card no-body class="action-wrap">
		<b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
			<b-row>
				<b-col cols="1" sm="1" md="1">
					<img src="../../../assets/Calender.svg" height="25px">
				</b-col>
				<b-col cols="9" sm="9" class="text-left" md="9">
					<div class="text text-capitalize">{{data.title}}</div>
				</b-col>
				<b-col cols="2" sm="2" md="2">
					<b-badge class="btn-score" :style="buttonThemeCss" @click="authToken && update()" v-if="!done">
						<i class="fa fa-plus" aria-hidden="true"></i>
						{{data.score}}
					</b-badge>
					<img class="check-mark" src="../../../assets/check-circle-fill.svg" height="25px" v-if="done">
				</b-col>
			</b-row>
		</b-card-header>
		<b-collapse :id="`collapse-${idValue}`" v-model="visible">
			<b-card-body class="user-details">
				<b-row>
					<b-col cols="12" sm="12" md="12">
							<date-time-picker
							v-model="data.value"
							:clear-button="true"
							:close-button="true"
							empty-value=""
							format="DDDD HH:mm"
							:today-button="true"							
							:time-picker="true"
							:disabled="done"
							:required="data.isManadatory"
							></date-time-picker>						
					</b-col>
				</b-row>
				<b-row v-if="!done">
					<b-col cols="12" sm="12" md="12" >
						<button class="btn btn-link center" @click="update()">Continue</button>
					</b-col>
				</b-row>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
<style scoped>
@import url("../../../assets/css/participant-side-datetime-override.css");
.center{
  display: block; margin-left: auto;margin-right: auto
}
</style>

<script>
import dayjs from "dayjs"
import eventBus from "../../../eventBus.js";
import {  isDate } from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
export default {
	name: 'InputDate',
	props: {
		idValue: {
			required: true
		},
		data: {
			required: true
		},
		done: {
			required: true,
		},
		themeData: {
			required: true,
		},
		authToken: {
			required: true
		},
	},
computed:{
 buttonThemeCss() {
      return {
		'--button-bg-color': this.themeData.buttonBGColor,
		'--button-text-color': this.themeData.buttonTextColor,
      }
     }
  },
	data() {
		return {
			visible: false,
			value: ''
		}
	},
	mounted() {		
		if(this.data.value !== "" && dayjs(this.data.value).format('YYYY-MM-DD')){			
			this.data.value = dayjs(this.data.value).format(
        "YYYY-MM-DD HH:mm:ss")
		}
		eventBus.$on(`disableInput${this.data._id}`, this.disableInput)
	},
	methods: {
		update() {
			if (!isDate(this.data.value)) {
				this.data.value = "";
				return this.notifyErr(Messages.EVENT_ACTIONS.INPUT_DATE.INVALID_DATE_TIME);
			} else {
				this.$emit('input', this.data.value)
			}
		},
		disableInput(data) {
			this.done = data
		}
	},
mixins:[notificationMixins]
}
</script>