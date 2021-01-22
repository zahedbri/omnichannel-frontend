<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">ProNov Co-operative</h1>
                    <div class="d-flex align-items-center justify-content-between">
                        <b-form-select size="sm" class="mr-1" v-model="scoop_id" :options="coopoptions" required></b-form-select>
                        <b-dropdown variant="success" size="sm" right text="Initialize">
                            <b-dropdown-item v-b-modal.initiate-coop-modal>Initialize</b-dropdown-item>
                            <!-- <b-dropdown-item v-b-modal.coop-member-modal>Add Member</b-dropdown-item> -->
                            <b-dropdown-item v-b-modal.coop-preference-modal>Preferences</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <b-row>
                    <b-col cols="12" class="mt-2">
                        <b-card no-body>
                            <b-card-header style="background:#fff;" class="py-2">
                                <b-row class="d-flex align-items-center justify-content-between">
                                    <b-col sm="7" md="7" class="my-1 d-flex justify-content-start">
                                        Cooperative Members
                                    </b-col>
                                    <b-col sm="5" md="5" class="my-1 d-flex justify-content-end">
                                        <b-pagination v-model="currentPage1" :total-rows="totalRows1" :per-page="perPage1" size="sm" class="my-0"></b-pagination>
                                    </b-col>
                                </b-row>
                            </b-card-header>
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage1" :per-page="perPage1" :items="coopmembersitems" :fields="coopmembersfields">
                                    <template v-slot:cell(_)="row">
                                        <b-button size="sm" variant="success" @click="row.toggleDetails">
                                            <i v-if="row.detailsShowing" class="fas fa-minus"></i>
                                            <i v-else-if="!row.detailsShowing" class="fas fa-plus"></i>
                                        </b-button>
                                    </template>
                                    <template v-slot:row-details="row">
                                        <b-table show-empty :current-page="currentPage" :per-page="perPage" :items="row.item.pendingtransactions" :fields="pendingtransactionfields">
                                            <template v-slot:cell(confirm)="row">
                                                <b-button variant="success" @click="confirmtransaction(row)" v-if="row.item.name!=null" :disabled="row.item.status=='Y'" size="sm">confirm</b-button>
                                            </template>
                                        </b-table>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="coop-preference-modal" size="lg" id="coop-preference-modal" title="Settings &amp; Preferences" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="savepreferences">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <b-card no-body class="shadow-none mb-2">
                                            <b-card-header class="text-small py-1 px-2 bg-white">
                                                Cooperative Society
                                            </b-card-header>
                                            <b-card-body class="py-2">
                                                <b-row class="d-flex align-items-center justify-content-end">
                                                    <b-col sm="8" md="8" class="px-0">
                                                        <b-card-text class="text-xsmall">
                                                            For identification purposes, the active Cooperative Society.
                                                        </b-card-text>
                                                    </b-col>
                                                    <b-col sm="4" md="4" class="px-0">
                                                        <b-form-select size="sm" v-model="preferences.coop_id" :options="coopoptions" required></b-form-select>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <b-card no-body class="shadow-none mb-2">
                                            <b-card-header class="text-small py-1 px-2 bg-white">
                                                Mandatory Sign Up Fee
                                            </b-card-header>
                                            <b-card-body class="py-2">
                                                <b-row class="d-flex align-items-center justify-content-end">
                                                    <b-col sm="8" md="8" class="px-0">
                                                        <b-card-text class="text-xsmall">
                                                            The mandatory amount required of prospective members to sign up.
                                                        </b-card-text>
                                                    </b-col>
                                                    <b-col sm="4" md="4" class="px-0">
                                                        <b-form-input size="sm" type="number" v-model="preferences.signupfee" placeholder="Sign Up Fee" required></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <b-card no-body class="shadow-none mb-2">
                                            <b-card-header class="text-small py-1 px-2 bg-white">
                                                Per-Annum Interest Rate
                                            </b-card-header>
                                            <b-card-body class="py-2">
                                                <b-row class="d-flex align-items-center justify-content-end">
                                                    <b-col sm="8" md="8" class="px-0">
                                                        <b-card-text class="text-xsmall">
                                                            The amount of interest due per per year as a percentage of principal.
                                                        </b-card-text>
                                                    </b-col>
                                                    <b-col sm="4" md="4" class="px-0">
                                                        <b-form-input size="sm" type="number" step="0.1" v-model="preferences.interestrate" placeholder="Interest Rate e.g., 7.5" required></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <b-card no-body class="shadow-none mb-2">
                                            <b-card-header class="text-small py-1 px-2 bg-white">
                                                Profit Sharing Ratio (<i><strong>guarantor - facilitator</strong></i>)
                                            </b-card-header>
                                            <b-card-body class="py-2">
                                                <b-row class="d-flex align-items-center justify-content-end">
                                                    <b-col sm="8" md="8" class="px-0">
                                                        <b-card-text class="text-xsmall">
                                                            Write as "60-40", "50-50" etc in form field to the right.
                                                        </b-card-text>
                                                    </b-col>
                                                    <b-col sm="4" md="4" class="px-0">
                                                        <b-form-input size="sm" type="text" v-model="preferences.profitratio" placeholder="Profit Ratio e.g., 60-40" required></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <b-card no-body class="shadow-none mb-2">
                                            <b-card-header class="text-small py-1 px-2 bg-white">
                                                Monthly Contribution Amount
                                            </b-card-header>
                                            <b-card-body class="py-2">
                                                <b-row class="d-flex align-items-center justify-content-end">
                                                    <b-col sm="8" md="8" class="px-0">
                                                        <b-card-text class="text-xsmall">
                                                            The monthly financial commitment of all members of the cooperative.
                                                        </b-card-text>
                                                    </b-col>
                                                    <b-col sm="4" md="4" class="px-0">
                                                        <b-form-input size="sm" type="number" v-model="preferences.contribution" placeholder="Contribution Amount" required></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                        </b-card>
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
        <b-modal ref="coop-member-modal" size="md" id="coop-member-modal" title="Add Cooperative Member" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="signmember">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Co-Operative Society</label>
                                            <b-form-select size="sm" v-model="mbrgrpmbr.mbrgrp_id" :options="coopoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">New Member</label>
                                            <b-form-select size="sm" v-model="mbrgrpmbr.member_id" :options="orgs" required></b-form-select>
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
        <b-modal ref="initiate-coop-modal" size="md" id="initiate-coop-modal" title="Initialize Co-operative" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="initializecoop">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Convener / Owner</label>
                                            <b-form-select size="sm" v-model="mbrgrp.owner_id" :options="orgs" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Co-op Name</label>
                                            <b-form-input size="sm" type="text" v-model="mbrgrp.mbrgrpname" placeholder="Co-operative Name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Street Address</label>
                                            <b-form-input size="sm" type="text" v-model="mbrgrp.address1" placeholder="Street Address" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Country</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Country" v-model="mbrgrp.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                <datalist id="country-list">
                                                    <option>Select Country</option>
                                                    <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">State</label>
                                            <template>
                                                <b-form-input required v-model="mbrgrp.state" placeholder="Fill &amp; Select State" size="sm" list="state-list"></b-form-input>
                                                <datalist id="state-list">
                                                    <option>Select State</option>
                                                    <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Co-op Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="mbrgrp.description" placeholder="Brief description"></b-form-textarea>
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
    name:'coop',
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:6,filter:null,
            currentPage1:1,totalRows1:null,perPage1:6,
            pendingtransactionfields:['name','reference','status','confirm'],

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            orgs:[{text:"Select Organization",value:null}],countryselect:[],stateselect:[],
            coopitems:[],coopfields:['name','owner','description','created'],selectedcoop:{},
            coopmembersitems:[],coopmembersfields:['member','address','email','group','activated','_'],
            mbrgrp:{
                owner_id:requester.getfromlocalstorage("employer"),field1:null,description:null,
                dn:null,country:null,mbrgrpname:null,field3:null,oid:null,lastupdate:null,address1:null,
                language_id:requester.getfromlocalstorage("language_id"),state:null,
            },scoop_id:null,
            mbrgrpmbr:{
                member_id:null,mbrgrp_id:null,
            },coopoptions:[{value:null,text:"Select Co-Operative"}],
            preferences:{ signupfee:null,interestrate:null,profitratio:null,contribution:null,coop_id:null },
        }
    },
    created(){
        console.log(this.ac_token);
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var orgsdata=verification.then(result=>{
            // console.log(result)
            return requester.ajax_request("/api/v1.0/list_organizations","GET",this.ac_token,this.rf_token,false,null)
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var countriesdata=orgsdata.then(result=>{
            result.forEach((item)=>{
                this.orgs.push({text:item.orgentityname,value:item.orgentity_id})
            })
            return requester.ajax_request("/api/v1.0/list_countries","GET",this.ac_token,this.rf_token,false,null)
        })
        var cooplist=countriesdata.then(result=>{
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/list_coops","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer});
        })
        var subslist=cooplist.then(result=>{
            result.forEach((item)=>{
                this.coopoptions.push({value:item.mbrgrp_id,text:item.name})
            })
            this.selectcoop(result)
        })
    },
    methods:{
        confirmtransaction(row){
            var item=row.item
            const payload={holder_id:item.holder_id,payee_id:item.payee_id,referencenumber:item.reference}
            requester.ajax_request("/api/v1.0/confirm_transactions","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            })
        },
        savepreferences(){
            const payload={...this.preferences}
            requester.ajax_request("/api/v1.0/save_preferences","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['coop-preference-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        signmember(){
            const payload={...this.mbrgrpmbr}
            requester.ajax_request("/api/v1.0/signup_to_coop","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['coop-member-modal'].hide()
                this.coopmembersitems=result.subs
                this.totalRows1=result.subs.length
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        selectcoop(items){
            this.selectedcoop=items[0]
            this.scoop_id=this.selectedcoop.mbrgrp_id
            requester.ajax_request("/api/v1.0/fetch_members","POST",this.ac_token,this.rf_token,true,{mbrgrp_id:this.scoop_id}).done(result=>{
                this.coopmembersitems=result
            })
        },
        initializecoop(){
            const payload={...this.mbrgrp}
            requester.ajax_request("/api/v1.0/initialize_cooperative","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.totalrows=result.coops.length
                this.coopitems=result.coops
                this.success_message=result.msg;
                this.showSnackbar=true
                this.$refs['initiate-coop-modal'].hide()
                this.coopoptions=[{value:null,text:"Select Co-Operative"}]
                result.coops.forEach((item)=>{
                    this.coopoptions.push({value:item.mbrgrp_id,text:item.name})
                })
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedcountry(e){
            let val=e.target.value
            this.countryselect.forEach((item)=>{
                if(item.text==val){this.selectedcountry=item.value}
            })
            requester.ajax_request_no_tokens("/api/v1.0/list_states_for_country","POST",true,{countryabbr:this.selectedcountry}).done(result => {
                result.forEach((item)=>{
                    this.stateselect.push({text:item.name,value:item.stateprovabbr})
                })
            })
        },
    }
}
</script>
