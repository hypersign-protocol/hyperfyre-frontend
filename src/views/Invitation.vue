<template>
    <div class="body">
        <div class="row content">
            <div class="col-md-12">
                <img class="align-center" style="margin-bottom: 20px; height: 80px" width="auto" height="auto"
                    src="../assets/Fyre_Gold_Black.png"/>
                <!-- <div>
                    <h4>
                    </h4>
                </div> -->
                <p>
                    You can close this tab now and go back to the {{appName}} <a href="/app" target="_blank">admin
                        dashboard</a>
                </p>
                <!-- <button class="btn btn-default btn-lg" style="margin-top:2%">
                    <a href="/app" target="_blank">Click here to Login to admin dashboard</a>
                </button> -->
            </div>
        </div>
    </div>
</template>
<script>
import notificationMixins from "../mixins/notificationMixins"
import config from "../config"
export default {
    name:"Invitation",
 data(){
    return {
        appName:config.appName
    }
 },   
async mounted(){
    if(await this.$route.query.auth){
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
        if(resp.status===400){
            const errorMsg=await resp.json();
           return this.$swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMsg.Error}`,
            showConfirmButton: false,
            timer: 5000
            })
          
        }
        else{
            const msg = await resp.json();
           return this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: `${msg.message}`,
            showConfirmButton: false,
            timer: 5000
            })
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

a {
    color: black;
    text-decoration: underline;
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}


    .body{
        background: whitesmoke;;
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
