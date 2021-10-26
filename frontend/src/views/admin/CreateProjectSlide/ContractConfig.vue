<template>
  <div>

<b-form-select v-model="contractType" :options="options"></b-form-select>

      
  </div>
</template>

<script>


export default {
  name: "ContractConfig",
  components: {  },
  props: {
    contractType: {
      type: String
    }
  },
  data(){
    return{
      selectedContractType: this.contractType,
      options : [
        { text: "Select Contract Type", value:null},
        { text: "ERC20", value:"ERC20"},
        { text: "ERC721", value:"ERC721"}
      ]
    }
    
  }
};
// type contractadd title placeholder score
</script>

