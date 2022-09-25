import Vue from 'vue';
import Vuex from 'vuex';
import config from "../config"
Vue.use(Vuex)
import  notificationMixins  from "../mixins/notificationMixins.js"
export default new Vuex.Store({
    mixins:[notificationMixins],
    state:{
        apps:[],
        teammates:[],
        projects:[],
        investorCount:0,
        projectCount:0,
    },
    getters:{
        schemaCount(state){
        let Count = 0;
        state.projects.map((x) => {
            Count += x.investorsCount;
            });
            return state.investorsCount = Count;
        },
        projectCount(state){
            state.projectCount = state.projects.length
            return state.projectCount
        }
    },
    mutations:{
        // initialise projects to store
        setProjects(state,payload){
            payload.map((x) => {
                x["whitelisting_link"] =
                  window.location.origin +
                  (x.slug && x.slug != ""
                    ? "/form/" + x.slug
                    : "/form?projectId=" + x._id);
                x["investors_link"] =
                  window.location.origin + "/admin/participants?projectId=" + x._id;
                  state.projects.push(x)
              })
        },
        // add project to projects[] in store 
        addProject(state,payload){
            let projectToAdd;
            payload["whitelisting_link"] =
            window.location.origin +
            (payload.slug && payload.slug !=""
            ? "/form" + payload.slug
            : "/form?projectId=" + payload._id);
            payload["investors_link"] =
            window.location.origin + "/admin/participants?projectId=" + payload._id
            projectToAdd = {...payload}
            state.projects.push(projectToAdd)
        },

        //update project to projects[] in store
        updateProject(state,payload){
            console.log(payload)
            const index = state.projects.findIndex(x => x._id === payload._id);
            Object.assign(state.projects[index],{...payload})
        },

        // remove project from store
        deleteEvent(state,payload){
            const index = state.projects.findIndex(x => x._id === payload);
            if(index > -1){
                state.projects.splice(index,1)
                const tempProject = JSON.parse(
                    localStorage.getItem("userProjects")
                  );
                  localStorage.removeItem("userProjects");
  
                  if(tempProject){
                    tempProject.projects.splice(index, 1);
                    localStorage.setItem(
                      "userProjects",
                      JSON.stringify({
                        projects: tempProject.projects,
                        count: tempProject.projects.length,
                      })
                    );
                  }
            } else {
                notificationMixins.methods.notifyErr("not found event")
            }
        },


        // 
        setApps(state,payload){
            state.apps = payload
        },
        // 
        addApp(state, payload){
            // if _id exists in store then updateApp
            if(!state.apps.find(x => x._id === payload._id)){
                state.apps.push(payload)
            }else{
                console.log('app already exist AppId='+payload._id)
                this.commit('updateApp',payload)
            }
            
        },
        // update an app in store
        updateApp(state, payload){
            const index = state.apps.findIndex(x => x._id === payload._id);
            Object.assign(state.apps[index], {...payload});
        },
        // initialise temmates to the store
        setTeammates(state,payload){
            state.teammates = payload
        },
        // add teammates to store
        addTeammate(state,payload){
            state.teammates.push(payload)
        },
        //remove teammates from store
        removeTeammate(state,payload){
            const index = state.teammates.findIndex(x => x._id === payload);
            if(index > -1){
            state.teammates.splice(index,1)
            }
            else{
            notificationMixins.methods.notifyErr("not found teammate")
            }
        }
    },
    actions:{
        fetchProjects({commit},authToken){
            let dataSend=[]
            console.log("hi")
            let accessToken;
            if(localStorage.getItem("accessToken")){
                accessToken = localStorage.getItem("accessToken")
            }
          const url = `${config.studioServer.BASE_URL}api/v1/project`;
          const headers = {
          Authorization: `Bearer ${authToken}`,
          AccessToken: `Bearer ${accessToken}`,
            };
        fetch(url, {
          headers,
          method: "GET",
        }).then((resp)=>{
            if(!resp.ok){
                this.notifyErr(resp.statusText)
            } else {
                resp.json().then((res)=>{
                localStorage.removeItem("userProjects");
                localStorage.setItem("userProjects",
                JSON.stringify({
                    projects:res,
                    count:res.length
                }))
                commit("setProjects",res)
                  
                })
            }
        })
        },
        getApps({commit},authToken){
            let headers;
            let accessToken;
            if(localStorage.getItem("accessToken")){
                accessToken = localStorage.getItem("accessToken")
                headers = {
                    Authorization: `Bearer ${authToken}`,
                    AccessToken: `Bearer ${accessToken}`
                  };
            } else {
                headers = {
                    Authorization: `Bearer ${authToken}`,
                  };
            }
            const url = `${config.studioServer.BASE_URL}api/v1/app`;
                fetch(url, {
                  headers,
                  method: "GET",
                }).then((resp)=>{
                    if (!resp.ok) {
                        notificationMixins.methods.notifyErr(resp.statusText)
                      } else{
                        resp.json().then((res)=>{
                            commit('setApps', res);
                        })
                        
                      }
                }).catch(e=>{
                    notificationMixins.methods.notifyErr(e)
                })
        },

        getTeammates({commit},authToken) {
            if(authToken){
                const url = `${config.studioServer.BASE_URL}api/v1/admin/team`;
                const headers = {
                  Authorization: `Bearer ${authToken}`,
                };
                fetch(url, {
                  headers,
                  method: "GET",
                }).then((res) => {
                    if (!res.ok) {
                        notificationMixins.methods.notifyErr(res.statusText);
                      } else{
                        res.json().then((res)=>{
                        commit('setTeammates',res);
                        })
                      }

                }).catch(e=>{
                    notificationMixins.methods.notifyErr(e)
                })

            }else{
                notificationMixins.methods.notifyErr("Please login")
            }
                
        },
    },

})