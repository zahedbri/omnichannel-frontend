<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Vendor Purchase Orders</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New Order">
                            <b-dropdown-item v-b-modal.new-po-modal>Raise Purchase Order</b-dropdown-item>
                            <!-- <b-dropdown-item v-if="hostwarehouse" v-b-modal.new-warehouse-modal>Add host warehouse</b-dropdown-item> -->
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab active>
                                <template v-slot:title>
                                    <i class="far fa-file-alt mr-1"></i> Purchase Orders
                                </template>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card no-body class="mb-0 shadow-none p-0">
                                            <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-between py-2">
                                                <b-col sm="6" md="6" class="mt-1 mb-0 pl-0">
                                                    <div class="input-group">
                                                        <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter" class="form-control"></b-form-input>
                                                        <div class="input-group-append">
                                                            <b-button size="sm" type="button" :disabled="!filter" @click="filter = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                                        </div>
                                                    </div>
                                                </b-col>
                                                <b-col sm="4" md="4" class="my-0 d-flex justify-content-end pr-0">
                                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                                </b-col>
                                            </b-card-header>
                                        </b-card>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card no-body class="shadow-none">
                                            <b-card-body class="p-0">
                                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="raitems" :fields="rafields" :filter="filter" @filtered="onFiltered">
                                                    <template v-slot:head(_)>
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-eye"></i></b-button>
                                                            <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(_)=row>
                                                        <div v-if="row.item.ra_id" class="d-flex align-items-center justify-content-center">
                                                            <b-button @click="podetails(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-eye"></i></b-button>
                                                            <b-button class="dull-border2 mr-0" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <i class="fas fa-dolly-flatbed mr-1"></i> Inventory Receipts
                                </template>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card no-body class="mb-0">
                                            <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-between py-2">
                                                <b-col sm="6" md="6" class="mt-1 mb-0 pl-0">
                                                    <div class="input-group">
                                                        <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter2" class="form-control"></b-form-input>
                                                        <div class="input-group-append">
                                                            <b-button size="sm" type="button" :disabled="!filter2" @click="filter2 = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                                        </div>
                                                    </div>
                                                </b-col>
                                                <b-col sm="4" md="4" class="my-0 d-flex justify-content-end pr-0">
                                                    <b-pagination v-model="currentPage2" :total-rows="totalRows2" :per-page="perPage2" size="sm" class="my-0"></b-pagination>
                                                </b-col>
                                            </b-card-header>
                                        </b-card>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card no-body>
                                            <b-card-body>
                                                <b-table bordered show-empty striped hover :current-page="currentPage2" :per-page="perPage2" :items="receiptitems" :fields="receiptfields" :filter="filter2" @filtered="onFiltered">
                                                    <template v-slot:cell(unit_cost)="row">
                                                        {{row.item.setccurr}}{{row.item.unit_cost}}
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </b-container>
        </section>
        <b-modal ref="new-po-modal" size="md" id="new-po-modal" title="New Purchase Order" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitra" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Vendor</label>
                                            <b-form-select size="sm" v-model="ra.vendor_id" :options="vendoroptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Store</label>
                                            <b-form-select size="sm" v-model="ra.store_id" :options="storeoptions" @change="formulatepo" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">PO Number</label>
                                            <b-form-input size="sm" type="text" v-model="ra.externalid" placeholder="Purchase Order Number"></b-form-input>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-success btn-sm" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
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
    name:"vendor",
    data(){
        return{
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            currentPage:1,totalRows:null,perPage:6,filter:null,
            currentPage2:1,totalRows2:null,perPage2:6,filter2:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            vendoroptions:[{value:null,text:"Select Vendor"}],
            storeoptions:[{value:null,text:"Select Store"}],
            lastraid:null,raitems:[],rafields:[],receiptitems:[],receiptfields:[],
            ra:{
                vendor_id:null,store_id:null,orderdate:null,openindicator:'Y',
                dateclosed:null,lastupdate:null,createtime:null,externalid:null,
                member_id:requester.getfromlocalstorage("employer"),
            },
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var vendordata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/list_vendors","GET",this.ac_token,this.rf_token,false,null)
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var storesdata=vendordata.then(result=>{
            result.vendors.forEach((item)=>{
                this.vendoroptions.push({value:item.vendor_id,text:item.vendorname})
            })
            this.lastraid=result.lastraid
            return requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.success_message=jqXHR.responseJSON.msg
            this.showSnackbar=true
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var radata=storesdata.then(result=>{
            result.forEach((item)=>{
                this.storeoptions.push({value:item.storeent_id,text:item.identifier})
            })
            return requester.ajax_request("/api/v1.0/read_ra","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var receiptsdata=radata.then(result=>{
            if(result.length > 0 && result[0].ra_id==null){
                this.raitems=null
                this.rafields=['PO_Number','vendor','store','created','ordered','open','closed','_']
                this.totalRows=0
            }else if(result.length > 0 && result[0].ra_id != null){
                this.raitems=result
                this.rafields=['PO_Number','vendor','store','created','ordered','open','closed','_']
                this.totalRows=result.length
            }
            return requester.ajax_request("/api/v1.0/read_receipts","GET",this.ac_token,this.rf_token,false,null)
        })
        receiptsdata.then(result=>{
            // console.log(result)
            this.receiptitems=result
            this.totalRows2=result.length
            this.receiptfields=['PO_Number','unit_cost','created','on_hand','quantity','received','type','store','updated','vendor','warehouse']
        })
    },
    methods:{
        podetails(row){
            let idx=row.index
            let ra_id=this.raitems[idx].ra_id
            this.$router.push( {path:`/scaffolding/podetails/${ra_id}`} )
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        formulatepo(e){
            // this.ra.externalid="PO"+'/'+this.ra.vendor_id+'/'+this.ra.store_id
        },
        submitra(){
            const payload={...this.ra}
            requester.ajax_request("/api/v1.0/create_ra","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.raitems=result.radata
                this.rafields=['PO_Number','vendor','store','created','ordered','open','closed','_']
                this.totalRows=result.radata.length
                this.$refs['new-po-modal'].hide()

                this.ra.vendor_id=null;this.ra.store_id=null;this.ra.orderdate=null
                this.ra.openindicator='Y';this.ra.dateclosed=null
                this.ra.lastupdate=null;this.ra.createtime=null
                this.ra.externalid=null

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