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
	<b-navbar class="nav-bar" :style="themeCss" toggleable="lg" v-if="show">
		<b-navbar-brand href="https://fyre.hypersign.id/" target="blank">
			<img v-if="themeData.logoPath" :src="themeData.logoPath" height="50px">
			<img v-else src="../../assets/Fyre_Small.png" height="50px">
		</b-navbar-brand>
		<b-nav-item-dropdown size="sm" right class=" m-2 menu ml-auto text-white text-decoration-none">
			<template #button-content>
				<b-icon style="color:white" icon="menu-button-wide"></b-icon>
			</template>
			<b-dropdown-item to="/user/home/">
				Home
			</b-dropdown-item>
			<b-dropdown-item @click="logout" v-if="authToken != '' && authToken != null">
				Logout
			</b-dropdown-item>
		</b-nav-item-dropdown>
	</b-navbar>
</template>

<script>
import config from "../../config.js"
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
		},
		themeData: {
			required: true,
			type:Object 
		}
	},
	computed: {
		themeCss(){
			return{
				'--theme-bg-color': this.themeData.themeColor ? this.themeData.themeColor : config.app.themeBgColor
			}
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
