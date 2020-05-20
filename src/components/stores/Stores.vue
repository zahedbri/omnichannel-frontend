<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Store Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New Store">
                            <b-dropdown-item v-b-modal.new-store-modal>Add new store</b-dropdown-item>
                            <b-dropdown-item v-if="hostwarehouse" v-b-modal.new-warehouse-modal>Add host warehouse</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="12">
                        <b-card no-body class="mb-1">
                            <b-card-body>
                                <b-table show-empty striped hover :current-page="currentPage2" :per-page="perPage2" :items="yourstoresitems" :fields="yourstoresfields">
                                    <template v-slot:cell(image)="row">
                                        <div class="d-flex justify-content-between">
                                            <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                <img v-if="row.item.image==null" class="img-fluid rounded" :src="defaultavatar">
                                                <img v-else-if="row.item.image!=null" class="img-fluid rounded" :src="row.item.image">
                                            </a>
                                        </div>
                                    </template>
                                    <template v-slot:head(view)>
                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(view)="row">
                                        <b-button @click="storedetails(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-info-circle"></i></b-button>
                                    </template>
                                    <template v-slot:cell(address)="row">
                                        <div class="content">
                                            <span class="d-inline-block" style="font-size:1.0em;"> {{row.item.name}}</span>
                                            <span class="d-block" style="color:#555; font-size:0.8em;"> {{row.item.address}} </span>
                                        </div>
                                    </template>
                                    <template v-slot:cell(phone)="row">
                                        <span v-if="row.item.phone !=null">{{row.item.phone.replace(/ /g,'')}}</span>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-card no-body class="mb-0">
                            <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-end py-2">
                                <b-col sm="8" md="8" class="mt-1 mb-0">
                                    <div class="input-group">
                                        <b-form-input type="text" placeholder="Search..." size="sm" v-model="filter" class="form-control"></b-form-input>
                                        <div class="input-group-append">
                                            <b-button size="sm" type="button" :disabled="!filter" @click="filter = ''" class="btn btn-outline-secondary"><i class="fas fa-times-circle"></i></b-button>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="4" md="4" class="my-0 d-flex justify-content-end">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                </b-col>
                            </b-card-header>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-card no-body>
                            <b-card-body>
                                <b-table show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="allstoresitems" :fields="allstoresfields" :filter="filter" @filtered="onFiltered">
                                    <template v-slot:cell(image)="row">
                                        <div class="d-flex justify-content-between">
                                            <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                <img v-if="row.item.image==null" class="img-fluid rounded" :src="defaultavatar">
                                                <img v-else-if="row.item.image!=null" class="img-fluid rounded" :src="row.item.image">
                                            </a>
                                        </div>
                                    </template>
                                    <template v-slot:cell(address)="row">
                                        <div class="content">
                                            <span class="d-inline-block" style="font-size:1.0em;"> {{row.item.name}}</span>
                                            <span class="d-block" style="color:#555; font-size:0.8em;"> {{row.item.address}} </span>
                                        </div>
                                    </template>
                                    <template v-slot:cell(phone)="row">
                                        <span v-if="row.item.phone !=null">{{row.item.phone.replace(/ /g,'')}}</span>
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="new-warehouse-modal" size="lg" id="new-warehouse-modal" title="Host warehouse" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form @submit.prevent="submitwarehouseinfo" class="card shadow-none mb-0">
                            <b-card-body class="py-0">
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse Name</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.identifier" placeholder="Warehouse name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Address</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.address1" placeholder="Address"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Warehouse Phone</label>
                                            <b-form-input type="text" :formatter="formatPhone" size="sm" required v-model="warehouseinfo.phone1" placeholder="Phone number"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Email</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.email1" placeholder="Email address"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">City</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.city" placeholder="City"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Country</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Country" v-model="warehouseinfo.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                <datalist id="country-list">
                                                    <option>Select Country</option>
                                                    <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">State</label>
                                            <template>
                                                <b-form-input required v-model="warehouseinfo.state" placeholder="Fill &amp; Select State" size="sm" list="state-list"></b-form-input>
                                                <datalist id="state-list">
                                                    <option>Select State</option>
                                                    <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Zip Code</label>
                                            <b-form-input type="text" size="sm" v-model="warehouseinfo.zipcode" placeholder="Zip Code"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Currency</label>
                                            <template>
                                                <b-form-input @change.native="changedcurrency" required v-model="warehouseinfo.setccurr" placeholder="Fill &amp; Select Currency" size="sm" list="currency-list"></b-form-input>
                                                <datalist id="currency-list">
                                                    <option>Select Currency</option>
                                                    <option v-for="curr in currselect" :key="curr.setccurr">{{curr.description}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label mr-2">Image</label>
                                            <div class="custom-file b-form-file b-custom-control-sm">
                                                <input type="file" id="profilephoto" ref="warehousephoto" @change="previewwarehousephoto" multiple="multiple" class="custom-file-input">
                                                <label for="profilephoto" data-browse="Browse" class="custom-file-label">{{warehousephotolabelvalue}}</label>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Photo URL</label>
                                            <b-form-input type="text" readonly size="sm" v-model="warehouseinfo.photourl" placeholder="Photo URL"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Title</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.persontitle" placeholder="Contact's title e.g., Mr., Ms."></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">First name</label>
                                            <b-form-input type="text" size="sm" v-model="warehouseinfo.firstname" placeholder="Contact's First name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Middle name</label>
                                            <b-form-input type="text" size="sm" v-model="warehouseinfo.middlename" placeholder="Contact's middle name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Last name</label>
                                            <b-form-input type="text" size="sm" required v-model="warehouseinfo.lastname" placeholder="Contact's last name"></b-form-input>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                            </b-card-footer>
                        </form>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <b-modal ref="new-store-modal" size="lg" body-class="py-0" id="new-store-modal" title="Add a new store" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <div>
                            <b-card no-body class="py-0 mt-0 mb-0">
                                <b-tabs card>
                                    <b-tab no-body active>
                                        <template v-slot:title>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <span style="margin-top:2px !important;">Profile</span>
                                            </div>
                                        </template>
                                        <b-container>
                                            <b-row>
                                                <b-col cols="12" class="px-0">
                                                    <form class="card shadow-none mb-0" @submit.prevent="addnewcustomer">
                                                        <b-card-body>
                                                            <b-row>
                                                                <b-col sm="12" md="12">
                                                                    <div class="form-group mb-2">
                                                                        <label class="form-label">Organization Name</label>
                                                                        <b-form-input size="sm" type="text" v-model="customersignup.orgentityname" placeholder="Customer organization's name" required></b-form-input>
                                                                    </div>
                                                                </b-col>
                                                                <b-col sm="12" md="12">
                                                                    <div class="form-group mb-2">
                                                                        <label class="form-label">Phone Number</label>
                                                                        <b-form-input size="sm" :formatter="formatPhone" type="text" v-model="customersignup.logonid" placeholder="Customer organization's phone" required></b-form-input>
                                                                    </div>
                                                                </b-col>
                                                            </b-row>
                                                        </b-card-body>
                                                        <b-card-footer class="text-right">
                                                            <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                                        </b-card-footer>
                                                    </form>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                    </b-tab>
                                    <b-tab no-body v-for="i in storetabs" :key="'dyn-tab'+i">
                                        <template v-slot:title>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <span>New Store</span>
                                                <b-button size="sm" variant="outline-primary" class="ml-2 float-right py-0 px-1 m-0 dull-border" style="border:none !important; background:transparent !important;" @click="closeTab(i)">
                                                    <i class="mx-1 fas fa-times text-gray text-xsmall"></i></b-button>
                                            </div>
                                        </template>
                                        <form @submit.prevent="submitstoreinfo" class="card shadow-none mb-0">
                                            <b-card-body class="py-0">
                                                <b-row>
                                                    <b-col md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Owner</label>
                                                            <b-form-select size="sm" v-model="storeinfo.member_id" :options="storeorgs" required></b-form-select>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="4" md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Store Name</label>
                                                            <b-form-input type="text" size="sm" required v-model="storeinfo.identifier" placeholder="Store name"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="4" md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Address</label>
                                                            <b-form-input type="text" size="sm" required v-model="storeinfo.address1" placeholder="Address"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="4" md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Store Phone</label>
                                                            <b-form-input type="text" size="sm" required :formatter="formatPhone" v-model="storeinfo.phone1" placeholder="Phone number"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="4" md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Email</label>
                                                            <b-form-input type="text" size="sm" v-model="storeinfo.email1" placeholder="Email address"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="4" md="4">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Country</label>
                                                            <template>
                                                                <b-form-input required placeholder="Fill &amp; Select Country" v-model="storeinfo.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                                <datalist id="country-list">
                                                                    <option>Select Country</option>
                                                                    <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                                </datalist>
                                                            </template>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="3" md="3">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">State</label>
                                                            <template>
                                                                <b-form-input required v-model="storeinfo.state" placeholder="Fill &amp; Select State" size="sm" list="state-list"></b-form-input>
                                                                <datalist id="state-list">
                                                                    <option>Select State</option>
                                                                    <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                                </datalist>
                                                            </template>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="3" md="3">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">City</label>
                                                            <b-form-input type="text" required size="sm" v-model="storeinfo.city" placeholder="City"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="3" md="3">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Zip Code</label>
                                                            <b-form-input type="text" size="sm" v-model="storeinfo.zipcode" placeholder="Zip Code"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="3" md="3">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Store Currency</label>
                                                            <template>
                                                                <b-form-input required @change.native="changedcurrency" v-model="storeinfo.setccurr" placeholder="Fill &amp; Select Currency" size="sm" list="currency-list"></b-form-input>
                                                                <datalist id="currency-list">
                                                                    <option>Select Currency</option>
                                                                    <option v-for="curr in currselect" :key="curr.setccurr">{{curr.description}}</option>
                                                                </datalist>
                                                            </template>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="6" md="6">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Title</label>
                                                            <b-form-input type="text" size="sm" required v-model="storeinfo.persontitle" placeholder="Contact's title e.g., Mr., Ms."></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="6" md="6">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">First name</label>
                                                            <b-form-input type="text" size="sm" required v-model="storeinfo.firstname" placeholder="Contact's First name"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="6" md="6">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Middle name</label>
                                                            <b-form-input type="text" size="sm" v-model="storeinfo.middlename" placeholder="Contact's middle name"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                    <b-col sm="6" md="6">
                                                        <div class="form-group mb-2">
                                                            <label class="form-label">Last name</label>
                                                            <b-form-input type="text" size="sm" required v-model="storeinfo.lastname" placeholder="Contact's last name"></b-form-input>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </b-card-body>
                                            <b-card-footer class="text-right">
                                                <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                            </b-card-footer>
                                        </form>
                                    </b-tab>
                                    <template v-slot:tabs-end>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b-nav-item role="presentation" @click.prevent="newTab" href="#">
                                                <b style="margin-top:2px !important;">+</b>
                                            </b-nav-item>
                                        </div>
                                    </template>
                                    <template v-slot:empty>
                                        <div class="text-center text-muted">
                                            There are no open tabs<br>
                                            Open a new tab using the <b>+</b> button above.
                                        </div>
                                    </template>
                                </b-tabs>
                            </b-card>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{success_message}}</span>
            <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import requester from "@/services/requester"
import * as JQuery from "jquery"
import libphonenumber from "google-libphonenumber"
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

            storetabs:[],
            tabCounter:0,

            storephotolabelvalue:"No file chosen",
            warehousephotolabelvalue:"No file chosen",
            hostwarehouse:false,
            defaultavatar:requester.baseurl+'/static/profileuploads/product-default-2.png',

            ctab:0,
            activeClass:'active',
            showClass:'show',
            inactiveClass:null,

            currentPage:1,
            totalRows:null,
            perPage:6,
            filter:null,
            currentPage2:1,
            totalRows2:null,
            perPage2:2,

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
            storeorgs:[{value:null,text:"Select Organization"}],
            customersignup:{membertype:'O',memberstate:0,orgentitytype:'O',registertype:'G',
                profiletype:'C',orgentityname:null,logonid:null,logonpassword:null
            },
            storeinfo:{
                member_id:null,type:'S',setccurr:null,identifier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                ownername:requester.getfromlocalstorage("employername"),nickname:null,address1:null,
                state:null,country:null,city:null,email1:null,phone1:null,zipcode:null,firstname:null,
                middlename:null,lastname:null,persontitle:null,photourl:null,
                superowner:requester.getfromlocalstorage("employer")
            },
            warehouseinfo:{
                member_id:requester.getfromlocalstorage("user_id"),type:'S',setccurr:null,identifier:null,
                language_id:requester.getfromlocalstorage("language_id"),
                ownername:requester.getfromlocalstorage("employername"),nickname:null,address1:null,
                state:null,country:null,city:null,email1:null,phone1:null,zipcode:null,firstname:null,
                middlename:null,lastname:null,persontitle:null,photourl:null,
            },
            allstoresitems:null,
            allstoresfields:['image','address','city','state','country','email','phone','contact','type','currency'],
            yourstoresitems:null,
            yourstoresfields:['image','address','city','state','country','email','phone','contact','type','currency','view'],
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var currdata=verification.then(result=>{
            if(this.employername){this.hostwarehouse=true}
            return requester.ajax_request("/api/v1.0/list_currencies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var countrydata=currdata.then(result=>{
            this.currselect=result
            return requester.ajax_request_no_tokens("/api/v1.0/list_countries","GET",false,null)
        })
        var storeorgdata=countrydata.then(result => {
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/list_storeorgs","GET",this.ac_token,this.rf_token,false,null)
        })
        var allstores=storeorgdata.then(result => {
            result.forEach((item)=>{
                this.storeorgs.push({value:item.users_id,text:item.orgentityname})
            })
            return requester.ajax_request("/api/v1.0/read_stores","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer})
        })
        var yourstores=allstores.then(result => {
            // console.log(result)
            this.allstoresitems=result
            this.totalRows=result.length
            this.allstoresfields=['image','address','city','state','country','email','phone','contact','type','currency']
            return requester.ajax_request("/api/v1.0/your_stores","POST",this.ac_token,this.rf_token,true,{owner_id:this.employer})
        })
        yourstores.then(result => {
            // console.log(result)
            this.yourstoresitems=result
            this.totalRows2=result.length
            this.yourstoresfields=['image','address','city','state','country','email','phone','contact','type','currency','view']
        })
    },
    methods:{
        formatPhone(value){
            const PNF=libphonenumber.PhoneNumberFormat
            const phoneUtil=libphonenumber.PhoneNumberUtil.getInstance()
            const number=phoneUtil.parseAndKeepRawInput(value,'NG')
            let phoneclearance=phoneUtil.isValidNumber(number)
            if(phoneclearance){this.unclearedphone=false}
            else if(phoneclearance==false){this.unclearedphone=true}
            return phoneUtil.format(number,PNF.INTERNATIONAL)
        },
        storedetails(row){
            let idx=row.index
            let store_id=this.yourstoresitems[idx].storeent_id
            this.$router.push( {path:`/scaffolding/storedetails/${store_id}`} )
        },
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        addnewcustomer(){
            const payload={...this.customersignup}
            requester.ajax_request("/api/v1.0/_create_customer_organization","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                result.storeorgs.forEach((item)=>{
                    this.storeorgs.push({value:item.users_id,text:item.orgentityname})
                })
                console.log(result)
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        closeTab(x){
            for(let i=0; i<this.storetabs.length; i++){
                if(this.storetabs[i]===x){this.storetabs.splice(i,1)}
            }
        },
        newTab(){
            this.storetabs.push(this.tabCounter++)
        },
        submitwarehouseinfo(){
            const payload={...this.warehouseinfo}
            console.log(payload)
            requester.ajax_request("/api/v1.0/create_host_warehouse","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                console.log(result)
                this.yourstoresitems=result.your_stores
                this.totalRows2=result.length
                this.yourstoresfields=['image','address','city','state','country','email','phone','contact','type','currency','view']
                this.$refs['new-warehouse-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        previewwarehousephoto(){
            let formdata = new FormData()
            let input = this.$refs.warehousephoto.files[0]
            formdata.append("image",input)
            this.warehousephotolabelvalue=input.name
            JQuery.ajax({url:requester.baseurl+"/profileuploads",type:"POST",data:formdata,
			cache:false,processData:false,contentType:false,}).done(result => {
                this.success_message = "Successfully uploaded "+result.name+" to storage."
                this.showSnackbar = true
                this.warehouseinfo.photourl=result.url
                console.log(result)
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        call(method){
            method()
            console.log(method)
            // this[method]()
        },
        previewstorephoto(){
            let formdata = new FormData()
            let input = this.$refs.storephoto.files[0]
            formdata.append("image",input)
            this.storephotolabelvalue=input.name
            JQuery.ajax({url:requester.baseurl+"/profileuploads",type:"POST",data:formdata,
			cache:false,processData:false,contentType:false,}).done(result => {
                this.success_message = "Successfully uploaded "+result.name+" to storage."
                this.showSnackbar = true
                this.storeinfo.photourl=result.url
                console.log(result)
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
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
        },
        changedcurrency(e){
            let val=e.target.value;
            this.currselect.forEach((item)=>{
                if(item.description==val){
                    this.storeinfo.setccurr=item.setccurr
                    this.warehouseinfo.setccurr=item.setccurr
                }
            })
        },
        submitstoreinfo(){
            const payload={...this.storeinfo}
            requester.ajax_request("/api/v1.0/create_store","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                console.log(result)
                this.allstoresitems=result.allstores
                this.totalRows=result.allstores.length
                this.allstoresfields=['image','address','city','state','country','email','phone','contact','type','currency']
                // this.$refs['new-store-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>