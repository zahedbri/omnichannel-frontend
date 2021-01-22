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
        console.log(this.ac_token)

        var phonenumber="+234 815 678 9195"
        var address1="G66, Kano Road"
        var parentname="First Pharmacy Limited"
        var firstname="First"
        var lastname="Pharmacy"
        var country="Nigeria"
        var city="Kakuri"
        var state="Kaduna"
        var storename="First Pharmacy Limited"

        var parentpayload={"adminfirstname":firstname,"adminlastname":lastname,"phone":phonenumber,
        "orgentityname":parentname,"address":address1,
        "country":country,"state":state,"city":city,
        "membertype":"O","memberstate":0,"orgentitytype":"O","registertype":"G","profiletype":"C",}

        var tokenpayload={otp:"M7GC5",logonid:phonenumber}

        var storeinfo={member_id:7,type:'S',setccurr:'NGN',identifier:storename,
            language_id:requester.getfromlocalstorage("language_id"),
            ownername:parentname,nickname:null,address1:address1,
            state:state,country:country,city:city,
            email1:null,phone1:phonenumber,zipcode:null,firstname:firstname,
            middlename:null,lastname:lastname,persontitle:null,photourl:null,superowner:1}

        // this.createparent(parentpayload)
        // this.verifytoken(tokenpayload)
        // this.createstore(storeinfo)

    },
    methods:{
        createparent(payload){
            requester.ajax_request_no_tokens("/api/v1.0/m_create_store_organization","POST",true,payload).done(result=>{
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        verifytoken(payload){
            requester.ajax_request_no_tokens("/api/v1.0/m_verify_token","POST",true,payload).done(result=>{
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        createstore(payload){
            requester.ajax_request("/api/v1.0/m_create_store","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                // this.$router.push({path:'/login'})
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        }
    }
}
</script>
