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
                                        <div class="input-group">
                                            <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter" class="form-control"></b-form-input>
                                            <div class="input-group-append">
                                                <b-button size="sm" type="button" :disabled="!filter" @click="filter = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="5" md="5" class="my-1 d-flex justify-content-end">
                                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                    </b-col>
                                </b-row>
                            </b-card-header>
                        </b-card>
                    </b-col>

                    <b-col cols="12">
                        <b-card no-body>
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="transactionitems" :fields="transactionfields" :filter="filter" @filtered="onFiltered">
                                    <template v-slot:head(_)>
                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                    </template>
                                    <template v-slot:cell(_)="row">
                                        <b-button v-if="row.item.faccount_id" @click="seetransaction(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        <b-button v-if="row.item.faccount_id" @click="adjusttransaction(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                    </template>
                                    <template v-slot:cell(amount)="row">
                                        <span v-if="row.item.amount != null">{{row.item.symbol}} {{row.item.amount}}</span>
                                    </template>
                                </b-table>
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

            transactionitems:[],transactionfields:[],account_name:null,
            faccount_id:this.$route.params.faccount_id,

        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var acdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/ac_read_account","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id,faccount_id:this.faccount_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var transactiondetails=acdata.then(result=>{
            this.account_name=result.identifier
            let payload={member_id:this.employer,language_id:this.language_id,faccount_id:this.faccount_id}
            return requester.ajax_request("/api/v1.0/read_transactions","POST",this.ac_token,this.rf_token,true,payload)
        })
        transactiondetails.then(result=>{
            this.transactionitems=result
            this.totalRows=result.length
            this.transactionfields=["reference","identifier","amount","type","payee","created_on","_"]
        })
    },
    methods:{
        seetransaction(row){
            console.log(row)
        },
        adjusttransaction(row){
            console.log(row)
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },

    },
}
</script>
