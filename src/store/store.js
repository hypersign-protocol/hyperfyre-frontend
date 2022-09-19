import Vue from 'vue';
import Vuex from 'vuex';
import config from "../config"
Vue.use(Vuex)
import  notificationMixins  from "../mixins/notificationMixins.js"
export default new Vuex.Store({
    mixins:[notificationMixins],
    state:{
        apps:[],
        teammates:[]
    },
    getters:{
        
    },
    mutations:{
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
                notificationMixins.methods.notifyErr("Plase login")
            }
                
        },
    },

})