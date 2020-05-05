<template>
    <div class="wrapper">
        <nav class="side-navbar" :class="{shrink:shrinkClass}">
            <div class="side-navbar-wrapper">
                <!-- Sidebar Header -->
                <div class="sidenav-header d-flex align-items-center justify-content-center">
                    <!-- User Info -->
                    <div class="sidenav-header-inner text-center">
                        <img src="../../assets/default-avatar.png" alt="default person" class="img-fluid rounded-circle">
                        <h2 class="h5">User Identity</h2><span>Primary Role</span>
                    </div>
                    <!-- Small Brand information, appears on minimized sidebar -->
                    <div class="sidenav-header-logo">
                        <a href="#" class="brand-small text-center"><strong>PRONOV</strong><strong class="text-primary"></strong></a>
                    </div>
                </div>
                <!-- Sidebar Navigation menus -->
                <div class="main-menu">
                    <h5 class="sidenav-heading">Main</h5>
                    <ul id="side-main-menu" class="side-menu list-unstyled">
                        <li class="c-pointer"><a><i class="fas fa-th-large mr-1"></i>Dashboard</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/usermanagement')"><i class="fas fa-users-cog mr-1"></i>Members</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/stores')"><i class="fas fa-store mr-1"></i>Stores</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/trading')"><i class="fas fa-handshake mr-1"></i>Trading</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/catalogindex')"><i class="fas fa-boxes mr-1"></i>Catalog</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/vendor')"> <i class="fas fa-dolly mr-1"></i>Vendors</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/payment')"> <i class="fab fa-cc-amazon-pay mr-1"></i>Payment</a></li>
                        <li class="c-pointer"><a @click="gotopath('/scaffolding/chartofaccounts')"><i class="fas fa-book mr-1"></i>Reports</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="page" :class="{active:shrinkClass}">
            <header class="header sticky-top">
                <nav class="navbar">
                    <b-container fluid>
                        <div class="navbar-holder d-flex align-items-center justify-content-between">
                            <div class="navbar-header">
                                <a id="toggle-btn" @click.prevent="activatesidebar" href="#" class="menu-btn"><i class="fas fa-bars"></i></a>
                                <a href="#" class="navbar-brand">
                                    <div class="brand-text d-none d-md-inline-block">
                                        <span class="mr-1">PRONOV &mdash;</span>
                                        <strong class="text-primary">Dashboard</strong>
                                    </div>
                                </a>
                            </div>
                            <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                <!-- Notifications dropdown -->
                                <li class="nav-item dropdown">
                                    <a id="notifications" rel=nofollow data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link">
                                        <i class="fas fa-bell"></i>
                                        <span class="badge badge-warning">0</span>
                                    </a>
                                </li>
                                <!-- Messages dropdown -->
                                <li class="nav-item dropdown">
                                    <a id="messages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link">
                                        <i class="fas fa-envelope"></i>
                                        <span class="badge badge-info">0</span>
                                    </a>
                                </li>
                                <!-- User dropdown -->
                                <li class="nav-item dropdown">
                                    <a id="user" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="nav-link">
                                        <i class="fas fa-user"></i>
                                        <span class="badge badge-info">User</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link logout">
                                        <span class="d-none d-sm-inline-block">Logout</span>
                                        <i class="fas fa-sign-out-alt"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </b-container>
                </nav>
            </header>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name:"scaffolding",
    data(){
        return {
            shrinkClass:true,
        }
    },
    methods:{
        gotopath(pth){
            this.$router.push( {path:pth} )
        },
        activatesidebar(){this.shrinkClass=!this.shrinkClass}
    }
}
</script>
<style lang="scss" scoped>
</style>