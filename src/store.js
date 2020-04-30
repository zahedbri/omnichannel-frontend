import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users_id:null,
        ac_token:null,
        rf_token:null,
        logonid:null,
        employer:null,
        roles:null,
        language_id:null,
        profiletype:null,
    },
    getters: {
        getAccessToken:state=>{return state.ac_token},
        getRefreshToken:state=>{return state.rf_token},
        getLogonId:state=>{return state.logonid},
        getUsersId:state=>{return state.users_id},
        getEmployer:state=>{return state.employer},
        getRoles:state=>{return state.roles},
        getLanguage:state=>{return state.language_id},
        getProfileType:state=>{return state.profiletype}
    },
    actions:{
        setAcToken:(context,ac_token)=>{context.commit("SET_AC_TOKEN",ac_token)},
        setRfToken:(context,rf_token)=>{context.commit("SET_RF_TOKEN",rf_token)},
        setLogonid:(context,logonid)=>{context.commit("SET_LOGONID",logonid)},
        setUsersid:(context,usersid)=>{context.commit("SET_USERS_ID",usersid)},
        setEmployer:(context,employer)=>{context.commit("SET_EMPLOYER",employer)},
        setRoles:(context,roles)=>{context.commit("SET_ROLES",roles)},
        setLanguage:(context,language_id)=>{context.commit("SET_LANGUAGE",language_id)},
        setProfiletype:(context,profiletype)=>{context.commit("SET_PROFILETYPE",profiletype)}
    },
    mutations:{
        SET_AC_TOKEN:(state,ac_token)=>{state.ac_token=ac_token},
        SET_RF_TOKEN:(state,rf_token)=>{state.rf_token=rf_token},
        SET_LOGONID:(state,logonid)=>{state.logonid=logonid},
        SET_USERS_ID:(state,users_id)=>{state.users_id=users_id},
        SET_EMPLOYER:(state,employer)=>{state.employer=employer},
        SET_ROLES:(state,roles)=>{state.roles=roles},
        SET_LANGUAGE:(state,language_id)=>{state.language_id=language_id},
        SET_PROFILETYPE:(state,profiletype)=>{state.profiletype=profiletype}
    }
})