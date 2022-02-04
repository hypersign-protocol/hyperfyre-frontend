<template>
    <div class="body">
        <div class="row header">
            <div class="col-md-4">
                <img
                    :src="require('../assets/logo.png')"
                    alt="logo"
                    width="120px"
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
                <h1 class="bold">HyperFyre</h1>
                <div  class="typewriter"> 
                <h4>Build Resilient and Dependable Communities, Securely</h4>
                </div>
                <button  class="btn btn-default btn-lg" style="margin-top:2%">
                    <a href="/app" target="_blank">Click here to Log in</a>
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
<script>
import notificationMixins from "../mixins/notificationMixins"
export default {
    name:"Invitation",
async mounted(){
    if(await this.$route.query.auth){
        console.log(this.$route.query.auth);
        await this.invokeStatus();
    }
},
methods:{
   async invokeStatus(){ 
        const url = `${this.$config.studioServer.BASE_URL}api/v1/admin/team/invite/${this.$route.query.auth}`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });
    
        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        else{
            const msg = await resp.json();
            console.log(msg.message);
           return this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: `${msg.message}`,
            showConfirmButton: false,
            timer: 2000
})
            // return this.notifySuccess(msg.message);


        }
    }
},
 mixins: [notificationMixins],
}
</script>
<style scoped>
/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 40% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}


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
