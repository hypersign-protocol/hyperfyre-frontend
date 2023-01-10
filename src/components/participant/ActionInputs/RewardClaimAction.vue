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
                    @click="importToken(row)"
                    title="Import Token in metamask wallet"
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
  </b-card>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import loadweb3 from "../../../mixins/getWeb3";
import { abi, getAddress } from "../../../mixins/merkelDropFactoryAbi";
import notificationMixins from "../../../mixins/notificationMixins";
import axios from "axios";
import { utils } from "web3";
import profileIconMixins from "../../../mixins/profileIconMixins";
import { erc20ABI } from "../../../mixins/ERC20ContractAbi";
// import HfNotes from "../../elements/HfNotes.vue";
import config from "../../../config";
import { truncate } from "../../../mixins/fieldValidationMixin";
export default {
  name: "RewardClaim",
  components: { Loading },
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
          let objectToRemove = x.whiteListedAddress.findIndex((x)=>{
            return x.destination === config.marketPlace.fyre_wallet_address
          })         
          x.whiteListedAddress.splice(objectToRemove,1)        
          x.whiteListedAddress.forEach((y, index) => {                  
          let img1 = this.getTokenIcon(index+1);
          swal_html =          
            swal_html +            
            `<div class="list-group-item d-flex align-items-center">
          <span class="b-avatar mr-3 badge-info rounded-circle">
            <span class="b-avatar-img">
              <img src="` +
            img1 +
            `" alt="avatar">
            </span><!---->
          </span>          
          <span class="mr-auto">` +
            y.destination +
            `</span> 
          <span class="badge badge-primary">` +
            this.friendlyValue(y.value) +
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
    friendlyValue(str) {
      const toEthStd = utils.fromWei(str.toString(), "ether").toString();
      return toEthStd;
    },
    async importToken(data) {
      try {
      this.isLoading = true;
      const chainIdFromData = JSON.parse(data.value).chainId 
      const web3 = await loadweb3(chainIdFromData);
      const tokenAddress = JSON.parse(data.value).contractAddress;
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
      const tokenSymbol = await contract.methods.symbol().call();
      const tokenDecimals = await contract.methods.decimals().call();
      const tokenImage = this.getTokenIcon(tokenSymbol);      
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await web3.currentProvider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          this.notifySuccess(`${tokenSymbol} Token added in your wallet`);
        } else {
          this.notifyErr(`Not able to add ${tokenSymbol} in your wallet`);
        }
      } catch (error) {
        this.notifyErr(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async claimReward(row) {
      try {
        this.isLoading = true;
        let data = [];
        const parsedData = JSON.parse(row.value);
        const airdropId = parsedData.externalRecordId;
        const web3 = await loadweb3(parsedData.chainId);
        this.accounts = await web3.eth.getAccounts();
        const url = `${parsedData.appBaseUrl}/bank/check/${this.accounts[0]}`;
        const res = await axios.get(url);
        data = [...res.data];        
        const filteredObject = data.find((x) => {
          return x._id === airdropId;
        });
        if (filteredObject === undefined) {
          throw new Error("You are not whitelisted in the winner list");
        }    
        let address = getAddress(filteredObject.additionalData.chainId)
        const contract = new web3.eth.Contract(abi, address);
        const [tree, withdrawn] = await Promise.all([
          contract.methods.merkleTrees(filteredObject.treeIndex - 1).call(),
          contract.methods
            .getWithdrawn(
              filteredObject.treeIndex - 1,
              filteredObject.inputData.hash
            )
            .call(),
        ]);       
        if (!withdrawn) {
          const getProofFromApi = await this.getProof(parsedData.appBaseUrl,
            airdropId,
            this.accounts[0]
          );          
          const amountInWei = utils
            .toWei(filteredObject.inputData.data.value, "wei")
            .toString();          
          const withDrawToken = await contract.methods
            .withdraw(
              filteredObject.treeIndex - 1,
              this.accounts[0],
              amountInWei,
              getProofFromApi
            )
            .send({ from: this.accounts[0] });          
          if (withDrawToken.status === true) {
            this.notifySuccess(
              "Reward claimed successfully! check your wallet"
            );
          }
        } else {
          throw new Error("Reward already claimed");
        }
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
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
/* .wrapword {
  white-space: -moz-pre-wrap !important;
  white-space: -webkit-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: normal;
} */

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
