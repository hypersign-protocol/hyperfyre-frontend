<template>
	<b-card no-body class="action-wrap">
		<b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
			<b-row>
				<b-col cols="1" sm="1" md="1">
					<img src="../../../assets/telegram.svg" height="25px">
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
						<div class="follow">
							<button :disabled="done" @click="handleTelegramLogin(`https://telegram.me/${data.value}`)" class="btn btn-outline-telegram">
								<img src="../../../assets/telegram.svg">
								Join @{{data.value}}
							</button>
						</div>
					</b-col>
				</b-row>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
<script>
import config from "../../../config";
import eventBus from "../../../eventBus.js"
export default {
	name: 'TwitterRetweet',
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
		}
	},
	mounted() {
		eventBus.$on(`disableInput${this.data._id}`, this.disableInput)
	},
	methods: {
		update() {
			const tgIdInStore = localStorage.getItem("telegramId");
			if (!tgIdInStore || tgIdInStore == "undefined" || tgIdInStore == null) {
				return alert("Error: Please authorize telegram to proceed")
			} else {
				this.$emit('input', tgIdInStore)
	 		}
		},
		disableInput(data) {
			this.done = data
		},
		handleTelegramLogin(urlToRedirect) {
			if (!localStorage.getItem("telegramId")) {
				window.Telegram.Login.auth({ bot_id: config.telegramBotId, request_access: true },
					(data) => {

						if (!data) {
							return alert("Authentication Failed! Try again")
						}
						if(data.username){
							localStorage.setItem("telegramId", data.username)
							window.open(urlToRedirect, "_blank");
						} else{
							return alert("Could not fetch the username after telegram authentication")
						}
					}
				);

			} else {
				window.open(urlToRedirect, "_blank");
			}
		}
	}

}
</script>