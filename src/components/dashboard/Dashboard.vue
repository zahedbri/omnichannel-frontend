<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Analytics Dashboard</h1>
                    <div>
                    </div>
                </div>
            </b-container>
        </div>
        <section class="forms">
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col sm="8">
                        <b-row>
                            <b-col cols="12" class="pr-1">
                                <b-card no-body class="dashboard-counts mb-2">
                                    <b-card-body>
                                        <b-row>
                                            <b-col xl="3" sm="6" v-for="(count) in dashcounts" :key="count.val">
                                                <div class="item d-flex flex-column justify-content-center counts-widget">
                                                    <div class="number">
                                                        {{count.hformat}}
                                                    </div>
                                                    <div class="title">
                                                        {{count.text}}
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <b-col cols="12" class="pr-1">
                                <b-card no-body>
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
                                            <chart :options="chartoptionseries" autoresize></chart>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="4">
                        <b-row>
                            <b-col cols="12" class="pl-1">
                                <b-card no-body class="mb-1">
                                    <b-card-body>
                                        <div class="chart-wrapper-2">
                                            <chart :options="chartOptionsPie" autoresize></chart>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <b-col cols="12" class="pl-1">
                                <b-card no-body>
                                    <b-card-body>
                                        <div class="chart-wrapper-3">
                                            <chart :options="chartoptionsbar" autoresize></chart>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                        </b-row>
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
import {graphic} from 'echarts'

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

            dashcounts:[],
            chartoptionsbar:{
                title:{
                    text:"% Sales Performance by Days"
                },
                color:'#234d20',
                tooltip:{},
                xAxis:{
                    type:'category',
                    // boundaryGap:false,
                    data:[]
                },
                yAxis:{type:'value'},
                series:[{
                    type:'bar',
                    areaStyle:{},
                    data:[]
                }],
            },
            chartOptionsPie:{
                title: {
                    x:'center',
                },
                // color: ['#c9df8a','#77ab59','#36802d','#234d20'],
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
            chartoptionseries:{
                title:{
                    left:'center',
                    text:'',
                },
                tooltip:{},
                xAxis:{
                    type:'category',
                    boundaryGap:false,
                    data:[]
                },
                yAxis:{
                    type:'value'
                },
                dataZoom:[{
                    type:'inside',
                    start:0,
                    end:10
                },{
                    start:0,
                    end:10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize:'80%',
                    handleStyle:{
                        color:'#fff',
                        shadowBlur:3,
                        shadowColor:'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX:2,
                        shadowOffsetY:2,
                    }
                }],
                series:[{
                    name:'Volume',
                    type:'line',
                    // smooth:true,
                    symbol:'none',
                    sampling:'average',
                    itemStyle:{
                        color:'(240,247,218)',
                    },
                    areaStyle:{
                        color:new graphic.LinearGradient(0, 0, 0, 1,[{
                            offset:0,
                            color:'rgb(201,223,138)',
                        },{
                            offset:1,
                            color:'rgb(240,247,218)'
                            // color:'rgb(119,171,89)'
                        }])
                    },
                    data:[]
                }]
            },

        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var dashcountsdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/dashboard_counts","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var jurisales=dashcountsdata.then(result=>{
            this.dashcounts=result
            return requester.ajax_request("/api/v1.0/sales_by_jurisdiction","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer,language_id:this.language_id})
        })
        var daysperf=jurisales.then(result=>{
            if(result !=null){
                result.areas.forEach((area,index)=>{
                    this.chartOptionsPie.legend.data.push(result.areas[index]);
                    this.chartOptionsPie.series[0].data.push({name:result.areas[index],value:result.values[index]})
                })
            }
            return requester.ajax_request("/api/v1.0/days_performance","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer,language_id:this.language_id})
        })
        var minmaxdates=daysperf.then(result=>{
            this.chartoptionsbar.xAxis.data=result.days
            this.chartoptionsbar.series[0].data=result.pcs
            return requester.ajax_request("/api/v1.0/oldest_youngest_datetimes","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer})
        })
        var defaultseries=minmaxdates.then(result=>{
            if(result.range[0] != null){
                this.mindate=result.range[0].split(' ')[0]
                this.minwindow=result.range[0].split(' ')[0]
                this.maxdate=result.range[1].split(' ')[0]
                this.maxwindow=result.range[1].split(' ')[0]
            }
            return requester.ajax_request("/api/v1.0/sales_series","POST",this.ac_token,this.rf_token,true,{startdate:this.mindate,enddate:this.maxdate,owner_id:this.employer})
        })
        defaultseries.then(result=>{
            if(result.data.length > 0){
                this.chartoptionseries.xAxis.data=result.dates
                this.chartoptionseries.title.text=result.title
                this.chartoptionseries.series[0].data=result.data
            }
        })
    },
    methods:{
        submitwindow(){
            const payload={startdate:this.minwindow,enddate:this.maxwindow}
            requester.ajax_request("/api/v1.0/catalogs_performance","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                console.log(result)
                // this.chartOptionsBar.series=result.series
                // this.chartOptionsBar.dataset.source=result.source
            })
        }

    }
}
</script>

<style scoped>
.chart-wrapper {
    width:100%;
    height:320px;
}
.chart-wrapper-2 {
    height: 300px;
    width:100%;
}
.chart-wrapper-3 {
    height:190px;
    width: 100%;
}
.echarts {
    width:100%;
    height:100%;
}
</style>