import apiClinet from "../mixins/apiClientMixin";
export default{
    methods: {
          async fetchProjectData  ({isAuthTokenAvailable})   {
            try {
                
              this.isLoading = true;
      
              if(isAuthTokenAvailable){
                if (!this.$route.query.projectId) throw new Error("No project found");
              }
              
              let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.projectId}`;
              let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
              };
      
              if(!isAuthTokenAvailable){
                url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.projectId}?isPublic=true`;
              }

              const resp =  await apiClinet.makeCall({method: "GET", url: url, header: headers})
      

              // I CAN SAFELY ACCESS resp.data here
            
              this.projectDetails = { ...resp.data };
      
              if(!this.projectDetails.projectStatus || this.projectDetails.projectStatus === false){
                this.showStepper = false;
                this.errorMessage = "Sorry, whitelisting process for this project has been over :( !"
                return;
              }

      
                 this.projectDetails.twitterPostFormat = encodeURIComponent(
                   this.projectDetails.twitterPostFormat
                 );
                 this.projectDetails.twitterPostTextFormat = decodeURIComponent(
                    this.projectDetails.twitterPostFormat
                 )
             
              this.projectDetails.fromDate = this.formateDate(this.projectDetails.fromDate);
              this.projectDetails.toDate = this.formateDate(this.projectDetails.toDate);
              this.projectFetched = true;
    
              this.notifySuccess("Project is fetched. ProjectName " + this.projectDetails.projectName);
              this.checkTelegramAnnouncementChannel();
              
            } catch (e) {
         
                console.log(e);
              this.showStepper = false;
              this.errorMessage = e
              this.notifyErr(e);
            } finally {
              this.isLoading = false;
            }
          },
    }
}