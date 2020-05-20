<template>
    <div>

        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{success_message}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import requester from "@/services/requester"
import * as JQuery from "jquery"
import libphonenumber from "google-libphonenumber"

export default {
    name:"mobileops",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

        }
    },
    created(){
        // sign up
        // var payload={"adminfirstname":"Adeola","adminlastname":"Adesina","phone":"+234 816 501 4165",
        // "orgentityname":"Juta Nigeria Limited","address":"12 Reverend Ogunbiyi Street GRA","country":"Nigeria",
        // "state":"Lagos","city":"Ikeja",
        // "membertype":"O","memberstate":0,"orgentitytype":"O","registertype":"G","profiletype":"C",}
        // requester.ajax_request_no_tokens("/api/v1.0/m_create_store_organization","POST",true,payload).done(result=>{
        //     console.log(result)
        //     this.success_message=result.msg
        //     this.showSnackbar=true
        // }).fail((jqXHR,textStatus,errorThrown) => {
        //     this.success_message=jqXHR.responseJSON.msg
        //     this.showSnackbar=true
        //     console.log(jqXHR.responseJSON)
        //     console.log(textStatus)
        //     console.log(errorThrown)
        // })

        // Verify Token
        // var payload={otp:"M86GC5",logonid:"+234 816 501 4165"}
        // requester.ajax_request_no_tokens("/api/v1.0/m_verify_token","POST",true,payload).done(result=>{
        //     console.log(result)
        // }).fail((jqXHR,textStatus,errorThrown) => {
        //     this.success_message=jqXHR.responseJSON.msg
        //     this.showSnackbar=true
        //     console.log(jqXHR.responseJSON)
        //     console.log(textStatus)
        //     console.log(errorThrown)
        // })

        // var storeinfo={
        //     member_id:86,type:'S',setccurr:'NGN',identifier:"Juta Pharmacy, Isheri",
        //     language_id:requester.getfromlocalstorage("language_id"),
        //     ownername:"Juta Nigeria Limited",nickname:null,address1:"381, Isheri Road",
        //     state:"Lagos",country:"Nigeria",city:"Idimu",email1:null,phone1:"+234 816 501 4165",
        //     zipcode:null,firstname:"Adeola",
        //     middlename:null,lastname:"Adesina",persontitle:"Mr.",photourl:null,
        //     superowner:86
        // }
        // requester.ajax_request("/api/v1.0/m_create_store","POST",this.ac_token,this.rf_token,true,storeinfo).done(result=>{
        //     console.log(result)
        // })


    },
    methods:{}
}
</script>