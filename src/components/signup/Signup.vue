<template>
    <div class="bg-default">
        <div class="main-content">
            <div class="header bg-gradient-primary py-3 py-lg-3">
                <div class="container">
                    <div class="header-body text-center mb-7">
                        <div class="row justify-content-center">
                            <div class="col-lg-5 col-md-6">
                                <h1 class="text-grey">Sign Up</h1>
                                <p class="text-lead text-light-gray">
                                    Setup your organization account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator separator-bottom separator-skew zindex-100">
                    <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>
            <div class="container mt--8 pb-5">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-7">
                        <div class="card bg-secondary shadow border-0">
                            <div class="card-body px-lg-5 py-lg-5">
                                <div class="text-center text-muted mb-4">
                                    <small>Fill in details</small>
                                </div>
                                <form @submit.prevent="signuporg">
                                    <div class="form-group mb-3">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-user-shield"></i></span>
                                            </div>
                                            <b-form-input class="form-control" type="text" v-model="orgsignup.orgentityname" required placeholder="Company Name"></b-form-input>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-voicemail"></i></span>
                                            </div>
                                            <b-form-input class="form-control" :formatter="formatPhone" v-model="orgsignup.logonid" placeholder="Phone Number" type="text"></b-form-input>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-lock-open"></i></span>
                                            </div>
                                            <b-form-input class="form-control" type="password" v-model="orgsignup.logonpassword" :state="pw_state" aria-describedby="inputLiveHelp inputLiveFeedback" @keyup.native="constrainpassword" required placeholder="Password"></b-form-input>
                                            <b-form-invalid-feedback id="inputLiveFeedback">{{ pw_msg }}</b-form-invalid-feedback>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button :disabled="enablesignup" type="submit" class="btn btn-success my-4">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <a href="#" class="text-light"><small>Forgot password?</small></a>
                            </div>
                            <div class="col-6 text-right">
                                <router-link to="/login" class="text-light"><small>Log in</small></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="py-5">
            </footer>
        </div>
        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{success_message}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import requester from "@/services/requester"
import libphonenumber from "google-libphonenumber"
export default {
    name:"signup",
    data(){
        return {
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",
            ap_def:null,
            pw_state:null,
            pw_msg:"",
            unclearedpass:true,
            unclearedphone:true,
            orgsignup:{
                membertype:'O',
                memberstate:1,
                orgentitytype:'O',
                registertype:'R',
                profiletype:'B',
                orgentityname:null,
                logonid:null,
                logonpassword:null
            }
        }
    },
    computed:{
        enablesignup:function(){
            if(this.unclearedpass==false && this.unclearedphone==false){return false}
            else{return true;}
        }
    },
    created(){
        var ap_defaults=requester.ajax_request_no_tokens("/api/v1.0/default_password_policy","GET")
        ap_defaults.then(result => {
            // console.log(result)
            this.ap_def=result
        })
    },
    methods: {
        formatPhone(value){
            const PNF=libphonenumber.PhoneNumberFormat
            const phoneUtil=libphonenumber.PhoneNumberUtil.getInstance()
            const number=phoneUtil.parseAndKeepRawInput(value,'NG')
            let phoneclearance=phoneUtil.isValidNumber(number)
            if(phoneclearance){this.unclearedphone=false}
            else if(phoneclearance==false){this.unclearedphone=true}
            return phoneUtil.format(number,PNF.INTERNATIONAL)
        },
        signuporg(){
            const payload={...this.orgsignup}
            // console.log(payload)
            requester.ajax_request_no_tokens("/api/v1.0/create_organization","POST",true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                // console.log(result)
                requester.savetolocalstorage("access_token", result.access_token)
                requester.savetolocalstorage("refresh_token", result.refresh_token)
                requester.savetolocalstorage("user_id",result.user_id)
                requester.savetolocalstorage("employer",result.employer.employer)
                requester.savetolocalstorage("employername",result.employer.employername)
                requester.savetolocalstorage("roledisplayname",result.roles[0].roledisplayname)
                requester.savetolocalstorage("role_id",result.roles[0].role_id)
                requester.savetolocalstorage("rolename",result.roles[0].rolename)
                requester.savetolocalstorage("language_id",result.language_id)
                requester.savetolocalstorage("profile",result.profile)
                result.user_id==result.employer.employer ? this.$router.push({path:`/scaffolding/companyprofile/${result.user_id}`}) : this.$router.push({path:`/scaffolding/userprofile/${result.user_id}`})
            }).fail((jqXHR, textStatus, errorThrown)=>{
                console.log(errorThrown)
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
            })
        },
        matchusername(p1,p2){
            if(p1.includes(p2)){return true}else{return false}
        },
        minpasslength(s,minln){
            if(s.length >= minln){return true}else{return false}
        },
        alphabetcounts(s,minalpha){
            var rx = /[a-z]/gi;
            var alphamatch=s.match(rx)
            if(alphamatch == null){return false}
            else if(alphamatch != null && alphamatch != undefined){
                var alphacounts=alphamatch.length
                if (alphacounts < minalpha){return false}else{return true}
            }
        },
        numbercounts(s,minnum){
            var nrx = /[0-9]/g;
            var nmatch=s.match(nrx)
            if(nmatch == null){return false}
            else if(nmatch != null && nmatch != undefined){
                var ncounts=nmatch.length
                if(ncounts < minnum){return false}else{return true}
            }
        },
        constrainpassword(e){
            let targ = e.target.value
            let uname=this.orgsignup.logonid
            var hasuname=this.matchusername(targ,uname)
            var checkminlength=this.minpasslength(targ,this.ap_def.minpasswdlength)
            var checkminalphabetic=this.alphabetcounts(targ,this.ap_def.minalphabetic)
            var checkminnumeric=this.numbercounts(targ,this.ap_def.minnumeric)
            var msg=""
            if(hasuname){this.pw_state=false;msg="Your password cannot contain your email address or phone number.";this.pw_msg=msg;this.unclearedpass=true}
            else if(!checkminlength){this.pw_state=false;msg="Your password must contain at least "+this.ap_def.minpasswdlength+" character(s).";this.pw_msg=msg;this.unclearedpass=true;}
            else if(!checkminalphabetic){this.pw_state=false;msg="Your password must contain at least "+this.ap_def.minalphabetic+" alphabet(s).";this.pw_msg=msg;this.unclearedpass=true;}
            else if(!checkminnumeric){this.pw_state=false;msg="Your password must contain at least "+this.ap_def.minnumeric+" integer(s).";this.pw_msg=msg;this.unclearedpass=true}
            else{this.pw_state=true;this.unclearedpass=false}
        }
    }
}
</script>

<style lang="scss" scoped>
@import "node_modules/bourbon/core/bourbon";
@import "node_modules/bourbon-neat/core/neat";
.bg-default {
	background-color: #282c28 !important;
}
.main-content {
	position: relative;
}
.pt-lg-3, .py-lg-3 {
	padding-top: 3rem !important;
}
.pb-lg-3, .py-lg-3 {
	padding-bottom: 3rem !important;
}
.bg-gradient-primary {
	background: linear-gradient(87deg,#f0f7da,#c9df8a) !important;
}
.header {
	position: relative;
}
.mb-7, .my-7 {
	margin-bottom: 6rem !important;
}
.text-light {
	color: #ced4da !important;
}
.text-light-gray {
    color:#65737e;
}
.lead, p {
	font-weight: 300;
	line-height: 1.7;
}
.fill-default {
	fill: #c9df8a;
}
img, svg {
	vertical-align: middle;
}
svg {
	overflow: hidden;
}
.separator, .separator svg {
	position: absolute;
	pointer-events: none;
}
.separator-bottom svg {
	bottom: 0;
}
.separator {
	top: auto;
	left: 0;
	right: 0;
	width: 100%;
	height: 150px;
	transform: translateZ(0);
	overflow: hidden;
}
.separator, .separator svg {
	position: absolute;
	pointer-events: none;
}
.separator-bottom {
	top: auto;
	bottom: 0;
}
.separator-skew {
	height: 70px;
}
.mt--8, .my--8 {
	margin-top: -8rem !important;
}
.pb-5, .py-5 {
	padding-bottom: 3rem !important;
}
.bg-secondary {
	background-color: #f0f7da !important;
}
.border-0 {
	border: 0 !important;
}
.card-profile-image img, .shadow {
	box-shadow: 0 0 2rem 0 rgba(136,152,170,.15) !important;
}
[class*="shadow"] {
	transition: all .15s ease;
}
.bg-transparent {
	background-color: transparent !important;
}
.pb-5, .py-5 {
	padding-bottom: 3rem !important;
}
.text-muted {
	color: #8898aa !important;
}
.card-header:first-child {
	border-radius: calc(.375rem - 1px) calc(.375rem - 1px) 0 0;
}
.input-group-text {
	display: flex;
	align-items: center;
	padding: .625rem .75rem;
	margin-bottom: 0;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #adb5bd;
	text-align: center;
	white-space: nowrap;
	background-color: #fff;
	border: 1px solid #cad1d7;
	border-radius: .375rem;
}
.input-group-text {
	transition: all .2s cubic-bezier(.68,-.55,.265,1.55);
}
.input-group-alternative .form-control, .input-group-alternative .input-group-text {
	border: 0;
	box-shadow: none;
}
.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle), .input-group > .input-group-append:last-child > .input-group-text:not(:last-child), .input-group > .input-group-append:not(:last-child) > .btn, .input-group > .input-group-append:not(:last-child) > .input-group-text, .input-group > .input-group-prepend > .btn, .input-group > .input-group-prepend > .input-group-text {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.input-group-append, .input-group-prepend {
	display: flex;
}
.input-group-prepend {
	margin-right: -1px;
}
.input-group {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	width: 100%;
}
.input-group {
	border-radius: .375rem;
	transition: all .15s ease;
}
.input-group, .input-group .form-control {
	box-shadow: none;
}
.input-group-alternative {
	box-shadow: 0 1px 3px rgba(50,50,93,.15),0 1px 0 rgba(0,0,0,.02);
	border: 0;
	transition: box-shadow .15s ease;
}
</style>
