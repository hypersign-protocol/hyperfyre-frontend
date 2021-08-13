export default{
    methods:{
    checkChainType () { 
        if (this.projectDetails.blockchainType){
           this.stepOneData.rules.push({
             id: 5,
             checked: false,
             text: "Please share your " + this.projectDetails.blockchainType+" Address",
             value:""
           })
        }
     },
    }
}
