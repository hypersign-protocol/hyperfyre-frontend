<template>
  <b-card no-body class="action-wrap">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="profile"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/premium-badge.png" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text">Claim Rewards</div>
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse id="profile" v-model="visible">
      <b-card-body class="user-details">
        <p class="border rounded-lg p-2 modal-text" :style="backroundThemeCss">
          {{ sticyNote }}
          <span class="btn-xs btn-link fetchList" @click="fetchList()"
            >here</span
          >
        </p>
        <table
          v-if="claimData.length"
          class="table mr-2 table-bordered"
          style="background: #ffff"
        >
          <thead class="thead-light">
            <tr>
              <th>Prize Name</th>
              <th>Number of winners</th>
              <th>Prize Per Winner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in claimData" :key="row._id">
              <th v-if="JSON.parse(row.value).isDistributed" class="wrapword">
                {{ row.title }}
              </th>
              <td v-if="JSON.parse(row.value).isDistributed" class="wrapword">
                {{ JSON.parse(row.value).winners }}
              </td>
              <td v-if="JSON.parse(row.value).isDistributed" class="wrapword">
                {{ JSON.parse(row.value).prizeValue }}
                <span style="display: inline">
                  <button
                    class="btn btn-link btn-sm"
                    @click="clickOnImportRow(row)"
                    title="Import Token in wallet"
                  >
                    Import
                  </button>
                </span>
              </td>
              <td v-if="JSON.parse(row.value).isDistributed" class="wrapword">
                <button class="btn btn-link btn-sm" @click="claimReward(row)">
                  Claim
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-collapse>
    <hf-pop-up
    id="hf-cleaim-reward"      
  Header="Claim Rewards">    
      <div class="row g-2 p-3 m-2" style="background:wheat; height:auto; border-radius:5px;">
        <div class="col-8" style="display:inline-block;"><p>{{showDismissibleAlert.text}}</p></div>
          <div style="display:inline-block; float:right" class="col-4">                    
            <hf-buttons                  
        style="width:max-content;float:right;"        
        name=""        
        iconClass="fas fa-wallet"
        title="Connected wallet"
        @executeAction="walletStatus"
        />
          </div>         
        <div>
          <div class="col-8">            
        <hf-buttons          
        v-if="isSwitchNetwork"
        style="width:max-content;"        
        name="Switch network"
        @executeAction="switchNetworkWallet"
        />
        <hf-buttons
        v-else
        style="width:max-content;"
        name="Claim"
        @executeAction="claim"
        />       
      </div>
      </div>                          
      </div>      
      </div>          
  </hf-pop-up>
<hf-pop-up
    id="hf-cleaim-reward-import"      
  Header="Import Token">
  <div class="text-center pt-2" style="background:wheat; height:auto; border-radius:5px;">      
    <p>Import token manually in your wallet by copying below token address.</p>
      <div class="row p-3 mb-2 text-center" style="background:white;border-radius:5px; display:inline-flex">                
        <div class="col-xs-6">{{truncate1(rewardData.contractAddress,14)}}</div>
        <div class="col-xs-6 pl-4"><i class="far fa-copy" style="cursor:pointer;" @click="copyTokenAddress('Token address')"></i></div>
      </div>     
        </div>
  </hf-pop-up>
  </b-card>
</template>
<script>
import {web3modal} from "../../../mixins/myWallet"
import {watchAccount,getNetwork,switchNetwork, readContract, getAccount,getContract } from "@wagmi/core";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css"
import { abi, getAddress } from "../../../mixins/merkelDropFactoryAbi";
import notificationMixins from "../../../mixins/notificationMixins";
import axios from "axios";
import profileIconMixins from "../../../mixins/profileIconMixins";
import config from "../../../config";
import { truncate } from "../../../mixins/fieldValidationMixin";
import HfPopUp from "../../elements/HfPopUp.vue"
import HfNotes from "../../elements/HfNotes.vue"
import HfButtons from "../../elements/HfButtons.vue"
export default {
  name: "RewardClaim",
  components: { Loading,HfPopUp,HfNotes,HfButtons },
  props: {
    claimData: {
      required: true,
      type: Array,
    },
    eventId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {     
      rewardData:{},
      showDismissibleAlert:{status:false,text:""},
      isSwitchNetwork:false,      
      walletAddress:'',      
      web3modal:web3modal,            
      currentChain:'',
      rewardChain:'',      
      fyreWalletAddress: "0xe8E06659F296D7c0561f41250A8a2674E83e8B98",
      whitelistAddress: [],
      authToken: localStorage.getItem("authToken"),
      sticyNote: "See the list of winners",
      isLoading: false,
      fullPage: true,
      accounts: [],
      visible: false,
    };
  },
  computed: {
    backroundThemeCss() {
      return {
        "--modal-bg-text": config.app.headerBGColor,
      };
    },
  },
  methods: {
    copyTokenAddress(contentType) {
      const textToCopy = this.rewardData.contractAddress      
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            this.notifySuccess(
              `${contentType}, copied to clipboard`
            );
          })
          .catch((err) => {
            this.notifyErr(
              'error while copying',
              err
            );
          });
      }
    },
    async walletStatus(){
    this.$root.$emit('bv::hide::modal','hf-cleaim-reward');  
    await this.web3modal.openModal()
    },
  async switchNetworkWallet(){
    try{
      this.isLoading = true       
      const getWalletConnect = localStorage.getItem('walletconnect')
      if(getWalletConnect !== null){
    const parsedData = JSON.parse(getWalletConnect)
    const isMetamask = parsedData.peerMeta.name    
    if(isMetamask === 'MetaMask'){
      if(/iPhone/i.test(navigator.userAgent)){
        console.log('iphonee')
        const url = "metamask://dapp/google.co"
        const a = document.createElement("a");
        a.href = url;
        a.target = "_self";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    }    
    }
      this.$root.$emit('bv::hide::modal','hf-cleaim-reward');      
      const network = await switchNetwork({
        chainId: Number(this.rewardData.chainId),
        })        
        if((network.id).toString() === this.rewardData.chainId){          
          this.$root.$emit('bv::show::modal','hf-cleaim-reward');
          this.isSwitchNetwork = false
          this.showDismissibleAlert.status = true                 
          this.showDismissibleAlert.text = `Claim your Reward!`
        }
    }catch(e){      
      this.notifyErr(e.message)
    }finally{
      this.isLoading = false
    }
    },
   async claim(){      
      try{
        const getAccountAddress = getAccount()        
        this.walletAddress = getAccountAddress.address        
        const { chain } = getNetwork();        
        if((chain.id).toString()!==(this.rewardData.chainId)){          
          this.isSwitchNetwork=true 
          this.showDismissibleAlert.status = true                           
          this.showDismissibleAlert.text = `Reward is distributed on ${this.chainName(this.rewardData.chainId)}. Please switch network in your wallet.`            
          return
        }
        this.$root.$emit('bv::hide::modal','hf-cleaim-reward');
      const getWalletConnect = localStorage.getItem('walletconnect')
      if(getWalletConnect !== null){
      const parsedData = JSON.parse(getWalletConnect)
      const isMetamask = parsedData.peerMeta.name    
      if(isMetamask === 'MetaMask'){
        if(/iPhone/i.test(navigator.userAgent)){
          console.log('iphonee')
          const url = "metamask://dapp/google.co"
          const a = document.createElement("a");
          a.href = url;
          a.target = "_self";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      }    
      }        
        this.isLoading = true;
        let data = [];        
        const airdropId = this.rewardData.externalRecordId;               
        const url = `${this.rewardData.appBaseUrl}/bank/check/${this.walletAddress}`;       
        const res = await axios.get(url);
        data = [...res.data];        
        const filteredObject = data.find((x) => {
          return x._id === airdropId;
        });
        if (filteredObject === undefined) {
          throw new Error("You are not whitelisted in the winner list");
        }    
        let address = getAddress(filteredObject.additionalData.chainId)
        const withdrawn = await readContract({
          address:address,
          abi:abi,
          functionName:'getWithdrawn',
          args:[filteredObject.treeIndex - 1,
              filteredObject.inputData.hash]
        })
        console.log("withdrawn",withdrawn)
        if(withdrawn === true){
          throw new Error("Reward already claimed")
        }       
        if (!withdrawn) {
          const getProofFromApi = await this.getProof(this.rewardData.appBaseUrl,
            airdropId,
            this.walletAddress
          );          
          const amountInWei = (filteredObject.inputData.data.value).toString();          
          const account = getAccount();
          const signer = await account.connector?.getSigner();
          const contract = getContract({
            address:address,
            abi:abi,
            signerOrProvider:signer
          })          
          const treeIndex = filteredObject.treeIndex-1          
          const resp = await contract.functions.withdraw(
            treeIndex,
            this.walletAddress,
            amountInWei,
            getProofFromApi,{
              gasLimit:250000
            }
          )
          console.log(resp)          
          const response = await resp.wait()
          console.log(response)
          if(response.status === 1){
            this.notifySuccess(
              "Reward claimed successfully! check your wallet"
            );
            this.$root.$emit('bv::hide::modal','hf-cleaim-reward');            
          }
        } else {
          throw new Error("Reward already claimed");
        }
      } catch (e) {
        console.log(e.message)
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchList() {
      this.isLoading = true;
      const url = `${this.$config.studioServer.BASE_URL}api/v1/reward/distribution/event/${this.eventId}`;
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };

      const resp = await fetch(url, {
        headers,
        method: "GET",
      });

      if (!resp.ok) {
        return this.notifyErr(resp.statusText);
      }
      const json = await resp.json();
      // const list = json.filter((x)=>{
      //   return x.
      // })
      let list = json.map((x) => {
        return [...x.whiteListedAddress];
      });      
      /**
       * Added code to group list by eventId {_id1:[{},{}],_id2:[]}
       * Then Iterate on ClaimData to get _id  
       * and then print List for each Action _id
       * this.claimData.forEach((el) => {
        let element = list[el._id]
        `<span class="mr-auto">ABCD</span>`;
        element.forEach((element, index) => {
       */
      
      const groupByMake = (list = []) => {
        let result = [];
        result = list.reduce((r, a) => {
          r[a.actionId] = r[a.actionId] || [];
          r[a.actionId].push(a);
          return r;
        }, Object.create(null));
        return result;
      };
      list = groupByMake(json)
      var swal_html = `<div class="list-group list-group-flush" style="max-height:500px;overflow-y: scroll;">`;
      var groupName = `<div style="font-weight:bold">`   
      this.claimData.forEach((el) => {                        
        let ele = list[el._id]
        if(ele === undefined) {
          return
        }    
        ele.forEach((x)=>{          
          groupName = el.title
          swal_html = swal_html + `<strong class="grpName pt-3" style="text-align: left;">`+ groupName +`</strong>`            
          x.whiteListedAddress.forEach((y, index) => {           
          let rank = index+1
          swal_html =          
            swal_html +            
            `<div class="list-group-item d-flex align-items-center">
          <span class="b-avatar mr-3 badge-success rounded-circle">
            <span class="b-avatar-img">
              <span class="badge circle circle-md bg-success">`+ rank +`</span>
            </span><!---->
          </span>          
          <span class="mr-auto">` +
            y.destination +
            `</span> 
          <span class="badge badge-primary">` +
            this.friendlyValue(y.value,x.decimals) +
            `</span>         
        </div> `;
        });
      })
    });

      swal_html = swal_html + `</div>`;
      this.$swal.fire({
        position: "center",
        focusConfirm: true,
        html: swal_html,
        toast: false,
        title: "<h5>Winners List</h5>",
        showCloseButton: true,
        showConfirmButton: false,
        width: "50rem",
        background: "white",
      });
      this.isLoading = false;
    },
    friendlyValue(str,decimal) {
      let decimalCount = 18
      if(!(isNaN(decimal) || decimal === undefined)){
        decimalCount = decimal
      }
      const toEthStd = Number(str)/Number(10 ** decimalCount)
      return toEthStd;
    },
    clickOnImportRow(data){
      this.$root.$emit('bv::show::modal','hf-cleaim-reward-import');  
      const parsedData = JSON.parse(data.value);
          this.rewardData ={...parsedData}
          console.log(this.rewardData.externalRecordId)
          console.log(this.rewardData.contractAddress)
    },
//     async importToken() {                   
//      const tokenAddress = this.rewardData.contractAddress;
//       const tokenDecimals = this.rewardData.decimals;
//       const tokenSymbol = this.rewardData.symbol;   
//       const tokenImage = this.getTokenIcon(tokenSymbol); 
//       const provider = getProvider({
//       chainId:5
//     })
//     console.log(provider)        
//     try {      
//       const wasAdded = await provider.request({
//           method:'wallet_watchAseset',
//           params:{
//             type: 'ERC20',
//           options: {
//             address: tokenAddress, 
//             symbol: tokenSymbol,
//             decimals: tokenDecimals,
//             image: tokenImage, 
//         },
//         }
//       });
//   if (wasAdded) {
//     console.log('Thanks for your interest!');
//   } else {
//     console.log('Your loss!');
//   }
// } catch (error) {
//   console.log(error);
// }
    
//     },
    chainName(id){
      let chainName = ''
      console.log(id)
      switch (id) {
        case '1':
          chainName = 'Ethereum mainnet'
          break;
        case '5':
          chainName = 'Goerli Testnet'
          break;
        case '137':
          chainName = 'Polygon Mainnet'
        default:
          break;        
      }
      return chainName
    },
    async claimReward(row) {      
        try {  
          const parsedData = JSON.parse(row.value);
          this.rewardData ={...parsedData}          
            console.log(parsedData)
            console.log(this.rewardData)
          this.rewardData.chainId = parsedData.chainId
        if(localStorage.getItem('wagmi.store')){          
          const getDataFromLocalStorage = localStorage.getItem('wagmi.store')          
          const parsed = JSON.parse(getDataFromLocalStorage)          
          console.log(parsed)                   
          if(parsed.state.data.hasOwnProperty('account')&& parsed.state.data.hasOwnProperty('chain')){            
            this.walletAddress = parsed.state.data.account
            console.log(this.walletAddress)
            this.currentChain = (parsed.state.data.chain.id).toString()
            if(this.currentChain!==parsedData.chainId){
            this.isSwitchNetwork=true 
            this.showDismissibleAlert.status = true                           
            this.showDismissibleAlert.text = `Reward is distributed on ${this.chainName(parsedData.chainId)}. Please switch network in your wallet.`            
            this.$root.$emit('bv::show::modal','hf-cleaim-reward');            
            }else{             
            console.log('in 1 loop')
            this.isSwitchNetwork=false           
            this.showDismissibleAlert.status = true                 
            this.showDismissibleAlert.text = `Claim your Reward!` 
            this.$root.$emit('bv::show::modal','hf-cleaim-reward');                                                     
            }           
          }else{                      
            console.log('in 2 loop')                
            await this.web3modal.openModal()            
          }                 
        }   
        watchAccount(async account=>{            
          if(account.isConnected === true){            
            const { chain } = getNetwork();                        
            if(parsedData.chainId!==(chain.id).toString()){
            this.isSwitchNetwork = true
            this.showDismissibleAlert.status = true                           
            this.showDismissibleAlert.text = `Reward is distributed on ${this.chainName(parsedData.chainId)}. Please switch network in your wallet.`
            }else{
            this.isSwitchNetwork=false            
            this.showDismissibleAlert.status = true                 
            this.showDismissibleAlert.text = `Claim your Reward!`
            }
            this.$root.$emit('bv::show::modal','hf-cleaim-reward');                                         
          }if(account.isDisconnected === true){
            console.log('in disconnect')                               
            this.$root.$emit('bv::hide::modal','hf-cleaim-reward');            
            this.walletAddress = ''       
          }        
        })             
      } catch (error) {        
        return this.notifyErr(error.message);
      }
    },
    async getProof(baseUrl,airdropId, walletAddress) {      
      const proof = await axios.get(
        `${baseUrl}/proof/${airdropId}/${walletAddress}`
      );      
      return proof.data.merkleProof;
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
  mixins: [notificationMixins, profileIconMixins],
};
</script>
<style scoped>
.fetchList {
  cursor: pointer;
}
.modal-text {
  font-size: 12px;
  background-color: var(--modal-bg-text);
}
table { 
  width: 100%; 
  border-collapse: collapse; 
}
tr { border: 2px solid #dee2e6;}
th {  
  font-weight: Montserrat, Helvetica, Arial, serif; 
}
td, th {  
  padding: 4px;  
  border: 1px solid #dee2e6; 
  text-align: left; 
}

@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {	
	table, thead, tbody, th, td, tr { 
		display: block; 
	}		
	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;    
	}
	tr { border: 1px solid #dee2e6}
	td {	
		border: none;
    font-size: 0.9rem;
		border-bottom: 1px solid #dee2e6; 
		position: relative;
		padding-left: 60%; 
	}
  th {		
		border: none;
    font-size:1rem;
		border-bottom: 1px solid #dee2e6; 
    background: #ccc; 
		position: relative;   
    padding-left: 60%; 
	}
 
	td:before { 	
		position: absolute;	
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
  th:before { 		
		position: absolute;		
		top: 6px;
    left: 6px;
		background: #ccc;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}	
  th:nth-of-type(1):before { content: "Prize name"; }
	td:nth-of-type(1):before { content: "Number of winners"; }
	td:nth-of-type(2):before { content: "Prize Per Winner"; }
	td:nth-of-type(3):before { content: "Action"; }	
}
</style>