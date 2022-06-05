<style scoped>
.btn-secondary {
	background-color: #363740 !important;
	border-color:#363740 !important;
	color: white !important;
}
a:hover {
	color: white !important;
}
a {
color: white !important;
}
</style>
<template>
	<b-navbar class="nav-bar" toggleable="lg" v-if="show">
		<b-navbar-brand href="https://fyre.hypersign.id/" target="blank">
			<img src="../../assets/logo.png"  height="35px">
		</b-navbar-brand>
		<!-- <a href="#" class="menu ml-auto text-white text-decoration-none" v-if="authToken != '' && authToken != null" @click="logout">
			<img src="../../assets/box-arrow-right.svg" height="30px">
		</a> -->
		<b-nav-item-dropdown size="sm" right  class="btn-secondary m-2 menu ml-auto text-white text-decoration-none" v-if="authToken != '' && authToken != null">
			<template #button-content>
				<b-icon style="color:white" icon="menu-button-wide"></b-icon>
			</template>
			<b-dropdown-item to="/user/home/">
				Home</b-dropdown-item> 
			<b-dropdown-item @click="logout">Logout</b-dropdown-item>
		</b-nav-item-dropdown>
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
		authToken: '',
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
