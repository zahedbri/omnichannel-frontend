import Vue from "vue"
import Router from "vue-router"
import Login from "./components/login/Login.vue"
import Signup from "./components/signup/Signup.vue"
import scaffolding from './components/scaffolding/scaffolding.vue'
import scaffoldingbak from './components/scaffolding/scaffoldingbak.vue'
import UserProfile from './components/userprofile/UserProfile.vue'
import CompanyProfile from './components/companyprofile/CompanyProfile.vue'
import EditCompanyProfile from './components/companyprofile/EditCompanyProfile'
import Dashboard from './components/dashboard/Dashboard.vue'
import CatalogIndex from './components/catalog/CatalogIndex.vue'
import CustomerSignup from './components/signup/CustomerSignup.vue'
import VendorSignup from './components/signup/VendorSignup.vue'
import ManageUsers from './components/usermanagement/ManageUsers.vue'
import ConfirmIdent from './components/confirmation/ConfirmIdent.vue'
import UserSignup from './components/signup/UserSignup.vue'
import Stores from './components/stores/Stores.vue'
import Trading from './components/trading/Trading.vue'
import Taxes from './components/taxes/Taxes.vue'
import Shipping from './components/shipping/Shipping.vue'
import Accounting from './components/accounting/Accounting.vue'
import Contract from './components/trading/Contract.vue'
import Account from './components/trading/Account.vue'
import StoreDetails from './components/stores/StoreDetails.vue'
import Vendor from './components/vendor/Vendor.vue'
import PODetails from './components/vendor/PODetails.vue'
import Payment from './components/payment/Payment.vue'
import Logistics from './components/logistics/Logistics.vue'
import MobileOps from './components/stores/MobileOps.vue'
import Token from './components/login/Token.vue'
import EditUserProfile from './components/userprofile/EditUserProfile.vue'
import AccountDetails from './components/accounting/AccountDetails.vue'
import Orders from './components/orders/Orders.vue'
import OrderItems from './components/orders/OrderItems.vue'

// latest
import CreditAnalytics from './components/dashboard/CreditAnalytics.vue'
import CustomerOrders from './components/customers/CustomerOrders.vue'
import CustomerOrderItems from './components/customers/CustomerOrderItems.vue'
import Coop from './components/dashboard/Coop.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:"/",
            name:"index",
            component:Login
        },
        {
            path:"/login",
            name:"login",
            component:Login
        },
        {
            path:"/token",
            name:"token",
            component:Token
        },
        {
            path:"/signup",
            name:"signup",
            component:Signup,
        },
        {
            path:"/customersignup/:token",
            name:"customersignup",
            component:CustomerSignup,
        },
        {
            path:"/vendorsignup",
            name:"vendorsignup",
            component:VendorSignup,
        },
        {
            path:'/confirmident/:token',
            name:'usersignup',
            component:UserSignup
        },
        {
            path:"/scaffolding",
            // e.g ==> /user/:id/profile
            // e.g ==> /user/:id/posts
            // e.g ==> /scaffolding/companyprofile/:id
            // name:"scaffolding",
            component:scaffolding,
            children:[
                {
                    path:'',component:Dashboard
                },
                {
                    path:'dashboard',
                    name:'dashboard',
                    component:Dashboard
                },
                {
                    path:'userprofile/:id',
                    name:"userprofile",
                    component:UserProfile,
                },
                {
                    path:"edituserprofile/:id",
                    name:"edituserprofile",
                    component:EditUserProfile
                },
                {
                    path:'editcompanyprofile/:id',
                    name:'editcompanyprofile',
                    component:EditCompanyProfile,
                },
                {
                    path:'companyprofile/:id',
                    name:"companyprofile",
                    component:CompanyProfile,
                },
                {
                    path:'catalogindex',
                    name:'catalogindex',
                    component:CatalogIndex
                },
                {
                    path:'usermanagement',
                    name:'manageusers',
                    component:ManageUsers
                },
                {
                    path:'stores',
                    name:'stores',
                    component:Stores
                },
                {
                    path:'storedetails/:store_id',
                    name:'storedetails',
                    component:StoreDetails
                },
                {
                    path:'trading',
                    name:'trading',
                    component:Trading
                },
                {
                    path:'taxes',
                    name:'taxes',
                    component:Taxes
                },
                {
                    path:'shipping',
                    name:'shipping',
                    component:Shipping
                },
                {
                    path:'chartofaccounts',
                    name:'chartofaccounts',
                    component:Accounting
                },
                {
                    path:'accountdetails/:faccount_id',
                    name:'accountdetails',
                    component:AccountDetails
                },
                {
                    path:'contract/:trading_id',
                    name:'contract',
                    component:Contract,
                },
                {
                    path:'account/:trading_id',
                    name:'account',
                    component:Account
                },
                {
                    path:'vendor',
                    name:'vendor',
                    component:Vendor
                },
                {
                    path:'podetails/:ra_id',
                    name:'podetails',
                    component:PODetails
                },
                {
                    path:'orders',
                    name:'orders',
                    component:Orders
                },
                {
                    path:'orderitems/:orders_id',
                    name:'orderitems',
                    component:OrderItems
                },
                {
                    path:'payment',
                    name:'payment',
                    component:Payment
                },
                {
                    path:'logistics',
                    name:'logistics',
                    component:Logistics
                },
                {
                    path:'mobileops',
                    name:'mobileops',
                    component:MobileOps
                },
                // latest
                {
                    path:'creditanalytics',
                    name:'creditanalytics',
                    component:CreditAnalytics
                },
                {
                    path:'customerorders/:owner_id',
                    name:'customerorders',
                    component:CustomerOrders
                },
                {
                    path:'customerorderitems/:orders_id',
                    name:'customerorderitems',
                    component:CustomerOrderItems
                },
                {
                    path:'coop',
                    name:'coop',
                    component:Coop
                }
            ]
        }
    ]
})
