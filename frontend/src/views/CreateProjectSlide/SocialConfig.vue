<style scoped>
.selected-media-wrapper{
    border: 1px dashed;
    max-height: 100px;
    background-color: #f5f5f5;
    border-radius: 10px;
    

}
.card i{
    cursor: pointer;
}
</style>
<template>
  <div>
      <div v-if="addedSocialMedias.length" class="selected-media-wrapper d-flex  p-2 mb-4">
            <div class="card rounded m-1 p-1 d-flex flex-row align-items-center " v-for="(socialMedia, idx) in addedSocialMedias" :key="idx">
                <span class="mr-2 text-capitalize">{{socialMedia.media}}</span>
                <i @click="removeSocialMedia(idx)" class="fas fa-minus-circle "></i>
            </div>
      </div>

       <b-form-select v-model="selectedSocialMedia"    text-field="label"  :options="socialOptions"></b-form-select>
        <div v-if="selectedSocialMedia !==null" class="mt-4">
          
                 <div  v-for="field in selectedSocialMedia.fields" class="mb-3 text-left" :key="field.name">
                    <label :for="field.name" class="form-label"> {{field.placeholder}}: </label>
                    <input v-model="field.value" :type="field.type" :placeholder="field.placeholder" :id="field.name" class="form-control" />
                </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button @click="handleSocialMediaAdd(selectedSocialMedia)" class="btn btn-primary" type="button"> {{addedSocialMedias.includes(selectedSocialMedia) ? "Update" : "Add"}}</button>
                    
        </div>
      </div>

          
      </div>
  </div>
</template>

<script>
import notificationMixins from '../../mixins/notificationMixins';


export default {
  name: "SocialConfig",
  components: {  },
  data(){
      return{
        selectedSocialMedia: null,

        addedSocialMedias: [],
        socialOptions: [
            {value: null, label: "Select a Project", disabled: true},
            {
                label: "Twitter",
                value: {
                    media: "twitter",
                    fields: [ 
                        {name: "twitterHandle", type: "text", placeholder: "Twitter Handle", value:"" } ,
                        {name: "twitterPostFormat", type: "text", placeholder: "Twitter Post Format", value: "" }
                    ]
                }, 
                
            },
            {
                label: "Telegram", 
                value: {
                    media: "telegram",
                    fields: [ 
                        {name: "telegramHandle", type: "text", placeholder: "Telegram Handle", value: "" } ,
                        {name: "telegramAnnouncementChannel", type: "text", placeholder: "Telegram Announcement Channel", value: "" }
                    ]
                }, 
                
            }
      ],
    }
      
  },
  props:{
      project: {
          type: Object
      }
  },
  methods: {
      removeSocialMedia(index){
         
          delete this.project.social[this.addedSocialMedias[index].media];
          this.addedSocialMedias.splice(index, 1) 
        //   delete this.project.social[this.addedSocialMedias[index].media] 

      },
      handleSocialMediaAdd(media){

        const obj = { isEnabled: true}
        
          if(!this.addedSocialMedias.includes(media)){
               if(media.fields[0].value == ""){
                        return this.notifyErr(`Please fill in ${media.fields[0].placeholder}`)
                    }
                       if(media.fields[1].value == ""){
                        return this.notifyErr(`Please fill in ${media.fields[1].placeholder}`)
                }    
            this.addedSocialMedias.push(media)  
          } else{
            this.addedSocialMedias[this.addedSocialMedias.length -1].fields.map(field => {
                obj[field.name] = field.value
            }) 
          }

           this.addedSocialMedias[this.addedSocialMedias.length -1].fields.map(field => {
                obj[field.name] = field.value
             }) 

        this.project.social = { ...this.project.social, [media.media] :obj};

      },
  },

  mixins: [notificationMixins]

};
</script>

