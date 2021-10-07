<template>
	<b-card no-body class="action-wrap">
		<b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="profile" @click="visible = !visible">
			<b-row>
				<b-col cols="1" sm="1" md="1">
					<img src="../../../assets/person-fill.svg" height="25px">
				</b-col>
				<b-col cols="9" sm="9" class="text-left" md="9">
					<div class="text">Your Profile</div>
				</b-col>
			</b-row>
		</b-card-header>
		<b-collapse id="profile" v-model="visible">
			<b-card-body class="user-details">
				<b-row>
					<b-col cols="12" sm="3" md="3">
						<div class="title text-left mb-1">Username</div>
						<div class="text text-left">{{user.name}}</div>
					</b-col>
					<b-col cols="12" sm="4" md="4">
						<div class="title text-left mb-1">Email</div>
						<div class="text text-left">{{user.email}}</div>
					</b-col>
					<b-col cols="12" sm="5" md="5">
						<div class="title text-left mb-1">DID</div>
						<div class="text text-left">{{user.id}}</div>
					</b-col>
				</b-row>
				<b-row v-if="referalLink">
					<b-col cols="12" sm="12" md="12">
						<div class="title text-left mb-1">Your Referral Link</div>
						<div class="text text-left"> {{referalLink}} <span @click="copy" class="copy"><i class="far fa-copy"></i></span>  </div>
					</b-col>
				</b-row>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>

<style scoped>
.copy{
	padding:4px; font-size: large; cursor: pointer; color:grey
}
</style>
<script>
import eventBus from "../../../eventBus.js"
import notificationMixin from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en"
export default {
	name: 'Profile',
	props: {
		user: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			visible: false,
			referalLink: ""
		}
	},
	updated(){
		if(this.user.email){
			this.referalLink = `${window.location.protocol + "//" + window.location.host + window.location.pathname}?referrer=${encodeURIComponent(this.user.email)}`
		}
	},
	mixins: [notificationMixin],
	methods: {
		copy(){
			if(this.referalLink){
				navigator.clipboard.writeText(this.referalLink).then(() => {
						this.notifySuccess(Messages.EVENT.PROFILE.TEXT_COPIED);
					})
					.catch(err => {
						this.notifyErr(Messages.EVENT.PROFILE.ERROR_WHILE_COPYING, err);
					});
			}
    	},
	}
}
</script>