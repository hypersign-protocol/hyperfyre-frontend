<template>
	<b-navbar class="nav-bar" toggleable="lg" type="dark" variant="dark" v-if="show">
		<b-navbar-brand href="#">{{title}}</b-navbar-brand>
		<a href="#" class="menu ml-auto text-white text-decoration-none" v-if="authToken != '' && authToken != null" @click="logout">Logout</a>
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
		authToken: localStorage.getItem("authToken"),
	}),
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