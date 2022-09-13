import Vue from 'vue';
import Vuex from 'vuex';
import config from "../config"
Vue.use(Vuex)
import { notificationMixins } from '../mixins/notificationMixins';
export default new Vuex.Store({
    state:{
        apps:[]
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
        }
    },
    actions:{
        getApps({commit}){
                let authToken = localStorage.getItem("authToken");
                if(authToken){
                const url = `${config.studioServer.BASE_URL}api/v1/app`;
                const headers = {
                  Authorization: `Bearer ${authToken}`,
                };
                fetch(url, {
                  headers,
                  method: "GET",
                }).then((resp)=>{
                    if (!resp.ok) {
                        console.log(resp.statusText);
                        this.notifyErr(resp.statusText)
                      } else{
                        resp.json().then((res)=>{
                            commit('setApps', res);
                        })
                        
                      }
                }).catch(e=>{
                    this.notifyErr(e)
                })

            }else{
                this.notifyErr("Please login")
            }
                
        },
    },

    mixins: [notificationMixins],
})