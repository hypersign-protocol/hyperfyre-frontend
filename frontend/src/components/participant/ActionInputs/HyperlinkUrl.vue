<template>
	<b-card no-body class="action-wrap">
		<b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
			<b-row>
				<b-col cols="1" sm="1" md="1">
					<img src="../../../assets/question-circle-fill.svg" height="25px">
				</b-col>
				<b-col cols="9" sm="9" class="text-left" md="9">
					<div class="text text-capitalize">{{data.title}}</div>
				</b-col>
				<b-col cols="2" sm="2" md="2">
					<b-badge class="btn-score" @click="update()" v-if="!done">
						<img src="../../../assets/plus.svg">
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
						<div class="extlink">
							<b-form-input type="text" 
                            :placeholder="data.value" 
                            v-model="data.value" 
                            :disabled="true" 
                            :required="data.isManadatory" 
                            ></b-form-input>
                            <button class="btn text-black" @click="isClicked()">
            <a :href=data.value target="_blank">
                <img
                  src="../../../assets/external-link.svg"
                  height="25px"
                  width="25px"
                 :href="data.value" target="_blank" 

                /></a>
              </button>
						</div>
					</b-col>
				</b-row>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
<script>
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en"
export default {
	name: 'HyperlinkUrl',
	props: {
		idValue: {
			required: true
		},
		data: {
			required: true
		}
	},
	data() {
		return {
			visible: false,
			done: this.data.isDone,
            click: 0
		}
	},
	mounted() {
		eventBus.$on(`disableInput${this.data._id}`, this.disableInput)
	},
	methods: {
		update() {
			if (!this.click>=1) {
				return this.notifyErr(Messages.EVENT_ACTIONS.URL_NOT_VISITED);
			} else {
				this.$emit('input', this.data.value)
			}
		},
        isClicked(){
            this.click=this.click+1;
        },
		disableInput(data) {
			this.done = data
		}
	},
mixins:[notificationMixins]
}
</script>