<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <h1 class="breadcrumb">Profile</h1>
            </b-container>
        </div>
        <section class="forms">
            <b-container fluid>
                <header></header>
                <b-row>
                    <b-col cols="4">
                        <b-card no-body class="card-profile">
                            <b-card-header  :style="{backgroundImage:`url(${defaultheader})`}">
                            </b-card-header>
                            <b-card-body class="text-center">
                                <img v-if="profileimage==null" class="card-profile-img" :src="defaultavatar">
                                <img v-else-if="profileimage!=null" class="card-profile-img" :src="profileimage">
                                <h3 class="mb-3"> {{ companyname }} </h3>
                                <p class="mb-4">{{ description }}</p>
                                <!-- :to="{path:`/scaffolding/edit${this.profiletype}/${this.user_id}`}" -->
                                <b-button @click="gotoprofile" class="btn btn-outline-dark btn-sm">
                                    <i class="fas fa-edit mr-1"></i>Edit
                                </b-button>
                            </b-card-body>
                        </b-card>
                        <b-card no-body>
                            <b-card-body>
                                <div class="media">
                                    <span v-if="profileimage==null" :style="{backgroundImage:`url(${defaultavatar})`}" class="avatar avatar-xl mr-3"></span>
                                    <span v-else-if="profileimage!=null" :style="{backgroundImage:`url(${profileimage})`}" class="avatar avatar-xl mr-3"></span>
                                    <div class="media-body">
                                        <h4>{{ companyname }}</h4>
                                        <p class="text-muted mb-0">Primary Role</p>
                                        <ul class="social-links list-inline mb-0 mt-2">
                                            <li class="list-inline-item">
                                                <a href="javascript.void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="User's Facebook">
                                                    <i class="fab fa-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="javascript.void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="@users_twitter"></a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="javascript.void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="@users_twitter">
                                                    <i class="fab fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="javascript.void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="+234 567 8900">
                                                    <i class="fas fa-phone"></i>
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="javascript.void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="@users_skype">
                                                    <i class="fab fa-skype"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col cols="8">
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:"companyprofile",
    data(){
        return {
            user_id:this.$route.params.id,
            profiletype:requester.getfromlocalstorage("user_id")==requester.getfromlocalstorage("employer") ? 'companyprofile' : 'userprofile',
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            defaultavatar:requester.baseurl+'/static/profileuploads/default-avatar.png',
            defaultheader:requester.baseurl+'/static/profileuploads/default-profile-header.jpg',
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",
            companyname:null,
            description:null,
            profileimage:null,
        }
    },
    created(){
        var readorg=requester.ajax_request("/api/v1.0/read_organization","POST",this.ac_token,this.rf_token,true,{logonid:this.user_id})
        readorg.then(result => {
            console.log(result)
            this.companyname=result.orgentity.orgentityname
            this.description=result.orgentity.description
            this.profileimage=result.userprof.photo
        })
    },
    methods:{
        gotoprofile(){
            this.$router.push( {path:`/scaffolding/edit${this.profiletype}/${this.user_id}`} )
        }
    }
}
</script>

<style lang="scss" scoped>
</style>