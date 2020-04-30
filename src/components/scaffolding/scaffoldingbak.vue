<template>
    <div class="wrapper">
        <nav id="sidebar" :class="{active:activeclass}">
            <div class="sidebar-header">
                <h3 class="text-center">Pronov.Co</h3>
            </div>
            <ul class="list-unstyled components">
                <p class="text-center">Business Management</p>
                <li class="active">
                    <b-button class="p-0" variant="link" v-b-toggle.collapse-home><i class="fas fa-globe mr-2"></i> Dashboard</b-button>
                    <!-- <b-collapse id="collapse-home">
                        <ul class="list-unstyled">
                            <li><a href="#">Home 1</a></li>
                            <li><a href="#">Home 2</a></li>
                            <li><a href="#">Home 3</a></li>
                            <li><a href="#">Home 4</a></li>
                        </ul>
                    </b-collapse> -->
                </li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-users mr-2"></i>Members</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-store mr-2"></i>Stores</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-industry mr-2"></i>Vendors</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-boxes mr-2"></i>Inventory</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-comments-dollar mr-2"></i>Marketing</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fab fa-cc-amazon-pay mr-2"></i>Payment</b-button></li>
                <li><b-button variant="link" class="p-0"><i class="fas fa-book mr-2"></i>Accounting</b-button></li>
            </ul>
        </nav>
        <div id="content">
            <b-navbar sticky toggleable="lg" type="light" variant="faded">
                <b-navbar-brand href="#">
                    <b-button :pressed="true" @click.prevent="activatesidebar" id="sidebarCollapse" variant="success">
                        <i class="fas fa-bars"></i>
                    </b-button>
                </b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Link</b-nav-item>
                        <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">

                        <b-nav-form>
                            <b-form-input size="sm" class="search-form form-control mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="btn-floating my-2 my-sm-0" type="submit">
                                <i class="fas fa-search"></i>
                            </b-button>
                        </b-nav-form>

                        <b-nav-item-dropdown text="Lang" right>
                            <b-dropdown-item href="#">EN</b-dropdown-item>
                            <b-dropdown-item href="#">ES</b-dropdown-item>
                            <b-dropdown-item href="#">RU</b-dropdown-item>
                            <b-dropdown-item href="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown right>
                            <template slot="button-content"><em>User</em></template>
                            <b-dropdown-item @click.prevent="gotoprofile">Profile</b-dropdown-item>
                            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>

                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import requester from "@/services/requester"
export default {
    name:"scaffoldingbak",
    data(){
        return {
            activeclass:false,
            user_id:requester.getfromlocalstorage("user_id"),
            org_id:null,
            profiletype:requester.getfromlocalstorage("user_id")==requester.getfromlocalstorage("employer") ? 'companyprofile' : 'userprofile',
        }
    },
    created(){
        // var userid=requester.ajax_request("/api/v1.0/useridentity","GET",this.ac_token,this.rf_token,false,null)
        // userid.then(result => {
        //     this.useridentity=result
        //     this.user_id=result.user.user_id
        //     this.org_id=result.user.employer.employer
        //     result.user.user_id == result.user.employer.employer ? this.profiletype='companyprofile' : this.profiletype='userprofile'
        // })
    },
    methods: {
        activatesidebar(){this.activeclass=!this.activeclass},
        gotoprofile(){ this.$router.push({path:`/scaffolding/${this.profiletype}/${this.user_id}`}) }
    }
}
</script>
<style lang="scss" scoped>
</style>