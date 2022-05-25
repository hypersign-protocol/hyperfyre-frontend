
<template >
  <div class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px;">
    <div >
         <Metrics
        @getLeaderBoard="fetchLeaderBoard"
        :leaderBoardData="leaderBoardData"
        :userScore="5"
        :totalEntries="eventData.investorsCount"
        :timeLeft="
          (new Date(eventData.toDate).getTime() -
            new Date(eventData.fromDate).getTime()) /
          (1000 * 3600 * 24)
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
      <draggable v-model="eventData.actions" >
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