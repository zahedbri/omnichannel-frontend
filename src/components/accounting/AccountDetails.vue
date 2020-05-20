<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Account Details &mdash; {{account_name}}</h1>
                    <div>
                        <b-dropdown variant="success" size="sm" right text="New Account">
                            <b-dropdown-item v-b-modal.new-account-modal>Add new account</b-dropdown-item>
                            <b-dropdown-item v-b-modal.new-vendor-modal>Import accounts</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <b-row>
                    <b-col cols="12" class="mt-2">
                        <b-card no-body class="mb-0">
                            <b-card-header style="background:#fff;" class="py-2">
                                <b-row class="d-flex align-items-center justify-content-end">
                                    <b-col sm="7" md="7" class="my-1">
                                    </b-col>
                                    <b-col sm="5" md="5" class="my-1">
                                    </b-col>
                                </b-row>
                            </b-card-header>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:"accountdetails",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:6,filter:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            accountsitems:null,accountsfields:null,account_name:null,
            faccount_id:this.$route.params.faccount_id,

        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var acdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/ac_read_account","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id,faccount_id:this.faccount_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            // this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        acdata.then(result=>{
            console.log(result)
            this.account_name=result.identifier
        })
    },
    methods:{},
}
</script>
