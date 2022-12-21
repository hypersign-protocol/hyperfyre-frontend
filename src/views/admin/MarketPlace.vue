<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}
.floatLeft {
  float: left;
}

.floatRight {
  float: right;
}

.noBullet {
  list-style-type: none;
}

.title {
  color: grey;
  font-size: 18px;
}
.slight-left-margin {
  margin-left: 15px;
}
.far {
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
}
.allButtons {
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
.upload-file-wrapper >input{  
    display: none;  
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <b-sidebar
      backdrop
      width="50%"
      id="sidebar-right"
      title="Create Reward Distribution"
      class="sidebarContainer background-transparent"
      right
      shadow
      no-close-on-backdrop
      backdrop-variant="dark"
    >
      <div class="px-3 py-2">
        <hf-notes :notes="deleteNote"></hf-notes>
        <hr />
        <div></div>
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-9">
              <div class="row g-3 align-items-center w-100 mt-4">
                <div class="text-left col-lg-3 col-md-3 text-left">
                  <label for="type" class="col-form-label"
                    >Select Event<span style="color: red">*</span>:
                  </label>
                </div>
                <div class="col-lg-9 col-md-9 px-0">
                  <b-form-select                  
                    placeholder="Select an Event"
                    :options="projects"
                    v-model="selectedEvent"
                    textField="projectName"
                    valueField="_id"
                    @input="selectOption"
                  ></b-form-select>
                </div>
              </div>
            </div>
          </div>
          <div class="row scroll mt-5">            
            <div
              class="col-lg-3"
              v-for="eachPrize in prizeList"
              :key="eachPrize._id"
            >
              <div>           
                <b-card
                  :title="eachPrize.title"
                  tag="article"                               
                  style="max-width: 20rem; margin-top: 20px;height:10rem;"                  
                  :class="
                    flash == eachPrize
                      ? 'flash eventCard card rounded m-1 p-1 d-flex flex-row align-items-center'
                      : 'card eventCard rounded m-1 p-1 d-flex flex-row align-items-center pointer'
                  "                  
                  @click="prizeCardSelectedForAirdrop(eachPrize)"
                >
                  <div class="row">
                    <div class="col-md-9">
                      <ul
                        style="
                          list-style-type: none;
                          padding-left: 4px;
                          font-size: small;
                        "
                      >
                        <li
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Event Url"
                        >
                          <i class="fas fa-users"></i>
                          <span class="ml-2"
                            >Winners:
                            {{ JSON.parse(eachPrize.value).winners }}</span
                          >
                        </li>

                        <li
                          data-toggle="tooltip"
                          data-placement="bottom"                          
                        >
                          <i class="fas fa-award"></i>
                          <span class="ml-2"
                            >{{ JSON.parse(eachPrize.value).prizeValue }}</span
                          >
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
                     <b-icon icon="check-circle-fill"
                     title="Reward Distributed"
                     v-show="JSON.parse(eachPrize.value).isDistributed == true"
                     scale="2"
                     style="float:right;"                     
                     variant="success"></b-icon>
                  </footer>
                </b-card>
              </div>
            </div>
          </div>
      <div
        class="row g-3 align-items-center w-100 mt-4 ml-2"
        v-if="showContractField"
      >
        <div class="col-lg-9 col-md-9 px-0">
          <label for="placeHolder" class="col-form-label">Enter your contract address: </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="depositTokenAddress"        
            type="text"
            id="placeHolder"
            class="form-control w-100"
            placeholder="Enter contract address"
          />
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4 ml-2"
        v-if="showContractField"
      >
        <div class="col-lg-9 col-md-9 px-0">
          <label for="placeHolder" class="col-form-label">Enter wallet addresss and amount of token: </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">    
          <b-form-textarea
            id="textarea"
            v-model="simpleData"
            placeholder="address,tokenvalue"
            :rows="JSON.parse(flash.value).winners"
            :max-rows="JSON.parse(flash.value).winners"
            @change="callChange"
          ></b-form-textarea>
        </div>        
      </div>
      <div class="mt-2" style="display: flex" v-if="showContractField">
          <div class="col-lg-6 col-md-9 px-0"></div>
          <div class="col-lg-4 col-md-3" style="display: block">
            <hf-buttons
             @executeAction="calculateFee()"
              name="Procced"
              customClass="btn btn-outline-primary button-theme"
            ></hf-buttons>
          </div>
        </div>
      <div
        class="row g-3 align-items-center w-100 mt-4 ml-2"
        v-if="showContractField"
      >
        <div class="col-lg-3 col-md-3 align-items-center"  v-if="feeStructure.fyrePlatformCommision!==''">
          <label for="placeHolder" class="col-form-label">You need to pay platform fee as token: </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">    
          <span v-if="feeStructure.fyrePlatformCommision!==''">{{feeStructure.fyrePlatformCommision}} Tokens as a platfrom Fee</span>
        </div>        
      </div>
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
          <div class="col-lg-6 col-md-9 px-0"></div>
          <div class="col-lg-4 col-md-3" style="display: block">
            <hf-buttons
             @executeAction="createDistribution()"
              name="Create Distribution"
              customClass="btn btn-outline-primary button-theme"
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
    <div class="row">
      <div class="col-md-12">
        <h3>MarketPlace Your App</h3>
        <div class="card event-card">
          <div class="card-body">
            <b-card
              title="Finance.vote"
              tag="article"
              style="max-width: 30rem; margin-top: 10px; height: 13rem"
              class="mb-2 eventCard"
            >
              <ul
                style="
                  list-style-type: none;
                  padding-left: 0px;
                  min-height: 80px;
                "
              >
                <li>
                  <h5 class="card-title"
                    >Create Reward Distribution Through finanace.vote</h5
                  >
                </li>
                <!-- <li>
                  <p class="card-title"
                    >Schemass</p
                  >
                </li>                 -->
              </ul>
              <footer>
                <div class="form-group row" style="margin-bottom: 0rem">
                  <div class="col-sm-10">
                    <ul style="list-style-type: none; padding-left: 0px"></ul>
                  </div>
                  <b-button
                    class="mt-2"
                    size="sm"
                    aria-hidden="true"
                    title="Try"
                    style="cursor: pointer; float: right"
                    @click="openSidebar()"
                    >try now</b-button
                  >
                </div>
              </footer>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HfNotes from "../../components/elements/HfNotes.vue";
import notificationMixins from "../../mixins/notificationMixins";
import {ipfsHashToBytes32,getMaxApprove} from "../../mixins/rewardDistUtils"
import loadweb3 from "../../mixins/getWeb3"
import apiClient from "../../mixins/apiClientMixin"
import { abi, address} from '../../mixins/merkelDropFactoryAbi'
import {erc20ABI} from "../../mixins/ERC20ContractAbi"
import ToolTips from "../../components/basic/toolTips";
import config from "../../config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { isValidURL, isValidText } from "../../mixins/fieldValidationMixin";
import Messages from "../../utils/messages/admin/en";
import HfButtons from "../../components/elements/HfButtons.vue";
import axios from "axios"
import {utils} from "web3"
export default {
  name: "MarketPlace",
  components: { Loading, ToolTips, HfButtons, HfNotes },
  computed: {
    buttonThemeCss() {
      return {
        "--button-bg-color": config.app.buttonBgColor,
        "--button-text-color": config.app.buttonTextColor,
      };
    },
    apps() {
      return this.$store.state.apps;
    },
  },
  data() {
    return {
      proceed:false,
      isCheckEveryThing:false,
      feeStructure:{
        fyrePlatformCommision:'',
        yourTotalAmount:''
      },
      simpleData:"",
      dataParsed:"",
      destinationData:[],
      files:null,
      eventToAirdrop:{},   
      headers:[],   
      showContractField:false,
      flash: null,
      selectedEvent: null,
      prizeList: [],
      projects: [],
      options: [
        { text: "Select Prize Type", value: null },
        { text: "NFT", value: "NFT" },
        { text: "Tokens", value: "Tokens" },
        { text: "Others", value: "Others" },
      ],
      deleteNote: "ashbfjgev",
      isEdit: false,
      appName: config.appName,
      newRoot: "",
      ipfsHash: "",
      depositTokenAddress: "",
      tokenBalance: "",
      accounts: [],
      data: {
        inputData: [
        {
        destination:	"0x68E6ecaAe37F9a780B9A337ec9D88768c0425A4d",
        value:	"100000000000000000000"
        }
        ],
        additionalData: {
          showcase: false,
          depositToken: "",
          project: {
            _id: "6391709d7f9eb60013c7507b",
            label: "RP Raj Patil",
            symbol: "RP NEW TOKEN",
            address: {
              5: "0x6cBAD888Bf20b35192AdfFA909c5cfeeD8463f81",
            },
            key: "RP NEW TOKEN",
            createdAt: "2022-12-08T05:05:33.799Z",
            updatedAt: "2022-12-08T05:05:33.799Z",
            __v: 0,
          },
          contract: "MerkleDropFactory",
          chainId: 5,
        },
        friendlyValues: false,
      },
      isLoading: false,
      fullPage: true,
      errors: [],
      authToken: null,
      accessToken: null,
    };
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.authToken = localStorage.getItem("authToken");
    }
    if (localStorage.getItem("accessToken")) {
      this.accessToken = localStorage.getItem("accessToken");
    }
    const userProjectStr = localStorage.getItem("userProjects");
    const userProjectsData = JSON.parse(userProjectStr).projects;
    console.log(userProjectsData);
    this.projects = [...userProjectsData];
    console.log(this.projects);
    this.projects.unshift({
      _id: null,
      projectName: "Select an event",
    });
  },
  methods: {
    callChange(e) {
      console.log(e)
    },
  //   handleButtonClick(event) {
  //    let fileInputElement = this.$refs.file;
  //   fileInputElement.click();
  //   console.log(fileInputElement)
  //   },
  // handleFileUpload(event) {
  //   this.files = event.target.files
  //   console.log(this.files[0])
  //  const temp = this.readFile(this.files[0])
  //  console.log(temp)
  // },
  readFile(file) {
    // var fileReader = new FileReader();        
    // fileReader.readAsText(file);
    
    // const lines = file.split('\n')
    // const result = []    

    // for (let i = 1; i < lines.length; i++) {        
    //     if (!lines[i])
    //         continue
    //     const obj = {}
    //     const currentline = lines[i].split(',')

    //     for (let j = 0; j < this.headers.length; j++) {
    //         obj[this.headers[j]] = currentline[j]
    //     }
    //     result.push(obj)
    // }
    // console.log(obj)
    // return result
// let promise = new Promise((resolve, reject) => {
//         var reader = new FileReader();
//         var vm = this;
//         reader.onload = e => {
//           resolve((vm.fileinput = reader.result));
//         };
//        reader.readAsText(file);
//       });

//      return promise.then(result => {
//           /* handle a successful result */
//        return this.dataParsed = this.fileinput
//         },
//         error => {
//           /* handle an error */ 
//           console.log(error);
//         }
//       )     
  },
async calculateFee() { 
    this.proceed = false         
      if(this.depositTokenAddress ===""){
        throw new Error(this.notifyErr('Enter Contract Address'))
      }
      else if(this.simpleData===""){
        throw new Error(this.notifyErr('Enter Wallet addresses and respective token value'))
      }
      console.log(this.simpleData)
      var allTextLines = this.simpleData.split(/\r\n|\n/);
        //Split per line on tabs and commas        
        console.log(allTextLines.length)        
        let locations = []; 
        for (var i=0; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            console.log(data)            
            let location = {"destination":data[0], "value":data[1],};            
            console.log(location)
            locations.push(location);
        }        
        console.log(locations)        
        if(locations.length < JSON.parse(this.flash.value).winners){
          console.log(JSON.parse(this.flash.value).winners)
         throw new Error (this.notifyErr('Number of winners entered are less than you mentioned in Prize'))
        } else if(locations.length > JSON.parse(this.flash.value).winners){
         throw new Error(this.notifyErr('Number of winners entered are more than you mentioned in Prize'))
        } else {             
          console.log(locations)    
          this.data.additionalData.depositToken = this.depositTokenAddress      
          this.data.inputData = [...locations]
          console.log(this.data)
           const url = `${this.$config.studioServer.BASE_URL}api/v1/reward/distribution/serviceFee`;
          let data = {}
          data ={...this.data}
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          AccessToken:`Bearer ${this.accessToken}`
        };
        // const resp = await fetch(url, {
        //   headers,
        //   method: "GET",
        //   body:JSON.stringify(this.data)
        // });
        const resp = await apiClient.makeCall({
          url,
          method:'POST',
          body:data,
          header:headers
        })
        const res = resp.data        
        console.log(res)
          this.proceed = true
          this.isCheckEveryThing = true
        }        
        console.log(this.data.inputData)        
  },
  async createDistribution() {    
    console.log(this.proceed)
    if(this.proceed) {      
      try{
      this.isLoading = true
      console.log('hi')
      const web3 = await loadweb3();
        console.log(web3);
        this.accounts = await web3.eth.getAccounts();
        console.log(this.accounts);
      const signerAddress = this.accounts[0]
      const requestData = this.data
      const msg = JSON.stringify(requestData)
      const sig = await web3.eth.personal.sign(
        msg, signerAddress
      )
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          address:signerAddress,
          msg:requestData,
          sig
        })
      )     
      let url = `${this.$config.marketPlace.create_merkel_tree_finance_vote}/create-merkle-tree/bank`;
      console.log(url)
      const result = await axios.post(url,formData);      
      console.log(result.data)       
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
      console.log(abi,address); 
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
      console.log(signature,updateBody)
      url = `${this.$config.marketPlace.create_merkel_tree_finance_vote}/update-merkle-tree`
      const a = await axios.post(url, {updateBody,signature})      
    console.log(a)
    const resultData = a.data.success
    console.log(resultData)
     if(resultData === true) {      
      console.log("===================Merkel Tree Added=============")

      const parsedValue = JSON.parse(this.flash.value)
      console.log(parsedValue)
      parsedValue["isDistributed"]= true
      parsedValue["externalRecordId"] = dbTreeId.toString()
      console.log(parsedValue)
      this.flash.value = JSON.stringify(parsedValue)
      console.log(this.flash)
      const index = this.eventToAirdrop.actions.findIndex((x)=>{
      return x._id === this.flash._id
      })
      console.log(this.flash)
      console.log(index)
      if(index > -1) {
        this.eventToAirdrop.actions[index] = this.flash
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
        if(resp.status === 200) {
          this.notifySuccess("Reward Distribution created successfully");
        }        
      }
     } 
    }catch (e) {
      this.notifyErr(e || e.message);
    } finally {
      this.isLoading = false
    }
    }  
    
   },
   async addMerkelTree(newRoot,ipfsHash,depositToken,tokenBalance) {  
    try{  
    console.log(newRoot,ipfsHash,depositToken,tokenBalance)
    const web3 = await loadweb3();
        console.log(web3);
        // this.accounts = await web3.eth.getAccounts();
        // console.log(this.accounts);
        const contract = new web3.eth.Contract(abi, address);
        console.log(depositToken)
        console.log(erc20ABI)
        const getApprovalContract = new web3.eth.Contract(erc20ABI,depositToken)   
        const maxApprove = getMaxApprove()
        console.log(maxApprove)             
       const approval = await getApprovalContract.methods.approve('0xe18898Db95f7B803CF707f3AAAe2ecA14857c916', maxApprove).send({from:this.accounts[0]})                      
       console.log(approval)
        const transaction = await contract.methods.addMerkleTree(
        newRoot,
        ipfsHash,
        depositToken,
        tokenBalance.toString()
      ).send({from:this.accounts[0]})
      console.log(transaction)  
      console.log(contract.methods)
      const oldTreeId = await contract.methods.numTrees().call()
      console.log(oldTreeId)                 
      const returnOldTreeId = Number(oldTreeId) + 1
      return returnOldTreeId    
    }catch (e) {
      throw new Error(e)
    }
    }, 
    prizeCardSelectedForAirdrop(prize) {      
      if(JSON.parse(prize.value).isDistributed === true) {
        return this.notifyErr('Reward distribution is already created')
      }
      this.flash = prize            
      if(this.selectedEvent !== null){
      this.showContractField = true
      }      
      console.log(prize);  
      console.log(this.flash);    
    },
    selectOption(e) {
      this.flash = null
      this.showContractField = false
      this.prizeList = [];
      if (e) {
        const filterEvent = this.projects.find((x) => {
          return x._id === e;
        });
        this.eventToAirdrop = { ...filterEvent }
        console.log(this.eventToAirdrop)
        let parsed = null;
        this.prizeList = this.eventToAirdrop.actions.filter((x) => {
          if (x.type === "PRIZE_CARD") {
            parsed = JSON.parse(x.value);
            if (parsed.type === "Tokens") {              
              return x;
            }
          }
        });
        console.log(this.eventToAirdrop);
        console.log(this.prizeList);        
      }
    },
    openSidebar() {
      console.log(this.flash)
      this.selectedEvent = null
      this.depositTokenAddress="";
      this.flash = null    
      this.files = null
      this.$root.$emit("bv::toggle::collapse", "sidebar-right");
    },        
    clearselected() {    
      this.app.appName = "";
      this.app.baseUrl = "";
      this.app._id = "";
      this.app.appWalletAddress = "";
      this.app.toggle = false;
    },    
  },
  mixins: [notificationMixins],
};
</script>
