<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex align-items-center justify-content-between">
                    <h1 class="breadcrumb">Item Details &mdash; {{details.name}} </h1>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <b-row>
                    <b-col cols="4" class="mt-4">
                    </b-col>
                    <b-col cols="8" class="mt-4">
                        <b-card no-body class="shadow-none">
                            <b-card-body>
                                <h4 class="card-title"> {{details.name}} </h4>
                                <p class="card-text mb-2"><span class="text-xsmall font-weight-bold"> CATEGORY</span> &mdash; <span class="text-xsmall"> {{details.category}} </span> </p>
                                <p class="card-text mb-4"><span class="text-small font-weight-bold">TYPE</span> &mdash; <span class="text-xsmall">{{details.catenttype_id}}</span> </p>
                                <div class="d-flex justify-content-start">
                                    <p class="display-4 align-self-end mr-4">{{details.symbol}}{{details.offer}} </p>
                                    <p class="align-self-end pb-2">{{details.symbol}}{{details.price}} </p>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import requester from "@/services/requester"
import * as JQuery from "jquery"

export default {
    name:"itemdetails",
    data(){
        return {
            currentPage:1,totalRows:null,perPage:10,
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            employer_id:requester.getfromlocalstorage("employer"),
            language_id:requester.getfromlocalstorage("language_id"),
            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            profile:requester.getfromlocalstorage("profile"),

            catentry_id:this.$route.params.catentry_id,details:{},
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var itemdetails=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/item_details","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer,language_id:this.language_id,catentry_id:this.catentry_id})
        })
        itemdetails.then(result=>{
            console.log(result)
            this.details=result
        })
    },
    methods:{}
}
</script>