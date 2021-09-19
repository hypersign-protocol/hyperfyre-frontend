<template>
	<b-navbar class="nav-bar" toggleable="lg" v-if="show">
		<b-navbar-brand href="#">
			<img src="../../assets/logo.png" height="50px">
		</b-navbar-brand>
		<a href="#" class="menu ml-auto text-white text-decoration-none" v-if="authToken != '' && authToken != null" @click="logout">
			<img src="../../assets/box-arrow-right.svg" height="30px">
		</a>
	</b-navbar>
</template>
<script>
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
	created() {
		if (localStorage.getItem('authToken')) {
			this.authToken = localStorage.getItem("authToken")
		}
	},
	methods: {

		logout() {
			localStorage.removeItem('user')
			localStorage.removeItem('authToken')
			localStorage.removeItem('twitterId')
			this.$router.go()
		}
	}
}
</script>