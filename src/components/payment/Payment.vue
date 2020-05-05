<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Payment Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="Create">
                            <b-dropdown-item v-b-modal.paymethod-modal >Add payment method</b-dropdown-item>
                            <b-dropdown-item v-b-modal.returnmethod-modal >Add return payment method</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="12">
                        <b-card no-body class="mb-2">
                            <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-end py-2">
                                <b-col sm="8" md="8" class="my-1 pl-1">
                                    <div class="input-group">
                                        <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter" class="form-control"></b-form-input>
                                        <div class="input-group-append">
                                            <b-button size="sm" type="button" :disabled="!filter" @click="filter = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="4" md="4" class="my-0 d-flex justify-content-end pr-1">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                </b-col>
                            </b-card-header>
                            <b-card-body>
                                <b-table :filter="filter" @filtered="onFiltered" bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="paymethoditems" :fields="paymethodfields">
                                    <template v-slot:head(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                        </div>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="returnmethod-modal" size="md" id="returnmethod-modal" title="Return Payment Method" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitreturnpolicy" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Return Method Name</label>
                                            <b-form-input required type="text" placeholder="e.g. Original Payment Method, Line of Credit" v-model="returnpolicy.policyname" size="sm"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Store</label>
                                            <b-form-select size="sm" v-model="returnpolicy.storeent_id" :options="storeoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="returnpolicy.description" placeholder="Brief description."></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary btn-sm" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                            </b-card-footer>
                        </form>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <b-modal ref="paymethod-modal" size="md" id="paymethod-modal" title="New Payment Method" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitpolicy" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Payment Method Name</label>
                                            <b-form-input required type="text" placeholder="e.g. Credit Card, Cash On Delivery" v-model="policy.policyname" size="sm"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Store</label>
                                            <b-form-select size="sm" v-model="policy.storeent_id" :options="storeoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="policy.description" placeholder="Brief description."></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary btn-sm" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
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
import * as JQuery from "jquery"

export default {
    name:"payment",
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

            storeoptions:[{value:null,text:"Select Store"}],

            policy:{
                policyname:null,policytype_id:'Payment',storeent_id:null,properties:null,
                starttime:null,endtime:null,language_id:requester.getfromlocalstorage("language_id"),
                description:null,timecreated:null,timeupdated:null
            },
            returnpolicy:{
                policyname:null,policytype_id:'ReturnPayment',storeent_id:null,properties:null,
                starttime:null,endtime:null,language_id:requester.getfromlocalstorage("language_id"),
                description:null,timecreated:null,timeupdated:null
            },
            paymethoditems:[],paymethodfields:[],
        }
    },
    created(){
        var storedata=requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        var paymethoddata=storedata.then(result=>{
            result.forEach((item)=>{
                this.storeoptions.push({value:item.storeent_id,text:item.identifier})
            })
            return requester.ajax_request("/api/v1.0/list_payment_policies","POST",this.ac_token,this.rf_token,true,{policytype_id:'Payment',language_id:this.language_id})
        })
        var returnpolicydata=paymethoddata.then(result=>{
            this.paymethoditems=result
            this.paymethodfields=['name','type','store','description','created','updated','_']
            this.totalRows=result.length
            return requester.ajax_request("/api/v1.0/list_payment_policies","POST",this.ac_token,this.rf_token,true,{policytype_id:'ReturnPayment',language_id:this.language_id})
        })
        returnpolicydata.then(result=>{
            result.forEach((item)=>{
                this.paymethoditems.push(item)
            })
        })
    },
    methods:{
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        submitreturnpolicy(){
            const payload={...this.returnpolicy}
            requester.ajax_request("/api/v1.0/create_paymethod_policy","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
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
        submitpolicy(){
            const payload={...this.policy}
            requester.ajax_request("/api/v1.0/create_paymethod_policy","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        }        
    }
}
</script>