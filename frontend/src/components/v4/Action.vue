<template>
  <div class="actioncontent">
    <h4>[Action Component]</h4>
    <p>
        <span>
        <label>{{ title }} : </label>  
        </span>
        <span v-if="actionType === 'INPUT_TEXT' ">
          <input type="text" :placeholder="placeHolder" v-model="value"/>
        </span>
        <span v-if="actionType === 'INPUT_DATE' ">
          <input type="datetime-local" :placeholder="placeHolder" v-model="value"/>
        </span>
        <span v-if="actionType === 'INPUT_NUMBER' ">
          <input type="number" :placeholder="placeHolder" v-model="value"/>
        </span>
        <span>
          <button style="background: green; color: white" @click="updateUserInfo()" title="click to accept">+ {{score}}</button>
        </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    actionType: String,
    title: String,
    placeHolder: String,
    isMandatory: Boolean,
    value: String,
    score: Number,
  },
  methods:{
    updateUserInfo(){
      // 

      if(!this.value){
        alert("Pls enter a valid input")
      }
    }
  }
};
</script>

<style scoped>
.actioncontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 150px;
  background: rgb(234, 241, 212);
  border-radius: 20px;
}
</style>
