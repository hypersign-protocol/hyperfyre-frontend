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



.button-save {
  background-color: #004A7F;
  color: white;
  -webkit-animation: glowing 3000ms infinite;
  -moz-animation: glowing 2000ms infinite;
  -o-animation: glowing 2000ms infinite;
  /* animation: glowing 2000ms infinite; */
}
@-webkit-keyframes glowing {
  0% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
  50% { background-color: rgba(128, 128, 128, 0.335); -webkit-box-shadow: 0 0 20px red; }
  100% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
}

@-moz-keyframes glowing {
 0% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
  50% { background-color: rgba(128, 128, 128, 0.335); -webkit-box-shadow: 0 0 20px red; }
  100% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
}

@-o-keyframes glowing {
  0% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
  50% { background-color: rgba(128, 128, 128, 0.335); -webkit-box-shadow: 0 0 20px red; }
  100% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
}

@keyframes glowing {
 0% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
  50% { background-color: rgba(128, 128, 128, 0.335); -webkit-box-shadow: 0 0 20px red; }
  100% { background-color: grey; -webkit-box-shadow: 0 0 3px red; }
} 
</style>

<template>
    <div class="home  marginLeft marginRight">
        <div class="form-inline row" style="padding-top:10px">
            <div class="col-sm-7">
                <img src="../../assets/did-score/DODO.png" width="200" height="50"/>
            </div>
            <div class="input-group col-sm-5" style="float:right">
                <button  class="btn btn-link button-save"  v-if="isEditing"  @click="updateDID()">Save Changes</button>                    

                <input type="text" class="form-control" placeholder="blockchain wallet address" v-model="walletAddress.address"  disabled/>
                <button class="btn btn-outline-primary" @click="openWalletPopup()">
                            <i class="fas fa-link"></i> Connect Wallet
                </button>
            </div>   
        </div>

        <div class="body">
            <div class="search__container">
                <p class="search__title">
                    Go ahead, search your Decentralized ID
                </p>
                <input class="search__input" type="text" placeholder="Search" v-model="did" v-on:keyup.enter="resolve">
            </div>

            <div class="credits__container" v-if="Object.keys(didDoc).length > 0">
                <p class="credits__text">
                    Click to view the <a @click="openWalletPopup('show-did-doc'); return false;" href="#" >DID Document</a>                    
                </p>
            </div>
        </div>
         
        <div class="form-group">
            <div class="row" style="margin-bottom:1%">
                <div class="col-sm-10">
                    <label class="">Linked Wallets (<span class="">{{this.didDoc.proof? this.didDoc.proof.length: 0}}</span>)</label>
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-light" style="float: right" @click="addWallet()"><i class="fa fa-plus"></i> Add Wallet</button>
                </div>

            </div>

            <div class="row">
                <div style="overflow: auto; width: 30em;overflow-x: auto;white-space: nowrap; padding-bottom:7px;" class="col-sm-12">
                        <div class="event-card" v-for="vMethod in didDoc.verificationMethod" :key="vMethod.id" 
                        style="background-color:white; margin-right: 10px; width: 400px;display: inline-block;">
                            <div class="card-body" style="">
                                <div class="row"> 
                                    <div class="col-md-5">
                                        <div class="centered" style="margin-top:10%"><img class="imageClass" style="opacity: 0.7;"  :src="getImgUrl(parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.logo)" v-bind:alt="parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.logo"/></div>
                                        <div class="centered card-title"><label>{{ parseBlockchainAccountId(vMethod.blockchainAccountId).chainData.chainName }}</label></div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <label class="card-title"><i class="far fa-id-card"></i>Wallet Address</label>
                                            <div>
                                                    <span style="font-weight:200">{{ trunc(parseBlockchainAccountId(vMethod.blockchainAccountId).walletAddress, 20) }}</span>
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
                                                    <span style="font-weight:200">{{ trunc(vMethod.id, 20) }}</span>
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
        <div class="form-group">
            <div class="row" style="margin-bottom:1%">
                <div class="col-sm-10">
                    <label class="">Your PortFolio</label>


                    </div>
                <div class="col-sm-2">
                    <label style="float: right;     font-size: x-large; font-weight: bold;">${{ parseFloat(totalBalance).toFixed(2) }}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered  table-hover event-card" v-if="walletsPortfolio.length >0" style="background-color: white">
                        <thead class="">
                            <th></th>
                            <!-- <th>Network</th>
                            <th>Asset</th> -->
                            <th>Balance</th>
                            <th>Price ($)</th>
                            <th>Value ($)</th>
                        </thead>
                        <tbody>
                            <tr v-for="eachToken in walletsPortfolio" :key="walletsPortfolio">
                                <td>
                                    <div class="display: table;">
                                        <div style="float: left;padding:3px;">
                                            <img class="imgCls"  :src="eachToken.logo? getImgUrl(eachToken.logo): eachToken.logoPath" v-bind:alt="eachToken.logo"/>
                                        </div>
                                        <div style="float: left;padding: 2px; margin-left: 3px">
                                            <div style="font-weight:bold">{{eachToken.symbol}}</div>                                            
                                            <div style="font-weight:200">{{eachToken.network }}</div>
                                        </div>
                                    </div>
                                </td>
                                <!-- <td><img class="imgCls"  :src="eachToken.logo? getImgUrl(eachToken.logo): eachToken.logoPath" v-bind:alt="eachToken.logo"/></td> -->
                                <!-- <td>{{eachToken.network }}</td>
                                <td>{{eachToken.symbol}}</td> -->
                                <td>{{eachToken.balance}}</td>
                                <td>{{eachToken.price}}</td>
                                <td>{{eachToken.value}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        

        <hf-pop-up
            Header="Connect Wallets"
            Id ='conn-wallet'
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

        <hf-pop-up
            Header="DID Document"
            Id ='show-did-doc'
            Size = 'lg'
        >
        <div class="form-group">
            <label >{{this.did}}</label>
            <textarea class="form-control"   rows="10" disabled>{{this.didDocString}}</textarea>
        </div>
        </hf-pop-up>

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
import M from "minimatch";
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
export default {
    components:{HfPopUp},
    data(){
        return {   
            moralisAPIKey: "7VaD6UFyu5cFAE3A7uJrIsUahL9RDrJmZtZgcBMP8HunQ0WmCdzX2WKH0MTydGuw",         
            chainIdChainMap: {
                "1": {
                    chainName: "Ethereum",
                    token: "ETH",
                    logo: "eth_logo.svg",
                    logoPath: 'https://token-icons.s3.amazonaws.com/eth.png',
                    hex: "0x1",
                    wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                },
                "137": {
                    chainName: "Polygon",
                    token: "MATIC",
                    logo: "matic-token.png",
                    hex: "0x89",
                    wrappedTokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"

                },
                "56": {
                    chainName: "BSC",
                    token: "BNB",
                    logo: "bnb.png",
                    hex: "0x38",
                    wrappedTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"

                }
            },
            web3: null,
            walletAddress: {
                address: "",
                chainId: ""
            },
            walletAddressEdit: {
                address: "",
                chainId: ""
            },
            hypersignDIDSDK: null,
            didDoc: {},
            proof: [],
            walletAddresss: [],
            signedDidDoc:{},
            success: false,
            did: "",
            images: {
                matick: ""
            },
            isEditing: false,

            walletsPortfolio:[]
        }
    },

    computed: {
        totalBalance(){
            if(this.walletsPortfolio.length > 0){
                let val = 0
               
                this.walletsPortfolio.forEach(token => {
                    
                    val += token.value
                    console.log(val)
                })
                return val
            } else { 
                return 0
            }
            
        },
        didDocString(){
            return JSON.stringify(this.didDoc, null, 2);
        },
        signedDidDocString(){
            return JSON.stringify(this.signedDidDoc, null, 2);
        }
    },

    async created(){
        this.hypersignDIDSDK = new HypersignDID();
        await Moralis.start({
            apiKey: this.moralisAPIKey            
        });
    },
    methods: {
        async fetchTokenPrice(tokenAddress, chain){
            const address = tokenAddress;
            
            const response = await Moralis.EvmApi.token.getTokenPrice({
                address,
                chain,
            });

            // console.log(response.toJSON());
            return response.toJSON();
        },

        async getNativeBalance({ address, chain }){
            
            const response = await Moralis.EvmApi.balance.getNativeBalance({
                address,
                chain,
            });

            return response.toJSON()
        },


        // async getTokenBalanceOnPoly(){
        //     console.log('getTokenBalanceOnPoly  ...  ')
        //     let response = await Moralis.EvmApi.token.getWalletTokenBalances({
        //             address: '0xB9D3F4DB034F5D575C13D0DdA6d777C5941b0127',
        //             chain: EvmChain.POLYGON,
        //             tokenAddresses: ['0x87847703D4bb4FCD42DB887FfdcB94496e77e3ab'] // token addresses of ERC20 contracts
        //         });

        //         console.log(response.toJSON())
        //         console.log('getTokenBalanceOnPoly  ...  ')
        // },
        async getTokenBalance({ walletAddress, chain, tokenAddresses }){

            console.log({ walletAddress, chain, tokenAddresses })
            let response = await Moralis.EvmApi.token.getWalletTokenBalances({
                    address: walletAddress,
                    chain,
                    tokenAddresses // token addresses of ERC20 contracts
                });
                return response.toJSON()
        },

        async loadAllBalances(){
            const verMethods = this.didDoc.verificationMethod;
            if(verMethods && verMethods.length > 0){
                verMethods.forEach(async eachVerMeth => {
                    const parsedBCAId = this.parseBlockchainAccountId(eachVerMeth.blockchainAccountId)
                    console.log(parsedBCAId)
                    const walletAddress =  parsedBCAId.walletAddress//'0xb9d3f4db034f5d575c13d0dda6d777c5941b0127';
                    const evmChain  = parsedBCAId.chainData.chainName.toUpperCase()
                    console.log(evmChain)
                    const chain = EvmChain[evmChain];
                    this.loadBalance({ walletAddress, chain, wrappedTokenAddress: parsedBCAId.chainData.wrappedTokenAddress , logo: parsedBCAId.chainData.logo, logoPath: parsedBCAId.chainData.logoPath, symbol: parsedBCAId.chainData.token })
                })

            } else {
                console.log('this.didDoc.verificationMethod is undefined')
            }
        },

        async loadBalance({walletAddress, chain,  wrappedTokenAddress,  logo = '', logoPath ='',  symbol = ''}){
                const nativeTokenData = await this.getNativeBalance({ address: walletAddress, chain})

                if(nativeTokenData && nativeTokenData.balance > 0){
                    
                    const nativeTokenPrice = await this.fetchTokenPrice(wrappedTokenAddress, chain)
                    
                    const nativeBalance = nativeTokenData.balance/1e18;
                    this.walletsPortfolio.push({
                        balance: nativeBalance.toFixed(4),
                        name:  chain.name,
                        symbol,
                        network: chain.name,
                        logoPath,
                        logo,
                        price: (nativeTokenPrice.usdPrice.toFixed(4)),
                        value: (parseFloat(nativeTokenPrice.usdPrice) * parseFloat(nativeBalance))
                    })
                } else {
                    console.log('No balance found for ' + chain.name)
                }

                

                const USDCERC20ContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
                let response = await this.getTokenBalance({
                    walletAddress,
                    chain,
                    tokenAddresses: [ USDCERC20ContractAddress ] // token address of USDC
                });
                if(response && response.length >0){
                    response = response[0]
                    if(response.balance > 0){
                        const usdcTokenPrice = await this.fetchTokenPrice(USDCERC20ContractAddress, chain)
                        const usdcbal = response.balance/1e6;
                        this.walletsPortfolio.push({
                            balance: usdcbal.toFixed(4),
                            logoPath: response.logo,
                            symbol: response.symbol,
                            name: response.name,
                            network: chain.name,
                            price: (usdcTokenPrice.usdPrice.toFixed(4)),
                            value: (parseFloat(usdcTokenPrice.usdPrice) * parseFloat(usdcbal))
                        })
                    } else {
                        console.log('No balance found for USDC')
                    }
                } else {
                    console.log('No balance found for USDC')
                }


                const HIDERC20WalletAddress = {
                    'ETH': '0xB14eBF566511B9e6002bB286016AB2497B9b9c9D', // contract address of hid on eth
                    'MATIC': '0x87847703D4bb4FCD42DB887FfdcB94496e77e3ab' // contract address of hid on polygon
                }

                if(HIDERC20WalletAddress[symbol]){
                        let hidResponse = await this.getTokenBalance({
                            walletAddress,
                            chain,
                            tokenAddresses: [ HIDERC20WalletAddress[symbol] ] // token address of USDC
                        });
                    if(hidResponse && hidResponse.length >0){
                        hidResponse = hidResponse[0]
                        if(hidResponse.balance > 0){
                            const usdcTokenPrice = await this.fetchTokenPrice(HIDERC20WalletAddress[symbol], chain)
                            const usdcbal = hidResponse.balance/1e18;
                            this.walletsPortfolio.push({
                                balance: usdcbal.toFixed(4),
                                logo: 'HS_White.png',
                                logoPath: 'https://etherscan.io/token/images/hypersign_32.png',
                                symbol: hidResponse.name,
                                name: hidResponse.name,
                                network: chain.name,
                                price: (usdcTokenPrice.usdPrice.toFixed(4)),
                                value: (parseFloat(usdcTokenPrice.usdPrice) * parseFloat(usdcbal))
                            })
                        } else {
                            console.log('No balance found for HID ')
                        }
                    } else {
                        console.log('No balance found for HID')
                    }
                }
                
        },

        trunc(str, number){
            return truncate(str, number)
        },
        getImgUrl(pet) {
            return require('../../assets/did-score/' + pet)
        },
        openWalletPopup(id = 'conn-wallet'){
            this.$root.$emit('bv::show::modal', id)
        },  
        closeWalletPopup(id = 'conn-wallet'){
            this.$root.$emit('bv::hide::modal', id)
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
            
            
            console.log('inside ok')
            if(!this.isEditing){
                this.walletAddress = {
                    address: "",
                    chainId: ""
                }
                this.walletAddress.address = accounts[0]
                this.walletAddress.chainId = `${chainId}`
            } else {
                this.walletAddressEdit = {
                    address: "",
                    chainId: ""
                }
                this.walletAddressEdit.address = accounts[0]
                this.walletAddressEdit.chainId = `${chainId}`
            }
            this.closeWalletPopup()
            await this.sign()
            this.loadAllBalances()
        },

        addWallet(){
            this.isEditing = true;
            this.openWalletPopup();
        },
        async verify(){

            if(!this.walletAddress.address){
                throw new Error('Wallet address is not set')
            }


            if(!this.didDoc){
                throw new Error('Signed DID doc is not generated')
            }

            const parsedSignDidDc = this.didDoc
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

        getDIDFromWalletAddress (walletAddress){
            if(!walletAddress){
                throw new Error('Wallet Address is not passed')
            }

            return `did:hid:${walletAddress}`;
        },
        async sign(){

            try {

                // if(!this.walletAddress){
                //     throw new Error('Wallet address is not set, please connect your wallet')
                // }

                
                
            
            if(!this.isEditing){
                

                if(!this.walletAddress){
                    throw new Error('Wallet address is not set')
                }

                let didId = this.getDIDFromWalletAddress(this.walletAddress.address);

                let didDoc; 
                // Check if this did already exists.. 
                const didDocResolved = this.resolveDID(didId)
                this.did = didId;

                if(didDocResolved){
                    // if exists
                    didDoc = didDocResolved;
                    this.didDoc  = didDoc;
                    this.loadAllBalances()
                    return;
                } else {
                    // else then generate a new
                    didDoc = await this.generateDID(this.walletAddress.address)
                    didId = didDoc.id;
                    
                }

                this.did = didId;

                if(!didDoc){
                    throw new Error('DID doc is not generated or resolved')
                }

                const bcAccountId = this.getBlockchainAccountId(this.walletAddress.address, this.walletAddress.chainId)

                didDoc = this.addVerificationMethod(didDoc, `${didId}#key-${didDoc.verificationMethod.length + 1}`, didId, bcAccountId)


                const sig = await this.web3.eth.personal.sign(
                    JSON.stringify(didDoc, null, 2), this.walletAddress.address
                )

                // this.signedDidDoc = this.didDoc
                // Object.assign(this.signedDidDoc, {...this.didDoc})
                const signerVm  = didDoc.verificationMethod.find(x => x.blockchainAccountId === bcAccountId);
                const proof = {
                    type: 'EcdsaSecp256k1RecoverySignature2020',
                    created: (new Date()).toISOString(),
                    verificationMethod: signerVm.id,
                    proofPurpose: "assertionMethod",
                    proofValue: sig
                }
                didDoc['proof'].push(proof)

                this.didDoc = didDoc;
                

                await this.createDID()


            } else{
                console.log('inside sign isEditing = ' + this.isEditing)
                if(!this.walletAddressEdit){
                    throw new Error('Wallet address is not set')
                }

                if(!this.didDoc){
                    throw new Error('DID doc is not generated')
                }
                const bcAccountId = this.getBlockchainAccountId(this.walletAddressEdit.address, this.walletAddressEdit.chainId)

                let newDidDoc = structuredClone(this.didDoc);

                const controller = newDidDoc.id;
                const vmId =  `${controller}#key-${newDidDoc.verificationMethod.length + 1}`
                
                newDidDoc = this.addVerificationMethod(newDidDoc, vmId, controller,  bcAccountId)
    
                const signerVm  = newDidDoc.verificationMethod.find(x => x.blockchainAccountId == bcAccountId);

                if(!signerVm){
                    console.error("No verification method found")    
                    return;
                }

                const sig = await this.web3.eth.personal.sign(
                    JSON.stringify(newDidDoc, null, 2), this.walletAddressEdit.address
                )

                
                const proof = {
                    type: 'EcdsaSecp256k1RecoverySignature2020',
                    created: (new Date()).toISOString(),
                    verificationMethod: signerVm.id,
                    proofPurpose: "assertionMethod",
                    proofValue: sig
                }
                newDidDoc['proof'].push(proof)

                this.didDoc = newDidDoc;

            }
        }catch(e){
                this.isEditing = false
                this.notifyErr(e.message)
            }
        },
        async generateDID(walletAddress){
            let didDoc;
            if(!this.walletAddress){
                throw new Error('Wallet address is not set')
            }

            //if(Object.keys(this.didDoc).length <= 0){
                const kp = await this.hypersignDIDSDK.generateKeys();

                didDoc = await this.hypersignDIDSDK.generate({ methodSpecificId: walletAddress, publicKeyMultibase: kp.publicKeyMultibase });
                didDoc.verificationMethod = []
                didDoc.authentication = []
                didDoc.assertionMethod = []
                didDoc.keyAgreement = []
                didDoc.capabilityInvocation = []
                didDoc.capabilityDelegation = []
                didDoc['proof'] = []
                
                
                
                // this.did = didDoc.id

                // try{
                //     this.resolveDID()
                // }catch(e){
                //     console.log(e.message)
                //     this.didDoc = didDoc;
                // }
            //}
            //didDoc = this.addVerificationMethod(didDoc, `${this.did}#key-${this.didDoc.verificationMethod.length + 1}`, this.did, this.getBlockchainAccountId(this.walletAddress.address, this.walletAddress.chainId))
            return didDoc;
        },

        getBlockchainAccountId(walletAddress, chainId){
            return `eip155:${chainId}:${walletAddress}`
        },

        addVM(){
            
        },

        addVerificationMethod(didDoc, vmId, controller, blockchainId){
            if(didDoc){

                const t = didDoc.verificationMethod.find(x => x.blockchainAccountId === blockchainId)
                if(t){
                    throw new Error('Wallet Address already added in the didDoc, choose different one')    
                }


                didDoc.verificationMethod.push({
                    id: vmId,            
                    type: "EcdsaSecp256k1RecoveryMethod2020",
                    controller: controller,
                    blockchainAccountId: blockchainId
                })
                didDoc.authentication.push(vmId)
                didDoc.assertionMethod.push(vmId)
                didDoc.keyAgreement.push(vmId)
                didDoc.capabilityInvocation.push(vmId)
                didDoc.capabilityDelegation.push(vmId)
          
                return didDoc
            } else {
                throw new Error('No DID doc found to update')
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

        
        async createDID(){
            try{
                console.log('Inside register')

                if(!this.did || !this.didDoc){
                    throw new Error('DID and Signed DIDDocuments are not passed')
                }

                const didDocStr = localStorage.getItem(this.did)
                if(didDocStr){
                    return this.updateDID()
                }

                
                // TODO
                // verify all proofValues before storing...
                
                localStorage.setItem(this.did, JSON.stringify(this.didDoc))
                this.notifySuccess('Successfully created')
                
            }catch(e){
                this.notifyErr(e.message);
            }
            
        },

        updateDID(){
            try{
                if(!this.did){
                    throw new Error('No DID to update')
                }

                const didDocString = localStorage.getItem(this.did);
                if(!didDocString){
                    console.log('DID is not registered so going to create a new one')
                    return this.createDID()
                }

                localStorage.removeItem(this.did);
                localStorage.setItem(this.did, JSON.stringify(this.didDoc))
                this.notifySuccess('Successfully updated')
                this.isEditing = false
    
            }catch(e){
                this.notifyError(e.message)
            }
            
        },

        resolve(){
            try{
                this.didDoc = this.resolveDID(this.did)
                this.loadAllBalances()
            }catch(e){
                console.log(3)
                this.notifyError(e.message)
            }
        },
        resolveDID(didId = this.did){
            if(!didId) {
                    throw new Error('Did must be passed to resolve')
                }
            const didDocStr = localStorage.getItem(didId)
            if(!didDocStr){
                console.error('DID is not registered ' + didId)
                return null;
            }
            const didDoc  = JSON.parse(didDocStr)

            
            // this.didDoc = didDoc
            //this.signedDidDoc = didDoc;
            this.notifySuccess('DID resolved successfully')

            return didDoc
            
        }
    },

    mixins: [notificationMixins]

}
</script>
