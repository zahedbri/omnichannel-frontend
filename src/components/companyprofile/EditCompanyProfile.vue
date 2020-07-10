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
                                <img v-if="profileimg==null" class="card-profile-img" :src="defaultavatar">
                                <img v-else-if="profileimg!=null" class="card-profile-img" :src="profileimg">
                                <h3 class="mb-3">{{business.orgentityname}}</h3>
                                <p class="mb-4">{{business.description}}</p>
                                <button class="btn btn-outline-dark btn-sm">
                                    <i class="fas fa-edit mr-1"></i><span class="text-secondary">Edit</span>
                                </button>
                            </b-card-body>
                        </b-card>
                        <b-card no-body>
                            <b-card-body>
                                <div class="media">
                                    <span v-if="profileimg==null" :style="{backgroundImage:`url(${defaultavatar})`}" class="avatar avatar-xl mr-3"></span>
                                    <span v-else-if="profileimg!=null" :style="{backgroundImage:`url(${profileimg})`}" class="avatar avatar-xl mr-3"></span>
                                    <div class="media-body">
                                        <h4>{{ business.orgentityname }}</h4>
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
                        <b-card no-body>
                            <b-tabs v-model="tabIndex" card class="custom-tab-card">
                                <b-tab active>
                                    <template v-slot:title>
                                        <i class="fas fa-briefcase mr-1"></i>Business
                                    </template>
                                    <b-row>
                                        <b-col cols="12">
                                            <form class="card shadow-none mb-0" @submit.prevent="submitbusinessinfo">
                                                <b-card-body>
                                                    <h3 class="card-title">Edit Business Information</h3>
                                                    <b-row>
                                                        <b-col md="5">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Company name</label>
                                                                <b-form-input size="sm" type="text" v-model="business.orgentityname" placeholder="Company name" required></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="3">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Legal ID</label>
                                                                <b-form-input size="sm" type="text" v-model="business.legalid" placeholder="Registration number"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Tax ID</label>
                                                                <b-form-input size="sm" type="text" v-model="business.taxpayerid" placeholder="Tax identification"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Business category</label>
                                                                <b-form-input size="sm" type="text" v-model="business.businesscategory" placeholder="Business category"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">First Name</label>
                                                                <b-form-input size="sm" type="text" v-model="business.adminfirstname" placeholder="CEO's first name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Middle Name</label>
                                                                <b-form-input size="sm" type="text" v-model="business.adminmiddlename" placeholder="CEO's middle name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Last Name</label>
                                                                <b-form-input size="sm" type="text" v-model="business.adminlastname" placeholder="CEO's last name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col md="12">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Description</label>
                                                                <b-form-textarea :rows="1" :max-rows="6" v-model="business.description" placeholder="Brief business description"></b-form-textarea>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-body>
                                                <b-card-footer class="text-right" style="margin:0rem -1.25rem -1.25rem -1.25rem;">
                                                    <button class="btn btn-success" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                                </b-card-footer>
                                            </form>
                                        </b-col>
                                    </b-row>
                                </b-tab>
                                <b-tab>
                                    <template v-slot:title>
                                        <i class="fas fa-phone-square mr-1"></i>Contact
                                    </template>
                                    <b-row>
                                        <b-col cols="12">
                                            <form @submit.prevent="submitcontactinfo" class="card shadow-none mb-0">
                                                <b-card-body>
                                                    <h3 class="card-title">Edit Contact Information</h3>
                                                    <b-row>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Address status</label>
                                                                <b-form-select size="sm" v-model="contact.status" :options="statusselect" required></b-form-select>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Address type</label>
                                                                <b-form-select size="sm" v-model="contact.addresstype" :options="addresstypeselect" required></b-form-select>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Personal title</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.persontitle" placeholder="e.g. Mr., Ms."></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Business title</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.businesstitle" placeholder="e.g. Dr., Engr."></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">First name</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.firstname" placeholder="Contact's first name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Middle name</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.middlename" placeholder="Contact's middle name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Last name</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.lastname" placeholder="Contact's last name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Primary phone</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.phone1" placeholder="Primary phone line" required></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Alternate phone</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.phone2" placeholder="Alternate phone line"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Primary email address</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.email1" placeholder="Primary email address"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Alternate email</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.email2" placeholder="Alternate email address"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Address</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.address1" placeholder="Business address" required></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="6" md="6">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Alternate address</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.address2" placeholder="Alternate address"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="3">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Zip Code</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.zipcode" placeholder="Zip Code"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="3">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">City</label>
                                                                <b-form-input type="text" size="sm" v-model="contact.city" placeholder="City"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="3">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Country</label>
                                                                <template>
                                                                    <b-form-input placeholder="Fill &amp; Select Country" v-model="contact.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                                    <datalist id="country-list">
                                                                        <option>Select Country</option>
                                                                        <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                                    </datalist>
                                                                </template>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="3">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">State</label>
                                                                <template>
                                                                    <b-form-input v-model="contact.state" placeholder="Fill &amp; Select State" size="sm" list="state-list"></b-form-input>
                                                                    <datalist id="state-list">
                                                                        <option>Select State</option>
                                                                        <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                                    </datalist>
                                                                </template>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-body>
                                                <b-card-footer class="text-right" style="margin:0rem -1.25rem -1.25rem -1.25rem;">
                                                    <button class="btn btn-success" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                                </b-card-footer>
                                            </form>
                                        </b-col>
                                    </b-row>
                                </b-tab>
                                <b-tab>
                                    <template v-slot:title>
                                        <i class="fas fa-th-list mr-1"></i>Preferences
                                    </template>
                                    <b-row>
                                        <b-col cols="12">
                                            <form @submit.prevent="submitpreferenceinfo" class="card shadow-none mb-0">
                                                <b-card-body>
                                                    <h3 class="card-title">Additional Information</h3>
                                                    <b-row>
                                                        <b-col sm="4" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Name</label>
                                                                <b-form-input type="text" size="sm" v-model="preferences.displayname" placeholder="Name"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="4" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label mr-2">Profile Photo</label>
                                                                <div class="custom-file b-form-file b-custom-control-sm">
                                                                    <input type="file" id="profilephoto" ref="profilephoto" @change="previewprofilephoto" multiple="multiple" class="custom-file-input">
                                                                    <label for="profilephoto" data-browse="Browse" class="custom-file-label">{{profilephotolabelvalue}}</label>
                                                                </div>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="4" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Photo URL</label>
                                                                <b-form-input type="text" readonly size="sm" v-model="preferences.photo" placeholder="Photo URL"></b-form-input>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Language Preference</label>
                                                                <b-form-select size="sm" v-model="preferences.language_id" :options="languageselect"></b-form-select>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="4" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Currency Preference</label>
                                                                <template>
                                                                    <b-form-input @change.native="changedcurrency" v-model="preferences.setccurr" placeholder="Fill &amp; Select Currency" size="sm" list="currency-list"></b-form-input>
                                                                    <datalist id="currency-list">
                                                                        <option>Select Currency</option>
                                                                        <option v-for="curr in currselect" :key="curr.setccurr">{{curr.description}}</option>
                                                                    </datalist>
                                                                </template>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="3" md="4">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Comms. Preference</label>
                                                                <b-form-select size="sm" v-model="preferences.preferredcomm" :options="commspreferences"></b-form-select>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="7" md="7">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Notifications Preference</label>
                                                                <b-form-checkbox id="checkbox-1" v-model="preferences.rcvsmsnotification" name="checkbox-1" value="Yes" unchecked-value="No">
                                                                    Send me notifications via SMS &mdash; <strong>{{ preferences.rcvsmsnotification }}</strong>
                                                                </b-form-checkbox>
                                                            </div>
                                                        </b-col>
                                                        <b-col sm="5" md="5">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Lang. Preference</label>
                                                                <b-form-select size="sm" v-model="preferences.language_id" :options="languageselect"></b-form-select>
                                                            </div>
                                                        </b-col>
                                                        <b-col md="12">
                                                            <div class="form-group mb-4">
                                                                <label class="form-label">Profile Description</label>
                                                                <b-form-textarea :rows="1" :max-rows="6" v-model="preferences.description" placeholder="Brief profile description"></b-form-textarea>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-body>
                                                <b-card-footer class="text-right" style="margin:0rem -1.25rem -1.25rem -1.25rem;">
                                                    <button class="btn btn-success" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                                </b-card-footer>
                                            </form>
                                        </b-col>
                                    </b-row>
                                </b-tab>
                            </b-tabs>
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
    name:"editcompanyprofile",
    data(){
        return {
            user_id:this.$route.params.id,
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,showSnackbar:false,
            tabIndex:0,duration:4000,position:"center",

            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            profilephotolabelvalue:"No file chosen",
            defaultavatar:requester.baseurl+'/static/profileuploads/default-avatar.png',
            defaultheader:requester.baseurl+'/static/profileuploads/default-profile-header.jpg',
            profileimg:null,
            business:{
                orgentity_id:this.$route.params.id,
                orgentitytype:null,
                legalid:null,
                orgentityname:null,
                taxpayerid:null,
                businesscategory:null,
                description:null,
                adminfirstname:null,
                adminmiddlename:null,
                adminlastname:null
            },
            addresstypeselect:[{value:null,text:"Select Type"},{value:'S',text:'Shipping Address'},{value:'B',text:'Billing Address'},
            {value:'SB',text:'Shipping & Billing'}],
            statusselect:[{value:null,text:'Select Status'},{value:'P',text:'Permanent / Current'},{value:'T',text:'Temporary Address'}],
            countryselect:[],
            stateselect:[],
            selectedcountry:null,
            languageselect:[{value:null,text:"Select Language"}],
            currselect:[],
            commspreferences:[{value:null,text:"Select"},{value:"P1",text:"First Phone Number"},
            {value:"P2",text:"Second Phone Number"},{value:"E1",text:"First Email Address"},
            {value:"E2",text:"Second Email Address"}],
            contact:{
                address_id:null,
                member_id:this.$route.params.id,
                displayname:null,
                description:null,
                addresstype:'SB',
                addrbook_id:null,
                status:'P',
                orgname:null,
                isprimary:1,
                lastname:null,
                persontitle:null,
                firstname:null,
                middlename:null,
                businesstitle:null,
                phone1:null,
                phone2:null,
                address1:null,
                nickname:null,
                address2:null,
                city:null,
                state:null,
                country:null,
                zipcode:null,
                email1:null,
                email2:null
            },
            preferences:{
                users_id:this.$route.params.id,
                language_id:null,
                setccurr:null,
                photo:null,
                description:null,
                displayname:null,
                preferredcomm:'P1',
                rcvsmsnotification:"Yes",
                registertype:null,
                status:"not_accepted",
                dn:null,
                profiletype:null,
            },
            secure:{},
            smsvalues:[null,0,1]
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var readorg=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/read_organization","POST",this.ac_token,this.rf_token,true,{logonid:this.user_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var countryselect=readorg.then(result=>{
            // console.log(result)
            this.business.legalid=result.orgentity.legalid
            this.business.orgentityname=result.orgentity.orgentityname
            this.contact.orgname=result.orgentity.orgentityname
            this.contact.nickname=result.orgentity.orgentityname
            this.business.taxpayerid=result.orgentity.taxpayerid
            this.business.businesscategory=result.orgentity.businesscategory
            this.business.description=result.orgentity.description
            this.business.adminfirstname=result.orgentity.adminfirstname
            this.business.adminmiddlename=result.orgentity.adminmiddlename
            this.business.adminlastname=result.orgentity.adminlastname
            this.business.orgentitytype=result.orgentity.orgentitytype

            this.contact.address_id=result.address.address_id
            this.contact.addrbook_id=result.addrbook.addrbook_id
            this.contact.displayname=result.addrbook.displayname
            this.contact.description=result.addrbook.description
            this.contact.addresstype=result.address.addresstype
            this.contact.status=result.address.status
            this.contact.orgname=result.address.orgname
            this.contact.isprimary=result.address.isprimary==null ? 1 : result.address.isprimary
            this.contact.lastname=result.address.lastname
            this.contact.persontitle=result.address.persontitle
            this.contact.firstname=result.address.firstname
            this.contact.middlename=result.address.middlename
            this.contact.businesstitle=result.address.businesstitle
            this.contact.phone1=result.address.phone1
            this.contact.phone2=result.address.phone2
            this.contact.address1=result.address.address1
            this.contact.city=result.address.city
            this.contact.state=result.address.state
            this.contact.country=result.address.country
            this.contact.zipcode=result.address.zipcode
            this.contact.email1=result.address.email1
            this.contact.email2=result.address.email2

            this.preferences.displayname=result.orgentity.orgentityname
            this.preferences.photo=result.userprof.photo
            this.profileimg=result.userprof.photo
            this.preferences.description=result.userprof.description
            this.preferences.preferredcomm=result.userprof.preferredcomm
            this.preferences.rcvsmsnotification=result.userprof.rcvsmsnotification == 0 ? "No" : "Yes"
            this.preferences.setccurr=result.users.setccurr
            this.preferences.language_id=result.users.language_id
            this.preferences.registertype=result.users.registertype
            this.preferences.dn=result.users.dn
            this.preferences.profiletype=result.users.profiletype
            return requester.ajax_request_no_tokens("/api/v1.0/list_countries","GET",false,null)
        })
        var langselect=countryselect.then(result => {
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
            return requester.ajax_request_no_tokens("/api/v1.0/list_languages","GET",false,null)
        })
        var currencyselect=langselect.then(result => {
            result.forEach((item)=>{
                this.languageselect.push({value:item.language_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/list_currencies","POST",this.ac_token,this.rf_token,true,{language_id:1})
        })
        currencyselect.then(result => {
            // console.log(result)
            this.currselect=result
        }).fail((jqXHR,textStatus,errorThrown) => {
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
    },
    methods:{
        submitsecureinfo(){
            const payload={...this.secure}
            console.log(payload)
        },
        submitpreferenceinfo(){
            const payload={...this.preferences}
            requester.ajax_request("/api/v1.0/update_preferences","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitcontactinfo(){
            const payload={...this.contact}
            requester.ajax_request("/api/v1.0/update_address","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitbusinessinfo(){
            const payload={...this.business}
            requester.ajax_request("/api/v1.0/update_orgentity","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.tabIndex+1
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        previewprofilephoto(){
            let formdata = new FormData()
            let input = this.$refs.profilephoto.files[0]
            formdata.append("image",input)
            this.profilephotolabelvalue=input.name
            JQuery.ajax({url:requester.baseurl+"/profileuploads",type:"POST",data:formdata,
			cache:false,processData:false,contentType:false,}).done(result => {
                this.success_message = "Successfully uploaded "+result.name+" to storage."
                this.showSnackbar = true
                this.preferences.photo=result.url
                this.profileimg=result.url
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedcurrency(e){
            let val=e.target.value;
            this.currselect.forEach((item)=>{
                if(item.description==val){
                    this.preferences.setccurr=item.setccurr
                }
            })
        },
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
        }
    }
}
</script>

<style lang="scss" scoped>
</style>