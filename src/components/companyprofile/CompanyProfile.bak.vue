<template>
    <div class="container-fluid mt-2">
        <b-row class="d-flex">
            <b-col md="4" class="mb-4 pr-0 border-right-0 flex-col-w">
                <b-card class="testimonial-card border-right-0 border-rad-0 shadow-none">
                    <div class="card-up"></div>
                    <div class="avatar mx-auto white">
                        <span v-if="profilephoto == null"><img src="../../assets/default-avatar.png" class="rounded-circle" alt="default profile photo"></span>
                        <span v-if="profilephoto !=null"><img :src="profilephoto" class="rounded-circle" style="height:200px !important; width:200px !important;"></span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title text-center">{{ profilename }}</h4>
                        <!-- <hr> -->
                        <p class="card-text text-center mb-1" style="font-size:1.0em; color: #444;">
                            {{ roledisplayname }} @{{ employername }}
                        </p>
                        <p class="card-text text-center" style="font-size:0.9em; color: #444">
                            Member since: {{ registration }}
                        </p>
                        <b-button class="text-center" variant="success" :pressed="true"><i class="fas fa-pen mr-1"></i>Edit Profile</b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col md="8" class="mb-4 pl-0 flex-col-w">
                <b-row>
                    <b-col sm="12">
                        <b-card no-body class="shadow-none border-rad-0">
                            <b-card-header class="cardheader-padding-sm card-header-white border-bottom-0">
                                <p class="heading lead">Official Information</p>
                            </b-card-header>
                            <b-card-body style="padding:1.15rem !important;">
                                <div class="container-fluid d-flex flex-row flex-wrap justify-content-between">
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col sm="12">
                        <b-card no-body class="shadow-none border-rad-0">
                            <b-card-header class="cardheader-padding-sm card-header-white border-bottom-0">
                                <p class="heading lead">Official Information</p>
                            </b-card-header>
                            <b-card-body style="padding:1.15rem !important;">
                                <div class="container-fluid d-flex flex-row flex-wrap justify-content-between">
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col sm="12">
                        <b-card no-body class="shadow-none border-rad-0">
                            <b-card-header class="cardheader-padding-sm card-header-white border-bottom-0">
                                <p class="heading lead">Official Information</p>
                            </b-card-header>
                            <b-card-body style="padding:1.15rem !important;">
                                <div class="container-fluid d-flex flex-row flex-wrap justify-content-between">
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details</p>
                                    </div>
                                    <div class="profile-item">
                                        <h6 class="card-title"> Information title</h6>
                                        <p class="card-text"> Information details go in here</p>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:"companyprofile",
    data(){
        return {
            user_id:this.$route.params.id,
            profileresults:{},
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            registration:null,
            roledisplayname:null,
            employername:null,
            profilename:null,
            profilephoto:null,
        }
    },
    created(){
        var data=requester.ajax_request("/api/v1.0/read_organization","POST",this.ac_token,this.rf_token,true,{logonid:this.user_id})
        data.then(result => {
            console.log(result)
            this.registration=result.users.registration
            this.employername=requester.getfromlocalstorage("employername")
            this.roledisplayname=requester.getfromlocalstorage("roledisplayname")
            this.profilename=result.orgentity.orgentityname
        })
    }
}
</script>

<style scoped>

</style>