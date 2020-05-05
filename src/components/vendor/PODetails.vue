<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Purchase Order Details</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="P.O. Details">
                            <b-dropdown-item v-b-modal.radetail-modal>Purchase Order Details</b-dropdown-item>
                            <!-- <b-dropdown-item >Receive Inventory Items</b-dropdown-item> -->
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section class="forms">
            <b-container fluid class="mt-2">
                <b-row class="d-flex justify-content-center align-items-center">
                    <b-col cols="12">
                        <b-card no-body>
                            <b-card-body>
                                <b-row>
                                    <b-col cols="5" class="text-center d-flex justify-content-end align-items-center">
                                        <img :src="logoimg" alt="..." style="max-width: 6rem;" class="img-fluid">
                                    </b-col>
                                    <b-col cols="7" class="text-center d-flex justify-content-start align-items-center">
                                        <div>
                                            <h2 class="mb-1">Purchase Order Details</h2>
                                            <h2 class="mb-1">{{employername}} &mdash; {{vendorname}}</h2>
                                            <p class="text-muted mb-6">P.O. Number: {{externalid}}</p>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-header class="d-flex align-items-center justify-content-end">
                                <div>
                                    <div v-if="openindicator=='N'" class="badge badge-danger"><strong>STATUS &mdash;</strong> Close</div>
                                    <div v-else-if="openindicator=='Y'" class="badge badge-primary"><strong>STATUS &mdash;</strong> Open</div>
                                </div>
                            </b-card-header>
                            <b-card-body class="pr-5 pl-5 pt-0">
                                <b-table bordered show-empty striped hover :items="detailsitems" :fields="detailsfields">
                                    <template v-slot:head(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="far fa-clipboard"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(_)="row">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button @click="removerow(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button v-b-modal.receipt-modal @click="receiveitem(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="far fa-clipboard"></i></b-button>
                                        </div>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="receipt-modal" size="lg" id="receipt-modal" title="Receive Inventory Item" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitreceipt" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse</label>
                                            <b-form-select size="sm" v-model="receipt.ffmcenter_id" :options="ffmoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Item</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Inventory Item" v-model="receipt.catentry" @change.native="selectedreceiptitem" size="sm" list="catentry-list"></b-form-input>
                                                <datalist id="catentry-list">
                                                    <option>Select Item</option>
                                                    <option v-for="catentry in catentries" :key="catentry.itemspc_id">{{catentry.name}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Currency</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Currency" v-model="receipt.currency" @change.native="changedcurrency" size="sm" list="currency-list"></b-form-input>
                                                <datalist id="currency-list">
                                                    <option>Select Currency</option>
                                                    <option v-for="currency in curselects" :key="currency.setccurr">{{currency.description}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Receipt Date</label>
                                            <b-form-datepicker required size="sm" type="text" v-model="receipt.receiptdate" placeholder="Receipt Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity Received</label>
                                            <b-form-input size="sm" v-model="receipt.qtyreceived" :max="receipt.qtyremaining" type="number" step="1" placeholder="Quantity Received" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity In Process</label>
                                            <b-form-input size="sm" v-model="receipt.qtyinprocess" type="number" step="1" placeholder="Quantity In Process" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity On Hand</label>
                                            <b-form-input size="sm" v-model="receipt.qtyonhand" type="number" step="1" placeholder="Quantity On Hand" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity In Kits</label>
                                            <b-form-input size="sm" v-model="receipt.qtyinkits" type="number" step="1" placeholder="Quantity In Kits" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Per Unit Cost</label>
                                            <b-form-input size="sm" v-model="receipt.cost" type="number" step="1" placeholder="Per Unit Cost" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Comment</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="receipt.comment1" placeholder="Comment the quantities received on the receipt date."></b-form-textarea>
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
        <b-modal ref="radetail-modal" size="lg" id="radetail-modal" title="Purchase Order Details" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitradetail" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse</label>
                                            <b-form-select size="sm" v-model="radetail.ffmcenter_id" :options="ffmoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Item</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Inventory Item" v-model="radetail.catentryname" @change.native="selecteditem" size="sm" list="catentry-list"></b-form-input>
                                                <datalist id="catentry-list">
                                                    <option>Select Item</option>
                                                    <option v-for="catentry in catentries" :key="catentry.itemspc_id">{{catentry.name}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity Ordered</label>
                                            <b-form-input size="sm" v-model="radetail.qtyordered" type="number" step="1" placeholder="Quantity Ordered" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity Received</label>
                                            <b-form-input size="sm" v-model="radetail.qtyreceived" @input="calculateremaining" type="number" step="1" placeholder="Quantity Received" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity Remaining</label>
                                            <b-form-input size="sm" v-model="radetail.qtyremaining" type="number" step="1" placeholder="Quantity Remaining" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity Allocated</label>
                                            <b-form-input size="sm" readonly v-model="radetail.qtyallocated" type="number" step="1" placeholder="Quantity Allocated" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Per Unit Cost</label>
                                            <b-form-input size="sm" v-model="radetail.cost" type="number" step="1" placeholder="Per Unit Cost" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Currency</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Currency" v-model="radetail.currency" @change.native="changedreceiptcurrency" size="sm" list="currency-list"></b-form-input>
                                                <datalist id="currency-list">
                                                    <option>Select Currency</option>
                                                    <option v-for="currency in curselects" :key="currency.setccurr">{{currency.description}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Expected Date</label>
                                            <b-form-datepicker required size="sm" type="text" v-model="radetail.expecteddate" placeholder="Expected Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Footnote</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="radetail.radetailcomment" placeholder="Comment the expected quantities to be received on expected date."></b-form-textarea>
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
    name:"podetails",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

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

            ra_id:this.$route.params.ra_id,curselects:[],
            openindicator:null,externalid:null,store_id:null,logoimg:null,vendorname:null,vendor_id:null,
            ordered:null,issueraddress:null,receiveraddress:null,detailsitems:[],detailsfields:[],
            emptydetails:[],ffmoptions:[{value:null,text:"Select Warehouse"}],catentries:null,
            radetail:{
                ra_id:this.$route.params.ra_id,ffmcenter_id:null,itemspc_id:null,qtyordered:null,
                qtyreceived:null,qtyremaining:0,qtyallocated:0,expecteddate:null,radetailcomment:null,
                lastupdate:null,catentry_id:null,catentryname:null,store_id:null,vendor_id:null,
                cost:null,setccurr:null,currency:null,
            },
            receipt:{
                versionspc_id:null,radetail_id:null,store_id:null,setccurr:null,ffmcenter_id:null,catentry:null,
                vendor_id:null,receiptdate:null,qtyreceived:null,qtyinprocess:null,qtyonhand:null,qtyinkits:null,
                cost:null,comment1:null,lastupdate:null,createtime:null,receipttype:null,rtnrcptdsp_id:null,
                qtyremaining:null,ra_id:this.$route.params.ra_id
            }
        }
    },
    created(){
        var radata=requester.ajax_request("/api/v1.0/get_ra","POST",this.ac_token,this.rf_token,true,{ra_id:this.ra_id})
        var imagedata=radata.then(result=>{
            // console.log(result)
            this.openindicator=result.openindicator
            this.externalid=result.externalid
            this.store_id=result.store_id
            this.vendorname=result.vendor
            this.vendor_id=result.vendor_id
            this.ordered=result.ordered
            this.radetail.store_id=result.store_id
            this.radetail.vendor_id=result.vendor_id
            return requester.ajax_request("/api/v1.0/get_store_image","POST",this.ac_token,this.rf_token,true,{store_id:result.store_id})
        })
        var issuerdata=imagedata.then(result=>{
            this.logoimg=result.image
            return requester.ajax_request("/api/v1.0/read_organization","POST",this.ac_token,this.rf_token,true,{logonid:this.employer})
        })
        var receiverdata=issuerdata.then(result=>{
            // console.log(result)
            this.issueraddress=result.address
            return requester.ajax_request("/api/v1.0/read_organization","POST",this.ac_token,this.rf_token,true,{logonid:this.vendor_id})
        })
        var detailsdata=receiverdata.then(result=>{
            // console.log(result)
            this.receiveraddress=result.address
            return requester.ajax_request("/api/v1.0/read_ra_detail","POST",this.ac_token,this.rf_token,true,{ra_id:this.ra_id})
        })
        var ffmdata=detailsdata.then(result=>{
            // console.log(result)
            this.detailsitems=result
            this.totalRows2=result.length
            this.detailsfields=['warehouse','item','ordered','received','remaining','allocated','expected_on','updated_on','_']
            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var catentrydata=ffmdata.then(result=>{
            // console.log(result)
            result.forEach((item)=>{
                this.ffmoptions.push({value:item.ffmcenter_id,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_catentries","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var currdata=catentrydata.then(result=>{
            // console.log(result)
            this.catentries=result
            return requester.ajax_request("/api/v1.0/list_currs","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        currdata.then(result=>{
            this.curselects=result
        })
    },
    methods:{
        submitreceipt(){
            const payload={...this.receipt}
            console.log(payload)
            requester.ajax_request("/api/v1.0/inventory_receipt","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true

                this.detailsitems=result.detailsitems
                this.totalRows=result.detailsitems.length
                this.detailsfields=['warehouse','item','ordered','received','remaining','allocated','expected_on','updated_on','_']
                this.$refs['receipt-modal'].hide()

            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedcurrency(e){
            let val=e.target.value
            this.curselects.forEach((item)=>{
                if(item.description==val){
                    this.receipt.setccurr=item.setccurr
                }
            })
        },
        selectedreceiptitem(e){
            let productname=e.target.value
            this.catentries.forEach((item)=>{
                if(item.name==productname){
                    this.receipt.versionspc_id=item.catentry_id
                }
            })
        },
        receiveitem(row){
            let radetail_id=row.item.radetail_id
            requester.ajax_request("/api/v1.0/receive_inventory","POST",this.ac_token,this.rf_token,true,{radetail_id:radetail_id}).done(result=>{
                console.log(result)
                if(result.versionspc_id!=null){
                    this.receipt.versionspc_id=result.versionspc_id
                    this.catentries.forEach((item)=>{
                        if(item.catentry_id==result.versionspc_id){
                            this.receipt.catentry=item.name
                        }
                    })
                }
                else{this.receipt.versionspc_id=result.catentry_id}
                this.receipt.radetail_id=result.radetail_id
                this.receipt.store_id=result.store_id
                if(result.setccurr!=null){
                    this.receipt.setccurr=result.setccurr
                    this.curselects.forEach((item)=>{
                        if(item.setccurr==result.setccurr){
                            this.receipt.currency=item.description
                        }
                    })
                }
                this.receipt.ffmcenter_id=result.ffmcenter_id
                this.receipt.vendor_id=result.vendor_id
                // TODO nullify receiptdate so this sets a new record
                // this.receipt.receiptdate=result.receiptdate.split(' ')[0]
                this.receipt.qtyremaining=result.qtyremaining
                this.receipt.qtyreceived=result.qtyreceived
                this.receipt.qtyinprocess=result.qtyinprocess
                this.receipt.qtyonhand=result.qtyonhand
                this.receipt.qtyinkits=result.qtyinkits
                this.receipt.cost=result.unit_cost
                // this.receipt.comment1=result.comment
                this.receipt.lastupdate=result.lastupdate
                this.receipt.createtime=result.createtime
                this.receipt.receipttype=result.receipttype
                this.receipt.rtnrcptdsp_id=result.rtnrcptdsp_id
            })
        },
        changedreceiptcurrency(e){
            let val=e.target.value
            this.curselects.forEach((item)=>{
                if(item.description==val){
                    this.radetail.setccurr=item.setccurr
                }
            })
        },
        calculateremaining(e){
            this.radetail.qtyremaining=this.radetail.qtyordered-this.radetail.qtyreceived
        },
        selecteditem(e){
            let productname=e.target.value
            this.catentries.forEach((item)=>{
                if(item.name==productname){
                    this.radetail.itemspc_id=item.itemspc_id
                    this.radetail.catentry_id=item.catentry_id
                }
            })
        },
        submitradetail(){
            const payload={...this.radetail}
            // console.log(payload)
            requester.ajax_request("/api/v1.0/create_radetail","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                // console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
                this.detailsitems=result.detailsitems
                this.totalRows=result.detailsitems.length
                this.detailsfields=['warehouse','item','ordered','received','remaining','allocated','expected_on','updated_on','_']
                this.$refs['radetail-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        removerow(row){
            console.log(row)
        },
    }
}
</script>