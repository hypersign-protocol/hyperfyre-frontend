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
            <!-- <div class="col-md-8">
                <button class="btn btn-default btn-lg">
                    <a href="/app" target="_blank">Try Now</a>
                </button>
            </div> -->
        </div>
        <div class="row content">
            <div class="col-md-12" style="">
                <h1 class="bold">FIDATO</h1>
                <h4>Build Resilient and Dependable Communities Securely</h4>
                <button class="btn btn-default btn-lg">
                    <a href="/app" target="_blank">TRY APP NOW</a>
                </button>
            </div>
        </div>
        <!-- <div class="row footer">
            <div class="col-md-4">
                <span>Powered By</span>
                <img
                    :src="require(`../assets/footerLogo.png`)"
                    style="max-width: 100px;"
                />
            </div>
            <div class="col-md-8"></div>
        </div> -->
    </div>
</template>
<style scoped>

    .body{
        background: whitesmoke;
        color: black;
        height: 100%;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        position: absolute;
    }

    .content{
        font-variant: all-petite-caps;
        text-align: center;
        margin-top: 18%;
    }

    .header{
        top: 10px;
        left: 10px;
        position: absolute;
    }

    .footer{
        bottom: 10px;
        left: 10px;
        position: absolute;
    }
    .content .bold{
        font-weight: bolder;        
        font-size: 700%;
    }

</style>