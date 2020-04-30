<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">User Management</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New user">
                            <b-dropdown-item v-b-modal.new-staff-modal>Add new staff</b-dropdown-item>
                            <b-dropdown-item v-b-modal.new-vendor-modal>Add new vendor</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid class="mt-4">
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
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="userstableitems" :fields="userstablefields" :filter="filter" @filtered="onFiltered">
                                    <template v-slot:cell(action)="row">
                                        <div>
                                            <b-dropdown variant="primary" size="sm" right text="Manage">
                                                <b-dropdown-item v-if="!row.item.ismaster" :disabled="row.item.state==1" @click="approveuser(row)"><i class="far fa-check-circle mr-1"></i>Approve user</b-dropdown-item>
                                                <b-dropdown-item v-if="!row.item.ismaster" :disabled="row.item.state==0" @click="suspenduser(row)"><i class="far fa-times-circle mr-1"></i>Suspend user</b-dropdown-item>
                                                <b-dropdown-item v-b-modal.add-role-modal @click="beforeassignment(row)">Assign roles</b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                    </template>
                                    <template v-slot:cell(username)="row">
                                        {{ row.item.username.replace(/ +/g,"") }}
                                    </template>
                                </b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="add-role-modal" size="lg" id="add-role-modal" title="Add roles to member" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <b-card no-body class="mb-0">
                            <b-card-body class="py-0">
                                <table class="table b-table table-striped table-hover" role="table" aria-busy="false" aria-colcount="8" aria-rowcount="9">
                                    <thead>
                                        <tr>
                                            <th><i class="fas fa-minus"></i></th>
                                            <th>Member</th>
                                            <th>Role</th>
                                            <th>Organization</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(mbrroleform,index) in mbrroleforms" v-bind:key="index">
                                        <tr>
                                            <th scope="row" class="justify-content-center">
                                                <b-button class="btn-outline-dark btn-sm mr-1" size="sm" @click="removembrrole(index)" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                <b-button class="btn-outline-dark btn-sm" size="sm" @click="addmbrrole" type="button"><i class="fas fa-plus"></i></b-button>
                                            </th>
                                            <td> <b-form-select size="sm" required v-model="mbrroleform.member_id" :options="allmemberoptions"></b-form-select></td>
                                            <td> <b-form-select size="sm" require v-model="mbrroleform.role_id" :options="roleoptions"></b-form-select> </td>
                                            <td> <b-form-select size="sm" require v-model="mbrroleform.orgentity_id" :options="employeroptions"></b-form-select> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary" @click="creatembrroles" type="button"><i class="fas fa-save mr-1"></i>Save</button>
                            </b-card-footer>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <b-modal ref="new-customer-modal" size="md" id="new-customer-modal" title="Add customer organization" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewcustomer">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Organization name</label>
                                            <b-form-input size="sm" type="text" v-model="customersignup.orgentityname" placeholder="Customer organization's name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Email / Phone</label>
                                            <b-form-input size="sm" type="text" v-model="customersignup.logonid" placeholder="Customer organization's email or phone" required></b-form-input>
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
        <b-modal ref="new-vendor-modal" size="md" id="new-vendor-modal" title="Add new vendor" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewvendor">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Organization Name</label>
                                            <b-form-input size="sm" type="text" v-model="vendorsignup.orgentityname" placeholder="Vendor organization's name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Phone</label>
                                            <b-form-input size="sm" type="text" :formatter="formatPhone" v-model="vendorsignup.logonid" placeholder="Vendor organization's phone" required></b-form-input>
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
        <b-modal ref="new-staff-modal" size="md" id="new-staff-modal" title="Add new staff" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewstaff">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">First Name</label>
                                            <b-form-input size="sm" type="text" v-model="newstaff.firstname" placeholder="First name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Middle Name</label>
                                            <b-form-input size="sm" type="text" v-model="newstaff.middlename" placeholder="Middle name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Last Name</label>
                                            <b-form-input size="sm" type="text" v-model="newstaff.lastname" placeholder="Last name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Primary Contact</label>
                                            <b-form-input size="sm" type="text"  :formatter="formatPhone" v-model="newstaff.logonid" placeholder="Staff member's phone" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Employer</label>
                                            <b-form-select size="sm" v-model="newstaff.employerid" :options="employeroptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Role</label>
                                            <b-form-select size="sm" v-model="newstaff.role_id" :options="roleoptions" required></b-form-select>
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
    name:"manageusers",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            currentPage:1,
            totalRows:null,
            perPage:6,
            filter:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            userstableitems:[],
            allselected:null,
            userstablefields:["username","identifier","role","employer","phone","email","status","action"],
            mbrroleforms:[],

            employeroptions:[{value:null,text:'Select Employer'}],
            allmemberoptions:[{value:null,text:'Select Member'}],
            roleoptions:[{value:null,text:"Select Role"}],
            newstaff:{
                membertype:'U',
                memberstate:0,
                registertype:'G',
                profiletype:'B',
                firstname:null,
                middlename:null,
                lastname:null,
                logonid:null,
                employerid:null,
                role_id:null,
            },
            vendorsignup:{
                membertype:'O',
                memberstate:0,
                orgentitytype:'O',
                registertype:'G',
                profiletype:'B',
                orgentityname:null,
                logonid:null,
                logonpassword:null,
                language_id:requester.getfromlocalstorage("language_id"),
            },
            customersignup:{
                membertype:'O',
                memberstate:0,
                orgentitytype:'O',
                registertype:'G',
                profiletype:'C',
                orgentityname:null,
                logonid:null,
                logonpassword:null
            },
        }
    },
    mounted(){
        this.addmbrrole()
        this.addmbrrole()
    },
    created(){
        var usersdata=requester.ajax_request("/api/v1.0/list_all_members","GET",this.ac_token,this.rf_token,false,null)
        var rolesdata=usersdata.then(result => {
            console.log(result)
            result.forEach((item)=>{
                if(item.member.type=='O'){
                    this.allmemberoptions.push({value:item.orgentity.orgentity_id,text:item.orgentity.orgentityname})
                    this.employeroptions.push({value:item.orgentity.orgentity_id,text:item.orgentity.orgentityname})
                }else if(item.member.type=='U'){
                    this.allmemberoptions.push({value:item.member.member_id,text:item.addrbook.displayname})
                }
            })
            result.forEach((item)=>{
                if(item.member.type=='O'){
                    this.userstableitems.push(
                        {state:item.member.state,identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                }
                if(item.member.type=='U'){
                    this.userstableitems.push(
                        {state:item.member.state,identifier:item.users.field1+' '+item.users.field2+' '+item.users.field3,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                }
            })
            this.totalRows=this.userstableitems.length
            return requester.ajax_request("/api/v1.0/list_roles","POST",this.ac_token,this.rf_token,true,{language_id:1})
        }).fail((jqXHR,textStatus,errorThrown) => {
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        rolesdata.then(result => {
            result.forEach((item)=>{
                this.roleoptions.push({value:item.role_id,text:item.displayname})
            })
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
        onFiltered(filteredItems){
            this.totalRows=filteredItems.length
            this.currentPage=1
        },
        approveuser(row){
            let index=row.index
            let rowdata=this.userstableitems[index]
            let member_id=rowdata.member_id
            let status=rowdata.status
            let action="approve"
            requester.ajax_request("/api/v1.0/approve_member","POST",this.ac_token,this.rf_token,true,{member_id:member_id,action:action,status:status}).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.userstableitems=[]
                console.log(result)
                result.usersdata.forEach((item)=>{

                if(item.member.type=='O'){
                    this.userstableitems.push({state:item.member.state,identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                }
                if(item.member.type=='U'){
                    this.userstableitems.push({state:item.member.state,identifier:item.users.field1+' '+item.users.field2+' '+item.users.field3,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                }
                    // this.userstableitems.push({identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                })
            })
        },
        suspenduser(row){
            let index=row.index
            let rowdata=this.userstableitems[index]
            let member_id=rowdata.member_id
            let action="suspend"
            let status=rowdata.status
            console.log(rowdata.member_id,rowdata.status,"suspend")
            requester.ajax_request("/api/v1.0/suspend_member","POST",this.ac_token,this.rf_token,true,{member_id:member_id,action:action,status:status}).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.userstableitems=[]
                result.usersdata.forEach((item)=>{
                    if(item.member.type=='O'){
                        this.userstableitems.push({state:item.member.state,identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                    }
                    if(item.member.type=='U'){
                        this.userstableitems.push({state:item.member.state,identifier:item.users.field1+' '+item.users.field2+' '+item.users.field3,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                    }
                    // this.userstableitems.push({identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                })
            })
        },
        beforeassignment(row){
            let index=row.index
            let member_id=this.userstableitems[index].member_id
            let employerid=this.userstableitems[index].employerid
            this.mbrroleforms.forEach((item)=>{
                item.member_id=member_id
                item.orgentity_id=employerid
            })
        },
        addmbrrole(){
            this.mbrroleforms.push({
                member_id:null,
                role_id:null,
                orgentity_id:null,
            })
        },
        removembrrole(lineid){
            this.mbrroleforms.splice(lineid,1)
        },
        creatembrroles(){
            let payloadarray=[]
            this.mbrroleforms.forEach((item)=>{
                payloadarray.push({
                    member_id:item.member_id,
                    role_id:item.role_id,
                    orgentity_id:item.orgentity_id
                })
            })
            requester.ajax_request("/api/v1.0/append_roles","POST",this.ac_token,this.rf_token,true,{components:payloadarray}).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['add-role-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        addnewcustomer(){
            const payload={...this.customersignup}
            requester.ajax_request("/api/v1.0/_create_customer_organization","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.userstableitems=[]
                // console.log(result)
                result.usersdata.forEach((item)=>{
                    this.userstableitems.push({employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                })
                this.totalRows=this.userstableitems.length
                this.$refs['new-customer-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        addnewvendor(){
            const payload={...this.vendorsignup}
            requester.ajax_request("/api/v1.0/_create_vendor_organization","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.userstableitems=[]
                result.usersdata.forEach((item)=>{
                    this.userstableitems.push({state:item.member.state,identifier:item.orgentity.orgentityname,ismaster:item.ismaster,employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                })
                this.totalRows=this.userstableitems.length
                this.$refs['new-vendor-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        addnewstaff(){
            const payload={...this.newstaff}
            requester.ajax_request("/api/v1.0/create_business_user","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
                this.userstableitems=[]
                result.usersdata.forEach((item)=>{

                    if(item.member.type=='O'){
                        this.userstableitems.push(
                            {identifier:item.orgentity.orgentityname,
                            state:item.member.state,
                            ismaster:item.ismaster,
                            employerid:item.busprof.org_id,
                            member_id:item.member.member_id,
                            username:item.userreg.logonid,
                            role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                    }
                    if(item.member.type=='U'){
                        this.userstableitems.push(
                            {identifier:item.users.field1+' '+item.users.field2+' '+item.users.field3,
                            ismaster:item.ismaster,
                            state:item.member.state,
                            employerid:item.busprof.org_id,
                            member_id:item.member.member_id,
                            username:item.userreg.logonid,
                            role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                    }
                    // this.userstableitems.push({employerid:item.busprof.org_id,member_id:item.member.member_id,username:item.userreg.logonid,
                    // role:item.mbrrole[0].rolename,phone:item.address.phone1,email:item.address.email1,profile_type:item.users.profiletypestring,status:item.member.statestring,photo:item.userprof.photo,employer:item.mbrrole[0].organization})
                })
                this.totalRows=this.userstableitems.length
                this.$refs['new-staff-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
    }
}
</script>
