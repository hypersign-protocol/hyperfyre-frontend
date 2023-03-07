<template></template>

<script>

import config from '../../config';
export default {
  name: 'Auth',
  components: {},

  async mounted() {
    const routeHash = this.$route.hash;
    const accessToken = routeHash.split("&")[0].split("=")[1];
    const authToken = routeHash.split("&")[5].split("=")[1];
    const payload = {
      provider: 'Google',
      accessToken,
      authToken
    }

    const resp = await fetch(config.studioServer.BASE_URL + 'api/v1/login', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

      }
      , body: JSON.stringify(payload),
      method: 'POST'
    })

    const data = await resp.json()
    if (data.authToken) {
      localStorage.setItem('authToken', data.authToken)
      const path = localStorage.getItem('path')
      if (path) {
        return this.$router.push(path)
      } else {
        return this.$router.push('/admin/dashboard')

      }

    }


    this.$router.push({ path: "/" })

  }

};


</script>

<style></style>
