<style scoped>
.final-wallets{
  font-size: 12px;
  max-height: 200px;
  overflow-y: scroll;
  }
.accordion > .card {
  overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header {
  border: 1px solid #000 !important;
}

.button-theme {
  background-color: var(--button-bg-color);
  border-collapse:  var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}

.accordion-header-theme {
  background-color: var(--header-bg-color);
  border: 0;
}
allButtons {
  padding-top: 20px;
  padding-right: 16px;
  float: right;
}

.selected {
  border-radius: 0.5rem;
}

.eventCard:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
}

.flash {
  cursor: pointer;
  background-color: #1faa596b;
  border: 0;
  box-shadow: 2px 0 10px rgb(0 0 0 / 10%);
  animation: flash 0.4s cubic-bezier(1, 0, 0, 1);
}

@keyframes flash {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.upload-file-wrapper>input {
  display: none;
}
</style>
<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <b-sidebar backdrop width="50%" id="airdrop-sidebar-right" title="Create Reward Distribution"
      class="sidebarContainer background-transparent" right shadow no-close-on-backdrop backdrop-variant="dark">
      <div class="px-3 py-2">
        <b-card :style="buttonThemeCss">
          <b-card-title>{{stickyNoteTitle}}</b-card-title>
          <b-card-text>
            This tool is to distribute ERC20 reward developed by Finance.vote,
            It can help to send reward to large number of wallets at low cost.
          </b-card-text>
          <b-card-text class="small text-muted">
            <b-link target="_blank" href="https://finance.vote/">Website</b-link> |
            <b-link target="_blank" href="https://t.me/financedotvote">Telegram</b-link> |
            <b-link target="_blank" href="https://twitter.com/financedotvote">Twitter</b-link>
          </b-card-text>
        </b-card>
        <hr />
        <div></div>
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-12">
              <div class="row g-3 align-items-center w-100 mt-4">
                <div class="text-left col-lg-3 col-md-3 text-left">
                  <label for="type" class="col-form-label">Select Event<span style="color: red">*</span>:
                  </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                  <b-form-select placeholder="Select an Event" :options="projects" v-model="selectedEvent"
                    textField="projectName" valueField="_id" @input="selectOption()"></b-form-select>
                </div>
              </div>
            </div>
          </div>
          <h6 class="mt-2" v-if="selectedEvent!==null">Prize Details</h6>
          <div class="row scroll mt-2">
            <div class="col-lg-4" v-for="eachPrize in prizeList" :key="eachPrize._id">
              <div :title="eachPrize.title">
                <b-card :title="truncate1(eachPrize.title, 10)" tag="article"
                  style="max-width: 20rem; margin-top: 20px;height:10rem;" :class="
                        flash == eachPrize
                          ? 'flash eventCard card rounded m-1 p-1 d-flex flex-row align-items-center'
                          : 'card eventCard rounded m-1 p-1 d-flex flex-row align-items-center pointer'
                      " @click="prizeCardSelectedForAirdrop(eachPrize)">
                  <div class="row">
                    <div class="col-md-12">
                      <ul style="
                              list-style-type: none;
                              padding-left: 4px;
                              font-size: small;
                            ">
                        <li data-toggle="tooltip" data-placement="bottom">
                          <i class="fas fa-users"></i>
                          <span> {{ JSON.parse(eachPrize.value).winners }} Winners</span>
                        </li>
    
                        <li data-toggle="tooltip" data-placement="bottom">
                          <i class="fas fa-award"></i>
                          <span>  {{ JSON.parse(eachPrize.value).prizeValue }} Each</span>
                        </li>
                      </ul>
                    </div>
                  </div>
    
                  <footer>
                    <!-- <img
                        v-if="JSON.parse(eachPrize.value).isDistributed == true"
                        style="float:right;"
                        class="check-mark"
                        src="../../assets/check-circle-fill.svg"
                        height="20px"                    
                        />                     -->
                    <b-icon icon="check-circle-fill" title="Reward Distributed"
                      v-show="JSON.parse(eachPrize.value).isDistributed == true" scale="2" style="float:right;"
                      variant="success"></b-icon>
                  </footer>
                </b-card>
              </div>
            </div>
          </div>
          <div class="row g-3 align-items-center w-100 mt-4 ml-2" v-if="showContractField">
            <div class="col-lg-9 col-md-9 px-0">
              <label for="placeHolder" class="col-form-label">Select Your chain: </label>
            </div>
            <div class="col-lg-12 col-md-12 px-0">
              <b-form-select placeholder="Select an Event" :options="chainOptions" v-model="selectedChain"
                @input="onSelectChain"></b-form-select>
            </div>
          </div>
          <div class="row g-3 align-items-center w-100 mt-4 ml-2" v-if="showContractField">
            <div class="col-lg-9 col-md-9 px-0">
              <label for="placeHolder" class="col-form-label">Token Address: </label>
            </div>
            <div class="col-lg-12 col-md-12 px-0">
              <input v-model="depositTokenAddress" type="text" id="placeHolder" class="form-control w-100"
                placeholder="Enter contract address" />
            </div>
          </div>
          <div class="row g-3 align-items-center w-100 mt-4 ml-2" v-if="showContractField">
            <div class="col-lg-12 col-md-12 px-0">
              <label for="placeHolder" class="col-form-label">Recipients and Amounts <a target="_blank" href="https://www.eth-to-wei.com/">(in Wei):</a></label>
              <b-alert v-model="showDismissibleAlert.status" variant="danger" dismissible>
                {{ showDismissibleAlert.text }}
              </b-alert>
            </div>
            <div class="col-lg-12 col-md-12 px-0" style="max-height: 200px;overflow-y: scroll;">
              
              <b-form-textarea id="textarea" v-model="simpleData" placeholder="address,tokenvalue(in wei)"
                :rows="JSON.parse(flash.value).winners" :max-rows="JSON.parse(flash.value).winners"
                @keyup="calculateFee()" ></b-form-textarea>
            </div>
          </div>
          <!-- <div class="mt-4" style="display: flex" v-if="showContractField">
            <div class="col-lg-4 col-md-3" style="display: block">
              <hf-buttons @executeAction="calculateFee()" name="Calculate"
                customClass="btn btn-outline-primary button-theme"></hf-buttons>
            </div>
          </div> -->
          <div v-if="showContractField" >
            <div class="row g-3 align-items-center w-100 mt-4 ml-2">
              <div class="col-lg-12 col-md-12 px-0">
                <label for="placeHolder" class="col-form-label">Confirm: </label>
              </div>
            </div>
            <div class="row g-3 align-items-center w-100 mt-2 ml-2">
              <div class="col-lg-6 col-md-6 px-0">
                <label for="placeHolder" class="col-form-label">Address: </label>
              </div>
              <div class="col-lg-6 col-md-6 px-0">
                <label for="placeHolder" class="col-form-label" style="float:right">Amount: </label>
              </div>
            </div>
            <div class="final-wallets g-3 w-100 ml-2 p-3" v-if="isCheckEveryThing">
              <div class="row g-3 align-items-center w-100 ml-2" v-for="location in locations" :key="location.destination">
                <div class="col-lg-6 col-md-6 px-0">
                  <label for="placeHolder" class="col-form-label">{{location.destination}}</label>
                </div>
                <div class="col-lg-6 col-md-6 px-0">
                  <label for="placeHolder" class="col-form-label" style="float:right">{{ location.value / 1000000000000000000 }} </label>
                </div>
              </div>
            </div>
          
            <div class="row g-3 align-items-center w-100 mt-4 ml-2">
              <div class="col-lg-6 col-md-6 px-0" >
                <label for="placeHolder" class="col-form-label">Total:</label>
              </div>
              <div class="col-lg-6 col-md-6 px-0">
                <span v-if="feeStructure.fyrePlatformCommision!==''" style="float:right">{{ getFriendlyValue(feeStructure.totalAmountToDistribute) - getFriendlyValue(feeStructure.fyrePlatformCommision)}}
                  {{feeStructure.symbol}} Tokens</span>
              </div>
            </div>
            <div class="row g-3 align-items-center w-100 mt-2 ml-2">
              <div class="col-lg-6 col-md-6 px-0" >
                <label for="placeHolder" class="col-form-label">Platform Fee:</label>
              </div>
              <div class="col-lg-6 col-md-6 px-0">
                <span v-if="feeStructure.fyrePlatformCommision!==''" style="float:right">{{getFriendlyValue(feeStructure.fyrePlatformCommision)}}
                  {{feeStructure.symbol}} Tokens</span>
              </div>
            </div>
            <div class="row g-3 align-items-center w-100 mt-2 ml-2">
              <div class="col-lg-6 col-md-6 px-0" >
                <label for="placeHolder" class="col-form-label">Total Payable:</label>
              </div>
              <div class="col-lg-6 col-md-6 px-0">
                <span v-if="feeStructure.totalAmountToDistribute!==''" style="float:right">{{getFriendlyValue(feeStructure.totalAmountToDistribute)}}
                  {{feeStructure.symbol}} Tokens</span>
              </div>
            </div>
          </div>
          
          <!-- <div class="row g-3 align-items-center w-100 mt-4 ml-2" v-if="showContractField">
            <div class="col-lg-3 col-md-3 align-items-center" v-if="feeStructure.fyrePlatformCommision!==''">
              <label for="placeHolder" class="col-form-label">You need to pay platform fee as token: </label>
            </div>
            <div class="col-lg-9 col-md-9 px-0">
              <span v-if="feeStructure.fyrePlatformCommision!==''">{{getFriendlyValue(feeStructure.fyrePlatformCommision)}}
                {{feeStructure.symbol}} Tokens as a platfrom Fee</span>
            </div>
          </div>
          <div class="row g-3 align-items-center w-100 mt-4 ml-2" v-if="showContractField">
            <div class="col-lg-3 col-md-3 align-items-center" v-if="feeStructure.totalAmountToDistribute!==''">
              <label for="placeHolder" class="col-form-label">Total Payable Amount: </label>
            </div>
            <div class="col-lg-9 col-md-9 px-0">
              <span
                v-if="feeStructure.totalAmountToDistribute!==''">{{getFriendlyValue(feeStructure.totalAmountToDistribute)}}
                {{feeStructure.symbol}} Tokens</span>
            </div>
          </div> -->
          <!-- <div
            class="row g-3 align-items-center w-100 mt-4"
            v-if="showContractField"
          >
            <div class="card-body upload-file-wrapper">
              <input
              type="file"
              name="file"
              ref="file"
              @change="handleFileUpload"
              >
              <b-button @click="handleButtonClick">Upload File</b-button>
              <div class="ml-2" style="display:inline;">
              <span v-if="!files || !files.length">No files selected</span>
              <span v-else>{{files[0].name}}</span>
              </div>
            </div>
           
          </div> -->
        </div>
        <hr />
        <div></div>
        <div style="display: flex" v-if="isCheckEveryThing">
          <div class="col-lg-4 col-md-12" style="display: block">
            <hf-buttons
             @executeAction="createDistribution()"
              name="Create Distribution"
              customClass="btn btn-outline-primary button-theme"
              style="float:left"
            ></hf-buttons>
          </div>
        </div>
        <div></div>
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-12"></div>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { utils } from "web3";
import config from "../../../config";
// import InputDate from "../../participant/ActionInputs/InputDate.vue";
import Fyre_Small from "../../../assets/Fyre_Small.png"

//Mixins
import notificationMixins from "../../../mixins/notificationMixins";
import { abi,getAddress } from '../../../mixins/merkelDropFactoryAbi';
import { erc20ABI } from "../../../mixins/ERC20ContractAbi";
import loadweb3 from "../../../mixins/getWeb3";
import apiClient from "../../../mixins/apiClientMixin";
import { ipfsHashToBytes32, getMaxApprove } from "../../../mixins/rewardDistUtils";
import { shortenName, truncate } from "../../../mixins/fieldValidationMixin";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import HfButtons from "../../../components/elements/HfButtons.vue";
import axios from "axios";
export default {
  name: "MarketPlaceSlide",
  components: {
    // InputDate,
    Loading,
    HfButtons
  },

  props: {
    projects : {
      type: Array,
    },   
    selectedTool: {
      type: Object,
    },
    selectedProjectId: {
      type: String,
    }
  },

  computed: {
    // a computed getter
    buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
    },
    headerThemeCss(){
      return{
        '--header-bg-color': config.app.headerBGColor,
        '--header-text-color':config.app.headerTextColor
      }
  }
  },
  data() {
    return {
      // TEMP WALLETS
      locations: [],
      showDismissibleAlert:{status:false,text:""},
      /// TODO: Need to do it in a neat way
      authToken: localStorage.getItem("authToken"),
      accessToken:localStorage.getItem("accessToken"),
      eventToAirdrop: {},   
      stickyNoteTitle: "💡 InfoBox",
      selectedEvent: null,
      prizeList: [],
      selectedChain: null,
      chainOptions: [],
      options: [
        { text: "Select Prize Type", value: null },
        { text: "NFT", value: "NFT" },
        { text: "Tokens", value: "Tokens" },
        { text: "Others", value: "Others" },
      ],
      isLoading:false,
      fullPage: true,
      showContractField: false,
      proceed: false,
      isCheckEveryThing: false,
      feeStructure: {
        fyrePlatformCommision: '',
        serviceFeePercente: 0,
        totalAmountToDistribute: "",
        symbol: ""
      },
      simpleData: "",
      dataParsed: "",
      destinationData: [],
      files: null,
      headers: [],
      flash: null,
      isEdit: false,
      appName: config.appName,
      newRoot: "",
      ipfsHash: "",
      depositTokenAddress: "",
      tokenBalance: "",
      accounts: [],
      newData: {},
      data: {
        inputData: [],
        additionalData: {
          showcase: false,
          depositToken: "",
          project: {
            label: "",
            symbol: "",
            address: {},
            key: "",
          },
          contract: "MerkleDropFactory",
          chainId: 0,
        },
        friendlyValues: false,
      },
    };
  },
  mounted() {
    this.$root.$on("resetMarketPlaceSlide", () => {
      this.resetAllValues();
    });
    console.log(this.$route.query.projectId, 'this.$route.query.projectId')
    
  },
  watch: {
        selectedProjectId:{
          deep:true,
          handler: function () {
            if (this.$route.query.projectId) {
              // this.selectedProjectId = this.$route.query.projectId
              this.selectedEvent = this.$route.query.projectId
              console.log(this.selectedEvent, 'selectedEvent')
              this.flash = null
              this.showContractField = false
              this.prizeList = [];
              this.setPrizeList()
            }
          }
        },

        selectedTool:{
          deep:true,
          handler: function(newValue) {            
            const temp = [ ...newValue.supportedChain]
            temp.forEach(x => {
              this.chainOptions.push({
                text:x.name,
                value:x.chainId
              })
            });
            this.chainOptions.unshift({
              text:'Select Chain',
              value:null
            })
          }
        }
  },
  methods: {  
    resetAllValues () {
      //To Do
      this.chainOptions = []
      this.selectedEvent = null
      this.depositTokenAddress = "";
      this.selectedChain = null
      this.files = null
    },
    getFriendlyValue(str) {
      const toEthStd = utils.fromWei(str.toString(), "ether").toString();
      return toEthStd
    },
    onSelectChain(e) {
      console.log(e)
      console.log(this.selectedChain)
    },
    callChange(e) {
      console.log(e)
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
    async calculateFee() {
      this.proceed = false
      this.feeStructure = {
        fyrePlatformCommision: '',
        serviceFeePercente: 0,
        totalAmountToDistribute: "",
        symbol: ""
      }
      this.isCheckEveryThing=false
      if (this.selectedChain === null) {
        this.showDismissibleAlert.status = true
        this.showDismissibleAlert.text = 'Select Chain'

        throw new Error(this.notifyErr('Select Chain'))
      } else if (this.depositTokenAddress === "") {
        this.showDismissibleAlert.status = true
        this.showDismissibleAlert.text = 'Enter Contract Address'

        // throw new Error(this.notifyErr('Enter Contract Address'))
      }
      else if (this.simpleData === "") {
        this.showDismissibleAlert.status = true
        this.showDismissibleAlert.text = 'Enter Wallet addresses and respective token value'
        // throw new Error(this.notifyErr('Enter Wallet addresses and respective token value'))
      }
      const web3 = await loadweb3(this.selectedChain)
      const contract = new web3.eth.Contract(erc20ABI, this.depositTokenAddress);
      this.feeStructure.symbol = await contract.methods.symbol().call();
      console.log(this.simpleData,"simpledata")
      var allTextLines = this.simpleData.split(/\r\n|\n/);
      //Split per line on tabs and commas        
      console.log(allTextLines.length)
      this.locations = [];
      for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if(data[1]) {
          let location = { "destination": data[0], "value": data[1], };
          this.locations.push(location);
        }
      }
      //Final Data       
      console.log(this.locations.length,"LocationDatas")
      if (this.locations.length < JSON.parse(this.flash.value).winners) {
        this.showDismissibleAlert.status = true
        this.showDismissibleAlert.text = 'Number of winners entered are less than you mentioned in Prize'
        // throw new Error(this.notifyErr('Number of winners entered are less than you mentioned in Prize'))
      } else if (this.locations.length > JSON.parse(this.flash.value).winners) {
        this.showDismissibleAlert.status = true
        this.showDismissibleAlert.text = 'Number of winners entered are more than you mentioned in Prize'
        // throw new Error(this.notifyErr('Number of winners entered are more than you mentioned in Prize'))
      } else {
        this.showDismissibleAlert.status=false
        const chainIdd = parseInt(this.selectedChain)
        this.data.additionalData.depositToken = this.depositTokenAddress
        this.data.additionalData.chainId = parseInt(this.selectedChain)
        this.data.additionalData.project.address = { [`${chainIdd}`]: this.depositTokenAddress }
        this.data.additionalData.project.label = this.flash.title + this.flash._id
        this.data.additionalData.project.symbol = this.shortenName1(this.flash.title, this.flash._id)
        this.data.additionalData.project.key = this.data.additionalData.project.symbol
        this.data.inputData = [...this.locations]
        const url = `${this.$config.studioServer.BASE_URL}api/v1/reward/distribution/serviceFee`;
        let data = {}
        data = { ...this.data }        
        data["eventId"] = this.eventToAirdrop._id
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken: `Bearer ${this.accessToken}`
        };
        const resp = await apiClient.makeCall({
          url,
          method: 'POST',
          body: data,
          header: headers
        })
        const res = resp.data
        this.feeStructure.totalAmountToDistribute = res.totalAmountToPay.toString()
        this.feeStructure.fyrePlatformCommision = res.serviceFee.toString()
        this.feeStructure.serviceFeePercente = res.serviceFeePercent
        delete res.serviceFee
        delete res.serviceFeePercent
        delete res.totalAmountToPay
        const dataToUploadToBlockchain = res
        this.newData = { ...dataToUploadToBlockchain }
        this.proceed = true
        this.isCheckEveryThing = true
      }
    },
    async createDistribution() {
      if (this.proceed) {
        try {
          this.isLoading = true
          const web3 = await loadweb3(this.selectedChain);
          this.accounts = await web3.eth.getAccounts();
          const signerAddress = this.accounts[0]
          const requestData = this.newData
          const msg = JSON.stringify(requestData)
          const sig = await web3.eth.personal.sign(
            msg, signerAddress
          )
          const formData = new FormData();
          formData.append(
            'data',
            JSON.stringify({
              address: signerAddress,
              msg: requestData,
              sig
            })
          )
          formData.append('projectLogo', new Blob([Fyre_Small], { type: 'image/png' }), 'Fyre_small.png')
          let url = `${this.selectedTool.meta.appBaseUrl}/create-merkle-tree/bank`;
          const result = await axios.post(url, formData);
          const { ipfsHash, root, totalBalance, dbTreeId } = result.data;
          console.log(ipfsHash)
          console.log(root)
          console.log(totalBalance)
          console.log(dbTreeId)
          this.tokenBalance = totalBalance
          this.newRoot = root
          this.ipfsHash = ipfsHash
          console.log(this.tokenBalance)
          const ipfsHashBytes = ipfsHashToBytes32(ipfsHash);
          console.log(ipfsHashBytes)
          const newTreeId = await this.addMerkelTree(
            root,
            ipfsHashBytes,
            this.depositTokenAddress,
            totalBalance.toString())
          console.log(newTreeId)
          console.log(dbTreeId)
          const updateBody = {
            dbTreeId,
            newTreeId
          }
          const signature = await web3.eth.personal.sign(
            JSON.stringify(updateBody),
            signerAddress
          )
          url = `${this.selectedTool.meta.appBaseUrl}/update-merkle-tree`
          const a = await axios.post(url, { updateBody, signature })
          const resultData = a.data.success
          console.log(resultData)
          if (resultData === true) {
            console.log("===================Merkel Tree Added=============")

            const parsedValue = JSON.parse(this.flash.value)
            console.log(parsedValue)
            parsedValue["isDistributed"] = true
            parsedValue["externalRecordId"] = dbTreeId.toString()
            parsedValue["contractAddress"] = this.depositTokenAddress.toString()
            parsedValue["appBaseUrl"] = this.selectedTool.meta.appBaseUrl.toString()
            parsedValue["chainId"] = this.selectedChain
            console.log(parsedValue)
            this.flash.value = JSON.stringify(parsedValue)
            const index = this.eventToAirdrop.actions.findIndex((x) => {
              return x._id === this.flash._id
            })
            if (index > -1) {
              this.eventToAirdrop.actions[index] = this.flash
              this.eventToAirdrop["isRewardDistribution"] = true
              console.log(this.eventToAirdrop)
              const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;
              let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
                AccessToken: `Bearer ${this.accessToken}`,
              };

              let method = "PUT";
              const resp = await apiClient.makeCall({
                url,
                body: this.eventToAirdrop,
                method,
                header: headers,
              });              
              let projects = []
              const userProjects = localStorage.getItem("userProjects");
              const userProjectsData = JSON.parse(userProjects).projects;                            
              projects = [...userProjectsData];
              const findProjectIndex = projects.findIndex((x)=>{
                return x._id === this.flash.eventId
              })
              Object.assign(projects[findProjectIndex], {...resp.data});              
              localStorage.setItem("userProjects",JSON.stringify({
              projects: projects,
              count: projects.length,
            }))
              if (resp.status === 200) {
                const url = `${this.$config.studioServer.BASE_URL}api/v1/reward/distribution/details`;
                let headers = {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.authToken}`,
                  AccessToken: `Bearer ${this.accessToken}`,
                };
                const body = {
                  eventId: this.eventToAirdrop._id,
                  actionId: this.flash._id,
                  whiteListedAddress: [...this.newData.inputData],
                  externalAppId: dbTreeId,
                  totalAmountToDistribute: this.feeStructure.totalAmountToDistribute.toString()
                }
                let method = "POST";
                const resp = await apiClient.makeCall({
                  url,
                  body: body,
                  method,
                  header: headers,
                });
                // const json =  resp.data        
                if (resp.status === 200) {
                  this.notifySuccess("Reward Distribution created successfully");
                  this.depositTokenAddress = "";
                  this.selectedChain = null
                  this.flash = null
                  this.showContractField = false
                  this.isCheckEveryThing = false

                }
              }
            }
          }
        } catch (e) {
          this.notifyErr(e || e.message);
        } finally {
          this.isLoading = false
        }
      }

    },
    async addMerkelTree(newRoot, ipfsHash, depositToken, tokenBalance) {
      try {
        console.log(newRoot, ipfsHash, depositToken, tokenBalance)
        const web3 = await loadweb3(this.selectedChain);        
        // this.accounts = await web3.eth.getAccounts();
        // console.log(this.accounts);
        const address = getAddress(parseInt(this.selectedChain))        
        const contract = new web3.eth.Contract(abi, address);
        const getApprovalContract = new web3.eth.Contract(erc20ABI, depositToken)
        const maxApprove = getMaxApprove()
        const approval = await getApprovalContract.methods.approve(address, maxApprove).send({ from: this.accounts[0] })
        console.log(approval.status)
        if (approval.status !== true) {
          return this.notifyErr('Not Approved')
        }
        const transaction = await contract.methods.addMerkleTree(
          newRoot,
          ipfsHash,
          depositToken,
          tokenBalance.toString()
        ).send({ from: this.accounts[0] })
        console.log(transaction)
        console.log(contract.methods)
        const oldTreeId = await contract.methods.numTrees().call()
        console.log(oldTreeId)
        const returnOldTreeId = Number(oldTreeId) + 1
        return returnOldTreeId
      } catch (e) {
        throw new Error(e)
      }
    },
    prizeCardSelectedForAirdrop(prize) {
      if (JSON.parse(prize.value).isDistributed === true) {
        return this.notifyErr('Reward distribution is already created')
      }
      this.isCheckEveryThing = false
      this.flash = prize
      if (this.selectedEvent !== null) {
        this.showContractField = true
      }
    },
    selectOption(e) {
      this.flash = null
      this.showContractField = false
      this.prizeList = [];

      if (this.selectedEvent) {
        
        this.setPrizeList()
      }
    },
    setPrizeList () {
      console.log('setPrize-begin')
      console.log('print-selectedEvent', this.selectedEvent)
      const filterEvent = this.projects.find((x) => {
        return x._id === this.selectedEvent;
      });
      this.eventToAirdrop = { ...filterEvent }
      console.log(this.eventToAirdrop,'eventAirdrop')
      let parsed = null;
      this.prizeList = this.eventToAirdrop.actions.filter((x) => {
        if (x.type === "PRIZE_CARD") {
          parsed = JSON.parse(x.value);
          if (parsed.type === "Tokens") {
            return x;
          }
        }
      });
      console.log('setPrize-close')

    },
    clearselected() {
      this.app.appName = "";
      this.app.baseUrl = "";
      this.app._id = "";
      this.app.appWalletAddress = "";
      this.app.toggle = false;
    },
    shortenName1(first, last) {
      return shortenName(first, last)
    }
  },
  mixins: [notificationMixins],
};
</script>
