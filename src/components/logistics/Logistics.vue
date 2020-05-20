<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Payment Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="Create">
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
                                    <template v-slot:cell(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(*)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <a disabled class="img-sim d-flex justify-content-center align-items-center c-pointer">
                                                <i class="fas fa-shipping-fast"></i>
                                            </a>
                                        </div>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
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
                                            <b-form-select size="sm" @change="getjurstdata" v-model="shipmode.storeent_id" :options="storeoptions" required></b-form-select>
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
                                            <b-form-select size="sm" v-model="shipmode.jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Charges</label>
                                            <b-form-select size="sm" v-model="shipmode.calcode_id" :options="calcodeoptions" required></b-form-select>
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

            shipmethoditems:[],shipmethodfields:[],

            shipmode:{
                policytype_id:'ShippingMode',storeent_id:null,code:null,carrier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,ffmcenter_id:null,timelimited:"Yes",
                startdate:null,enddate:null,jurstgroup_id:null,calcode_id:null
            },
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var storedata=verification.then(result=>{
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
            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var shippingdata=warehousedata.then(result=>{
            result.forEach((item)=>{
                this.warehouseoptions.push({text:item.name,value:item.ffmcenter_id})
            })
            return requester.ajax_request("/api/v1.0/list_shipping_policies","POST",this.ac_token,this.rf_token,true,{policytype_id:'ShippingMode',language_id:this.language_id})
        })
        shippingdata.then(result=>{
            this.shipmethoditems=result
            this.shipmethodfields=['*','name','type','store','description','created','updated','_']
            this.totalRows=result.length
        })
    },
    methods:{
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        getjurstdata(e){
            console.log(e)
            var calcodedata=requester.ajax_request("/api/v1.0/read_jurstgroup","POST",this.ac_token,this.rf_token,true,{storeent_id:e,subclass:1}).then(result=>{
                result.forEach((item)=>{
                    this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
                })
                return requester.ajax_request("/api/v1.0/read_calcode","POST",this.ac_token,this.rf_token,true,{storeent_id:e,language_id:this.language_id,usages:[2]})
            })
            calcodedata.then(result=>{
                result.forEach((item)=>{
                    this.calcodeoptions.push({value:item.calcode_id,text:item.description})
                })
            })
        },
        submitshipmode(){
            const payload={...this.shipmode}
            payload.code='SHP/'+this.shipmode.storeent_id+'/'+this.shipmode.ffmcenter_id+'/'+this.shipmode.jurstgroup_id
            requester.ajax_request("/api/v1.0/create_shipmode_policy","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
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
