<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Chart of Accounts</h1>
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
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="accountsitems" :fields="accountsfields" :filter="filter" @filtered="onFiltered">
                                    <template v-slot:head(_)>
                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                    </template>
                                    <template v-slot:cell(_)="row">
                                        <b-button @click="seeaccount(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        <b-button @click="editaccount(row)" v-b-modal.edit-account-modal class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <b-modal ref="edit-account-modal" size="md" id="edit-account-modal" title="Edit Account Information" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="updateaccount">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Number</label>
                                            <b-form-input size="sm" type="text" v-model="upfaccount.accountnumber" placeholder="Account Number"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Type</label>
                                            <b-form-select size="sm" v-model="upfaccount.acclass_id" :options="acclassoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Name</label>
                                            <b-form-input size="sm" type="text" v-model="upfaccount.identifier" placeholder="Account Name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Routing Number</label>
                                            <b-form-input size="sm" type="text" v-model="upfaccount.routingnumber" placeholder="Routing Number"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Currency</label>
                                            <b-form-select size="sm" v-model="upfaccount.setccurr" :options="currencyoptions"></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Opening Balance</label>
                                            <b-form-input size="sm" type="number" step="1" v-model="upfaccount.balance" placeholder="Opening Balance"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col v-if="upfaccount.balance!=null" sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Opening Balance Memo</label>
                                            <b-form-input size="sm" type="text" v-model="upfaccount.memo" placeholder="Opening Balance Memo"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="upfaccount.description" placeholder="Brief description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <b-button variant="success" type="submit"><i class="fas fa-save mr-1"></i>Save</b-button>
                            </b-card-footer>
                        </form>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>

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
                                            <label class="form-label">Account Name</label>
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
                                            <label class="form-label">Account Currency</label>
                                            <b-form-select size="sm" v-model="faccount.setccurr" :options="currencyoptions"></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Opening Balance</label>
                                            <b-form-input size="sm" type="number" step="1" v-model="faccount.balance" placeholder="Opening Balance"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Opening Balance Memo</label>
                                            <b-form-input :disabled="faccount.balance!=null || faccount.balance<=0" size="sm" type="text" v-model="faccount.memo" placeholder="Opening Balance Memo"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="faccount.description" placeholder="Brief description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <b-button variant="success" type="submit"><i class="fas fa-save mr-1"></i>Save</b-button>
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

            accountsitems:null,accountsfields:null,
            acclassoptions:[{value:null,text:"Select Class"}],
            currencyoptions:[{value:null,text:"Select Currency"}],
            upfaccount:{
                accountnumber:null,identifier:null,routingnumber:null,setccurr:null,
                description:null,acclass_id:null,balance:null,timecreated:null,
                member_id:requester.getfromlocalstorage("employer"),memo:null,
                language_id:requester.getfromlocalstorage("language_id"),faccount_id:null,
            },
            faccount:{
                accountnumber:null,identifier:null,routingnumber:null,setccurr:null,
                description:null,acclass_id:null,balance:0,timecreated:null,
                member_id:requester.getfromlocalstorage("employer"),memo:null,
                language_id:requester.getfromlocalstorage("language_id")
            }
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var listaccounts=verification.then(result=>{
            console.log(result)
            return requester.ajax_request("/api/v1.0/list_accounts","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var listclasses=listaccounts.then(result => {
            console.log(result)
            this.accountsitems=result
            this.accountsfields=['account_number','identifier','account_class','currency','credit','debit','description','_']
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
        updateaccount(){
            const payload={...this.upfaccount}
            requester.ajax_request("/api/v1.0/update_account","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.accountsfields=['account_number','identifier','account_class','currency','credit','debit','description','_']
                this.accountsitems=result.accountsdata
                this.totalRows=result.accountsdata.length
                this.$refs['edit-account-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        seeaccount(row){
            let faccount_id=row.item.faccount_id
            this.$router.push( {path:`/scaffolding/accountdetails/${faccount_id}`} )
        },
        editaccount(row){
            console.log( row.item )
            this.upfaccount.acclass_id=row.item.acclass_id
            this.upfaccount.accountnumber=row.item.accountnumber
            this.upfaccount.routingnumber=row.item.routingnumber
            this.upfaccount.setccurr=row.item.setccurr
            this.upfaccount.description=row.item.description
            this.upfaccount.balance=parseFloat(row.item.balance)
            this.upfaccount.identifier=row.item.identifier
            this.upfaccount.faccount_id=row.item.faccount_id
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        addnewaccount(){
            const payload={...this.faccount}
            // console.log(payload)
            requester.ajax_request("/api/v1.0/create_account","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.accountsfields=['account_number','identifier','account_class','currency','credit','debit','description','_']
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
