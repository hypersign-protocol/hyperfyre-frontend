<template >
  <div class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px;">
    <div >
         <Metrics
        
        :userScore="5"
        :totalEntries="eventData.investorsCount"
        :timeLeft="
          parseInt((new Date(eventData.toDate).getTime() -
            new Date().getTime()) /
          (1000 * 3600 * 24))
        "
      />
    </div>
    <div >
      
      <Banner 
        :eventName="eventData.projectName"
        :themeColor="eventData.themeColor"
        :fontColor="eventData.fontColor"
        :fromDate="new Date(eventData.fromDate).toLocaleString()"
        :toDate="new Date(eventData.toDate).toLocaleString()"
        :logoUrl="eventData.logoUrl"
      />
    </div>    
    <div>    
    
      <draggable v-model="eventData.actions" @end="onEnd" >
       <b-list-group 
        class="col md-4"
        v-for="action in eventData.actions"
        v-bind:key="action._id"
      >
    <b-list-group-item class="col md-4" v-if="action.type!=='HYPERSIGN_AUTH'">{{action.title}}</b-list-group-item>

        
</b-list-group>


     </draggable>
    </div>
  </div>
</template>

<script>
import Banner from "../../../participant/Banner.vue";
import Metrics from "../../../participant/Metrics.vue";
  import draggable from 'vuedraggable'
export default {
  name: "PreviewConfig",
  props: {
    eventData: {
      type: Object,
    },
  },
  components: { Banner, Metrics ,draggable},
  methods:{
  onEnd(){
   this.$root.$emit("actionReorder",this.eventData.actions)
  }
}
};


</script>
