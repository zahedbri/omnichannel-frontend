<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex align-items-center justify-content-between">
                    <h1 class="breadcrumb">Procurement &amp; Sales Trading Agreements</h1>
                    <div>
                        <b-dropdown variant="success" size="sm" right text="Create">
                            <b-dropdown-item v-b-modal.new-default-contract>Default Contract</b-dropdown-item>
                            <!-- <b-dropdown-item v-b-modal.new-contract-modal>Procurement Contract</b-dropdown-item> -->
                            <b-dropdown-item v-b-modal.new-account-modal>Customer Purchases Account</b-dropdown-item>
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
                            <b-card-body>
                                <b-table show-empty striped hover :items="defaultcontractitems" :fields="defaultcontractfields">
                                    <template v-slot:head(view)>
                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(view)="row">
                                        <b-button v-if="row.item.trading_id!=null" @click="defcontractdetails(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(contract_title)="row">
                                        <div v-if="row.item.trading_id!=null" class="content d-flex align-items-center justify-content-left">
                                            <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                <img class="img-fluid rounded" :src="defaultavatar">
                                            </a>
                                            <div class="">
                                                <span class="d-inline-block" style="font-size:1.0em;"> {{row.item.contract_title}}</span>
                                                <span class="d-block" style="color:#555; font-size:0.8em;"><strong>Participant:</strong> {{row.item.participant}} </span>
                                            </div>
                                        </div>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col cols="12">
                        <b-card no-body>
                            <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-end py-2">
                                <b-col sm="8" md="8" class="mt-1 mb-0">
                                    <div class="input-group">
                                        <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter" class="form-control"></b-form-input>
                                        <div class="input-group-append">
                                            <b-button size="sm" type="button" :disabled="!filter" @click="filter = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="4" md="4" class="my-0 d-flex justify-content-end">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                </b-col>
                            </b-card-header>
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="contractlistitems" :fields="contractlistfields" :filter="filter" @filtered="onFiltered">
                                    <template v-slot:head(view)>
                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(view)="row">
                                        <b-button v-if="row.item.type=='Contract'" @click="contractdetails(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        <b-button v-else-if="row.item.type=='Account'" @click="accountdetails(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(_)>
                                        <div class="d-flex justify-content-between">
                                            <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                <img class="img-fluid rounded" :src="defaultavatar">
                                            </a>
                                        </div>
                                    </template>
                                    <template v-slot:cell(contract_title)="row">
                                        <div v-if="Object.keys(row.item).length" class="content d-flex align-items-center justify-content-left">
                                            <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                <img class="img-fluid rounded" :src="defaultavatar">
                                            </a>
                                            <div class="">
                                                <span class="d-inline-block" style="font-size:1.0em;"> {{row.item.contract_title}}</span>
                                                <span class="d-block" style="color:#555; font-size:0.8em;"><strong>Participant:</strong> {{row.item.participant}} </span>
                                            </div>
                                        </div>
                                    </template>                                    
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="new-default-contract" size="lg" id="new-default-contract" title="New Default Contract" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="setdefaultcontract">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Contract Name</label>
                                            <b-form-input size="sm" type="text" v-model="defaultcontract.name" placeholder="Contract Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Owner</label>
                                            <b-form-select size="sm" v-model="defaultcontract.member_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Participant</label>
                                            <b-form-select size="sm" v-model="defaultcontract.participant_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Holding Store</label>
                                            <b-form-select size="sm" v-model="defaultcontract.store_id" :options="storesoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-1" disabled v-model="defaultcontract.startsnow" name="checkbox-1" value="Yes" unchecked-value="No">
                                                Begin immediately &mdash; <strong>{{ defaultcontract.startsnow }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-2" disabled v-model="defaultcontract.neverends" name="checkbox-2" value="Yes" unchecked-value="No">
                                                Continue indefinitely &mdash; <strong>{{ defaultcontract.neverends }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6" v-if="defaultcontract.startsnow=='No'">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Starting At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="defaultcontract.starttime" placeholder="Initiation Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2" v-if="defaultcontract.neverends=='No'">
                                            <label class="form-label">Ending At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="defaultcontract.endtime" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Comment</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="defaultcontract.comment" placeholder="Comment / Brief Description"></b-form-textarea>
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
        <b-modal ref="new-account-modal" size="lg" id="new-account-modal" title="Customer Purchases Account" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="setaccountprofile">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Customer Organization</label>
                                            <b-form-select @change.native="changedcustomerorg" size="sm" v-model="account.participant_id" :options="customerorganizations" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Account Name</label>
                                            <b-form-input size="sm" type="text" v-model="account.name" placeholder="Contract Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Owner</label>
                                            <b-form-select size="sm" v-model="account.member_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Supplied From</label>
                                            <b-form-select size="sm" v-model="account.store_id" :options="storesoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Trading Currency</label>
                                            <b-form-select size="sm" v-model="account.currency" :options="currencyoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-1" v-model="account.startsnow" name="checkbox-1" value="Yes" unchecked-value="No">
                                                Begin immediately &mdash; <strong>{{ account.startsnow }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-2" v-model="account.neverends" name="checkbox-2" value="Yes" unchecked-value="No">
                                                Continue indefinitely &mdash; <strong>{{ account.neverends }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Starting At</label>
                                            <b-form-datepicker :disabled="account.startsnow=='Yes'" size="sm" type="text" v-model="account.starttime" placeholder="Initiation Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Ending At</label>
                                            <b-form-datepicker :disabled="account.neverends=='Yes'" size="sm" type="text" v-model="account.endtime" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Comment</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="account.comment" placeholder="Comment / Brief Description"></b-form-textarea>
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
        <b-modal ref="new-contract-modal" size="lg" id="new-contract-modal" title="New Procurement Contract" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="setcontractprofile">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Contract Name</label>
                                            <b-form-input size="sm" type="text" v-model="contract.name" placeholder="Contract Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Owner</label>
                                            <b-form-select size="sm" v-model="contract.member_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Participant</label>
                                            <b-form-select size="sm" v-model="contract.participant_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Usage</label>
                                            <b-form-select size="sm" v-model="contract.usage" :options="usageoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-1" v-model="contract.startsnow" name="checkbox-1" value="Yes" unchecked-value="No">
                                                Begin immediately &mdash; <strong>{{ contract.startsnow }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mt-4">
                                            <b-form-checkbox id="checkbox-2" v-model="contract.neverends" name="checkbox-2" value="Yes" unchecked-value="No">
                                                Continue indefinitely &mdash; <strong>{{ contract.neverends }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6" v-if="contract.startsnow=='No'">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Starting At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="contract.starttime" placeholder="Initiation Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2" v-if="contract.neverends=='No'">
                                            <label class="form-label">Ending At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="contract.endtime" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Comment</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="contract.comment" placeholder="Comment / Brief Description"></b-form-textarea>
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
    name:"trading",
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

            currentPage:1,
            totalRows:null,
            perPage:4,
            filter:null,

            orglist:[{value:null,text:"Select Organization"}],
            usageoptions:[{value:null,text:"Select Usage"}],
            contractlistitems:[],
            contractlistfields:[],
            defaultcontractitems:[],
            defaultcontractfields:[],
            defaultavatar:requester.baseurl+'/static/profileuploads/contract-default.png',
            defaultcontract:{
                trdtype_id:1,state:0,starttime:null,endtime:null,startsnow:"Yes",neverends:"Yes",
                timecreated:null,name:'Default Trading Agreement',member_id:requester.getfromlocalstorage("employer"),
                origin:0,cstate:0,usage:0,timedeployed:null,store_id:null,
                participant_id:requester.getfromlocalstorage("employer"),
                language_id:requester.getfromlocalstorage("language_id"),
                comment:"This is a unilateral arrangement between the owner and the participant allowing customers to purchase products from the store at a specified price for a specified time under specific conditions."
            },
            contract:{
                trdtype_id:1,state:0,starttime:null,endtime:null,startsnow:"No",neverends:"No",
                timecreated:null,name:null,member_id:requester.getfromlocalstorage("employer"),
                origin:0,cstate:0,usage:null,timedeployed:null,store_id:null,
                participant_id:null,language_id:requester.getfromlocalstorage("language_id"),
                comment:"This is a bilateral arrangement negotiated between the buyer and the vendor (or seller) allowing the buyer to purchase products from the seller at a specified price for a specified time under specific conditions. May also include the provision of credit facilities to the buyer from the supplier.",
            },
            storesoptions:[{value:null,text:"Select Supplying Store"}],
            currencyoptions:[{value:null,text:"Select Currency"}],
            account:{
                trdtype_id:0,state:0,starttime:null,endtime:null,startsnow:"No",neverends:"No",
                timecreated:null,origin:0,cstate:0,usage:1,timedeployed:null,
                name:null,member_id:requester.getfromlocalstorage("employer"),store_id:null,acstate:0,
                currency:"NGN",comment:"This is a bilateral arrangement negotiated between the seller and the business customer allowing the business customer to purchase products from the seller at a specified price for a specified time under specific conditions. May also include the provision of credit facilities to the buyer from the seller.",
                actimecreated:null,actimeupdated:null,actimeapproved:null,participant_id:null,
                language_id:requester.getfromlocalstorage("language_id"),
            },
            customerorganizations:[{value:null,text:'Select Customer Organization'}],
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var orgdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/list_organizations","GET",this.ac_token,this.rf_token,false,null)
        }).fail((jqXHR,textStatus,errorThrown) => {
            // this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var contractlist=orgdata.then(result => {
            result.forEach((item)=>{
                this.orglist.push({value:item.orgentity_id,text:item.orgentityname})
            })
            return requester.ajax_request("/api/v1.0/read_all_trading","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        var contractdefaults=contractlist.then(result => {
            if(result.length > 0 && result[0].trading_id==null){
                this.contractlistitems=null
                this.totalRows=0
                this.contractlistfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
            }else if(result.length > 0 && result[0].trading_id!=null){
                this.contractlistitems=result
                this.totalRows=result.length
                this.contractlistfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
            }
            return requester.ajax_request("/api/v1.0/contract_defaults","GET",this.ac_token,this.rf_token,false,null)
        })
        var storedata=contractdefaults.then(result=>{
            this.contract.code=result.contractcode
            result.contractusages.forEach((item)=>{
                this.usageoptions.push(item)
            })
            return requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var currencydata=storedata.then(result => {
            result.forEach((item)=>{
                this.storesoptions.push({value:item.storeent_id,text:item.identifier})
            })
            return requester.ajax_request("/api/v1.0/list_currencies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        var storeorgs=currencydata.then(result => {
            result.forEach((item)=>{
                this.currencyoptions.push({value:item.setccurr,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/list_storeorgs","GET",this.ac_token,this.rf_token,false,null)
        })
        var defaultcontractdata=storeorgs.then(result => {
            result.forEach((item)=>{
                this.customerorganizations.push({value:item.users_id,text:item.orgentityname})
            })
            return requester.ajax_request("/api/v1.0/read_default_contracts","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        defaultcontractdata.then(result => {
            if(result.length > 0 && result[0].trading_id==null){
                this.defaultcontractitems=null
                this.defaultcontractfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
            }
            else if(result.length > 0 && result[0].trading_id !=null){
                this.defaultcontractitems=result
                this.defaultcontractfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
            }
        })
    },
    methods:{
        accountdetails(row){
            let idx=row.index
            let trading_id=this.contractlistitems[idx].trading_id
            this.$router.push( {path:`/scaffolding/account/${trading_id}`} )
        },
        defcontractdetails(row){
            let idx=row.index
            let trading_id=this.defaultcontractitems[idx].trading_id
            this.$router.push( {path:`/scaffolding/contract/${trading_id}`} )
        },
        contractdetails(row){
            let idx=row.index
            let trading_id=this.contractlistitems[idx].trading_id
            this.$router.push( {path:`/scaffolding/contract/${trading_id}`} )
        },
        changedcustomerorg(e){
            let val=e.target.value
            this.customerorganizations.forEach((item)=>{
                if(item.value==val){
                    this.account.name=item.text + ' Purchases Account'
                }
            })
        },
        setaccountprofile(){
            const payload={...this.account}
            console.log(payload)
            requester.ajax_request("/api/v1.0/create_accounts","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.contractlistitems=result.contracts
                this.totalRows=result.contracts.length
                this.contractlistfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-account-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        setdefaultcontract(){
            const payload={...this.defaultcontract}
            // console.log(payload)
            requester.ajax_request("/api/v1.0/create_default_contract","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.defaultcontractitems=result.defaultcontracts
                this.defaultcontractfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-default-contract'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        setcontractprofile(){
            const payload={...this.contract}
            // console.log(payload)
            requester.ajax_request("/api/v1.0/create_contract","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.contractlistitems=result.contracts
                this.totalRows=result.contracts.length
                this.contractlistfields=['contract_title','type','created','created_by','credit','starting','ending','stage','state','view']
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-contract-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>