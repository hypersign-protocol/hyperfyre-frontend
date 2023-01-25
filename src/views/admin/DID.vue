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
    text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  
}

/* .grid-item {
  text-align: center;
} */

.notFound{
        padding: 10px;
        border-left: 5px solid #ff00007a;
        border-right: 1px solid #8080803b;
        border-bottom: 1px solid #8080803b;
        border-top: 1px solid #8080803b;
        width: 100%;
        background-color: white;
        border-radius: 2px;
        margin-top: 10px;
        font-weight: bold;
        color: rgba(128, 128, 128, 0.578);

    }

.card-title{
    font-size: small
}


.imageClass{
    height: auto;
    width: 60%;
    vertical-align: middle;
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
        <!-- <hr> -->

        <div class="body">
            <div class="search__container">
                <p class="search__title">
                        Go ahead, search your Decentralized ID
                </p>
                <input class="search__input" type="text" placeholder="Search" v-model="did">
            </div>

            <div class="credits__container">
                <p class="credits__text">Built on top of <a href="https://hypersign.id" target="_blank" class="credits__link">Hypersign Identity Network</a></p>
            </div>
        </div>
        
        <!-- <div class="form-group">
                <div class="col-sm-12 input-group mb-3 centered">
                    <input type="text" class="form-control" placeholder="did:hid:0x121" v-model="did">
                    <div class="input-group-append">
                        <button class="btn btn-light input-group-text" @click="sign()"><i class="fas fa-search"></i></button>
                    </div>
                </div>
        </div> -->
        
        <div class="form-group">
            <div class="row">
                <div class="col-sm-12">
                    <label class="">Linked Wallets (<span class="">{{this.signedDidDoc.proof? this.signedDidDoc.proof.length: 0}}</span>)</label>
                </div>
            </div>

            <div class="row">
                <div style="overflow: auto; width: 30em;overflow-x: auto;white-space: nowrap;" class="col-sm-12">
                        <div class="event-card" v-for="vMethod in signedDidDoc.verificationMethod" :key="vMethod.id" 
                        style="background-color:white; margin-right: 10px; width: 400px;display: inline-block;">
                            <div class="card-body" style="">
                                <div class="row"> 
                                    <div class="col-md-5">
                                        <div class="centered"><img class="imageClass"  :src="getImgUrl(parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.logo)" v-bind:alt="parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.logo"/></div>
                                        <div class="centered card-title"><label>{{ parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.chainName }}</label></div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <label class="card-title"><i class="far fa-id-card"></i> Wallet Address</label>
                                            <div>
                                                    <span >{{ trunc(parseBlockchainAccountId(vMethod.blockchainAccountId).walletAddress, 20) }}</span>
                                                    <span @click="copy(parseBlockchainAccountId(vMethod.blockchainAccountId).walletAddress, 'EventId')" class="copy"></span><span><i class="far fa-copy" style="margin-left:3px"></i></span>
                                            </div>
                                        </div>

                                        <!-- <div class="form-group">
                                            <label class="card-title"><i class="far fa-id-card"></i> Blockchain Account Id</label>
                                            <div>
                                                    <span >{{ trunc(vMethod.blockchainAccountId, 30) }}</span>
                                                    <span @click="copy(vMethod.blockchainAccountId, 'EventId')" class="copy"></span><span><i class="far fa-copy" style="margin-left:3px"></i></span>
                                                </div>
                                        </div> -->
                                        
                                        <div class="form-group">
                                            <label class="card-title"><i class="far fa-id-card"></i> Verification Method Id</label>
                                            <div>
                                                    <span >{{ trunc(vMethod.id, 20) }}</span>
                                                    <span @click="copy(vMethod.id, 'EventId')" class="copy"></span><span><i class="far fa-copy" style="margin-left:3px"></i></span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
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
                            <!-- <img class="imgCls"  :src="require('../../assets/did-score/eth_logo.svg')"/> -->
                            <img class="imgCls" :src="getImgUrl(chainIdChainMap['1'].logo)" v-bind:alt="chainIdChainMap['1'].logo"/>
                        </span>
                    </button>

                    <button class="btn btn-light largeButton" @click="ok(137)">
                        <span>
                            <img class="imgCls" :src="getImgUrl(chainIdChainMap['137'].logo)" v-bind:alt="chainIdChainMap['137'].logo"/>
                        </span>
                    </button>

            
                    <button class="btn btn-light largeButton" @click="ok(56)">
                        <span>
                            <img class="imgCls" :src="getImgUrl(chainIdChainMap['56'].logo)" v-bind:alt="chainIdChainMap['56'].logo"/>
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
import Messages from "../../utils/messages/admin/en";

import loadweb3 from "../../mixins/getWeb3";
import { HypersignDID } from 'hs-ssi-sdk';
import HfPopUp from "../../components/elements/HfPopUp.vue"
import {
  truncate,
} from "../../mixins/fieldValidationMixin.js";
import notificationMixins from "../../mixins/notificationMixins";

export default {
    components:{HfPopUp},
    data(){
        return {            
            chainIdChainMap: {
                "1": {
                    chainName: "Ethereum",
                    token: "ETH",
                    logo: "eth_logo.svg"
                },
                "137": {
                    chainName: "Polygon",
                    token: "MATIC",
                    logo: "matic-token.png"
                },
                "56": {
                    chainName: "Binance Smart Chain",
                    token: "BSC",
                    logo: "bnb.png"
                }
            },
            web3: null,
            walletAddress: {
                address: "",
                chainId: ""
            },
            hypersignDIDSDK: null,
            didDoc: {
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:hid:0x749183517381758E186910DC47bcbE456458216E",
  "controller": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E"
  ],
  "alsoKnownAs": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E"
  ],
  "verificationMethod": [
    {
      "id": "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "did:hid:0x749183517381758E186910DC47bcbE456458216E",
      "blockchainAccountId": "eip155:1:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-2",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:137:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-3",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:56:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-4",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:56:0x749183517381758E186910DC47bcbE456458216E"
    }
  ],
  "authentication": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "assertionMethod": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "keyAgreement": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "capabilityInvocation": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "capabilityDelegation": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "service": [],
  "proof": [
    {
      "type": "EcdsaSecp256k1RecoverySignature2020",
      "created": "2023-01-25T12:35:12.637Z",
      "verificationMethod": "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
      "proofPurpose": "assertionMethod",
      "proofValue": "0xce1ecb4a06082331277dec2608ba996a50896910d806c3b344fe447f33939bf80247bb39f86635edd56379a36100b0405f1537700c1a66c080bc5cb9050b586f1c"
    },
    {
      "type": "EcdsaSecp256k1RecoverySignature2020",
      "created": "2023-01-25T13:07:28.612Z",
      "verificationMethod": "#key-2",
      "proofPurpose": "assertionMethod",
      "proofValue": "0x601cb76a7881d05ee7a2d3aa1fca247e07b98f10bca6fe5859508b9f457a6d205d7f70ba7e0e0319fe844156ef7d0f8c46e792d9d4303d4f393702094d4aba851b"
    }
  ]
},
            proof: [],
            walletAddresss: [],
            signedDidDoc:{
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:hid:0x749183517381758E186910DC47bcbE456458216E",
  "controller": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E"
  ],
  "alsoKnownAs": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E"
  ],
  "verificationMethod": [
    {
      "id": "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "did:hid:0x749183517381758E186910DC47bcbE456458216E",
      "blockchainAccountId": "eip155:1:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-2",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:137:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-3",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:56:0x749183517381758E186910DC47bcbE456458216E"
    },
    {
      "id": "#key-3",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "",
      "blockchainAccountId": "eip155:56:0x749183517381758E186910DC47bcbE456458216E"
    }
  ],
  "authentication": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "assertionMethod": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "keyAgreement": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "capabilityInvocation": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "capabilityDelegation": [
    "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
    "#key-2",
    "#key-3"
  ],
  "service": [],
  "proof": [
    {
      "type": "EcdsaSecp256k1RecoverySignature2020",
      "created": "2023-01-25T12:35:12.637Z",
      "verificationMethod": "did:hid:0x749183517381758E186910DC47bcbE456458216E#key-1",
      "proofPurpose": "assertionMethod",
      "proofValue": "0xce1ecb4a06082331277dec2608ba996a50896910d806c3b344fe447f33939bf80247bb39f86635edd56379a36100b0405f1537700c1a66c080bc5cb9050b586f1c"
    },
    {
      "type": "EcdsaSecp256k1RecoverySignature2020",
      "created": "2023-01-25T13:07:28.612Z",
      "verificationMethod": "#key-2",
      "proofPurpose": "assertionMethod",
      "proofValue": "0x601cb76a7881d05ee7a2d3aa1fca247e07b98f10bca6fe5859508b9f457a6d205d7f70ba7e0e0319fe844156ef7d0f8c46e792d9d4303d4f393702094d4aba851b"
    }
  ]
},
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
        trunc(str, number){
            return truncate(str, number)
        },
        getImgUrl(pet) {
            return require('../../assets/did-score/' + pet)
        },
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


            const sig = await this.web3.eth.personal.sign(
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

        copy(textToCopy, contentType) {
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            this.notifySuccess(
              `${contentType}, ${Messages.EVENTS.CREATE_EDIT_EVENT.COPIED_TO_CLIPBOARD}`
            );
          })
          .catch((err) => {
            this.notifyErr(
              Messages.EVENTS.CREATE_EDIT_EVENT.ERROR_WHILE_COPYING,
              err
            );
          });
      }
    },
        async register(){}
    },

    mixins: [notificationMixins]

}
</script>
