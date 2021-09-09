<template>
  <div >
    <Banner eventName="Test Event Name" />

    <div class="content" v-if="isAuthenticated" >
      <ul>
        <li v-for="eachAction in actions" :key="eachAction.id">
          <Action 
            :actionType="eachAction.type"
            :title="eachAction.title"
            :score="eachAction.score"
           />
        </li>
      </ul>
    </div>

    <div  class="content" v-else>
      <Login @AuthDataReceieved="getAuthData"/>
    </div>


    <!-- Example -->
    <!-- <Child name="First List" :listData="firstList" @ItemClicked="getItemClick"/>
    <Child name="Second List" :listData="secondList"  @ItemClicked="getItemClick"/> 
    <div>{{ itemClicked }}</div>    -->
  </div>
</template>

<script>
import Banner from "../../components/v4/Banner.vue";
import Login from "../../components/v4/Login.vue";
import Action from "../../components/v4/Action.vue";

export default {
  name: "Test",
  components: {
    Child,
    Banner,
    Login,
    Action
  },
  data(){
      return {
        isAuthenticated: false,
        actions: [{
          id: 1,
          "type": "INPUT_TEXT",
          "title": "Enter your name",
          "placeholder": "Vishwas Anand Bhushan",
          "isManadatory": false, 
          "value": "",
          "score": 20
        }, {
          id: 2,
          "type": "INPUT_DATE",
        "title": "Enter website url",
        "placeholder": "https://hypersign.id",
        "isManadatory": false, 
        "value": "",
        "score": 30
        },  {
          id: 2,
          "type": "INPUT_TEXT",
        "title": "Enter Country",
        "placeholder": "India",
        "isManadatory": false, 
        "value": "",
        "score": 10
        }]
      }
  },
  methods: {
      getItemClick(item){
          this.itemClicked = item;
      },
      getAuthData(authData){
        if(authData && authData != ""){
          this.isAuthenticated = true
        }else{
          this.isAuthenticated = false
        }
      }

  }


};
</script>

<style scoped>

.content{
    margin-top: 20px;
    padding: 2px;
    min-width: 650px;
    height: 500px;
    margin-left: 35%;
    margin-right: 30%;
    
    background: rgb(204, 203, 203);
    border-radius: 20px;
}

</style>
