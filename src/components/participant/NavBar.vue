<template>
	<b-navbar class="nav-bar" toggleable="lg" v-if="show">
		<b-navbar-brand href="https://fyre.hypersign.id/">
			<img src="../../assets/logo.png" height="35px">
		</b-navbar-brand>
		<a href="#" class="menu ml-auto text-white text-decoration-none" v-if="authToken != '' && authToken != null" @click="logout">
			<img src="../../assets/box-arrow-right.svg" height="30px">
		</a>
	</b-navbar>
</template>
<script>
import eventBus from "../../eventBus.js"
export default {
	name: 'NavBar',
	props: {
		title: {
			required: true,
			type: String
		},
		show: {
			required: true,
			type: Boolean
		}
	},
	data: () => ({
		authToken: ''
	}),
	mounted() {
		eventBus.$on('getAuthToken', this.setAuth)
		if (localStorage.getItem('authToken')) {
			this.authToken = localStorage.getItem("authToken")
		}
		eventBus.$on('logout',this.logout)
	},
	methods: {
		async setAuth(data) {
			this.authToken = data
		},
		logout() {
			localStorage.clear();
			this.$router.go()
		}
	}
}
</script>