<style scoped>
.largeButton{
    padding: 30px;
    border: 1px solid #80808066;
    float: left;
    margin-right: 10px;
}
.imgCls{
    width: 30px; height: 30px;
}

.centered{
    justify-content: center;
}
</style>
<template>
    <div class="home  marginLeft marginRight">
        <div class="form-inline row" style="padding-top:10px">
            <!-- <h3 >DODO</h3> -->
            <div class="col-sm-7">
                <img src="../../assets/did-score/DODO.png" width="200" height="50"/>
            </div>
            <div class="input-group col-sm-5" style="float:right">
                <input type="text" class="form-control" placeholder="blockchain wallet address" v-model="walletAddress.address"  disabled/>
                <button class="btn btn-outline-primary" @click="openWalletPopup()">
                            <i class="fas fa-link"></i> Connect Wallet
                </button>
            </div>   
        </div>
        <hr>
        
        <div class="form-group">
            <div class="row">
                <label class="col-form-label col-sm-4">DID:</label>
                
                
                <div class="col-sm-8 input-group mb-3">
                    <input type="text" class="form-control" placeholder="did:hid:0x121" v-model="did">
                    <div class="input-group-append">
                        <button class="btn btn-light input-group-text" @click="sign()"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                
                
<!--                 
                <span class="col-sm-7 form-control-plaintext"><input type="text" class="form-control" v-model="did"/></span>
                <div class="col-sm-1">
                    <button class="btn btn-light" @click="sign()"><i class="fas fa-search"></i></button>
                </div> -->
            </div>            
        </div>
        
        <div class="form-group">
            <label class="">Linked Wallets (<span class="">{{this.signedDidDoc.proof? this.signedDidDoc.proof.length: 0}}</span>)</label>
            <table class="table  table-bordered" v-if="Object.keys(signedDidDoc).length > 0">
                <thead>
                    <tr>
                    <th></th>
                    <th scope="col">ChainName</th>
                    <th scope="col">WalletAddress</th>
                    <th scope="col">VerificationMethodId</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vMethod in signedDidDoc.verificationMethod" :key="vMethod.id">
                        <td><img style="width: 30px; height: 30px;" src="../../assets/did-score/matic-token.png"></td>
                        <td>{{ parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.chainName }}</td>
                        <td>{{ parseBlockchainAccountId(vMethod.blockchainAccountId).walletAddress }}</td>
                        <td>{{vMethod.id}}</td>
                    </tr>
                </tbody>
            </table>               
        </div>
        
        <hr>
        <hf-pop-up
            Header="Connect Wallets"
        >
        <div class="form-group">
            <!-- <label>Connect Wallet :</label> -->
            <div class="row">
                <div class="col-sm-12 form-inline centered">

                    <button class="btn btn-light largeButton" @click="ok(1)">
                        <span>
                            <img class="imgCls"  :src="require('../../assets/did-score/eth_logo.svg')"/>
                        </span>
                    </button>

                    <button class="btn btn-light largeButton" @click="ok(137)">
                        <span>
                            <img class="imgCls" src="../../assets/did-score/matic-token.png"/>
                        </span>
                    </button>

            
                    <button class="btn btn-light largeButton" @click="ok(56)">
                        <span>
                            <img  class="imgCls" src="../../assets/did-score/bnb.png"/>
                        </span>
                    </button>
                    <button class="btn btn-light largeButton" disabled>
                        <span>
                            <img class="imgCls" src="../../assets/did-score/keplr_logo.png"/>
                        </span>
                    </button>

                </div>
            </div>
            <!-- <div class="row centered">
                
                <div class="col-sm-8"><input type="text" class="form-control" v-model="walletAddress.address" disabled/></div>
                <div class="col-sm-1">
                    <button class="btn btn-light" @click="sign()"><i class="fas fa-plus"></i></button>
                </div>
            </div> -->
        </div>
        </hf-pop-up>
        


        <div class="form-group">
            <label >DID Doc</label>
        
            <textarea class="form-control"   rows="10" disabled>{{this.didDocString}}</textarea>
        </div>

        <div class="form-group">
            <label >Signed DID Doc</label>
            <textarea class="form-control"   rows="10" disabled>{{this.signedDidDocString}}</textarea>
        </div>
        
    </div>    
</template>

<script>
import loadweb3 from "../../mixins/getWeb3";
import { HypersignDID } from 'hs-ssi-sdk';
import HfPopUp from "../../components/elements/HfPopUp.vue"
export default {
    components:{HfPopUp},
    data(){
        return {            
            chainIdChainMap: {
                "1": {
                    chainName: "Ethereum",
                    token: "ETH",
                    logo: "../../assets/did-score/eth_logo.svg"
                },
                "137": {
                    chainName: "Polygon",
                    token: "MATIC",
                },
                "56": {
                    chainName: "Binance Smart Chain",
                    token: "BNB",
                }
            },
            web3: null,
            walletAddress: {
                address: "",
                chainId: ""
            },
            hypersignDIDSDK: null,
            didDoc: {},
            proof: [],
            walletAddresss: [],
            signedDidDoc: {},
            success: false,
            did: "",
            images: {
                matick: ""
            }
        }
    },

    computed: {
        didDocString(){
            return JSON.stringify(this.didDoc, null, 2);
        },
        signedDidDocString(){
            return JSON.stringify(this.signedDidDoc, null, 2);
        }
    },

    async created(){
        this.hypersignDIDSDK = new HypersignDID();
        
    },
    methods: {
        openWalletPopup(){
            this.$root.$emit('modal-show')
        },  
        closeWalletPopup(){
            this.$root.$emit('modal-close')
        },  
        parseBlockchainAccountId(bId){
            if(bId){
                const bIds = bId.split(':');
                return {
                    walletAddress: bIds[2],
                    chainId: bIds[1],
                    chainData: this.chainIdChainMap[bIds[1]]
                }
            }
        },
        async ok(chainId){
            this.web3 = await loadweb3(chainId)        
            const accounts  = await this.web3.eth.getAccounts();
            this.walletAddress = {
                address: "",
                chainId: ""
            }
            this.walletAddress.address = accounts[0]
            this.walletAddress.chainId = `${chainId}`

            this.closeWalletPopup()
            await this.sign()
            

        },
        async verify(){

            if(!this.walletAddress.address){
                throw new Error('Wallet address is not set')
            }


            if(!this.signedDidDoc){
                throw new Error('Signed DID doc is not generated')
            }

            const parsedSignDidDc = this.signedDidDoc
            const recoveredWalletAddress = await this.web3.eth.personal.ecRecover(this.didDocString, parsedSignDidDc.proof.proofValue);
            console.log({
                recoveredWall: recoveredWalletAddress.toUpperCase(),
                actualAddress: this.walletAddress
            })

            if(recoveredWalletAddress.toUpperCase() === this.walletAddress.address ){
                alert('true')    
            } else {
                alert('false')
            }


            this.success = true;

        },
        async sign(){

            await this.generateDID()


            if(!this.walletAddress){
                throw new Error('Wallet address is not set')
            }


            if(!this.didDoc){
                throw new Error('DID doc is not generated')
            }


            const sig = await web3.eth.personal.sign(
                this.didDocString, this.walletAddress.address
            )

            this.signedDidDoc = this.didDoc
            const signerVm  = this.didDoc.verificationMethod.find(x => x.blockchainAccountId === this.getBlockchainAccountId(this.walletAddress.address, this.walletAddress.chainId));
            console.log(signerVm.id)
            const proof = {
                type: 'EcdsaSecp256k1RecoverySignature2020',
                created: (new Date()).toISOString(),
                verificationMethod: signerVm.id,
                proofPurpose: "assertionMethod",
                proofValue: sig
            }
            this.signedDidDoc['proof'].push(proof)
           
            this.proof.push(proof)
           

            // this.verify()

            this.walletAddresss.push(this.walletAddress)
            this.clean()
        },
        async generateDID(){
            if(!this.walletAddress){
                throw new Error('Wallet address is not set')
            }

            
            if(Object.keys(this.didDoc).length <= 0){
                const kp = await this.hypersignDIDSDK.generateKeys();
                const didDoc = await this.hypersignDIDSDK.generate({ methodSpecificId: this.walletAddress.address, publicKeyMultibase: kp.publicKeyMultibase });
                didDoc.verificationMethod = []
                didDoc.authentication = []
                didDoc.assertionMethod = []
                didDoc.keyAgreement = []
                didDoc.capabilityInvocation = []
                didDoc.capabilityDelegation = []
                didDoc['proof'] = []
                this.did = didDoc.id
                this.didDoc = didDoc;
            }
            
            console.log(1)
            this.addVerificationMethod(`${this.did}#key-${this.didDoc.verificationMethod.length + 1}`, this.did, this.getBlockchainAccountId(this.walletAddress.address, this.walletAddress.chainId))
            console.log(2)
        },

        getBlockchainAccountId(walletAddress, chainId){
            return `eip155:${chainId}:${walletAddress}`
        },

        async addVerificationMethod(vmId, controller, blockchainId){
            if(this.didDoc){
                this.didDoc.verificationMethod.push({
                    id: vmId,            
                    type: "EcdsaSecp256k1RecoveryMethod2020",
                    controller: controller,
                    blockchainAccountId: blockchainId
                })
                this.didDoc.authentication.push(vmId)
                this.didDoc.assertionMethod.push(vmId)
                this.didDoc.keyAgreement.push(vmId)
                this.didDoc.capabilityInvocation.push(vmId)
                this.didDoc.capabilityDelegation.push(vmId)
            } 
             
        } ,

        clean(){
            this.walletAddress = ""
        },

        async register(){}
    }

}
</script>
