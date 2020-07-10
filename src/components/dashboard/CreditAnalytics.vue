<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Customer Credit Analytics</h1>
                    <div>
                        <!-- <b-dropdown disabled variant="primary" size="sm" right text="Window">
                            <b-dropdown-item v-b-modal.radetail-modal>Purchase Order Details</b-dropdown-item>
                        </b-dropdown> -->
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="12" class="px-4">
                        <slick ref="slick" id="carousel" class="slick-container" :options="slickOptions">
                        <b-card no-body class="mb-1">
                            <b-card-body>
                                <div class="chart-wrapper">
                                    <chart :options="baroptions" autoresize></chart>
                                </div>
                            </b-card-body>
                        </b-card>
                        <b-card no-body class="mb-1">
                            <b-card-body>
                                <div class="chart-wrapper">
                                    <chart :options="baroptions2" autoresize></chart>
                                </div>
                            </b-card-body>
                        </b-card>
                        </slick>
                    </b-col>
                    <b-col cols="12" class="px-4">
                        <b-card no-body>
                            <b-card-body>
                                <b-table small show-empty striped bordered hover :current-page="currentPage" :per-page="perPage" :items="rfmitems" :fields="rfmfields">
                                    <template v-slot:table-caption><span class="text-xsmall">Note on the OER &mdash; An OER score of 60 means nearly <strong>Two-Thirds of the company's revenue is shared in its operational expenditure. </strong> </span></template>
                                    <template v-slot:head(_)>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(_)="row">
                                        <div class="d-flex align-items-center justify-content-center">
                                            <b-button @click="seeclient(row.item)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
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
import Slick from 'vue-slick'

export default {
    name:"creditanalytics",
    components:{Slick},
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:8,filter:null,
            currentPage2:1,totalRows2:null,perPage2:6,filter2:null,
            currentPage3:1,totalRows3:null,perPage3:6,filter3:null,

            rfmfields:[],rfmitems:[],
            
            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

			slickOptions:{
				slidesToShow:1,infinite:true,accessibility:true,adaptiveHeight:false,
				arrows:true,dots:false,draggable:true,edgeFriction:0.30,swipe:true
			},

            baroptions:{
                legend:{},
                tooltip:{},
                color: ["#4ea397", "#22c3aa", "#7bd9a5"],
                dataset:{
                    source:[
                        ['Product', 'Recency', 'Frequency', 'Monetary'],
                        ['Null Data', 0,0,0],
                        ['Null Data', 0,0,0],
                        ['Null Data', 0,0,0],
                    ]
                },
                xAxis:{type:'category'},
                yAxis:{},
                series:[{type:'bar'},{type:'bar'},{type:'bar'},]
            },

            baroptions2 : {
                title:{
                    text:"OER: the efficiency of on-going operations"
                },
                color:'#419873',
                tooltip:{},
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(240,247,218, 0.8)'
                    }
                }]
            }
        }
    },
    mounted(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var rfmtable=verification.then(result=>{
            // console.log(result)
            return requester.ajax_request("/api/v1.0/rfm_tables","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer})
        }).fail((jqXHR,textStatus,errorThrown) => {
            // this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        rfmtable.done(result=>{
            // console.log(result)
            if(result!=null){
                this.rfmfields=result.rfm.columns
                this.rfmitems=result.rfm.rows
                this.totalRows=result.rfm.rows.length;
                this.baroptions.series=result.rfm.series
                this.baroptions.dataset.source=result.rfm.chartsource
                this.baroptions2.xAxis.data=result.oer.names
                this.baroptions2.series[0].data=result.oer.scores
                // console.log(this.baroptions.dataset)
            }
        })
    },
    methods:{
        seeclient(data){
            let contractid=data.contractid
            if(contractid==null || contractid==0){
                this.success_message="You must create a purchases account for "+data.storeid+" before providing credit."
                this.showSnackbar=true;
                console.log(data)
                setTimeout(() => {
                    this.$router.push( {path:`/scaffolding/trading`} )
                }, 4000);
            }else if(contractid > 0){
                this.success_message="Click the CREDITLINE tab in the next window to continue."
                this.showSnackbar=true
                setTimeout(() => {
                    this.$router.push({path:`/scaffolding/account/${contractid}`})
                }, 4000);
            }
        },
		next(){this.$refs.slick.next()},
		prev(){this.$refs.slick.prev()},
		reInit(){
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
    }
}
</script>

<style scoped>
.chart-wrapper {
    width:100%;
    height:300px;
}
.chart-wrapper-2 {
    height: 300px;
    width:100%;
}
.echarts {
    width:100%;
    height:100%;
}
</style>