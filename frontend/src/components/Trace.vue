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
.dot {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
  float: right;
}

.tile {
  font-size: xxx-large;
  background: aliceblue;
  border-bottom: 1px solid #8080802b;
}
.fVal {
  font-size: small;
  color: gray;
  word-wrap: break-word;
}

.card{
  border-radius: 10px;
}
.timeline {
  margin: 50px 0;
  list-style-type: none;
  display: flex;
  padding: 0;
  text-align: center;
}
.timeline li {
  transition: all 200ms ease-in;
}
.timestamp {
  /* width: 200px; */
  margin-bottom: 20px;
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 100; 
}
.status {
  padding: 0px 40px;
  display: flex;
  justify-content: center;
  border-top: 4px solid #3e70ff;
  position: relative;
  transition: all 200ms ease-in ;
}
  
.status span {
  font-weight: 600;
  padding-top: 20px;
}


.fVal {
  font-size: initial;
  color: gray;
  word-wrap: break-word;
}


.status span:before {
  content: '';
  width: 25px;
  height: 25px;
  background-color: #e8eeff;
  border-radius: 25px;
  border: 4px solid #3e70ff;
  cursor: pointer;
  position: absolute;
  top: -15px;
  left: 42%;
  transition: all 200ms ease-in;
}
.swiper-control {
  text-align: right;
}

.swiper-container {
  width: 100%;
  height: 250px;
  margin: 10px 0;
  overflow: hidden;
  padding: 0 20px 30px 20px;
}
.swiper-slide {
  width: 200px;
  text-align: center;
  font-size: 18px;
}
.swiper-slide:nth-child(n) {
  width: 40%;
}

/* .swiper-slide:nth-child(3n) {
  width: 30%;
} */
</style>


<template>  
  <div class="row">
    <div class="col-md-12 leftAlign">
      
      <div class="card">
        <div class="card-body">
          <h5>TRACE</h5>
          <hr/>
          <div class="row">
            <div class="col-md-4">
              <label>Trace by:</label> 
            </div>
              <div class="col-md-8"  v-if="user.Name.includes(':inward') || user.Name.includes(':aggregator')">
                <div class="form-group" >
                    <b-form-select
                      v-model="selectedVehicleNumber"
                      :options="vehicalNumberSelectOptions"
                      @change="OnVehicleNumberSelectDropDownChange($event)"
                      size="md"
                      class="form-control"
                    ></b-form-select>
                  </div>
              </div>
              <div class="col-md-8"  v-if="user.Name.includes(':outward')">
                <div class="form-group">
                    <b-form-select
                      v-model="selectedLotNumber"
                      :options="lotNumberSelectOptions"
                      @change="OnVehicleNumberSelectDropDownChange($event)"
                      size="md"
                      class="form-control"
                    ></b-form-select>
                  </div>
              </div>
              <!-- <div class="col-md-4">
                <div class="form-group">
                    <b-form-select
                      v-model="selectedVehicleNumber"
                      :options="vehicalNumberSelectOptions"
                      @change="OnVehicleNumberSelectDropDownChange($event)"
                      size="md"
                      class="form-control"
                    ></b-form-select>
                  </div>
              </div> -->
          </div>
          <div class="row" v-for="eachProc in vehicleProcList">
            <div class="col-md-12">
              <span class="fVal">ItemId: {{eachProc.prodId}}</span>  <span style="float:right" class="fval"> DOD: {{eachProc.dateOfdispatch}}</span><hr/>
              <div class="swiper-container">
                <div class="swiper-wrapper timeline" >

                  <div class="swiper-slide" v-for="item in eachProc.states" >
                    <div class="timestamp">
                      <span class="date">{{item.dateLabel}}</span>
                    </div>
                    <div class="status" @click="showRaw(item.raw)">
                      <span>{{item.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const data = [
];
// import DialogMixin from 'vuejs-dialog/vuejs-dialog-mixin.min.js'; // Include mixin
export default {
  
  name: "Profile",
  mounted() {},
  components: {},
  data() {
    return {
      vehicleProcList: [
      ],
      steps: [],
      active: 0,
      userKeys: [],
      appList: [],
      schemaCount: 0,
      credentialCount: 0,
      acceptedList:[],
      dispatchedList:[],
      procList:[],
      user: {
        id: "",
        publicKey: "",
        email: "",
        phoneNumber: "",
        fname: "",
        Email: "",
        Name: ""
      },
      authToken: localStorage.getItem("authToken"),
      selectedVehicleNumber: null,
      selectedLotNumber: null,
      vehicalNumberSelectOptions: [
        { value: null, text: "Select vehicle number" },
      ],
      lotNumberSelectOptions: [
        { value: null, text: "Select lot number" },
      ],
    };
  },
  async created() {
    const usrStr = localStorage.getItem("user");
    this.user = JSON.parse(usrStr);
    await this.fetchProcurment();
  },
  mounted(){

  },
  methods: {
    async showRaw(raw){
      console.log(raw)
      // let html = `<ul class="list-group">`
      // for await (const item of Object.keys(raw)){
      //   if(raw[item] == ""){
      //     continue
      //   }
      //   html += `<li class="list-group-item">${item} : ${raw[item]} </li>`
      // }
      // html += '</ul>'
      
      
      alert(JSON.stringify(raw, undefined, 4))



    },

    async fetchProcurment() {

      const url = `${this.$config.studioServer.BASE_URL}${this.$config.studioServer.PROCURMENT_LIST}`;
      console.log(url)
      fetch(url)
        .then((res) => res.json())
        .then((j) => {
          this.procList = j;
          if (this.procList && this.procList.length > 0) {
            this.procList.forEach((proc) => {
                const option = {
                  value: `${proc.procurementId}||${proc.vehicleNumber}`,
                  text: proc.vehicleNumber,
                };
                this.vehicalNumberSelectOptions.push(option);

                if(proc.lot_number){
                  const lOptions = {
                  value: `${proc.procurementId}||${proc.vehicleNumber}`,
                  text: proc.lot_number,
                }
                this.lotNumberSelectOptions.push(lOptions)
                }
                
            })
          }
        })
        .catch((e) => this.notifyErr(`Error: ${e.message}`));
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
    formateDate(d){
      return (new Date(d)).toLocaleString()
    },
    formatName(n){
      return n.substr(-20);
    },
    async OnVehicleNumberSelectDropDownChange(event){
      console.log(event)
      //       if(this.selectedVehicleNumber != null) this.selectedLotNumber = this.lotNumberSelectOptions[0].value
      //       if(this.selectedLotNumber != null) this.selectedVehicleNumber = this.vehicalNumberSelectOptions[0].value
      //       console.log('selectedVehicleNumber = ' + this.selectedVehicleNumber)
      // console.log('selectedLotNumber = ' + this.selectedLotNumber)
      if(event){
        const vnumber = event.split('||')[1];
      const searchUrl = `${this.$config.studioServer.BASE_URL}trace?vehicleNumber="${vnumber}"`;
      const resp = await fetch(searchUrl).then(res => res.json());

        this.vehicleProcList = []
        for await(const item of resp){
          const prodId = Object.keys(item)[0];
          const stateObj = {
            prodId,
            dateOfdispatch:  this.formateDate(item[prodId][0].dateOfdispatch),
            states: []
          }
          for await(const eachProc of Object.values(item[prodId])){
            const temp = {}
            if(eachProc.state == 'DISPATCHED'){
                temp.dateLabel = this.formateDate(eachProc.dateOfdispatch)
                temp.title = `At aggregator`// ${this.formatName(eachProc.owner)}`;
                
            }else if(eachProc.state == 'ACCEPTED'){
                temp.dateLabel = this.formateDate(eachProc.dateOfAcceptByInward)
                temp.title = 'At DP inward'//`By ${this.formatName(eachProc.inward)}`;
            }else{
                temp.dateLabel = this.formateDate(eachProc.dateOfAcceptByOutward)
                temp.title = 'At DP outward' //`By ${this.formatName(eachProc.outward)}`;
            }
            temp.raw = eachProc
            stateObj.states.push(temp)
          }
          this.vehicleProcList.push(stateObj)
        }
        
          console.log(this.steps)
      }else{
        this.steps = []
        this.vehicleProcList = []
      }
    }
  },
};
</script>
