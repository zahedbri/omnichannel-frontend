<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Analytics Dashboard</h1>
                    <div>
                        <b-dropdown disabled variant="primary" size="sm" right text="Window">
                            <b-dropdown-item v-b-modal.radetail-modal>Purchase Order Details</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section class="forms">
            <b-container fluid class="mt-2">
                <b-row class="d-flex justify-content-center align-items-center">
                    <b-col sm="12" md="12" lg="8">
                        <b-card no-body class="mb-4">
                            <b-card-header class="bg-white align-items-center justify-content-start">
                                <b-row>
                                    <b-col sm="5" md="5" class="mt-1 mb-0">
                                        <div class="input-group">
                                            <b-form-datepicker size="sm" type="text" :min="mindate" :max="maxdate" v-model="minwindow" placeholder="Starting" class="form-control"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="5" md="5" class="mt-1 mb-0 pl-0">
                                        <div class="input-group">
                                            <b-form-datepicker size="sm" type="text" :min="mindate" :max="maxdate" v-model="maxwindow" placeholder="Ending" class="form-control"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="2" md="2" class="mt-1 mb-0 pl-0">
                                        <button @click="submitwindow" class="btn btn-primary btn-sm" type="button"><i class="fas fa-search"></i></button>
                                    </b-col>
                                </b-row>
                            </b-card-header>
                            <b-card-body>
                                <div class="chart-wrapper">
                                    <chart :options="chartOptionsBar" autoresize></chart>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col sm="12" md="12" lg="4">
                        <b-card no-body class="mb-4">
                            <b-card-body>
                                <div class="chart-wrapper-2">
                                    <chart :options="chartOptionsPie" autoresize></chart>
                                </div>
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
    name:"dashboard",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,duration:4000,position:"center",

            currentPage:1,totalRows:null,perPage:8,filter:null,
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
            mindate:null,maxdate:null,minwindow:null,maxwindow:null,

            chartOptionsPie:{
                title: {
                    text:"Sales By Jurisdiction",
                    x:'center',
                },
                tooltip: {
                    trigger:'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient:'vertical',
                    left:'left',
                    data:[]
                },
                series: [
                    {
                        name:"Volume",
                        type:'pie',
                        radius:'55%',
                        center:['50%','60%'],
                        data:[

                        ]
                    }
                ]
            },

            chartOptionsBar:{
                legend:{},
                tooltip:{},
                dataset:{
                    source:[
                        ['Product','Q1','Q2','Q3','Q4'],
                        ['One',63,75,24,92],
                        ['Two',69,55,14,95]
                    ]
                },
                xAxis:{
                    type:'category',
                    //data:['Q1','Q2','Q3','Q4']
                },
                yAxis: {
                    type:'value'
                },
                series:[
                    {type:'bar'},
                    {type:'bar'},
                    {type:'bar'},
                    {type:'bar'},
                ],
                title: {
                    text: 'Quarterly Sales Results',
                    x: 'center',
                    textStyle: { fontSize:18 }
                },
                color: ['#c9df8a','#77ab59','#36802d','#234d20']
            },

        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var minmaxdates=verification.then(result=>{
            // console.log(result)
            return requester.ajax_request("/api/v1.0/oldest_youngest_datetimes","GET",this.ac_token,this.rf_token,false,null)
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var jurssales=minmaxdates.then(result=>{
            // console.log(result.range[0].split(' ')[0])
            this.mindate=result.range[0].split(' ')[0]
            this.minwindow=result.range[0].split(' ')[0]
            this.maxdate=result.range[1].split(' ')[0]
            this.maxwindow=result.range[1].split(' ')[0]
            return requester.ajax_request("/api/v1.0/sales_by_jurisdiction","GET",this.ac_token,this.rf_token,false,null)
        })
        jurssales.then(result=>{
            result.areas.forEach((area,index)=>{
                this.chartOptionsPie.legend.data.push(result.areas[index]);
                this.chartOptionsPie.series[0].data.push({name:result.areas[index],value:result.values[index]})
            })
            
        })
    },
    methods:{
        submitwindow(){
            const payload={startdate:this.minwindow,enddate:this.maxwindow}
            requester.ajax_request("/api/v1.0/catalogs_performance","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
                this.chartOptionsBar.series=result.series
                this.chartOptionsBar.dataset.source=result.source
            })
        }
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