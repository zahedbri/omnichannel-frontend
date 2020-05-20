<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex align-items-center justify-content-between">
                    <h1 class="breadcrumb">Procurement Contract</h1>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <b-row>
                    <b-col cols="12" class="mt-2 mr-auto ml-auto">
                        <b-card no-body class="mb-0" style="border-bottom:1px solid #e9ecef;">
                            <b-card-body>
                                <b-row class="d-flex align-items-center justify-content-between">
                                    <b-col cols="6" class="d-flex align-items-center justify-content-start">
                                        <div>
                                            <h4 class="card-title text-small font-weight-bold mb-1">{{contractowner==null ? "Not Set" : contractowner}} &mdash; {{contractparticipant==null ? "Not Set" : contractparticipant}}</h4>
                                            <p class="card-text text-xsmall">{{contractname}} &mdash; {{created_on==null ? new Date().toLocaleString() : created_on}} </p>
                                        </div>
                                    </b-col>
                                    <b-col cols="6" class="d-flex align-items-center justify-content-end">
                                        <span class="p-2" style="background:rgba(245,245,220,0.6) !important;">Account ID: {{contractcode}}</span>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                        </b-card>
                        <div>
                            <b-card no-body>
                                <b-tabs card>
                                    <b-tab active>
                                        <template v-slot:title>
                                            <i class="fas fa-info-circle mr-1"></i> Overview
                                        </template>
                                        <b-row>
                                            <b-col cols="12">
                                                <b-card no-body class="border-0 shadow-none mb-0">
                                                    <b-card-header style="background:transparent" class="p-2 d-flex align-items-center justify-content-between">
                                                        <h4 class="text-xsmall">Overview</h4>
                                                        <div>
                                                            <b-button @click="approvecontract" class="border-0 m-0 mr-2 btn btn-outline-dark btn-sm" variant="link"><i class="fas fa-play mr-1"></i>Approve</b-button>
                                                            <b-button @click="suspendcontract" class="border-0 m-0 mr-2 btn btn-outline-dark btn-sm" variant="link"><i class="fas fa-pause mr-1"></i>Suspend</b-button>
                                                            <b-button @click="deploycontract" class="border-0 m-0 mr-2 btn btn-outline-dark btn-sm" variant="link"><i class="fas fa-paper-plane mr-1"></i>Deploy</b-button>
                                                            <!-- <b-dropdown right text="Actions" variant="link" class="m-0">
                                                                <b-dropdown-item disabled v-b-modal.new-contract-modal href="#">Create Contract</b-dropdown-item>
                                                                <b-dropdown-item v-b-modal.edit-contract-modal href="#">Edit Contract</b-dropdown-item>
                                                            </b-dropdown> -->
                                                        </div>
                                                    </b-card-header>
                                                </b-card>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-card no-body class="border-0 shadow-none">
                                                    <b-card-body>
                                                        <ul class="list-group list-group-flush">
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Contract ID:</span><span class="text-xsmall ml-1 force-inline"> {{contractcode}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Contract Status:</span><span class="text-xsmall ml-1 force-inline"> {{contractstatus}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Owner:</span><span class="text-xsmall ml-1 force-inline"> {{contractowner}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Begining At:</span><span class="text-xsmall ml-1 force-inline"> {{contractstart}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Ending At:</span><span class="text-xsmall ml-1 force-inline"> {{contractend}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Desc. Language:</span><span class="text-xsmall ml-1 force-inline"> {{contractlanguage}}</span>
                                                            </li>
                                                        </ul>
                                                    </b-card-body>
                                                </b-card>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-card no-body class="border-0 shadow-none">
                                                    <b-card-body>
                                                        <ul class="list-group list-group-flush">
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Trading State:</span><span class="text-xsmall ml-1 force-inline"> {{tradingstate}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Contract Origin:</span><span class="text-xsmall ml-1 force-inline"> {{contractorigin}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Participant:</span><span class="text-xsmall ml-1 force-inline"> {{contractparticipant==null ? "Not Set" : contractparticipant}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Comment:</span><span class="text-xsmall ml-1 force-inline">{{contractcomment}}</span>
                                                            </li>
                                                        </ul>
                                                    </b-card-body>
                                                </b-card>
                                            </b-col>
                                            <b-col cols="4">
                                                <b-card no-body class="border-0 shadow-none">
                                                    <b-card-body>
                                                        <ul class="list-group list-group-flush">
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Participant Is:</span><span class="text-xsmall ml-1 force-inline"> {{participantrole==null ? "Not Set" : participantrole}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Credit Allowed:</span><span class="text-xsmall ml-1 force-inline"> {{creditallowed}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Approved On:</span><span class="text-xsmall ml-1 force-inline"> {{contractapprovedon}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Deployed On:</span><span class="text-xsmall ml-1 force-inline"> {{contractdeployedon}}</span>
                                                            </li>
                                                            <li class="list-group-item" style="border: none !important;">
                                                                <span class="strongclass text-gray text-xsmall mr-1">Activated On:</span><span class="text-xsmall ml-1 force-inline">{{contractactivatedon}}</span>
                                                            </li>
                                                        </ul>
                                                    </b-card-body>
                                                </b-card>
                                            </b-col>
                                        </b-row>
                                    </b-tab>
                                    <b-tab>
                                        <template v-slot:title>
                                            <i class="fas fa-tags mr-1"></i> Pricing
                                        </template>
                                        <div>
                                            <b-tabs @input="changedpricingtabs" content-class="mt-0" small align="start">
                                                <b-tab title="Offer Pricing">
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="4">
                                                                        <span class="text-dark text-xsmall">Set catalog-wide markup for the sales prices.</span>
                                                                    </b-col>
                                                                    <b-col sm="8">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="3" class="pl-0 pr-1">
                                                                                <b-form-select @change="productsforcatalog('Offer Price',$event)" size="sm" v-model="catalog_id" :options="catalogoptions" required></b-form-select>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0 pr-1">
                                                                                <b-form-input placeholder="% MarkUp" type="number" step="0.1" v-model="markup" size="sm"></b-form-input>
                                                                            </b-col>
                                                                            <b-col sm="2" class="d-flex justify-content-start align-items-center pl-0">
                                                                                <b-button @click="applymarkup" :disabled="markup==null" variant="success" v-b-tooltip.hover title="Apply" size="sm" class="mr-1" type="button"><i class="fas fa-check"></i></b-button>
                                                                                <b-button @click="submitoffers" :disabled="markup==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage" :per-page="perPage" :items="catentryitems" :fields="catentryfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(offer)="row">
                                                                    <span v-if="row.item.offer != null">{{row.item.symbol}}{{row.item.offer}}</span>
                                                                    <span v-else-if="row.item.offer==null">Unavailable</span>
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <b-button @click="removeitem(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>
                                                    </b-card>
                                                </b-tab>
                                                <b-tab title="Custom Price List">
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="5">
                                                                        <span class="text-dark text-xsmall">Select an item and set a custom price different from the base and offer prices.</span>
                                                                    </b-col>
                                                                    <b-col sm="7">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="3" class="pl-0 pr-1">
                                                                                <template>
                                                                                    <b-form-input required @change.native="selecteditem" placeholder="Type &amp; Select Item" v-model="catitem" size="sm" list="cat-list"></b-form-input>
                                                                                    <datalist id="cat-list">
                                                                                        <option>Select Item</option>
                                                                                        <option v-for="catentry in catlist" :key="catentry.catentry_id">{{catentry.name}}</option>
                                                                                    </datalist>
                                                                                </template>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0 pr-1">
                                                                                <b-form-input placeholder="Custom Price" type="number" step="0.10" v-model="customprice" size="sm"></b-form-input>
                                                                            </b-col>
                                                                            <b-col sm="2" class="d-flex justify-content-start align-items-center pl-0">
                                                                                <b-button @click="applycustomprice" :disabled="customprice==null" variant="success" v-b-tooltip.hover title="Apply" size="sm" class="mr-1" type="button"><i class="fas fa-check"></i></b-button>
                                                                                <b-button @click="submitcustomprices" :disabled="customprice==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage2" :total-rows="totalRows2" :per-page="perPage2" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage2" :per-page="perPage2" :items="customitems" :fields="customfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button @click="removecustomitem(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <b-button @click="editcustomitem(row)" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(offer)="row">
                                                                    <span v-if="row.item.offer ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.offer !=null">{{row.item.symbol}}{{row.item.offer}}</span>
                                                                </template>
                                                                <template v-slot:cell(custom)="row">
                                                                    <span v-if="row.item.custom ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.custom !=null">{{row.item.symbol}}{{row.item.custom}}</span>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>
                                                    </b-card>
                                                </b-tab>
                                                <!-- <b-tab title="Category Discount">
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="5">
                                                                        <span class="text-dark text-xsmall">Select a category and apply a discount to all of its items.</span>
                                                                    </b-col>
                                                                    <b-col sm="7">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="3" class="pl-0 pr-1">
                                                                                <template>
                                                                                    <b-form-select @change="selectedcatgroup" size="sm" v-model="category_id" :options="categories" required></b-form-select>
                                                                                </template>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0 pr-1">
                                                                                <b-form-select size="sm" v-model="calcode_id" :options="calcodes" required></b-form-select>
                                                                            </b-col>
                                                                            <b-col sm="2" class="d-flex justify-content-start align-items-center pl-0">
                                                                                <b-button @click="applycategorydiscount" :disabled="calcode_id==null" variant="success" v-b-tooltip.hover title="Apply" size="sm" class="mr-1" type="button"><i class="fas fa-check"></i></b-button>
                                                                                <b-button @click="submitcategorydiscount" :disabled="calcode_id==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage3" :total-rows="totalRows3" :per-page="perPage3" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage3" :per-page="perPage3" :items="catgroupitems" :fields="catgroupfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled @click="removecustomitem(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <b-button disabled @click="editcustomitem" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(offer)="row">
                                                                    <span v-if="row.item.offer ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.offer !=null">{{row.item.symbol}}{{row.item.offer}}</span>
                                                                </template>
                                                                <template v-slot:cell(custom)="row">
                                                                    <span v-if="row.item.custom ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.custom !=null">{{row.item.custom}}</span>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>                                                        
                                                    </b-card>
                                                </b-tab> -->
                                                <b-tab title="Item Discount">
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="5">
                                                                        <span class="text-dark text-xsmall">Attach a pre-defined discount to an inventory item.</span>
                                                                    </b-col>
                                                                    <b-col sm="7">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="3" class="pl-0 pr-1">
                                                                                <template>
                                                                                    <b-form-input required @change.native="selectedinvitem" placeholder="Type &amp; Select Item" v-model="invitem" size="sm" list="item-list"></b-form-input>
                                                                                    <datalist id="item-list">
                                                                                        <option>Select Item</option>
                                                                                        <option v-for="catentry in catlist" :key="catentry.catentry_id">{{catentry.name}}</option>
                                                                                    </datalist>
                                                                                </template>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0 pr-1">
                                                                                <b-form-select size="sm" v-model="invcalcode_id" :options="calcodes" required></b-form-select>
                                                                            </b-col>
                                                                            <b-col sm="2" class="d-flex justify-content-start align-items-center pl-0">
                                                                                <b-button @click="applyitemdiscount" :disabled="invcalcode_id==null" variant="success" v-b-tooltip.hover title="Apply" size="sm" class="mr-1" type="button"><i class="fas fa-check"></i></b-button>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage4" :total-rows="totalRows4" :per-page="perPage4" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>                                                                            
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage4" :per-page="perPage4" :items="invitems" :fields="invfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <b-button disabled class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button @click="removeitemdiscount(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                        <!-- <b-button disabled @click="editcustomitem" class="dull-border2" variant="outline-secondary" type="button"><i class="fas fa-pencil-alt"></i></b-button> -->
                                                                        <b-button @click="submititemdiscount" :disabled="invcalcode_id==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(offer)="row">
                                                                    <span v-if="row.item.offer ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.offer !=null">{{row.item.symbol}}{{row.item.offer}}</span>
                                                                </template>
                                                                <template v-slot:cell(discount)="row">
                                                                    <span v-if="row.item.discount ==null">Unavailable</span>
                                                                    <span v-else-if="row.item.discount !=null">{{row.item.discount}}</span>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>
                                                    </b-card>
                                                </b-tab>
                                            </b-tabs>
                                        </div>
                                    </b-tab>
                                    <b-tab>
                                        <template v-slot:title>
                                            <i class="fas fa-boxes mr-1"></i>Products
                                        </template>
                                        <div>
                                            <b-tabs content-class="mt-0" small align="start">
                                                <b-tab title="Exclude Items" active>
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="5">
                                                                        <span class="text-dark text-xsmall">Under this contract, the following items will be unavailable for sale.</span>
                                                                    </b-col>
                                                                    <b-col sm="7">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="5" class="pl-0 pr-1 d-flex justify-content-start align-items-center">
                                                                                <template>
                                                                                    <b-form-input required @change.native="selectedexclusionitem" placeholder="Type &amp; Select Item" v-model="exclusionitem" size="sm" list="cat-list"></b-form-input>
                                                                                    <datalist id="cat-list">
                                                                                        <option>Select Item</option>
                                                                                        <option v-for="catentry in catlist" :key="catentry.catentry_id">{{catentry.name}}</option>
                                                                                    </datalist>
                                                                                </template>
                                                                                <b-button :disabled="exclusionitem==null" class="mr-1" variant="success" v-b-tooltip.hover title="Apply" size="sm" type="button"><i class="fas fa-check"></i></b-button>
                                                                                <b-button @click="submitproductexclusions" :disabled="exclusionitem==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage5" :total-rows="totalRows5" :per-page="perPage5" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage5" :per-page="perPage5" :items="exclusionitems" :fields="exclusionfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button @click="removeexclusionitem(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>
                                                    </b-card>
                                                </b-tab>
                                                <b-tab title="Exclude Categories">
                                                    <b-card no-body class="shadow-none">
                                                        <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                            <b-container fluid class="px-0">
                                                                <b-row>
                                                                    <b-col sm="5">
                                                                        <span class="text-dark text-xsmall">Items in the selected category will not be available for sale.</span>
                                                                    </b-col>
                                                                    <b-col sm="7">
                                                                        <b-row class="d-flex justify-content-end align-items-center">
                                                                            <b-col sm="4" class="pl-0 pr-1 d-flex justify-content-start align-items-center">
                                                                                <b-button @click="submitcategoryexclusion" :disabled="excategory_id==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                                <template>
                                                                                    <b-form-select @change="selectexcludedcatgroup" size="sm" v-model="excategory_id" :options="categories" required></b-form-select>
                                                                                </template>
                                                                            </b-col>
                                                                            <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                                <b-pagination v-model="currentPage6" :total-rows="totalRows6" :per-page="perPage6" size="sm" class="my-0"></b-pagination>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card-header>
                                                        <b-card-body>
                                                            <b-table show-empty bordered striped hover :current-page="currentPage6" :per-page="perPage6" :items="excatgroupitems" :fields="excatgroupfields">
                                                                <template v-slot:cell(price)="row">
                                                                    {{row.item.symbol}}{{row.item.price}}
                                                                </template>
                                                                <template v-slot:cell(category)="row">
                                                                    {{row.item.category}}
                                                                </template>
                                                                <template v-slot:head(_)>
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                                <template v-slot:cell(_)="row">
                                                                    <div class="d-flex align-items-center justify-content-center">
                                                                        <b-button @click="includecategoryitem(row)" class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                                    </div>
                                                                </template>
                                                            </b-table>
                                                        </b-card-body>                                                        
                                                    </b-card>
                                                </b-tab>
                                            </b-tabs>
                                        </div>
                                    </b-tab>
                                    <b-tab>
                                        <template v-slot:title>
                                            <i class="fas fa-shipping-fast mr-1"></i>Shipping
                                        </template>
                                        <b-card no-body class="shadow-none">
                                            <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                <b-container fluid class="px-0">
                                                    <b-row>
                                                        <b-col sm="5"><span class="text-dark text-xsmall">The shipping (delivery) methods available under this contract.</span></b-col>
                                                        <b-col sm="7">
                                                            <b-row class="d-flex justify-content-end align-items-center">
                                                                <b-col sm="4" class="pl-0 pr-1 d-flex justify-content-start align-items-center">
                                                                    <b-button @click="submitshipmethodpreferences" :disabled="shipmethod_id==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                    <template>
                                                                        <b-form-select @change="changeselectedshipmethod" size="sm" v-model="shipmethod_id" :options="shipmethodoptions" required></b-form-select>
                                                                    </template>
                                                                </b-col>
                                                                <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                    <b-pagination v-model="currentPage8" :total-rows="totalRows8" :per-page="perPage8" size="sm" class="my-0"></b-pagination>
                                                                </b-col>
                                                            </b-row>
                                                        </b-col>
                                                    </b-row>
                                                </b-container>
                                            </b-card-header>
                                            <b-card-body>
                                                <b-table bordered show-empty striped hover :current-page="currentPage8" :per-page="perPage8" :items="shippolicytcitems" :fields="shippolicytcfields">
                                                    <template v-slot:head(_)>
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(_)>
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <b-button class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                    <b-tab>
                                        <template v-slot:title>
                                            <i class="fas fa-money-check-alt mr-1"></i>Payment
                                        </template>
                                        <b-card no-body class="shadow-none">
                                            <b-card-header class="py-1 px-0 d-flex justify-content-between align-items-center" style="background:#fff !important;">
                                                <b-container fluid class="px-0">
                                                    <b-row>
                                                        <b-col sm="5"><span class="text-dark text-xsmall">The payment methods available under this contract.</span></b-col>
                                                        <b-col sm="7">
                                                            <b-row class="d-flex justify-content-end align-items-center">
                                                                <b-col sm="4" class="pl-0 pr-1 d-flex justify-content-start align-items-center">
                                                                    <b-button @click="submitpaymethodpreferences" :disabled="paymethod_id==null" variant="success" v-b-tooltip.hover title="Save" size="sm" type="button"><i class="fas fa-save"></i></b-button>
                                                                    <template>
                                                                        <b-form-select @change="changeselectedpaymethod" size="sm" v-model="paymethod_id" :options="paymethodoptions" required></b-form-select>
                                                                    </template>
                                                                </b-col>
                                                                <b-col sm="3" class="d-flex justify-content-end pl-0">
                                                                    <b-pagination v-model="currentPage7" :total-rows="totalRows7" :per-page="perPage7" size="sm" class="my-0"></b-pagination>
                                                                </b-col>
                                                            </b-row>
                                                        </b-col>
                                                    </b-row>
                                                </b-container>
                                            </b-card-header>
                                            <b-card-body>
                                                <b-table bordered show-empty striped hover :current-page="currentPage7" :per-page="perPage7" :items="paypolicytcitems" :fields="paypolicytcfields">
                                                    <template v-slot:head(_)>
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <b-button disabled class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(_)>
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <b-button class="dull-border2 mr-1" variant="outline-secondary" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                </b-tabs>
                            </b-card>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="new-contract-modal" size="lg" id="new-contract-modal" title="New Procurement Contract" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="setcontractprofile">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Contract Name</label>
                                            <b-form-input size="sm" type="text" v-model="contract.name" placeholder="Contract Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Owner</label>
                                            <b-form-select size="sm" v-model="contract.member_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Participant</label>
                                            <b-form-select @change.native="setparticipant" size="sm" v-model="contract.participant_id" :options="orglist" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Usage</label>
                                            <b-form-select size="sm" v-model="contract.usage" :options="usageoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Starting At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="contract.starttime" placeholder="Initiation Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Ending At</label>
                                            <b-form-datepicker size="sm" type="text" v-model="contract.endtime" placeholder="Termination Date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Comment</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="contract.comment" placeholder="Comment / Brief Description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <b-button variant="success" type="submit"><i class="fas fa-save mr-1"></i>Save</b-button>
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
import "bootstrap/dist/css/bootstrap.css"
import requester from "@/services/requester"
export default {
    name:"newcontract",
    data(){
        return {
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",

            currentPage:1,totalRows:null,perPage:6,filter:null,
            currentPage2:1,totalRows2:null,perPage2:6,filter2:null,
            currentPage3:1,totalRows3:null,perPage3:6,filter3:null,
            currentPage4:1,totalRows4:null,perPage4:6,filter4:null,
            currentPage5:1,totalRows5:null,perPage5:6,filter5:null,
            currentPage6:1,totalRows6:null,perPage6:6,filter6:null,
            currentPage7:1,totalRows7:null,perPage7:6,filter7:null,
            currentPage8:1,totalRows8:null,perPage8:6,filter8:null,

            trading_id:this.$route.params.trading_id,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            contractcode:null,
            orglist:[{value:null,text:"Select Organization"}],
            usageoptions:[{value:null,text:"Select Usage"}],
            contractorigin:"Not Set",
            contractstatus:"Not Set",
            disableSuspend:false,
            disableApprove:false,
            disableDeploy:false,
            contractowner:"Not Set",
            contractname:"Not Set",
            contractlanguage:"Not Set",
            tradingstate:"Not Set",
            contractparticipant:"Not Set",
            created_on:"Not Set",
            contractstart:"Not Set",
            contractend:"Not Set",
            contractcomment:"Not Set",
            creditallowed:"Not Set",
            contractcreatedon:"Not Set",
            contractapprovedon:"Not Set",
            contractactivatedon:"Not Set",
            contractdeployedon:"Not Set",
            participantrole:"Not Set",
            deployed_store_id:null,

            contract:{
                trdtype_id:1,state:0,starttime:null,endtime:null,
                timecreated:null,name:null,member_id:requester.getfromlocalstorage("employer"),
                origin:0,cstate:0,usage:null,comment:null,timedeployed:null,store_id:null,
                participant_id:null,language_id:requester.getfromlocalstorage("language_id"),
            },
            catalogoptions:[{value:null,text:"Select Catalog"}],catalogname:null,catitem:null,customitems:[],
            catalog_id:null,catentryitems:[],catentryfields:[],markup:null,catlist:[],catentries:null,customfields:[],
            customprice:null,tradingpositions:[],categories:[{value:null,text:"Select Category"}],category_id:null,
            calcodes:[{value:null,text:"Select Discount"}],calcode_id:null,catgroupitems:[],catgroupfields:[],
            invitem:null,invitems:[],invfields:[],invcalcode_id:null,invitem_id:null,exclusionitem:null,inclusionitems:[],
            exclusionitems:[],exclusionfields:[],excategory_id:null,excatgroupitems:[],excatgroupfields:[],
            categories_unprocessed:[],excludeditems:null,paymethoditems:[],paymethodfields:[],
            paymethodoptions:[{value:null,text:"Select Payment Method"}],paymethod_id:null,shipmethod_id:null,
            paypolicytcitems:[],paypolicytcfields:['name','type','store','description','created','updated','_'],
            shipmethodoptions:[{value:null,text:"Select Shipping Mode"}],shipmethoditems:[],shipmethodfields:[],
            shippolicytcitems:[],shippolicytcfields:['name','type','store','description','created','updated','_'],
            excludedcategoryitems:null,
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var trade=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/read_contract","POST",this.ac_token,this.rf_token,true,{language_id:requester.getfromlocalstorage("language_id"),trading_id:this.$route.params.trading_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var langdata=trade.then(result => {
            // console.log(result)
            this.deployed_store_id=result.store_id
            this.contractowner=result.owner
            this.contractparticipant=result.participant
            this.contractname=result.contract_name
            this.created_on=result.created_on
            this.contractcode="PR/CO/"+result.trading_id
            this.contractactivatedon=result.activated_on==null ? this.contractactivatedon : result.activated_on
            this.contractapprovedon=result.approved_on==null ? this.contractapprovedon : result.approved_on
            this.creditallowed=result.creditallowed
            this.contractdeployedon=result.deployed_on==null ? this.contractdeployedon : result.deployed_on
            this.contractcomment=result.description_comment
            this.contractorigin=result.origin
            this.participantrole=result.participant_role
            this.contractstatus=result.stage
            this.contractstart=result.trading_starts
            this.contractend=result.trading_ends
            this.tradingstate=result.tradingstate
            return requester.ajax_request("/api/v1.0/list_languages","GET",this.ac_token,this.rf_token,false,null)
        })
        var catalogdata=langdata.then(result => {
            result.forEach((item)=>{
                if(item.language_id==requester.getfromlocalstorage("language_id")){
                    this.contractlanguage=item.description
                }
            })
            return requester.ajax_request("/api/v1.0/read_catalogs","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id,language_id:this.language_id})
        })
        var tradeposcns=catalogdata.then(result => {
            result.forEach((item)=>{
                this.catalogoptions.push({value:item.catalog_id,text:item.name})
            })
            this.catalog_id=result[0].catalog_id
            return requester.ajax_request("/api/v1.0/list_tradepositions","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,trading_id:this.$route.params.trading_id})
        })
        var catentlist=tradeposcns.then(result => {
            this.tradingpositions=result
            return requester.ajax_request("/api/v1.0/list_catentries","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var catgroupdata=catentlist.then(result => {
            this.catlist=result
            return requester.ajax_request("/api/v1.0/read_categories","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var calcodesdata=catgroupdata.then(result => {
            this.categories_unprocessed=result
            var maxcount=0
            var maxitem
            result.forEach((item)=>{
                if(item.count>maxcount){
                    maxcount=item.count
                    maxitem=item
                }
            })
            this.category_id=maxitem.catgroup_id
            this.selectedcatgroup(maxitem.catgroup_id)
            result.forEach((item)=>{
                this.categories.push({text:item.identifier,value:item.catgroup_id})
            })
            return requester.ajax_request("/api/v1.0/read_calcode","POST",this.ac_token,this.rf_token,true,{storeent_id:this.deployed_store_id,language_id:this.language_id,usages:[1]})
        })
        var allitems=calcodesdata.then(result => {
            result.forEach((item)=>{
                this.calcodes.push({text:item.description,value:item.calcode_id})
            })
            return requester.ajax_request("/api/v1.0/read_catentries","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var excludeditemsdata=allitems.then(result => {
            this.inclusionitems=result
            return requester.ajax_request("/api/v1.0/excluded_items","POST",this.ac_token,this.rf_token,true,{tcsubtype_id:"CustomizedProductSetExclusion",trading_id:this.$route.params.trading_id})
        })
        var paymethodsdata=excludeditemsdata.then(result=>{
            this.excludeditems=result.items
            result.items.forEach((eitem)=>{
                this.inclusionitems.forEach((iitem)=>{
                    if(eitem==iitem.catentry_id){
                        this.exclusionitems.push(iitem)
                    }
                })
            })
            this.totalRows5=this.exclusionitems.length
            this.exclusionfields=['name','type','category','price','expires','_']
            return requester.ajax_request("/api/v1.0/list_payment_policies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id,policytype_id:"Payment"})
        })
        var paymentpolicydata=paymethodsdata.then(result=>{
            // console.log(result)
            result.forEach((item)=>{
                if(item.storeent_id==this.deployed_store_id){
                    this.paymethodoptions.push({text:item.name,value:item.policy_id})
                    this.paymethoditems.push(item)
                }
            })
            return requester.ajax_request("/api/v1.0/read_payment_policy","POST",this.ac_token,this.rf_token,true,{tcsubtype_id:"Payment",trading_id:this.$route.params.trading_id,language_id:this.language_id})
        })
        var shipmethodsdata=paymentpolicydata.then(result=>{
            if(result != null){
                this.totalRows7=result.length
                result.forEach((item)=>{
                    this.paypolicytcitems.push(item)
                })
            }
            return requester.ajax_request("/api/v1.0/list_shipping_policies","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id,policytype_id:"ShippingMode"})
        })
        var shipmethodpolicydata=shipmethodsdata.then(result=>{
            // console.log(result)
            result.forEach((item)=>{
                if(item.storeent_id==this.deployed_store_id){
                    this.shipmethodoptions.push({text:item.name,value:item.policy_id})
                    this.shipmethoditems.push(item)
                }
            })
            return requester.ajax_request("/api/v1.0/read_shipping_policy","POST",this.ac_token,this.rf_token,true,{tcsubtype_id:"ShippingMode",trading_id:this.$route.params.trading_id,language_id:this.language_id})
        })
        var catgroupexclusion=shipmethodpolicydata.then(result=>{
            // console.log(result)
            if(result != null){
                this.totalRows8=result.length
                result.forEach((item)=>{
                    this.shippolicytcitems.push(item)
                })
            }
            return requester.ajax_request("/api/v1.0/read_category_exclusion","POST",this.ac_token,this.rf_token,true,{trading_id:this.$route.params.trading_id,tcsubtype_id:"ProductSetExclusion",member_id:this.employer})
        })
        var itemsdata=catgroupexclusion.then(result=>{
            this.excludedcategoryitems=result.items
            result.items.forEach((eitem)=>{
                this.inclusionitems.forEach((iitem)=>{
                    if(eitem==iitem.catentry_id){
                        this.excatgroupitems.push(iitem)
                    }
                })
            })
            this.totalRows6=this.exclusionitems.length
            this.excatgroupfields=['name','type','category','price','expires','_']

            let tdpscn_id1
            let tdpscn_id2
            this.tradingpositions.forEach((item)=>{
                if (item.name=='Custom Price'){
                    tdpscn_id1=item.tradeposcn_id
                }
                if(item.name=='Offer Price'){
                    tdpscn_id2=item.tradeposcn_id
                }
            })
            let payload={trading_id:this.$route.params.trading_id,tdp1:tdpscn_id1,tdp2:tdpscn_id2,member_id:this.employer,language_id:this.language_id,store_id:this.deployed_store_id}
            return requester.ajax_request("/api/v1.0/trading_read_catentries","POST",this.ac_token,this.rf_token,true,payload)
        })
        itemsdata.then(result=>{
            result.forEach((item)=>{
                if (item.discount !=null){
                    this.invitems.push(item)
                }
            })
            this.totalRows4=this.invitems.length
            this.invfields=['name','type','category','price','offer','discount','expires','_']
            this.productsforcatalog('Offer Price',this.inclusionitems[0].catalog_id)
        })
    },
    methods:{
        approvecontract(){
            requester.ajax_request("/api/v1.0/approve_contract","POST",this.ac_token,this.rf_token,true,{trading_id:this.trading_id,has_account:0}).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        suspendcontract(){
            requester.ajax_request("/api/v1.0/suspend_contract","POST",this.ac_token,this.rf_token,true,{trading_id:this.trading_id,has_account:0}).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        deploycontract(){
            requester.ajax_request("/api/v1.0/deploy_contract","POST",this.ac_token,this.rf_token,true,{trading_id:this.trading_id,has_account:0}).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitshipmethodpreferences(){
            const items=this.shippolicytcitems
            const payload={tcsubtype_id:"ShippingMode",trading_id:this.trading_id,mandatory:1,changeable:1,language_id:this.language_id,
            description:"Shipping Modes available under the contract.",items:items,member_id:this.employer}
            requester.ajax_request("/api/v1.0/create_shipping_tc","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changeselectedshipmethod(e){
            let copyitems=JSON.parse(JSON.stringify(this.shippolicytcitems))
            this.shipmethoditems.forEach((item)=>{
                if(item.policy_id==e){
                    copyitems.push(item)
                }
            })
            this.totalRows8=copyitems.length
            this.shippolicytcitems=copyitems
        },
        changeselectedpaymethod(e){
            let copyitems=JSON.parse(JSON.stringify(this.paypolicytcitems))
            this.paymethoditems.forEach((item)=>{
                if (item.policy_id==e){
                    copyitems.push(item)
                }
            })
            this.totalRows7=copyitems.length
            this.paypolicytcitems=copyitems
        },
        submitpaymethodpreferences(){
            const items=this.paypolicytcitems
            const payload={tcsubtype_id:"Payment",trading_id:this.trading_id,mandatory:1,changeable:1,language_id:this.language_id,
            description:"Payment Methods available under the contract.",items:items,member_id:this.employer}
            requester.ajax_request("/api/v1.0/create_payment_tc","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        includecategoryitem(row){
            let index=row.index
            const copyitems=JSON.parse(JSON.stringify(this.excatgroupitems))
            copyitems.splice(index,1)
            this.excatgroupitems=copyitems
            const payload={trading_id:this.trading_id,tcsubtype_id:"ProductSetExclusion",catentry_id:row.item.catentry_id}
            requester.ajax_request("/api/v1.0/include_item","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitcategoryexclusion(){
            const items=this.excatgroupitems
            let catalog_id=this.excatgroupitems[0].catalog_id
            const payload={name:"Excluded Category",member_id:this.employer,publishtime:null,language_id:this.language_id,
            description:"All items in the specified category are not for sale under this contract.",
            tcsubtype_id:"ProductSetExclusion",trading_id:this.trading_id,mandatory:1,changeable:1,
            timecreated:null,type:1,adjustment:0,precedence:0,items:items,catalog_id:catalog_id,catgroup_id:this.excategory_id}
            requester.ajax_request("/api/v1.0/catgroup_pset_exclusion","POST",this.ac_token,this.rf_token,true,payload).done(result=> {
                // console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        selectexcludedcatgroup(e){
            const copyitems=JSON.parse(JSON.stringify(this.inclusionitems))
            copyitems.forEach((item)=>{
                if (item.catgroup_id==e){
                    this.excatgroupitems.push(item)
                }
            })
            this.totalRows6=this.excatgroupitems.length
            this.excatgroupfields=['name','type','category','price','expires','_']
        },
        removeitemdiscount(row){
            let index=row.index
            const copyitems=JSON.parse(JSON.stringify(this.invitems))
            copyitems.splice(index,1)
            this.invitems=copyitems
            let payload={trading_id:this.trading_id,store_id:this.deployed_store_id,catentry_id:row.item.catentry_id,
            calcode_id:row.item.calcode_id}
            requester.ajax_request("/api/v1.0/remove_catencalcd","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        removeexclusionitem(row){
            let index=row.index
            const copyitems=JSON.parse(JSON.stringify(this.exclusionitems))
            copyitems.splice(index,1)
            this.exclusionitems=copyitems
            const payload={trading_id:this.trading_id,tcsubtype_id:"CustomizedProductSetExclusion",catentry_id:row.item.catentry_id}
            requester.ajax_request("/api/v1.0/include_item","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitproductexclusions(){
            const items=this.exclusionitems
            const payload={name:"Excluded Items",member_id:this.employer,publishtime:null,language_id:this.language_id,
            description:"A list of items that are not for sale.",tcsubtype_id:"CustomizedProductSetExclusion",
            trading_id:this.trading_id,mandatory:1,changeable:1,timecreated:null,type:3,adjustment:0,precedence:0,items:items}
            requester.ajax_request("/api/v1.0/custom_pset_exclusion","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        selectedexclusionitem(e){
            let val=e.target.value
            this.inclusionitems.forEach((item)=>{
                if (item.name==val){
                    this.exclusionitems.push(item)
                }
            })
            this.totalRows5=this.exclusionitems.length
            this.exclusionfields=['name','type','category','price','expires','_']
        },
        submititemdiscount(){
            const payload={store_id:this.deployed_store_id,catentry_id:this.invitem_id,trading_id:this.trading_id,calcode_id:this.invcalcode_id}
            // console.log(payload)
            requester.ajax_request("/api/v1.0/create_catencalcd","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        applyitemdiscount(){
            let copyitems=JSON.parse(JSON.stringify(this.invitems))
            this.calcodes.forEach((item)=>{
                if(this.invcalcode_id==item.value){
                    copyitems.forEach((iitem)=>{
                        iitem.discount=item.text
                    })
                }
            })
            this.invitems=copyitems
            this.totalRows4=copyitems.length
            this.invfields=['name','type','category','price','offer','discount','expires','_']
        },
        selectedinvitem(e){
            let val=e.target.value
            let tdpscn_id1
            let tdpscn_id2
            this.tradingpositions.forEach((item)=>{
                if (item.name=='Custom Price'){
                    tdpscn_id1=item.tradeposcn_id
                }
                if(item.name=='Offer Price'){
                    tdpscn_id2=item.tradeposcn_id
                }
            })
            requester.ajax_request("/api/v1.0/trading_read_catentries","POST",this.ac_token,this.rf_token,true,{tdp1:tdpscn_id1,tdp2:tdpscn_id2,member_id:this.employer,language_id:this.language_id}).done(result=>{
                result.forEach((item)=>{
                    if(item.name==val){
                        item.discount=null
                        this.invitems.push(item)
                        this.invitem_id=item.catentry_id
                    }
                })
                this.totalRows4=this.invitems.length
                this.invfields=['name','type','category','price','offer','discount','expires','_']
            })
        },
        applycategorydiscount(){
            this.calcodes.forEach((item)=>{
                if(this.calcode_id==item.value){
                    this.catgroupitems.forEach((citem)=>{
                        citem.custom=item.text
                    })
                }
            })
        },
        submitcategorydiscount(){
            const payload={store_id:this.deployed_store_id,catgroup_id:this.category_id,trading_id:this.trading_id,calcode_id:this.calcode_id}
            requester.ajax_request("/api/v1.0/create_catgpcalcd","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedpricingtabs(e){
            if(e==1){
                requester.ajax_request("/api/v1.0/list_tradepositions","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,trading_id:this.trading_id}).done(result=>{
                    this.tradingpositions=result
                    let tdpscn_id1
                    let tdpscn_id2
                    result.forEach((item)=>{
                        if (item.name=='Custom Price'){
                            tdpscn_id1=item.tradeposcn_id
                        }
                        if(item.name=='Offer Price'){
                            tdpscn_id2=item.tradeposcn_id
                        }
                    })
                    requester.ajax_request("/api/v1.0/trading_read_catentries","POST",this.ac_token,this.rf_token,true,{tdp1:tdpscn_id1,tdp2:tdpscn_id2,member_id:this.employer,language_id:this.language_id}).done(result => {
                        this.catentries=result
                        this.customitems=[]
                        this.totalRows2=0
                        result.forEach((item)=>{
                            if(item.custom != null){
                                this.customitems.push(item)
                            }
                            this.customfields=['name','type','category','price','offer','custom','expires','_']
                            this.totalRows2=this.customitems.length
                        })
                    }).fail((jqXHR,textStatus,errorThrown) => {
                        console.log(jqXHR.responseJSON)
                        console.log(textStatus)
                        console.log(errorThrown)
                    })
                })
            }
        },
        submitcustomprices(){
            const payload=this.customitems
            let data={trading_id:this.trading_id,items:payload,name:"Custom Price",member_id:this.employer,
            description:"Sales Price for all items within the "+this.catalogname+" catalog",type:'C',
            catalog_id:this.catalog_id,store_id:this.deployed_store_id,published:1,lastupdate:null,
            language_id:this.language_id,changeable:1,tcsubtype_id:'CustomizedPriceList'}
            requester.ajax_request("/api/v1.0/term_customized_price_list","POST",this.ac_token,this.rf_token,true,data).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        selectedcatgroup(e){
            let tdpscn_id1
            let tdpscn_id2
            this.tradingpositions.forEach((item)=>{
                if (item.name=='Custom Price'){
                    tdpscn_id1=item.tradeposcn_id
                }
                if(item.name=='Offer Price'){
                    tdpscn_id2=item.tradeposcn_id
                }
            })
            const payload={tdp1:tdpscn_id1,tdp2:tdpscn_id2,member_id:this.employer,language_id:this.language_id}
            this.catgroupitems=[]
            this.totalRows3=0
            this.catgroupfields=['name','type','category','price','offer','custom','expires','_']
            requester.ajax_request("/api/v1.0/trading_read_catentries","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                result.forEach((item)=>{
                    if (item.catgroup_id==e){
                        this.catgroupitems.push(item)
                    }
                })
            })
            this.totalRows3=this.catgroupitems.length
            this.catgroupfields=['name','type','category','price','offer','custom','expires','_']
        },
        selecteditem(e){
            let val=e.target.value
            this.catentries.forEach((item)=>{
                if(item.name==val){
                    this.customitems.push(item)
                    this.customfields=['name','type','category','price','offer','custom','expires','_']
                    this.totalRows2=this.customitems.length
                }
            })
        },
        editcustomitem(row){
            let index=row.index
            var edititem=this.customitems[index]
            this.customprice=edititem.custom
            this.catitem=edititem.name
        },
        removecustomitem(row){
            let index=row.index
            const copyitems=JSON.parse(JSON.stringify(this.customitems))
            copyitems.splice(index,1)
            this.customitems=copyitems
        },
        applycustomprice(){
            const copyitems=JSON.parse(JSON.stringify(this.customitems))
            copyitems.forEach((item)=>{
                if(this.catitem==item.name){
                    item.custom=this.customprice
                }
            })
            this.customitems=copyitems
        },
        submitoffers(){
            const payload=this.catentryitems
            let data={trading_id:this.trading_id,items:payload,name:"Offer Price",member_id:this.employer,
            description:"Sales Price for all items within the "+this.catalogname+" catalog",type:'S',
            catalog_id:this.catalog_id,store_id:this.deployed_store_id,published:1,lastupdate:null,
            language_id:this.language_id,changeable:1,tcsubtype_id:'CatalogWithAdjustment'}
            requester.ajax_request("/api/v1.0/term_catalog_with_adjustment","POST",this.ac_token,this.rf_token,true,data).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
            }).fail((jqXHR,textStatus,errorThrown) => {
                this.success_message=jqXHR.responseJSON.msg
                this.showSnackbar=true
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        removeitem(row){
            let index=row.index
            const copyitems=JSON.parse(JSON.stringify(this.catentryitems))
            copyitems.splice(index,1)
            this.catentryitems=copyitems
        },
        applymarkup(){
            const copyitems=JSON.parse(JSON.stringify(this.catentryitems))
            copyitems.forEach((item)=>{
                let ofprice=item.price+((this.markup/100)*item.price)
                item.offerprice=ofprice
                item.offer=ofprice
            })
            this.catentryitems=copyitems
        },
        productsforcatalog(name,e){
            let tradeposcn_id;
            this.tradingpositions.forEach((item)=>{
                if(item.name==name){
                    tradeposcn_id=item.tradeposcn_id
                }
            })
            let val=e
            this.catalogoptions.forEach((item)=>{
                if(item.value==val){this.catalogname=item.text}
            })
            let payload={member_id:this.employer,language_id:this.language_id,catalog_id:val,tradeposcn_id:tradeposcn_id}
            requester.ajax_request("/api/v1.0/trading_products_for_catalog","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                // console.log(result)
                this.catentryitems=result
                this.catentryfields=['name','type','category','price','offer','expires','_']
                this.totalRows=result.length
            })
        },
        setparticipant(e){
            let val=e.target.value
            this.orglist.forEach((item)=>{
                if(item.value==val){
                    this.contractparticipant=item.text
                }
            })
        },
        setcontractprofile(){
            const payload={...this.contract}
            requester.ajax_request("/api/v1.0/create_contract","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
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