<template>
	<b-card no-body class="action-wrap">
		<b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
			<b-row>
				<b-col cols="1" sm="1" md="1">
					<img src="../../../assets/twitter-4.svg" height="25px">
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
							<button :disabled="done" @click="
            handleTwitterLogin(
              'https://twitter.com/' + data.value + '?ref_src=twsrc%5Etfw'
            )
          " class="btn btn-outline-twitter text-black">
								<img src="../../../assets/twitter.svg">
								Follow @{{data.value}}
							</button>
						</div>
					</b-col>
				</b-row>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
<script>
import apiClient from "../../../mixins/apiClientMixin";
import webAuth from "../../../mixins/twitterLogin";
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
			authToken: localStorage.getItem("authToken"),
			actions: [],
			twitter: {
				sourceScreenName: this.data.value,
				targetScreenName: "",
			},
		}
	},
	mounted() {
		eventBus.$on(`disableInput${this.data._id}`, this.disableInput)
	},
	methods: {
		async update() {
			if (!(await this.hasFollowedTwitter())) {
				return alert("Error: Please follow first");
			} else {
				this.$emit('input', this.twitter.targetScreenName)
			}
		},
		disableInput(data) {
			this.done = data
		},
		handleTwitterLogin(urlToRedirect) {
			try {
				if (!localStorage.getItem('twitterId')) {

					webAuth.popup.authorize({
							connection: "twitter",
							owp: true,
						},
						(err, authRes) => {
							if (!err) {
								webAuth.client.userInfo(
									authRes.accessToken,
									async (err, user) => {
										if (err) {
											return alert("Something Went Wrong");
										}

										console.log(user);

										const twitterId = user.sub.split("|")[1];
										localStorage.setItem("twitterId", twitterId);

										window.open(urlToRedirect, "_blank");
									}
								);
							}
						}
					);
				} else {
					window.open(urlToRedirect, "_blank");
					// this.twitter.targetScreenName = localStorage.getItem("twitterHandle")
				}
			} catch (e) {
				console.log(e);
			}
		},
		async hasFollowedTwitter() {
			try {
				const twitterId = localStorage.getItem('twitterId');

				this.twitter.targetScreenName = await this.getTwitterScreenName(
					twitterId
				);


				if (
					this.twitter.sourceScreenName &&
					this.twitter.targetScreenName &&
					this.twitter.sourceScreenName != "" &&
					this.twitter.targetScreenName != ""
				) {
					let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/follower`;
					let headers = {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.authToken}`,
					};

					const resp = await apiClient.makeCall({
						method: "POST",
						url: url,
						body: this.twitter,
						header: headers,
					});

					return resp.data;
				} else {
					console.log("Source or target twitter screen name is  blank");
					return false;
				}
			} catch (e) {
				console.log(e);
				return false;
			}
		},
		async getTwitterScreenName(twitterId) {
			try {
				if (twitterId) {

					let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/user/${twitterId}`;
					let headers = {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.authToken}`,
					};

					const resp = await apiClient.makeCall({
						method: "GET",
						url: url,
						body: {},
						header: headers,
					});

					const { screen_name } = resp.data;

					console.log(screen_name);
					// localStorage.setItem("twitterHandle", screen_name);

					return screen_name;
				} else {

					return null;
				}
			} catch (e) {
				console.log(e);
			}
		},
	}

}
</script>