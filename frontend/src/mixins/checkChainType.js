export default{
    methods:{
    checkChainType () { 
        if (this.projectDetails.blockchainType){
          console.log(this.projectDetails.blockchainType)
           this.stepOneData.rules.push({
             id:   this.stepOneData.rules.length + 1,
             checked: false,
             text: "Please share your " + this.projectDetails.blockchainType+" Address",
             value:""
           })
        }
     },
    }
}
