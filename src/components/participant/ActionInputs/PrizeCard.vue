<template>
<b-card no-body class="action-wrap">
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="profile"
      @click="visible = !visible"

    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <i class="fas fa-gift" height="25px"></i>
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text">Prize Details</div>
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse id="profile" v-model="visible"  >
      <b-card-body class="user-details">
        
        <b-row v-for="row in prizeData" :key="row._d">
          <b-col cols="12" sm="3" md="3">
            <div class="title text-left mb-1">Prize Name</div>
            <div class="text text-left">{{ row.title }}</div>
          <hr>
          </b-col>
          <b-col cols="12" sm="4" md="4">
            <div class="title text-left mb-1">Number of Winners</div>
            <div class="text text-left">{{ JSON.parse(row.value).winners }}</div>
             <hr>
          </b-col>
          <b-col cols="12" sm="5" md="5">
            <div class="title text-left mb-1">Prize Per Winner</div>
            <div class="text text-left">{{ JSON.parse(row.value).prizeValue }}</div>
           <hr>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
export default {
  name: "PrizeCard",
  props: {
    prizeData: {
      required: true,
      type: Array
    },
  },
  data() {
    return {
      visible: false,
      value:{
        winners:'',
        prizeValue:''
      }
    };  
  },
  mounted() {

    // this.prizeData1 = this.prizeData;
    // console.log(this.prizeData1);
    //  if(prizeData){
    //    Object.assign(this.value, {...JSON.parse(prizeData.value) })
       
    // }
    // console.log(this.value);
  // //   // this.detail.push(this.value)
  // // console.log(this.detail);
  },
};
</script>
