<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Chart of Accounts</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New Account">
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
                    <b-col sm="4" md="4" class="my-1">
                        <b-form-group label="Filter" label-cols-sm="2" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
                            <b-input-group size="sm">
                                <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to search"></b-form-input>
                                <b-input-group-append>
                                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col sm="8" md="8" class="my-1 d-flex justify-content-end">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                    </b-col>
                    <b-col cols="12">
                        <b-card no-body>
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="accountsitems" :fields="accountsfields" :filter="filter" @filtered="onFiltered"></b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="new-account-modal" size="md" id="new-account-modal" title="New Account" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewaccount">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Number</label>
                                            <b-form-input size="sm" type="text" v-model="faccount.accountnumber" placeholder="Account Number"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Type</label>
                                            <b-form-select size="sm" v-model="faccount.acclass_id" :options="acclassoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-input size="sm" type="text" v-model="faccount.identifier" placeholder="Account Name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Routing Number</label>
                                            <b-form-input size="sm" type="text" v-model="faccount.routingnumber" placeholder="Routing Number"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-select size="sm" v-model="faccount.setccurr" :options="currencyoptions"></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Activation Date</label>
                                            <b-form-datepicker size="sm" type="text" v-model="faccount.timecreated" placeholder="Activation date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Opening Balance</label>
                                            <b-form-input size="sm" type="text" v-model="faccount.balance" placeholder="Opening Balance"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Memo / Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="faccount.description" placeholder="Brief description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                            </b-card-footer>
                        </form>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{success_message}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:'chartofaccounts',
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            currentPage:1,
            totalRows:null,
            perPage:10,
            filter:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            accountsitems:null,
            accountsfields:null,
            acclassoptions:[{value:null,text:"Select Class"}],
            currencyoptions:[{value:null,text:"Select Currency"}],
            faccount:{
                accountnumber:null,identifier:null,routingnumber:null,setccurr:null,
                description:null,acclass_id:null,balance:null,timecreated:null,
                member_id:requester.getfromlocalstorage("employer"),
                language_id:requester.getfromlocalstorage("language_id"),
            }
        }
    },
    created(){
        var listaccounts=requester.ajax_request("/api/v1.0/list_accounts","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id,language_id:this.language_id})
        var listclasses=listaccounts.then(result => {
            this.accountsitems=result
            this.accountsfields=['account_number','identifier','account_class','currency','balance','description']
            this.totalRows=this.accountsitems.length
            return requester.ajax_request("/api/v1.0/list_acclasses","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id,language_id:this.language_id})
        })
        var listcurrencies=listclasses.then(result => {
            result.forEach((item)=>{
                this.acclassoptions.push({value:item.acclass_id,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/list_currencies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        listcurrencies.then(result => {
            result.forEach((item)=>{
                this.currencyoptions.push({value:item.setccurr,text:item.description})
            })
        })
    },
    methods:{
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        addnewaccount(){
            const payload={...this.faccount}
            requester.ajax_request("/api/v1.0/create_account","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
                this.accountsfields=['account_number','identifier','account_class','currency','balance','description']
                this.accountsitems=result.accountsdata
                this.totalRows=result.accountsdata.length
                this.$refs['new-account-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        }
    }
}
</script>
