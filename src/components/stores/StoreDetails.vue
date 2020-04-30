<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Store Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="Create">
                            <b-dropdown-item v-b-modal.discount-modal>Pricing Discount</b-dropdown-item>
                            <b-dropdown-item v-b-modal.shipmode-modal>Delivery Arrangements</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="4">
                        <b-card no-body class="updates daily-feeds">
                            <b-card-header style="background:#fff !important;">
                                <b-input-group size="sm">
                                    <b-form-input @input="executesearch" class="form-control" type="text" placeholder="Search..."></b-form-input>
                                    <b-input-group-append>
                                        <b-button size="sm" variant="outline-success"><i class="fas fa-times-circle"></i></b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-card-header>
                            <b-card-body class="p-0">
                                <div class="feed-box">
                                    <ul class="feed-elements list-unstyled mb-0">
                                        <vue-custom-scrollbar class="scroll-area" :settings="settings">
                                            <li class="clearfix"  v-for="(option,index) in utiloptions" :key="index">
                                                <div class="feed d-flex justify-content-between align-items-center">
                                                    <div class="feed-body d-flex justify-content-between">
                                                        <a class="feed-profile2 d-flex justify-content-center align-items-center" href="#">
                                                            <i class="fas fa-cogs white-text"></i>
                                                        </a>
                                                        <div class="content">
                                                            <strong>{{option.text}}</strong>
                                                            <small>{{option.class}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="date d-flex justify-content-between align-items-center">
                                                        <b-button size="sm" style="border-radius:50%;" variant="outline-secondary" @click="attachitem(option,index)" :disabled="option.attached" class="mr-2 dull-border2"><i class="fas fa-plus-circle" :class="{text_primary:option.attached}" style="color:#c6d0ba;"></i></b-button>
                                                        <b-button size="sm" style="border-radius:50%;" variant="outline-secondary" @click="detachitem(option,index)" :disabled="option.attached==false" class="dull-border2"><i class="fas fa-minus-circle" :class="{text_danger:option.attached==false}" style="color:#c6d0ba;"></i></b-button>
                                                    </div>
                                                </div>
                                            </li>
                                        </vue-custom-scrollbar>
                                    </ul>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col cols="8">
                        <b-card no-body class="mb-1">
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
                                        <div class="form-group mb-4">
                                            <label class="form-label">Shipping From</label>
                                            <b-form-select size="sm" v-model="shipmode.ffmcenter_id" :options="warehouseoptions" required></b-form-select>
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
                                            <label class="form-label">Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="shipmode.description" placeholder="Brief description"></b-form-textarea>
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
        <b-modal ref="discount-modal" size="md" id="discount-modal" title="Pricing Discount" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitdiscount" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Name</label>
                                            <b-form-input type="text" size="sm" required v-model="calcode.description" placeholder="Name or Identifier"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <b-form-checkbox id="checkbox-1" v-model="calcode.timelimited" name="checkbox-1" value="Yes" unchecked-value="No">
                                                This is a time limited pricing discount &mdash; <strong>{{ calcode.timelimited }}</strong>
                                            </b-form-checkbox>
                                        </div>
                                    </b-col>
                                    <b-col v-if="calcode.timelimited=='Yes'" sm="6" md="6">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Starting</label>
                                            <b-form-datepicker size="sm" type="text" v-model="calcode.startdate" placeholder="Initiation Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col v-if="calcode.timelimited=='Yes'" sm="6" md="6">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Ending</label>
                                            <b-form-datepicker size="sm" type="text" v-model="calcode.enddate" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Value</label>
                                            <b-form-input size="sm" v-model="calcode.value" type="number" step="1" placeholder="Value" required></b-form-input>
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
import VueCustomScrollbar from 'vue-custom-scrollbar'
export default {
    components:{VueCustomScrollbar},
    name:"storedetails",
    data(){
        return {
            defaultavatar:requester.baseurl+'/static/profileuploads/product-default-2.png',
            settings: {maxScrollbarLength: 100},

            ac_token:requester.getfromlocalstorage("access_token"),rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",store_id:this.$route.params.store_id,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),
            utilitems:null,utiloptions:[],warehouseoptions:[{value:null,text:"Select Warehouse"}],
            jurstgroupoptions:[{value:null,text:"Select Jurisdiction"}],calcodeoptions:[{value:null,text:"Select Charges"}],
            shipmode:{
                storeent_id:this.$route.params.store_id,
                code:null,
                carrier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,
                ffmcenter_id:null,
                timelimited:"Yes",
                startdate:null,
                enddate:null,
                jurstgroup_id:null,
                calcode_id:null
            },
            calcode:{
                code:null,
                calusage_id:1,
                storeent_id:this.$route.params.store_id,
                calmethod_id:null,
                calmethod_id_app:null,
                calmethod_id_qfy:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,
                timelimited:"Yes",
                startdate:null,
                enddate:null,
                calrulecalmethod_id:null,
                calrulecalmethod_id_qfy:null,
                calruleflags:1,
                calrulefield2:null,
                calscalecode:null,
                calscalecalmethod_id:null,
                calrangecalmethod_id:null,
                rangestart:0,
                cumulative:0,
                value:null,
            }
        }
    },
    created(){
        var utildata=requester.ajax_request("/api/v1.0/store_utilities","POST",this.ac_token,this.rf_token,true,{store_id:this.store_id,language_id:this.language_id,member_id:this.employer})
        var calcodemethods=utildata.then(result => {
            this.utilitems=result
            // console.log(result)
            result.shipmodes.forEach((item)=>{
                this.utiloptions.push({attached:item.attached,item:'shipmodes',class:"Discounts, Shipping & Taxes",value:item.shipmode_id,text:item.description})
            })
            result.calcodes.forEach((item)=>{
                this.utiloptions.push({attached:item.attached,item:'calcodes',class:"Discounts, Shipping & Taxes",value:item.calcode_id,text:item.description})
            })
            result.catalogs.forEach((item)=>{
                this.utiloptions.push({attached:item.attached,item:'catalogs',class:"Product Catalogs",value:item.catalog_id,text:item.name})
            })
            result.catgroups.forEach((item)=>{
                this.utiloptions.push({attached:item.attached,item:'catgroups',class:"Product Categories",value:item.catgroup_id,text:item.identifier})
            })
            return requester.ajax_request("/api/v1.0/discount_calcode_methods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,calusage_id:1})
        })
        var calrulemethods=calcodemethods.then(result => {
            this.calcode.calmethod_id=result.calmethod_id
            this.calcode.calmethod_id_qfy=result.calmethod_id_qfy
            this.calcode.calmethod_id_app=result.calmethod_id_app
            this.calcode.code='PR'+'/'+'CC'+'/'+result.calmethod_id+'/'+result.calmethod_id_qfy+'/'+result.calmethod_id_app
            return requester.ajax_request("/api/v1.0/discount_calrule_methods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,calusage_id:1})
        })
        var calscalemethods=calrulemethods.then(result => {
            this.calcode.calrulecalmethod_id=result.calmethod_id
            this.calcode.calrulecalmethod_id_qfy=result.calmethod_id_qfy
            this.calcode.calrulefield2='PR'+'/'+'CR'+'/'+result.calmethod_id+'/'+result.calmethod_id_qfy
            return requester.ajax_request("/api/v1.0/discount_calscale_methods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,calusage_id:1})
        })
        var calrangemethods=calscalemethods.then(result => {
            this.calcode.calscalecalmethod_id=result.calmethod_id
            this.calcode.calscalecode='PR'+'/'+'CS'+'/'+1+'/'+result.calmethod_id
            return requester.ajax_request("/api/v1.0/discount_calrange_methods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,calusage_id:1})
        })
        var ffmdata=calrangemethods.then(result => {
            this.calcode.calrangecalmethod_id=result.calmethod_id
            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.employer})
        })
        var jurstdata=ffmdata.then(result=>{
            result.forEach((item)=>{
                this.warehouseoptions.push({text:item.name,value:item.ffmcenter_id})
            })
            return requester.ajax_request("/api/v1.0/read_jurstgroup","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,subclass:1})
        })
        var calcodedata=jurstdata.then(result=>{
            result.forEach((item)=>{
                this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/read_calcode","POST",this.ac_token,this.rf_token,true,{storeent_id:this.store_id,language_id:this.language_id,usages:[2]})
        })
        calcodedata.then(result => {
            result.forEach((item)=>{
                this.calcodeoptions.push({value:item.calcode_id,text:item.description})
            })
        })
    },
    methods:{
        submitshipmode(){
            const payload={...this.shipmode}
            payload.code='SHP/'+this.shipmode.storeent_id+'/'+this.shipmode.ffmcenter_id+'/'+this.shipmode.jurstgroup_id
            requester.ajax_request("/api/v1.0/create_shipmode","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['shipmode-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitdiscount(){
            const payload={...this.calcode}
            requester.ajax_request("/api/v1.0/create_discount","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        executesearch(e){
            if(e.length > 0){
                var filteritems=this.utiloptions.filter((item)=>{
                    return item.class.toLowerCase().match(e.toLowerCase())
                })
                this.utiloptions=filteritems
            }else{
                this.utiloptions=[]
                this.utilitems.calcodes.forEach((item)=>{
                    this.utiloptions.push({attached:item.attached,item:'calcodes',class:"Discounts, Shipping & Taxes",value:item.calcode_id,text:item.description})
                })
                this.utilitems.catalogs.forEach((item)=>{
                    this.utiloptions.push({attached:item.attached,item:'catalogs',class:"Product Catalogs",value:item.catalog_id,text:item.name})
                })
                this.utilitems.catgroups.forEach((item)=>{
                    this.utiloptions.push({attached:item.attached,item:'catgroups',class:"Product Categories",value:item.catgroup_id,text:item.identifier})
                })
            }
        },
        attachitem(option,index){
            let item=option.item
            if(item=="catalogs"){
                let catalog_id=this.utiloptions[index].value
                this.utilitems[item].forEach((item)=>{
                    if(item.catalog_id==catalog_id){
                        requester.ajax_request("/api/v1.0/create_storecat","POST",this.ac_token,this.rf_token,true,{store_id:this.store_id,catalog_id:catalog_id}).done(result => {
                            this.success_message=result.msg
                            this.showSnackbar=true
                        })
                    }
                })
            }
            if(item=="catgroups"){
                let catgroup_id=this.utiloptions[index].value
                this.utilitems[item].forEach((item)=>{
                    if(item.catgroup_id==catgroup_id){
                        requester.ajax_request("/api/v1.0/create_storecgrp","POST",this.ac_token,this.rf_token,true,{store_id:this.store_id,catgroup_id:item.catgroup_id}).done(result => {
                            console.log(result)
                            this.success_message=result.msg
                            this.showSnackbar=true
                        })
                    }
                })
            }
        },
        detachitem(option,index){
            console.log(option)
            console.log(index)
        },
        // selectedutil(e){
        //     let item=this.utiloptions[e].item
        //     this.itemclass=item
        //     if(item === "catalogs"){
        //         let val=this.utiloptions[e].value
        //         this.utilitems[item].forEach((item)=>{
        //             if(item.catalog_id==val){
        //                 this.detailfields=['catalog_id','name','description']
        //                 this.detailitems=[item]
        //             }
        //         })
        //     }
        //     if (item === "calcodes"){
        //         let val=this.utiloptions[e].value
        //         this.utilitems[item].forEach((item)=>{
        //             if(item.calcode_id==val){
        //                 this.detailfields=['description','methods','updated','usage']
        //                 this.detailitems=[item]
        //                 this.attachedprop=item.attached
        //                 this.selecteditem=item
        //             }
        //         })
        //     }
        // },
    }
}
</script>
