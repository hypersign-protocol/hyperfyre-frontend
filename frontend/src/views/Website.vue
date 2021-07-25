<template>
    <div class="body">
        <div class="row header">
            <div class="col-md-4">
                <img
                    :src="require('../assets/Fidato_logo.png')"
                    alt="logo"
                    width="150px"
                />
            </div>
            <div class="col-md-8">
                <button class="btn btn-default btn-lg">
                    <a href="/app" target="_blank">Try Now</a>
                </button>
            </div>
        </div>
        <div class="row content">
            <div class="col-md-12" style="widht:100%; height:100%">
                <h1>FIDATO</h1>
                <h4>Build Resilient and Dependable Communities Securely</h4>
            </div>
        </div>
        <div class="row footer">
            <div class="col-md-4">
                <p>Powered By</p>
                <img
                    :src="require(`../assets/footerLogo.png`)"
                    style="max-width: 80px;"
                />
            </div>
            <div class="col-md-8"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .body{
        background: black;
        color: whitesmoke;
    }

</style>