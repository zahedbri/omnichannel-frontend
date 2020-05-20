<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Taxes</h1>
                    <div>
                        <b-form-select size="sm" v-model="selectedstore" :options="storeslist"></b-form-select>
                    </div>
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <header style="padding-top:0.8rem; padding-bottom:0.8rem;"></header>
                <b-row>
                    <b-col cols="12">
                        <div>
                            <b-card no-body>
                                <b-tabs card>
                                    <b-tab title="Shipping Jurisdictions" active>
                                        <b-card no-body>
                                            <b-card-body class="px-0 py-0">
                                                <b-table small show-empty striped hover bordered :current-page="currentPage" :per-page="perPage" :items="shipjursitems" :fields="shipjursfields">
                                                    <template v-slot:head(show_details)>
                                                        <b-form-checkbox disabled></b-form-checkbox>
                                                    </template>
                                                    <template v-slot:cell(show_details)="row">
                                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                                        </b-form-checkbox>
                                                    </template>
                                                    <template v-slot:head(index)>
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(index)="row">
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addjurst(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removejurst(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:row-details>
                                                        <b-row class="justify-content-center bg-white">
                                                            <b-col cols="10" class="mr-auto ml-auto">
                                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addnewjurst">
                                                                    <b-card-body>
                                                                        <b-row>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Code</label>
                                                                                    <b-form-input readonly size="sm" type="text" v-model="jurst.code" placeholder="Code" required></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Name</label>
                                                                                    <b-form-input size="sm" type="text" v-model="jurst.description" placeholder="Name of shipping jurisdiction" required></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Country</label>
                                                                                    <template>
                                                                                        <b-form-input required placeholder="Fill &amp; Select Country" v-model="jurst.country" @change.native="changedcountry" size="sm" list="country-list"></b-form-input>
                                                                                        <datalist id="country-list">
                                                                                            <option>Select Country</option>
                                                                                            <option v-for="country in countryselect" :key="country.value">{{country.text}}</option>
                                                                                        </datalist>
                                                                                    </template>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">State</label>
                                                                                    <template>
                                                                                        <b-form-input required v-model="jurst.state" placeholder="Fill &amp; Select State" @change.native="changedstate" size="sm" list="state-list"></b-form-input>
                                                                                        <datalist id="state-list">
                                                                                            <option>Select State</option>
                                                                                            <option v-for="state in stateselect" :key="state.value">{{state.text}}</option>
                                                                                        </datalist>
                                                                                    </template>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">City</label>
                                                                                    <b-form-input type="text" size="sm" v-model="jurst.city" placeholder="City of shipping jurisdiction"></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="3" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Jurisdiction Group</label>
                                                                                    <b-form-select size="sm" v-model="jurst.jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
                                                                                    <button class="btn btn-primary" v-b-modal.new-jg-modal type="button"><i class="fas fa-plus mr-1"></i>Add</button>
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
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                    <b-tab title="Calculation Codes">
                                        <b-card no-body>
                                            <b-card-body class="px-0 py-0">
                                                <b-table small show-empty striped hover bordered :current-page="currentPage" :per-page="perPage" :items="calcodeitems" :fields="calcodefields">
                                                    <template v-slot:head(show_details)>
                                                        <b-form-checkbox disabled></b-form-checkbox>
                                                    </template>
                                                    <template v-slot:cell(show_details)="row">
                                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                                        </b-form-checkbox>
                                                    </template>
                                                    <template v-slot:head(index)>
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(index)="row">
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addcalcode(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removecalcode(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:row-details>
                                                        <b-row class="justify-content-center bg-white">
                                                            <b-col cols="10" class="mr-auto ml-auto">
                                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addnewcalcode">
                                                                    <b-card-body>
                                                                        <b-row>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Usage</label>
                                                                                    <b-form-select size="sm" v-model="calcode.calusage_id" @change.native="populatecalmethods" :options="calusageoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Code</label>
                                                                                    <b-form-input size="sm" type="text" v-model="calcode.code" readonly placeholder="Code" required></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Qualification</label>
                                                                                    <b-form-select size="sm" v-model="calcode.calmethod_id_qfy" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation</label>
                                                                                    <b-form-select size="sm" v-model="calcode.calmethod_id" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Application</label>
                                                                                    <b-form-select size="sm" v-model="calcode.calmethod_id_app" @change.native="formulatecode" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Comment / Description</label>
                                                                                    <b-form-input size="sm" type="text" v-model="calcode.description" placeholder="Comment / Description"></b-form-input>
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
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                    <b-tab title="Calculation Rules">
                                        <b-card no-body>
                                            <b-card-body class="px-0 py-0">
                                                <b-table small show-empty striped hover bordered :current-page="currentPage" :per-page="perPage" :items="calruleitems" :fields="calrulefields">
                                                    <template v-slot:head(show_details)>
                                                        <b-form-checkbox disabled></b-form-checkbox>
                                                    </template>
                                                    <template v-slot:cell(show_details)="row">
                                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                                        </b-form-checkbox>
                                                    </template>
                                                    <template v-slot:head(index)>
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(index)="row">
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addcalrule(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removecalrule(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:row-details>
                                                        <b-row class="justify-content-center bg-white">
                                                            <b-col cols="10" class="mr-auto ml-auto">
                                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addnewcalrule">
                                                                    <b-card-body>
                                                                        <b-row>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Shipping Code</label>
                                                                                    <b-form-select size="sm" @change.native="populatemethods" v-model="calrule.calcode_id" :options="calcodeoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <!-- <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Tax Category</label>
                                                                                    <b-form-select size="sm" @change.native="populatemethods" v-model="calrule.taxcgry_id" :options="taxcatoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col> -->
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Qualification</label>
                                                                                    <b-form-select size="sm" v-model="calrule.calmethod_id_qfy" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation</label>
                                                                                    <b-form-select size="sm" v-model="calrule.calmethod_id" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Shipping Center</label>
                                                                                    <b-form-select size="sm" v-model="calrule.ffmcenter_id" :options="ffmoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="4" md="4">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Shipping Jurisdiction</label>
                                                                                    <b-form-select size="sm" @change.native="writerulecode" v-model="calrule.jurstgroup_id" :options="jurstgroupoptions" required></b-form-select>
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
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                    <b-tab title="Calculation Scales">
                                        <b-card no-body>
                                            <b-card-body class="px-0 py-0">
                                                <b-table small show-empty striped hover bordered :current-page="currentPage" :per-page="perPage" :items="calscaleitems" :fields="calscalefields">
                                                    <template v-slot:head(show_details)>
                                                        <b-form-checkbox disabled></b-form-checkbox>
                                                    </template>
                                                    <template v-slot:cell(show_details)="row">
                                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                                        </b-form-checkbox>
                                                    </template>
                                                    <template v-slot:head(index)>
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(index)="row">
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addcalscale(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removecalscale(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:row-details>
                                                        <b-row class="justify-content-center bg-white">
                                                            <b-col cols="10" class="mr-auto ml-auto">
                                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addnewcalscale">
                                                                    <b-card-body>
                                                                        <b-row>
                                                                            <b-col sm="3" md="3">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Code</label>
                                                                                    <b-form-input size="sm" type="text" v-model="calscale.code" readonly placeholder="Code" required></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="3" md="3">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Usage</label>
                                                                                    <b-form-select size="sm" @change.native="populatecalmethods" v-model="calscale.calusage_id" :options="calusageoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="3" md="3">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation</label>
                                                                                    <b-form-select size="sm" v-model="calscale.calmethod_id" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="3" md="3">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation Rule</label>
                                                                                    <b-form-select size="sm" v-model="calscale.calrule_id" @change.native="formulatescalecode" :options="calruleoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="12" md="12">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Description</label>
                                                                                    <b-form-textarea size="sm" :rows="1" :max-rows="6" v-model="calscale.description" placeholder="Comment"></b-form-textarea>
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
                                                    </template>
                                                </b-table>
                                            </b-card-body>
                                        </b-card>
                                    </b-tab>
                                    <b-tab title="Calculation Ranges">
                                        <b-card no-body>
                                            <b-card-body class="px-0 py-0">
                                                <b-table small show-empty striped hover bordered :current-page="currentPage" :per-page="perPage" :items="calrangeitems" :fields="calrangefields">
                                                    <template v-slot:head(show_details)>
                                                        <b-form-checkbox disabled></b-form-checkbox>
                                                    </template>
                                                    <template v-slot:cell(show_details)="row">
                                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                                        </b-form-checkbox>
                                                    </template>
                                                    <template v-slot:head(index)>
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:cell(index)="row">
                                                        <div class="text-center">
                                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addcalrange(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removecalrange(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                                        </div>
                                                    </template>
                                                    <template v-slot:row-details>
                                                        <b-row class="justify-content-center bg-white">
                                                            <b-col cols="6" class="text-left mr-auto">
                                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addnewcalrange">
                                                                    <b-card-body>
                                                                        <b-row>
                                                                            <b-col sm="6" md="6">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation Scale</label>
                                                                                    <b-form-select size="sm" @change.native="getmethods" v-model="calrange.calscale_id" :options="calscaleoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="6" md="6">
                                                                                <div class="form-group mb-4">
                                                                                    <label class="form-label">Calculation</label>
                                                                                    <b-form-select size="sm" v-model="calrange.calmethod_id" :options="calmethodoptions" required></b-form-select>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="6" md="6">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Rangestart</label>
                                                                                    <b-form-input size="sm" v-model="calrange.rangestart" type="number" step="1" placeholder="Rangestart" required></b-form-input>
                                                                                </div>
                                                                            </b-col>
                                                                            <b-col sm="6" md="6">
                                                                                <div class="form-group mb-2">
                                                                                    <label class="form-label">Value</label>
                                                                                    <b-form-input size="sm" v-model="calrange.value" type="number" step="1" placeholder="Value" required></b-form-input>
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
        <b-modal ref="new-jg-modal" size="md" id="new-jg-modal" title="Shipping Jurisdiction Group" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="addnewjurstgroup">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Code</label>
                                            <b-form-input size="sm" type="text" v-model="jurstgroup.code" readonly placeholder="Code" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Name</label>
                                            <b-form-input size="sm" type="text" v-model="jurstgroup.description" placeholder="Name of shipping jurisdiction group" required></b-form-input>
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
export default {
    name:"shipping",
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
            perPage:20,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            storeslist:[{value:null,text:"Select Store"}],
            selectedstore:null,
            shipjursfields:null,
            shipjursitems:null,
            jurstgroupoptions:[{value:null,text:"Select Jurisdiction"}],
            countryselect:[],
            stateselect:[],

            jurst:{storeent_id:null,country:null,code:null,description:null,subclass:1,city:null,
                state:null,stateabbr:null,countryabbr:null,jurstgroup_id:null},
            jurstgroup:{storeent_id:null,description:null,subclass:1,code:null},

            calcodefields:null,
            calcodeitems:null,
            calcode:{
                code:null,
                calusage_id:null,
                storeent_id:null,
                calmethod_id:null,
                calmethod_id_app:null,
                calmethod_id_qfy:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,
            },
            calusageoptions:[{value:null,text:"Select Usage"}],
            calmethodoptions:[{value:null,text:"Select Method"}],

            calruleitems:null,
            calrulefields:null,
            calrule:{calcode_id:null,taxcgry_id:null,calmethod_id:null,calmethod_id_qfy:null,
                flags:1,ffmcenter_id:null,jurstgroup_id:null,field2:null
            },
            calcodeoptions:[{value:null,text:"Select Code"}],
            ffmoptions:[{value:null,text:"Select Warehouse"}],

            calruleoptions:[{value:null,text:"Select Code"}],
            calscaleitems:null,
            calscalefields:null,
            calscale:{
                code:null,calmethod_id:null,calusage_id:null,qtyunit_id:null,field1:null,calrule_id:null,
                setccurr:null,storeent_id:null,description:null,language_id:requester.getfromlocalstorage("language_id"),
            },
            calscaleoptions:[{value:null,text:"Select Scale"}],

            calrangeitems:null,
            calrangefields:null,
            calrange:{
                calscale_id:null,calmethod_id:null,rangestart:null,cumulative:0,value:null,
            },
        }
    },
    created(){
        var verification=requester.ajax_request("/api/v1.0/user_identity","GET",this.ac_token,this.rf_token,false,null)
        var storesdata=verification.then(result=>{
            return requester.ajax_request("/api/v1.0/list_stores","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id,language_id:this.language_id})
        }).fail((jqXHR,textStatus,errorThrown) => {
            this.$router.push({path:'/login'})
            console.log(jqXHR.responseJSON)
            console.log(textStatus)
            console.log(errorThrown)
        })
        var jurstdata=storesdata.then(result => {
            result.forEach((item)=>{
                this.storeslist.push({value:item.storeent_id,text:item.identifier})
            })
            this.storeslist.length > 1 ? this.selectedstore=this.storeslist[1].value : this.selectedstore=null;
            this.jurstgroup.code=this.employername.substring(0,2).toUpperCase()+'/'+'SP'+'/'+'JG'+'/'+this.selectedstore+'/'+this.jurst.subclass
            this.storeslist.length > 1 ? this.jurst.storeent_id=this.storeslist[1].value : this.jurst.storeent_id=null;
            this.storeslist.length > 1 ? this.jurstgroup.storeent_id=this.storeslist[1].value : this.jurstgroup.storeent_id=null;
            this.storeslist.length > 1 ? this.calcode.storeent_id=this.storeslist[1].value : this.calcode.storeent_id=null;
            this.storeslist.length > 1 ? this.calscale.storeent_id=this.storeslist[1].value : this.calscale.storeent_id=null;
            return requester.ajax_request("/api/v1.0/read_jurst","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,subclass:1})
        })
        var countrydata=jurstdata.then(result => {
            this.shipjursfields=['show_details','code','sub_class','country','state','city','description','index']
            this.shipjursitems=result
            return requester.ajax_request_no_tokens("/api/v1.0/list_countries","GET",false,null)
        })
        var jurstgroupdata=countrydata.then(result => {
            result.forEach((item)=>{
                this.countryselect.push({value:item.countryabbr,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_jurstgroup","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,subclass:1})
        })
        var calusagedata=jurstgroupdata.then(result=>{
            result.forEach((item)=>{
                this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/read_calusage","GET",this.ac_token,this.rf_token,false,null)
        })
        var calcodedata=calusagedata.then(result => {
            result.forEach((item)=>{
                this.calusageoptions.push({value:item.calusage_id,text:item.description})
            })
            return requester.ajax_request("/api/v1.0/read_calcode","POST",this.ac_token,this.rf_token,true,{usages:[2],storeent_id:this.selectedstore,language_id:requester.getfromlocalstorage("language_id")})
        })
        var ffmdata=calcodedata.then(result => {
            result.forEach((item)=>{
                this.calcodeoptions.push({value:item.calcode_id,text:item.description})
            })
            this.calcodefields=['show_details','usage','code','description','calculation','application','qualification','index']
            this.calcodeitems=result
            return requester.ajax_request("/api/v1.0/read_ffmcenter","POST",this.ac_token,this.rf_token,true,{member_id:this.user_id})
        })
        var calruledata=ffmdata.then(result => {
            result.forEach((item)=>{
                this.ffmoptions.push({value:item.ffmcenter_id,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_shpcalrule","GET",this.ac_token,this.rf_token,false,null)
        })
        var calscaledata=calruledata.then(result => {
            console.log(result)
            this.calruleitems=result
            this.calrulefields=['show_details','tax_code','qualification','calculation','shipping','jurisdiction','index']
            result.forEach((item)=>{
                this.calruleoptions.push({value:item.calrule_id,text:item.tax_code+' : '+item.jurisdiction})
            })
            return requester.ajax_request("/api/v1.0/read_calscale","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,language_id:this.language_id})
        })
        var calrangedata=calscaledata.then(result => {
            result.forEach((item)=>{
                this.calscaleoptions.push({value:item.calscale_id,text:item.field1})
            })
            this.calscaleitems=result
            this.calscalefields=['show_details','tax_type','code','description','index']
            return requester.ajax_request("/api/v1.0/read_calrange","GET",this.ac_token,this.rf_token,false,null)
        })
        calrangedata.then(result => {
            this.calrangeitems=result
            this.calrangefields=['show_details','calculation','scale','rangestart','value','index']
        })
    },
    methods:{
        getmethods(e){
            let val=e.target.value
            requester.ajax_request("/api/v1.0/methods_from_calscale","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,calscale_id:val}).done(result => {
                result.forEach((item)=>{
                    this.calmethodoptions.push(item)
                })
            })
        },
        addnewcalrange(){
            const payload={...this.calrange}
            requester.ajax_request("/api/v1.0/create_taxcalrange","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.calrangeitems=result.calrangedata
                this.calrangefields=['show_details','calculation','scale','rangestart','value','index']
            })
        },
        removecalrange(index){
            this.calrangeitems.splice(index,1)
        },
        addcalrange(data){
            const copyitems=JSON.parse(JSON.stringify(this.calrangeitems))
            copyitems[data.index]._showDetails=false
            this.calrangeitems.push(copyitems[data.index])
        },
        formulatescalecode(e){
            let val=e.target.value
            this.calruleoptions.forEach((item)=>{
                if(item.value==val){
                    this.calscale.field1=item.text
                }
            })
            var code='PR'+'/'+'CS'+'/'+this.calscale.calusage_id+'/'+val
            this.calscale.code=code
        },
        addnewcalscale(){
            const payload={...this.calscale}
            requester.ajax_request("/api/v1.0/create_taxcalscale","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.calscaleitems=result.calscaledata
                this.calscalefields=['show_details','tax_type','code','description','index']
            })
        },
        removecalscale(index){
            this.calscaleitems.splice(index,1)
        },
        addcalscale(data){
            const copyitems=JSON.parse(JSON.stringify(this.calscaleitems))
            copyitems[data.index]._showDetails=false
            this.calscaleitems.push(copyitems[data.index])
        },
        writerulecode(e){
            let val=e.target.value
            this.calrule.field2='PR'+'/'+'CR'+'/'+this.calrule.calmethod_id+'/'+this.calrule.calmethod_id_qfy+'/'+val
        },
        populatemethods(e){
            let val=e.target.value
            requester.ajax_request("/api/v1.0/methods_from_calcode","POST",this.ac_token,this.rf_token,true,{calcode_id:val}).done(result => {
                result.forEach((item)=>{
                    this.calmethodoptions.push(item)
                })
            })
        },
        addnewcalrule(){
            const payload={...this.calrule}
            requester.ajax_request("/api/v1.0/create_shpcalrule","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.calruleitems=result.calruledata
                this.calrulefields=['show_details','tax_code','qualification','calculation','shipping','jurisdiction','index']
            })
        },
        removecalrule(index){
            this.calruleitems.splice(index,1)
        },
        addcalrule(data){
            const copyitems=JSON.parse(JSON.stringify(this.calruleitems))
            copyitems[data.index]._showDetails=false
            this.calruleitems.push(copyitems[data.index])
        },
        formulatecode(e){
            let val=e.target.value
            var code='PR'+'/'+'CC'+'/'+this.calcode.calmethod_id+'/'+this.calcode.calmethod_id_qfy+'/'+val
            this.calcode.code=code
        },
        populatecalmethods(e){
            let val=e.target.value
            requester.ajax_request("/api/v1.0/read_calmethods","POST",this.ac_token,this.rf_token,true,{storeent_id:this.selectedstore,calusage_id:val}).done(result => {
                result.forEach((item)=>{
                    this.calmethodoptions.push({value:item.calmethod_id,text:item.name})
                })
            })
        },
        addnewcalcode(){
            const payload={...this.calcode}
            requester.ajax_request("/api/v1.0/create_tax_calcode","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.calcodefields=['show_details','usage','code','description','calculation','application','qualification','index']
                this.calcodeitems=result.calcodedata
                result.calcodedata.forEach((item)=>{
                    this.calcodeoptions.push({value:item.calcode_id,text:item.description})
                })
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        addcalcode(data){
            const copyitems=JSON.parse(JSON.stringify(this.calcodeitems))
            copyitems[data.index]._showDetails=false
            this.calcodeitems.push(copyitems[data.index])
        },
        // removecalscale(index){
        //     this.calscaleitems.splice(index,1)
        // },
        changedcountry(e){
            let val=e.target.value
            let selectedcountry
            this.countryselect.forEach((item)=>{
                if(item.text==val){
                    this.selectedcountry=item.value
                    this.jurst.countryabbr=item.value
                }
            })
            requester.ajax_request_no_tokens("/api/v1.0/list_states_for_country","POST",true,{countryabbr:this.selectedcountry}).done(result => {
                result.forEach((item)=>{
                    this.stateselect.push({text:item.name,value:item.stateprovabbr})
                })
            })
        },
        changedstate(e){
            let val=e.target.value
            let selectedstate
            this.stateselect.forEach((item)=>{
                if(item.text==val){
                    this.jurst.stateabbr=item.value
                }
            })
            var stab=this.jurst.stateabbr.split('.')[1]
            var ctab=this.jurst.countryabbr
            this.jurst.code=this.employername.substring(0,2).toUpperCase()+'/'+'JR'+'/'+stab+'/'+ctab+'/'+this.selectedstore+'/'+this.jurst.subclass
        },
        addnewjurstgroup(e){
            const payload={...this.jurstgroup}
            console.log(payload)
            requester.ajax_request("/api/v1.0/create_jurstgroup","POST",this.ac_token,this.rf_token,true,payload).done(result=>{
                result.jgroups.forEach((item)=>{
                    this.jurstgroupoptions.push({value:item.jurstgroup_id,text:item.description})
                })
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-jg-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        addnewjurst(){
            const payload={...this.jurst}
            console.log(payload)
            requester.ajax_request("/api/v1.0/create_jurst","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                console.log(result)
                this.success_message=result.msg
                this.showSnackbar=true
                this.shipjursfields=['show_details','code','sub_class','country','state','city','description','index']
                this.shipjursitems=result.jurstdata
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        removejurst(index){
            this.shipjursitems.splice(index,1)
        },
        addjurst(data){
            const copyitems=JSON.parse(JSON.stringify(this.shipjursitems))
            copyitems[data.index]._showDetails = false
            this.shipjursitems.push(copyitems[data.index])
        }
    }
}
</script>