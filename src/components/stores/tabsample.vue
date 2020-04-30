<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Store Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New Store">
                            <b-dropdown-item v-b-modal.new-store-modal>Add new store</b-dropdown-item>
                            <b-dropdown-item>Add new vendor</b-dropdown-item>
                            <b-dropdown-item>Add business client</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <b-modal ref="new-store-modal" size="lg" id="new-store-modal" title="Add a new store" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="3" class="mb-4">
                        <ul class="nav2 nav2-tabs tabs-left">
                            <li @click="ctab=0" :class="ctab==0?activeClass:inactiveClass"><a data-toggle="tab">Store</a></li>
                            <li @click="ctab=1" :class="ctab==1?activeClass:inactiveClass"><a data-toggle="tab">Address</a></li>
                        </ul>
                    </b-col>
                    <b-col cols="9" class="mb-4">
                        <div class="tab-content">
                            <div class="tab-pane" :class="ctab==0?[activeClass,showClass]:inactiveClass">
                            </div>
                            <div class="tab-pane" :class="ctab==1?[activeClass,showClass]:inactiveClass">Profile Tab.</div>
                        </div>
                    </b-col>
                    <div class="clearfix"></div>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:"stores",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            ctab:0,
            activeClass:'active',
            showClass:'show',
            inactiveClass:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            currselect:[],
            countryselect:[],
            stateselect:[],
            selectedcountry:null,
            storeinfo:{
                member_id:requester.getfromlocalstorage("user_id"),
                type:'S',
                setccurr:null,
                identifier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                ownername:requester.getfromlocalstorage("employername"),
                nickname:null,
                address1:null,
                state:null,
                country:null,
                city:null,
                email1:null,
                phone1:null,
                zipcode:null,
                firstname:null,
                middlename:null,
                lastname:null,
                persontitle:null,
            }
        }
    },
    created(){
        var currdata=requester.ajax_request("/api/v1.0/list_currencies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        var countrydata=currdata.then(result=>{
            this.currselect=result
            return requester.ajax_request_no_tokens("/api/v1.0/list_countries","GET",false,null)
        })
        countrydata.then(result => {
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
        })
    },
    methods:{
        changedcountry(e){
            let val=e.target.value
            this.countryselect.forEach((item)=>{
                if(item.text==val){this.selectedcountry=item.value}
            })
            requester.ajax_request_no_tokens("/api/v1.0/list_states_for_country","POST",true,{countryabbr:this.selectedcountry}).done(result => {
                result.forEach((item)=>{
                    this.stateselect.push({text:item.name,value:item.stateprovabbr})
                })
            })
        },
        changedcurrency(e){
            let val=e.target.value;
            this.currselect.forEach((item)=>{
                if(item.description==val){
                    this.storeinfo.setccurr=item.setccurr
                }
            })
        },
        submitstoreinfo(){
            const payload={...this.storeinfo}
            console.log(payload)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>