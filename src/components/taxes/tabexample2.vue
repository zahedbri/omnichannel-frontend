<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Taxes</h1>
                    <div>
                        <b-form-select size="sm" v-model="selectedstore" :options="storeslist"></b-form-select>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <header style="padding-top:0.8rem; padding-bottom:0.8rem;"></header>
                <b-row>
                    <b-col cols="2" class="pr-0">
                        <ul class="nav2 nav2-tabs tabs-left sideways">
                            <li @click="ctab=0" :class="ctab==0?activeClass:inactiveClass"><a data-toggle="tab">Tax Jurisdictions</a></li>
                            <li @click="ctab=1" :class="ctab==1?activeClass:inactiveClass"> <a data-toggle="tab">Tax Categories</a> </li>
                            <li @click="ctab=2" :class="ctab==2?activeClass:inactiveClass"> <a data-toggle="tab">Messages</a> </li>
                            <li @click="ctab=3" :class="ctab==3?activeClass:inactiveClass"> <a data-toggle="tab">Settings</a> </li>
                        </ul>
                    </b-col>
                    <b-col cols="10" class="bg-white">
                        <div class="tab-content">
                            <div class="tab-pane" :class="ctab==0?[activeClass,showClass]:inactiveClass">
                            </div>
                            <div class="tab-pane" :class="ctab==1?[activeClass,showClass]:inactiveClass">
                                Profile tab.
                            </div>
                            <div class="tab-pane" :class="ctab==2?[activeClass,showClass]:inactiveClass">
                                Messages tab.
                            </div>
                            <div class="tab-pane" :class="ctab==3?[activeClass,showClass]:inactiveClass">
                                Settings tab.
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>
<script>
import requester from "@/services/requester"
export default {
    name:"trading",
    data(){
        return {
            ctab:0,
            activeClass:'active',
            showClass:'show',
            inactiveClass:null,

            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            currentPage:1,
            totalRows:null,
            perPage:6,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            storeslist:[{value:null,text:"Select Store"}],
            selectedstore:null,
            taxjursfields:null,
            taxjursitems:null,

        }
    },
    created(){
        var storesdata=requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id,language_id:this.language_id}).done(result => {
            result.forEach((item)=>{
                this.storeslist.push({value:item.storeent_id,text:item.identifier})
            })
            this.storeslist.length > 1 ? this.selectedstore=this.storeslist[1].value : this.selectedstore=null;
            return requester.ajax_request("/api/v1.0/read_jurst","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore}).done(result => {
                this.taxjursfields=['code','sub_class','country','state','city','description','add','remove']
                this.taxjursitems=result
            })
        })
    },
    methods:{
        addrow(data){
            let newdata=[]
            this.taxjursitems.forEach((item)=>{
                newdata.push(item)
            })
            newdata.push(data.item)
            this.taxjursitems=newdata
        }
    }
}
</script>
<style lang="scss" scoped>
</style>