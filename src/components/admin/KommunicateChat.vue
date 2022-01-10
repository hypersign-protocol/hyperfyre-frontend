<template>
 <div class="hello">
    </div>
</template>

<script>
import config from "../../config"
export default {
methods(){

},
mounted(){    
    (function(d, m){

    /*---------------- Kommunicate settings start ----------------*/

     var kommunicateSettings = {
      "appId": config.kommunicateAppId,  
      "automaticChatOpenOnNavigation": true,
      "popupWidget": true,
      "onInit": function () {
        const usrDet = localStorage.getItem("user");
    
    const userIn = {
      ...JSON.parse(usrDet),
    };
     var userdetail = {
            "email": `${userIn.email}`,
            "displayName": `${userIn.name}`
        };  
         Kommunicate.updateUser(userdetail);
  
}
      };

    /*----------------- Kommunicate settings end ------------------*/

     var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    // Kommunicate end
    }
}
</script>

<style>

</style>