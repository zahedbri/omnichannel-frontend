<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Customer Orders &amp; Status</h1>
                    <div>
                        <b-dropdown disabled variant="primary" size="sm" right text="Generate Order">
                            <b-dropdown-item v-b-modal.radetail-modal>Purchase Order Details</b-dropdown-item>
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
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="ordersitems" :fields="ordersfields">
                                    <template v-slot:cell(discount)="row">
                                        <span v-if="row.item.totaladjustment != null">{{row.item.symbol}}{{row.item.totaladjustment}}</span>
                                    </template>
                                    <template v-slot:cell(shipping)="row">
                                        <span v-if="row.item.totalshipping != null">{{row.item.symbol}}{{row.item.totalshipping}}</span>
                                    </template>
                                    <template v-slot:cell(gross)="row">
                                        <span v-if="row.item.gross != null">{{row.item.symbol}}{{row.item.gross}}</span>
                                    </template>
                                    <template v-slot:head(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-eye"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(_)="row">
                                        <div v-if="row.item.orders_id" class="d-flex align-items-center justify-content-center">
                                            <b-button @click="seeorder(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-eye"></i></b-button>
                                        </div>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>        
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
    name:"customerorders",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:8,filter:null,
            owner_id:this.$route.params.owner_id,
            
            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),
            ordersitems:[],ordersfields:["gross","shipping","store","ordered","status","customer","discount","type","channel","_"],

        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var ordersdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/read_orders","POST",this.ac_token,this.rf_token,true,{member_id:this.owner_id,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        ordersdata.then(result=>{
            console.log(result)
            this.ordersitems=result
            this.totalRows=result.length;
        })

    },
    methods:{
        seeorder(row){
            let orders_id=row.item.orders_id
            // console.log(orders_id)
            this.$router.push( {path:`/scaffolding/customerorderitems/${orders_id}`} )
        },

    }
}
</script>
