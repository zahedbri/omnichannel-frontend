<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Logistics Management</h1>
                    <div class="d-flex align-items-center justify-content-end">
                        <div class="mr-2">
                            <b-form-select v-model="selectedstore" :options="storeoptions" size="sm"></b-form-select>
                        </div>
                        <b-dropdown variant="success" size="sm" right text="Create">
                            <b-dropdown-item v-b-modal.jurst-modal >Add new jurisdiction</b-dropdown-item>
                            <b-dropdown-item v-b-modal.shpcharge-modal >Add new charge</b-dropdown-item>
                            <b-dropdown-item v-b-modal.shipmode-modal >Add delivery arrangement</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="12">
                        <b-card no-body class="shadow-none">
                            <b-tabs card content-class="mt-0" small align="start">
                                <b-tab no-body active>
                                    <template v-slot:title>
                                        <i class="fas fa-globe mr-1"></i> Jurisdictions
                                    </template>
                                    <b-card no-body class="shadow-none">
                                        <b-card-header class="d-flex align-items-center justify-content-between bg-white">
                                            <span class="text-dark text-xsmall">Shipping Jurisdictions are areas to which different costs of delivery may apply without respect to composition or quantity.</span>
                                            <b-col sm="4" md="4" class="my-0 d-flex justify-content-end pr-1">
                                                <b-pagination v-model="currentPage2" :total-rows="totalRows2" :per-page="perPage2" size="sm" class="my-0"></b-pagination>
                                            </b-col>
                                        </b-card-header>
                                        <b-card-body class="py-0">
                                            <b-table show-empty striped hover bordered :current-page="currentPage2" :per-page="perPage2" :items="jurstitems" :fields="jurstfields">
                                            </b-table>
                                        </b-card-body>
                                    </b-card>
                                </b-tab>
                                <b-tab no-body>
                                    <template v-slot:title>
                                        <i class="fas fa-coins mr-1"></i> Charges
                                    </template>
                                    <b-card no-body class="shadow-none">
                                        <b-card-header class="d-flex align-items-center justify-content-between bg-white">
                                            <span class="text-dark text-xsmall">Shipping Jurisdictions are areas to which different costs of delivery may apply without respect to composition or quantity.</span>
                                            <b-col sm="4" md="4" class="my-0 d-flex justify-content-end pr-1">
                                                <b-pagination v-model="currentPage3" :total-rows="totalRows3" :per-page="perPage3" size="sm" class="my-0"></b-pagination>
                                            </b-col>
                                        </b-card-header>
                                        <b-card-body class="py-0">
                                            <b-table show-empty striped hover bordered :current-page="currentPage3" :per-page="perPage3" :items="chargeitems" :fields="chargefields">
                                            </b-table>
                                        </b-card-body>
                                    </b-card>
                                </b-tab>
                                <b-tab>
                                    <template v-slot:title>
                                        <i class="fas fa-layer-group mr-1"></i> Arrangements
                                    </template>
                                    <b-card no-body class="mb-2 shadow-none">
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
                                        <b-card-body class="py-0">
                                            <b-table :filter="filter" @filtered="onFiltered" bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="shipmethoditems" :fields="shipmethodfields">
                                                <template v-slot:head(_)>
                                                    <div class="d-flex align-items-center justify-content-center">
                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                    </div>
                                                </template>
                                                <template v-slot:head(*)>
                                                    <div class="d-flex align-items-center justify-content-center">
                                                        <a disabled class="img-sim d-flex justify-content-center align-items-center c-pointer">
                                                            <i class="fas fa-shipping-fast text-gray"></i>
                                                        </a>
                                                    </div>
                                                </template>
                                                <template v-slot:cell(_)="row">
                                                    <div v-if="Object.keys(row.item).length" class="d-flex align-items-center justify-content-center">
                                                        <b-button class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        <b-button class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                    </div>
                                                </template>
                                                <template v-slot:cell(*)="row">
                                                    <div v-if="Object.keys(row.item).length" class="d-flex align-items-center justify-content-center">
                                                        <a disabled class="img-sim d-flex justify-content-center align-items-center c-pointer">
                                                            <i class="fas fa-shipping-fast"></i>
                                                        </a>
                                                    </div>
                                                </template>
                                            </b-table>
                                        </b-card-body>
                                    </b-card>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="shpcharge-modal" size="md" id="shpcharge-modal" title="Shipping Charge" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitcharge" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-input size="sm" type="text" v-model="shippingcharge.calcode_description" placeholder="Charge Name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse</label>
                                            <b-form-select size="sm" v-model="shippingcharge.calrule_ffmcenter_id" :options="ffmoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Jurisdiction</label>
                                            <b-form-select size="sm" v-model="shippingcharge.calrule_jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Starting Range</label>
                                            <b-form-input size="sm" type="number" step="1" v-model="shippingcharge.calrange_rangestart" placeholder="Starting range" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Charge</label>
                                            <b-form-input size="sm" type="number" step=".1" v-model="shippingcharge.calrange_value" placeholder="Charge" required></b-form-input>
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
        <b-modal ref="jurst-modal" size="sm" id="jurst-modal" title="New Jurisdiction" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitjurst" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-input size="sm" type="text" v-model="jurst.description" placeholder="Name of shipping jurisdiction" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Country</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Country" v-model="jurst.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                <datalist id="country-list">
                                                    <option>Select Country</option>
                                                    <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">State</label>
                                            <template>
                                                <b-form-input required v-model="jurst.state" placeholder="Fill &amp; Select State" @change.native="changedstate" size="sm" list="state-list"></b-form-input>
                                                <datalist id="state-list">
                                                    <option>Select State</option>
                                                    <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">City</label>
                                            <b-form-input type="text" size="sm" v-model="jurst.city" placeholder="City of shipping jurisdiction"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Jurisdiction Group</label>
                                            <b-form-select size="sm" v-model="jurst.jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
                                            <b-button size="sm" variant="success" v-b-modal.new-jg-modal type="button"><i class="fas fa-plus mr-1"></i>Add</b-button>
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
        <b-modal ref="new-jg-modal" size="md" id="new-jg-modal" title="Shipping Jurisdiction Group" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewjurstgroup">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Code</label>
                                            <b-form-input size="sm" type="text" v-model="jurstgroup.code" readonly placeholder="Code" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-input size="sm" type="text" v-model="jurstgroup.description" placeholder="Name of shipping jurisdiction group" required></b-form-input>
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
        <b-modal ref="shipmode-modal" size="md" id="shipmode-modal" title="Delivery Arrangements" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitshipmode" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Carrier</label>
                                            <b-form-input type="text" size="sm" required v-model="shipmode.carrier" placeholder="Carrier's Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse</label>
                                            <b-form-select size="sm" v-model="shipmode.ffmcenter_id" :options="warehouseoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Store</label>
                                            <b-form-select size="sm" v-model="shipmode.storeent_id" :options="storeoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <b-form-checkbox id="checkbox-1" v-model="shipmode.timelimited" name="checkbox-1" value="Yes" unchecked-value="No">
                                                This is a time limited shipping arrangement &mdash; <strong>{{ shipmode.timelimited }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col v-if="shipmode.timelimited=='Yes'" sm="6" md="6">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Starting</label>
                                            <b-form-datepicker size="sm" type="text" v-model="shipmode.startdate" placeholder="Beginning Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col v-if="shipmode.timelimited=='Yes'" sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Ending</label>
                                            <b-form-datepicker size="sm" type="text" v-model="shipmode.enddate" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Jurisdiction</label>
                                            <b-form-select size="sm" @change="getjurstdata" v-model="shipmode.jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Charges</label>
                                            <b-form-select size="sm" @change.native="changedcharge" v-model="shipmode.calcode_id" :options="calcodeoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Name of Shipping Mode</label>
                                            <b-form-input type="text" v-model="shipmode.description" placeholder="Name"></b-form-input>
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
import * as JQuery from "jquery"
export default {
    name:"logistics",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:6,filter:null,
            currentPage2:1,totalRows2:null,perPage2:6,filter2:null,
            currentPage3:1,totalRows3:null,perPage3:6,filter3:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            storeoptions:[{value:null,text:"Select Store"}],
            warehouseoptions:[{value:null,text:"Select Warehouse"}],
            calcodeoptions:[{value:null,text:"Select Charges"}],
            jurstgroupoptions:[{value:null,text:"Select Jurisdiction"}],
            ffmoptions:[{value:null,text:"Select Warehouse"}],

            shipmethoditems:[],shipmethodfields:[],selectedstore:null,
            jurstfields:[],jurstitems:[],countryselect:[],stateselect:[],
            calusageoptions:[{value:null,text:"Select Usage"}],

            shippingcharge:{calcode_calmethod_id_qfy:null,calcode_calmethod_id:null,calcode_calmethod_id_app:null,
            calcode_code:null,calcode_description:null,calrule_calcode_id:null,calrule_ffmcenter_id:null,calrule_jurstgroup_id:null,
            calscale_code:null,calscale_calusage_id:2,calscale_calmethod_id:null,calscale_calrule_id:null,storeent_id:null,
            calscale_description:null,calrange_calmethod_id:null,calrange_rangestart:null,calrange_value:null,
            language_id:requester.getfromlocalstorage("language_id")},chargeitems:[],chargefields:[],

            shipmode:{
                policytype_id:'ShippingMode',storeent_id:null,code:null,carrier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,ffmcenter_id:null,timelimited:"Yes",
                startdate:null,enddate:null,jurstgroup_id:null,calcode_id:null
            },
            jurst:{storeent_id:null,country:null,code:null,description:null,subclass:1,city:null,
                state:null,stateabbr:null,countryabbr:null,jurstgroup_id:null},
            jurstgroup:{storeent_id:null,description:null,subclass:1,code:null},
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var storedata=verification.then(result=>{
            this.shipmode.storeent_id=this.selectedstore
            this.shippingcharge.storeent_id=this.selectedstore
            this.jurst.storeent_id=this.selectedstore
            this.jurstgroup.storeent_id=this.selectedstore
            return requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var warehousedata=storedata.then(result=>{
            result.forEach((item)=>{
                this.storeoptions.push({value:item.storeent_id,text:item.identifier})
            })
            this.storeoptions.length > 1 ? this.selectedstore=this.storeoptions[1].value : this.selectedstore=null;
            this.storeoptions.length > 1 ? this.shippingcharge.storeent_id=this.storeoptions[1].value : this.shippingcharge.storeent_id=null;
            this.jurstgroup.code=this.employername.substring(0,2).toUpperCase()+'/'+'SP'+'/'+'JG'+'/'+this.selectedstore+'/'+this.jurst.subclass

            this.storeoptions.length > 1 ? this.jurst.storeent_id=this.storeoptions[1].value : this.jurst.storeent_id=null;
            this.storeoptions.length > 1 ? this.jurstgroup.storeent_id=this.storeoptions[1].value : this.jurstgroup.storeent_id=null;

            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var shippingdata=warehousedata.then(result=>{
            result.forEach((item)=>{
                this.warehouseoptions.push({text:item.name,value:item.ffmcenter_id})
            })
            return requester.ajax_request("/api/v1.0/list_shipping_policies","POST",this.ac_token,this.rf_token,true,{policytype_id:'ShippingMode',language_id:this.language_id})
        })
        var jurstdata=shippingdata.then(result=>{
            this.shipmethoditems=result
            this.shipmethodfields=['*','name','type','store','description','created','updated','_']
            this.totalRows=result.length
            return requester.ajax_request("/api/v1.0/read_jurst","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,subclass:1})
        })
        var countrydata=jurstdata.then(result=>{
            this.jurstitems=result
            this.jurstfields=['code','sub_class','country','state','city','description']
            return requester.ajax_request_no_tokens("/api/v1.0/list_countries","GET",false,null)
        })
        var jurstgroupdata=countrydata.then(result=>{
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_jurstgroup","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,subclass:1})
        })
        var calusagedata=jurstgroupdata.then(result=>{
            result.forEach((item)=>{
                this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/read_calusage","GET",this.ac_token,this.rf_token,false,null)
        })
        var shippingcalmethods=calusagedata.then(result=>{
            result.forEach((item)=>{
                this.calusageoptions.push({value:item.calusage_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/read_calmethods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,calusage_id:2})
        })
        var ffmdata=shippingcalmethods.then(result=>{
            result.forEach((item)=>{
                if(item.name=="Calculation Code Qualification" && item.storeent_id==this.selectedstore){ this.shippingcharge.calcode_calmethod_id_qfy=item.calmethod_id; }
                if(item.name=="Calculation Code Calculate" && item.storeent_id==this.selectedstore){ this.shippingcharge.calcode_calmethod_id=item.calmethod_id; }
                if(item.name=="Shipping Calculation Code Apply" && item.storeent_id==this.selectedstore){ this.shippingcharge.calcode_calmethod_id_app=item.calmethod_id; }
                if(item.name=="Shipping Calculation Rule Qualify" && item.storeent_id==this.selectedstore){ this.shippingcharge.calrule_calmethod_id_qfy=item.calmethod_id;}
                if(item.name=="Calculation Rule Calculate" && item.storeent_id==this.selectedstore){this.shippingcharge.calrule_calmethod_id=item.calmethod_id;}
                if(item.name=="Quantity Spread By Net Price Calculation Scale Lookup" && item.storeent_id==this.selectedstore){ this.shippingcharge.calscale_calmethod_id=item.calmethod_id }
                if(item.name=="Fixed Amount Calculation Range" && item.storeent_id==this.selectedstore){ this.shippingcharge.calrange_calmethod_id=item.calmethod_id }
            })
            this.shippingcharge.calcode_code='PR'+'/'+'CC'+'/'+this.shippingcharge.calcode_calmethod_id+'/'+this.shippingcharge.calcode_calmethod_id_qfy+'/'+this.shippingcharge.calcode_calmethod_id_app
            //add calrule_id AND set calscale.field1=calrule text
            this.shippingcharge.calscale_code='PR'+'/'+'CS'+'/'+2
            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var chargedata=ffmdata.then(result=>{
            result.forEach((item)=>{
                this.ffmoptions.push({value:item.ffmcenter_id,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_charges","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,calusage_id:2})
        })
        chargedata.then(result=>{
            // console.log(result)
            this.chargeitems=result
            this.totalrows3=result.length
            this.chargefields=['charge','warehouse','jurisdiction','rangestart','value']
        })
    },
    methods:{
        changedcharge(e){
            let val=e.target.value
            this.calcodeoptions.forEach((item)=>{
                if(item.value==val){
                    this.shipmode.description=item.text
                }
            })
        },
        submitcharge(){
            const payload={...this.shippingcharge}
            requester.ajax_request("/api/v1.0/create_shipcharge","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.chargeitems=result.charges
                this.chargefields=['charge','warehouse','jurisdiction','rangestart','value']
                this.totalrows3=result.charges.length
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedstate(e){
            let val=e.target.value
            let selectedstate
            this.stateselect.forEach((item)=>{
                if(item.text==val){
                    this.jurst.stateabbr=item.value
                }
            })
            var stab=this.jurst.stateabbr.split('.')[1]
            var ctab=this.jurst.countryabbr
            this.jurst.code=this.employername.substring(0,2).toUpperCase()+'/'+'JR'+'/'+stab+'/'+ctab+'/'+this.selectedstore+'/'+this.jurst.subclass
        },
        changedcountry(e){
            let val=e.target.value
            let selectedcountry
            this.countryselect.forEach((item)=>{
                if(item.text==val){
                    this.selectedcountry=item.value
                    this.jurst.countryabbr=item.value
                }
            })
            requester.ajax_request_no_tokens("/api/v1.0/list_states_for_country","POST",true,{countryabbr:this.selectedcountry}).done(result => {
                result.forEach((item)=>{
                    this.stateselect.push({text:item.name,value:item.stateprovabbr})
                })
            })
        },
        addnewjurstgroup(){
            const payload={...this.jurstgroup}
            requester.ajax_request("/api/v1.0/create_jurstgroup","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.jurstgroupoptions=[]
                result.jgroups.forEach((item)=>{
                    this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
                })
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-jg-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitjurst(){
            const payload={...this.jurst}
            requester.ajax_request("/api/v1.0/create_jurst","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.jurstfields=['code','sub_class','country','state','city','description']
                this.jurstitems=result.jurstdata
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        getjurstdata(e){
            var payload={jurstgroup_id:e,storeent_id:this.shipmode.storeent_id}
            // console.log(payload)
            var calcodedata=requester.ajax_request("/api/v1.0/ship_charges","POST",this.ac_token,this.rf_token,true,payload)
            calcodedata.then(result=>{
                result.unshift({value:null,text:"Select Charge"})
                this.calcodeoptions=result
            })
        },
        submitshipmode(){
            const payload={...this.shipmode}
            payload.code='SHP/'+this.shipmode.storeent_id+'/'+this.shipmode.ffmcenter_id+'/'+this.shipmode.jurstgroup_id
            requester.ajax_request("/api/v1.0/create_shipmode_policy","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true

                this.shipmethoditems=result.shipmodes
                this.shipmethodfields=['*','name','type','store','description','created','updated','_']
                this.totalRows=result.shipmodes.length

                this.$refs['shipmode-modal'].hide()
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
