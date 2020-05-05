<template>
    <div>
        <div class="breadcrumb-holder">
            <b-container fluid>
                <div class="d-flex  align-items-center justify-content-between">
                    <h1 class="breadcrumb">Product Catalog</h1>
                    <div>
                        <b-dropdown variant="primary" size="sm" right text="New catalog">
                            <b-dropdown-item v-b-modal.new-catalog-modal>Add new catalog</b-dropdown-item>
                            <b-dropdown-item v-b-modal.new-category-modal>Add new category</b-dropdown-item>
                            <b-dropdown-item v-b-modal.new-item-modal>Add new product</b-dropdown-item>
                            <b-dropdown-item>Add multiple products</b-dropdown-item>
                            <b-dropdown-item v-b-modal.new-attr-modal>Product Attributes</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </b-container>
        </div>
        <section class="forms">
            <b-container fluid class="mt-2">
                <b-row>
                    <b-col cols="3" class="pr-2">
                        <b-card no-body class="mb-0 updates daily-feeds">
                            <b-card-header style="background:transparent;" class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-left align-items-center">
                                    <h2 v-b-toggle.collapse-catalogs class="h5 display mb-0 c-pointer">Catalogs</h2>
                                    <a v-b-toggle.collapse-catalogs style="color:#555 !important;" class="mt-1 ml-1"><i class="fas fa-angle-down text-gray"></i></a>
                                </div>
                                <div class="right-column">
                                    <div class="badge badge-primary mr-2">{{cataloglists.length}} {{cataloglists.length > 1 ? "Catalogs" : "Catalog"}} </div>
                                </div>
                            </b-card-header>
                            <b-collapse id="collapse-catalogs" class="mt-2">
                                <div class="feed-box">
                                    <ul class="feed-elements list-unstyled">
                                        <li class="clearfix" v-for="catalog in cataloglists" :key="catalog.catalog_id">
                                            <div class="feed d-flex align-items-center justify-content-between">
                                                <div class="feed-body d-flex align-items-center justify-content-between">
                                                    <a class="mr-1 d-flex align-items-center justify-content-center" href="#">
                                                        <i class="fas fa-thumbtack mr-1"></i>
                                                    </a>
                                                    <span class="text-gray">&mdash;</span>
                                                    <div class="content mb-1 ml-1">
                                                        <strong>{{catalog.name}}</strong>
                                                    </div>
                                                </div>
                                                <div class="date">
                                                    <!-- <small>edit button here</small> -->
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="mb-0 updates daily-feeds">
                            <b-card-header style="background:transparent;" class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-left align-items-center">
                                    <h2 v-b-toggle.collapse-categories class="h5 display mb-0 c-pointer">Categories</h2>
                                    <a v-b-toggle.collapse-categories style="color:#555 !important;" class="mt-1 ml-1"><i class="fas fa-angle-down text-gray"></i></a>
                                </div>
                                <div class="right-column">
                                    <div class="badge badge-primary mr-2"> {{categorylists.length}} {{ categorylists.length > 1 ? "Categories" : "Category" }} </div>
                                </div>
                            </b-card-header>
                            <b-collapse visible id="collapse-categories" class="mt-2">
                                <div class="feed-box">
                                    <ul class="feed-elements list-unstyled">
                                        <vue-custom-scrollbar class="category-scroll-area" :settings="settings">
                                            <li class="clearfix" v-for="category in categorylists" :key="category.catgroup_id">
                                                <div class="feed d-flex justify-content-between">
                                                    <div class="feed-body d-flex justify-content-between">
                                                        <a class="feed-profile" href="#">
                                                            <img :src="defaultavatar" class="img-fluid rounded">
                                                        </a>
                                                        <div class="content">
                                                            <strong>{{category.identifier}}</strong>
                                                            <small>{{category.count}} {{category.count == 1 ? "Product Contained" : "Products contained"}} </small>
                                                        </div>
                                                    </div>
                                                    <div class="date">
                                                        <!-- <small>edit</small> -->
                                                    </div>
                                                </div>
                                            </li>
                                        </vue-custom-scrollbar>
                                    </ul>
                                </div>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="mb-0 updates daily-feeds">
                            <b-card-header style="background:transparent;" class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-left align-items-center">
                                    <h2 v-b-toggle.collapse-attributes class="h5 display mb-0 c-pointer">Attributes</h2>
                                    <a v-b-toggle.collapse-attributes style="color:#555 !important;" class="mt-1 ml-1"><i class="fas fa-angle-down text-gray"></i></a>
                                </div>
                                <div class="right-column">
                                    <div class="badge badge-primary mr-2">{{attributeitems.length}} {{attributeitems.length > 1 ? "Attributes" : "Attribute"}} </div>
                                </div>
                            </b-card-header>
                            <b-collapse id="collapse-attributes" class="mt-2">
                                <div class="feed-box">
                                    <ul class="feed-elements list-unstyled">
                                        <li class="clearfix" v-for="attr in attributeitems" :key="attr.attr_id">
                                            <div class="feed d-flex align-items-center justify-content-between">
                                                <div class="feed-body d-flex align-items-center justify-content-between">
                                                    <a class="mr-1 d-flex align-items-center justify-content-center" href="#">
                                                        <i class="fas fa-asterisk mr-1"></i>
                                                    </a>
                                                    <span class="text-gray">&mdash;</span>
                                                    <div class="content mb-1 ml-1">
                                                        <strong>{{attr.name}}</strong>
                                                        <small class="text-xsmall">{{attr.description}}</small>
                                                    </div>
                                                </div>
                                                <div class="date">
                                                    <!-- <small>edit button here</small> -->
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </b-collapse>
                        </b-card>
                    </b-col>
                    <b-col cols="9">
                        <b-row>
                            <b-col cols="12" class="pr-1 pl-1">
                                <b-card no-body class="mb-2">
                                    <b-card-header style="background:#fff;" class="d-flex align-items-center justify-content-end py-2">
                                        <b-col sm="8" md="8" class="my-1">
                                            <div class="input-group">
                                                <b-form-input @input="executesearch" v-model="searchTerm" size="sm" type="text" placeholder="Search... product name." class="form-control"></b-form-input>
                                            </div>
                                        </b-col>
                                        <b-col sm="4" md="4" class="my-0 d-flex justify-content-end">
                                            <b-button @click="changeview('g')" class="mr-2 btn-dull-border" :class="{active:isgrid}" size="sm" variant="outline-primary"><i class="fas fa-th"></i></b-button>
                                            <b-button @click="changeview('l')" class="mr-2 btn-dull-border" :class="{active:islist}" size="sm" variant="outline-primary"><i class="fas fa-list"></i></b-button>
                                            <b-pagination v-if="isgrid==true" v-model="currentPage2" @input="selectpage" :total-rows="totalRows2" :per-page="perPage2" size="sm" class="my-0"></b-pagination>
                                            <b-pagination v-else-if="islist==true" v-model="currentPage3" @input="selectpage" :total-rows="totalRows3" :per-page="perPage3" size="sm" class="my-0"></b-pagination>
                                        </b-col>
                                    </b-card-header>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row class="d-flex">
                            <b-col v-if="islist" cols="12" class="pl-1 pr-1">
                                <b-card no-body>
                                    <b-card-body>
                                        <b-table bordered show-empty striped hover :current-page="currentPage3" :per-page="perPage3" :items="inventoryitems" :fields="inventoryfields">
                                            <template v-slot:cell(item)="row">
                                                <div class="content d-flex align-items-center justify-content-left">
                                                    <a href="#" style="margin-right:10px!important; width:45px!important; height:45px !important;">
                                                        <img class="img-fluid rounded inv-list-img" :src="row.item.image">
                                                    </a>
                                                    <div class="">
                                                        <span class="d-inline-block" style="font-size:1.0em;"> {{row.item.name}}</span>
                                                        <span class="d-block" style="color:#555; font-size:0.8em;"><strong>Type:</strong> {{row.item.type}} </span>
                                                    </div>
                                                </div>
                                            </template>
                                        </b-table>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <b-col v-else-if="isgrid" v-for="item in catentryitems" :key="item.catentry_id" md="6" xl="4" class="cat-item pl-1 pr-1">
                                <b-card no-body class="mb-2">
                                    <b-card-body>
                                        <div class="media align-items-center">
                                            <span v-if="item.fullimage==null" class="avatar avatar-xl mr-3" :style="{backgroundImage:`url(${defaultproductphoto})`}"></span>
                                            <span v-else-if="item.fullimage!=null" class="avatar avatar-xl mr-3" :style="{backgroundImage:`url(${item.fullimage})`}"></span>
                                            <div class="media-body overflow-hidden">
                                                <h5 class="card-text mb-0 text-xsmall">{{item.name}}</h5>
                                                <p class="card-text mb-1 text-uppercase" style="font-size:0.6rem !important;">{{item.catenttype_id}}</p>
                                                <strike><p class="card-text mb-0"> {{item.category}} </p></strike>
                                                <p class="card-text">Price {{item.symbol}}{{item.price}}</p>
                                            </div>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <b-modal ref="new-catalog-modal" size="md" id="new-catalog-modal" title="New Catalog" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitnewcatalog">
                            <b-card-body>
                                <b-row>
                                    <b-col md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Catalog name</label>
                                            <b-form-input size="sm" type="text" v-model="catalog.identifier" placeholder="Catalog name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Catalog Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="catalog.description" placeholder="Brief description"></b-form-textarea>
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
        <b-modal ref="new-category-modal" size="md" id="new-category-modal" title="New Category" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitnewcategory">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Category name</label>
                                            <b-form-input size="sm" type="text" v-model="category.identifier" placeholder="Category name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="6" md="6">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Parent catalog</label>
                                            <b-form-select size="sm" v-model="category.parent_catalog" :options="catalogselect" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col md="12">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Category Description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="category.description" placeholder="Brief description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" md="12">
                                        <div class="form-group mb-4">
                                            <b-form-checkbox id="checkbox-1" v-model="category.published" name="checkbox-1" value="Publish" unchecked-value="Withold">
                                                Publish or withold this category &mdash; <strong>{{ category.published }}</strong>
                                            </b-form-checkbox>
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
        <b-modal ref="new-item-modal" size="lg" id="new-item-modal" hide-footer>
            <template v-slot:modal-header>
                <h5>Add Inventory Item</h5>
                <div>
                    <b-dropdown variant="primary" size="sm" left :text="defaultoption ? 'Product' : 'Composite' ">
                        <b-dropdown-item @click="defaultoption=true">Product</b-dropdown-item>
                        <b-dropdown-item @click="defaultoption=false">Composite</b-dropdown-item>
                    </b-dropdown>
                    <button type="button" aria-label="Close" class="close">×</button>
                </div>
            </template>
            <b-container v-if="defaultoption==true" class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitnewitem">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Item name</label>
                                            <b-form-input size="sm" type="text" v-model="catentry.name" placeholder="Item name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">SKU / Part Number</label>
                                            <b-form-input size="sm" type="text" v-model="catentry.partnumber" placeholder="SKU or Product Code"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Manufacturer</label>
                                            <b-form-input size="sm" type="text" v-model="catentry.mfname" placeholder="Manufacturer's name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label mr-2">Upload Image</label>
                                            <div class="custom-file b-form-file b-custom-control-sm">
                                                <input type="file" id="productimage" ref="productimage" @change="previewproductimage" multiple="multiple" class="custom-file-input">
                                                <label for="productimage" data-browse="Browse" class="custom-file-label">{{productphotolabelvalue}}</label>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Make available from</label>
                                            <b-form-datepicker size="sm" type="text" v-model="catentry.availabilitydate" placeholder="Available from"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Expiry date</label>
                                            <b-form-datepicker size="sm" type="text" v-model="catentry.endofservicedate" placeholder="Expiry date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Currency</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Currency" v-model="catentry.currency" @change.native="changedcurrency" size="sm" list="currency-list"></b-form-input>
                                                <datalist id="currency-list">
                                                    <option>Select Currency</option>
                                                    <option v-for="currency in curselects" :key="currency.setccurr">{{currency.description}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">List Price</label>
                                            <b-form-input size="sm" type="number" required step="0.01" v-model="catentry.listprice" placeholder="List Price"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Catalog</label>
                                            <b-form-select size="sm" v-model="catentry.catalog_id" @change.native="categoryforcatalog" :options="catalogselect" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Category</label>
                                            <b-form-select size="sm" v-model="catentry.catgroup_id" :options="itemcategories" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="8" md="8">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Product description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="catentry.shortdescription" placeholder="Brief product description"></b-form-textarea>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                            <b-card-footer class="text-right">
                                <button class="btn btn-primary" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                            </b-card-footer>
                        </form>
                    </b-col>
                    <b-col cols="12" class="px-0">
                        <b-collapse :visible="attrvaluevisible" id="collapse-attrvalues" class="mt-2">
                            <b-card class="mb-0 px-0">
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="attrvalueitems" :fields="attrvaluefields">
                                    <template v-slot:head(show_details)>
                                        <b-form-checkbox disabled></b-form-checkbox>
                                    </template>
                                    <template v-slot:cell(show_details)="row">
                                        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                                            {{ row.detailsShowing ? 'Hide' : 'Show' }}
                                        </b-form-checkbox>
                                    </template>
                                    <template v-slot:head(action)>
                                        <div class="text-center">
                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" disabled size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                            <b-button class="btn-outline-dark btn-sm rounded" disabled size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:cell(action)="row">
                                        <div class="text-center">
                                            <b-button class="btn-outline-dark btn-sm rounded mr-1" @click="addattrvaluerow(row)" size="sm" type="button"><i class="fas fa-plus"></i></b-button>
                                            <b-button class="btn-outline-dark btn-sm rounded" @click="removeattrvaluerow(row.index)" size="sm" type="button"><i class="far fa-trash-alt"></i></b-button>
                                        </div>
                                    </template>
                                    <template v-slot:row-details>
                                        <b-row class="justify-content-center bg-white">
                                            <b-col cols="10" class="mr-auto ml-auto">
                                                <form class="card shadow-sm mb-0 border-1" @submit.prevent="addattribute">
                                                    <b-card-body>
                                                        <b-row>
                                                            <b-col sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute</label>
                                                                    <b-form-select size="sm" @change.native="changedattribute" v-model="attrform.attr_id" :options="attributeoptions" required></b-form-select>
                                                                </div>
                                                            </b-col>
                                                            <b-col sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Type</label>
                                                                    <b-form-select size="sm" v-model="attrform.attrtype_id" :options="attrtypeoptions" required></b-form-select>
                                                                </div>
                                                            </b-col>
                                                            <b-col v-if="attrform.attrtype_id==null" sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute Value</label>
                                                                    <b-form-input size="sm" type="text" v-model="attrform.value" placeholder="Attribute Value"></b-form-input>
                                                                </div>
                                                            </b-col>
                                                            <b-col v-else-if="attrform.attrtype_id=='String'" sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute Value</label>
                                                                    <b-form-input size="sm" type="text" v-model="attrform.value" placeholder="String Value"></b-form-input>
                                                                </div>
                                                            </b-col>
                                                            <b-col v-else-if="attrform.attrtype_id=='Integer'" sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute Value</label>
                                                                    <b-form-input size="sm" type="text" v-model="attrform.value" placeholder="Integer Value"></b-form-input>
                                                                </div>
                                                            </b-col>
                                                            <b-col v-else-if="attrform.attrtype_id=='Float'" sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute Value</label>
                                                                    <b-form-input size="sm" type="text" v-model="attrform.value" placeholder="Float Value"></b-form-input>
                                                                </div>
                                                            </b-col>
                                                            <b-col v-else-if="attrform.attrtype_id=='Datetime'" sm="4" md="4">
                                                                <div class="form-group mb-2">
                                                                    <label class="form-label">Attribute Value</label>
                                                                    <b-form-datepicker size="sm" type="text" v-model="attrform.value" placeholder="Date"></b-form-datepicker>
                                                                </div>
                                                            </b-col>
                                                        </b-row>
                                                    </b-card-body>
                                                    <b-card-footer class="text-right">
                                                        <button class="btn btn-primary btn-sm" type="submit"><i class="fas fa-save mr-1"></i>Save</button>
                                                    </b-card-footer>
                                                </form>
                                            </b-col>
                                        </b-row>
                                    </template>
                                </b-table>
                            </b-card>
                        </b-collapse>
                    </b-col>
                </b-row>
            </b-container>
            <b-container v-else-if="defaultoption==false" class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitparentcomposite">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Item name</label>
                                            <b-form-input size="sm" type="text" v-model="catentrycomposite.name" placeholder="Item name" required></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">SKU / Part Number</label>
                                            <b-form-input size="sm" type="text" v-model="catentrycomposite.partnumber" placeholder="SKU or Product Code"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Manufacturer</label>
                                            <b-form-input size="sm" type="text" v-model="catentrycomposite.mfname" placeholder="Manufacturer's name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label mr-2">Upload Image</label>
                                            <div class="custom-file b-form-file b-custom-control-sm">
                                                <input type="file" id="compositeimage" ref="compositeimage" @change="previewcompositeimage" multiple="multiple" class="custom-file-input">
                                                <label for="compositeimage" data-browse="Browse" class="custom-file-label">{{productphotolabelvalue}}</label>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Make available from</label>
                                            <b-form-datepicker size="sm" type="text" v-model="catentrycomposite.availabilitydate" placeholder="Available from"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Expiry date</label>
                                            <b-form-datepicker size="sm" type="text" v-model="catentrycomposite.endofservicedate" placeholder="Expiry date"></b-form-datepicker>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Currency</label>
                                            <template>
                                                <b-form-input required placeholder="Fill &amp; Select Currency" v-model="catentrycomposite.currency" @change.native="changedcompositecurrency" size="sm" list="currency-list"></b-form-input>
                                                <datalist id="currency-list">
                                                    <option>Select Currency</option>
                                                    <option v-for="currency in curselects" :key="currency.setccurr">{{currency.description}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">List Price</label>
                                            <b-form-input size="sm" type="number" required step="0.01" v-model="catentrycomposite.listprice" placeholder="List Price"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Catalog</label>
                                            <b-form-select size="sm" v-model="catentrycomposite.catalog_id" @change.native="categoryforcatalog" :options="catalogselect" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="3" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Category</label>
                                            <b-form-select size="sm" v-model="catentrycomposite.catgroup_id" :options="itemcategories" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="9" md="8">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Product description</label>
                                            <b-form-textarea :rows="1" :max-rows="6" v-model="catentrycomposite.shortdescription" placeholder="Brief product description"></b-form-textarea>
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
                <b-row>
                    <b-col cols="12" class="px-0 mt-4">
                        <b-card no-body class="shadow-none mb-4" style="border-top:1px solid #E9ECEF">
                            <b-card-header class="text-right">
                                <button class="btn btn-primary btn-sm" @click="submitall" type="button"><i class="fas fa-save mr-1"></i>Save All</button>
                            </b-card-header>
                            <b-card-body>
                                <b-table striped hover :items="relitems" :fields="relfields"></b-table>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitcatentrel">
                            <b-card-body>
                                <b-row>
                                    <b-col sm="5" md="5">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Container Product</label>
                                            <template>
                                                <b-form-input placeholder="Type or Select Product" v-model="catentrel.container_product" @change.native="changedcontainerselection" size="sm" list="catentry-parent-list"></b-form-input>
                                                <datalist id="catentry-parent-list">
                                                    <option>Select Product</option>
                                                    <option v-for="entry in composites" :key="entry.catentry_id">{{entry.name}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="5" md="5">
                                        <div class="form-group mb-4">
                                            <label class="form-label">Content Product</label>
                                            <template>
                                                <b-form-input placeholder="Type or Select Product" v-model="catentrel.content_product" @change.native="changedcontentselection" size="sm" list="catentry-container-list"></b-form-input>
                                                <datalist id="catentry-container-list">
                                                    <option>Select Product</option>
                                                    <option v-for="entry in catentries" :key="entry.catentry_id">{{entry.name}}</option>
                                                </datalist>
                                            </template>
                                        </div>
                                    </b-col>
                                    <b-col sm="2" md="2">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Quantity</label>
                                            <b-form-input size="sm" type="number" required step="1" v-model="catentrel.quantity" placeholder="Quantity"></b-form-input>
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
        <b-modal ref="new-attr-modal" size="lg" id="new-attr-modal" title="New Product Attribute" hide-footer>
            <b-container class="px-0">
                <b-row>
                    <b-col cols="12" class="px-0">
                        <form class="card shadow-none mb-0" @submit.prevent="submitattribute">
                            <b-card-body>
                                <b-table bordered show-empty striped hover :current-page="currentPage" :per-page="perPage" :items="attributeitems" :fields="attributefields"></b-table>
                            </b-card-body>
                            <b-card-body>
                                <b-row>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Attribute Name</label>
                                            <b-form-input size="sm" type="text" v-model="attribute.identifier" placeholder="Attribute Name"></b-form-input>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Attribute Type</label>
                                            <b-form-select size="sm" v-model="attribute.attrtype_id" :options="attrtypeoptions" required></b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col sm="4" md="4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Description</label>
                                            <b-form-input size="sm" type="text" v-model="attribute.description" placeholder="Attribute Description"></b-form-input>
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
import * as JQuery from "jquery"
import VueCustomScrollbar from 'vue-custom-scrollbar'
export default {
    name:"catalogindex",
    components:{VueCustomScrollbar},
    data(){
        return {
            searchTerm:'',
            currentPage:1,totalRows:null,perPage:10,
            perPage2:12,currentPage2:1,totalRows2:null,
            perPage3:6,currentPage3:1,totalRows3:null,
            filter:null,
            defaultoption:true,
            attrvaluevisible:false,
            settings: {maxScrollbarLength: 100},
            
            relfields:["container_product","content_product","quantity"],
            relitems:[],
            ac_token:requester.getfromlocalstorage("access_token"),
            rf_token:requester.getfromlocalstorage("refresh_token"),
            success_message:null,
            showSnackbar:false,
            duration:4000,
            position:"center",
            productphotolabelvalue:"No file chosen",
            defaultavatar:requester.baseurl+'/static/profileuploads/product-default-2.png',
            defaultproductphoto:requester.baseurl+'/static/profileuploads/product-default.jpg',

            employer_id:requester.getfromlocalstorage("employer"),
            language_id:requester.getfromlocalstorage("language_id"),
            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            profile:requester.getfromlocalstorage("profile"),

            cataloglists:[],
            categorylists:[],
            catalogselect:[{value:null,text:"Select Catalog"}],
            curselects:[],
            itemcategories:[{value:null,text:"Select Category"}],
            catentries:[],
            composites:[],
            compositetabindex:0,
            accountsoptions:[{value:null,text:"Select Account"}],
            catalog:{
                identifier:null,language_id:requester.getfromlocalstorage("language_id"),
                member_id:requester.getfromlocalstorage("employer"),description:null,
            },
            category:{
                identifier:null,language_id:requester.getfromlocalstorage("language_id"),
                member_id:requester.getfromlocalstorage("employer"),description:null,
                published:"Publish",parent_catalog:null,
            },
            catentry:{
                language_id:requester.getfromlocalstorage("language_id"),
                member_id:requester.getfromlocalstorage("employer"),itemspc_id:null,catenttype_id:'Item',
                partnumber:null,mfpartnumber:null,mfname:null,currency:null,listprice:null,
                catalog_id:null,catgroup_id:null,lastupdate:null,endofservicedate:null,
                name:null,shortdescription:null,fullimage:null,available:null,published:1,availabilitydate:null
            },
            catentrycomposite:{
                language_id:requester.getfromlocalstorage("language_id"),
                member_id:requester.getfromlocalstorage("employer"),
                itemspc_id:null,catenttype_id:'Bundle',partnumber:null,mfpartnumber:null,mfname:null,
                currency:null,listprice:null,catalog_id:null,catgroup_id:null,lastupdate:null,
                endofservicedate:null,name:null,shortdescription:null,fullimage:null,available:null,
                published:1,availabilitydate:null,
            },
            catentrel:{
                container_product:null,catreltype_id:'Bundle_Component',content_product:null,quantity:null,
            },
            attributeitems:[],
            attributefields:[],
            attrtypeoptions:null,
            attributeoptions:[{value:null,text:"Select Attribute"}],
            attribute:{
                identifier:null,
                attrtype_id:null,
                language_id:requester.getfromlocalstorage("language_id"),
                description:null,
            },
            attrvaluefields:['show_details','attribute','type','value','action'],
            attrvalueitems:[{attr_id:null,attribute:null,type:null,attrtype_id:null,value:null}],
            attrform:{attr_id:null,attrtype_id:null,value:null,catentry_id:null,usage:2,
            language_id:requester.getfromlocalstorage("language_id")},
            catentryitems:[],catentrysplits:[],combinedcatentries:[],
            inventoryitems:[],inventoryfields:[],islist:false,isgrid:true,
        }
    },
    computed:{
    },
    created(){
        var catlistdata=requester.ajax_request("/api/v1.0/read_catalogs","POST",this.ac_token,this.rf_token,true,{member_id:this.employer_id,language_id:this.language_id})
        var catgroupdata=catlistdata.then(result=>{
            this.cataloglists=result
            result.forEach((item)=>{
                this.catalogselect.push({value:item.catalog_id,text:item.name})
            })
            return requester.ajax_request("/api/v1.0/read_categories","POST",this.ac_token,this.rf_token,true,{member_id:this.employer_id,language_id:this.language_id})
        })
        var curlist=catgroupdata.then(result => {
            this.categorylists=result
            return requester.ajax_request("/api/v1.0/list_currs","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        var catentrylist=curlist.then(result => {
            this.curselects=result
            return requester.ajax_request("/api/v1.0/list_catentries","POST",this.ac_token,this.rf_token,true,{member_id:this.employer_id,language_id:this.language_id})
        })
        var accountlist=catentrylist.then(result => {
            this.catentries=result
            return requester.ajax_request("/api/v1.0/list_accounts","POST",this.ac_token,this.rf_token,true,{member_id:this.employer,language_id:this.language_id})
        })
        var attrtypedata=accountlist.then(result => {
            result.forEach((item)=>{
                this.accountsoptions.push({value:item.faccount_id,text:item.identifier})
            })
            return requester.ajax_request("/api/v1.0/read_attrtypes","GET",this.ac_token,this.rf_token,false,null)
        })
        var attrdata=attrtypedata.then(result => {
            result.unshift({value:null,text:"Select Type"})
            this.attrtypeoptions=result
            return requester.ajax_request("/api/v1.0/read_attr","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        var containerdata=attrdata.then(result => {
            result.forEach((item)=>{
                this.attributeoptions.push({value:item.attr_id,text:item.identifier})
            })
            this.attributefields=['name','attribute_type','description']
            this.attributeitems=result
            this.totalRows=result.length
            return requester.ajax_request("/api/v1.0/list_composite_containers","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id,member_id:this.employer})
        })
        var catentrydata=containerdata.then(result => {
            this.composites=result
            return requester.ajax_request("/api/v1.0/read_catentries","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id,member_id:this.employer})
        })
        var inventorydata=catentrydata.then(result => {
            this.combinedcatentries=result
            this.totalRows2=result.length
            this.catentryitems=requester.splitarr(result,this.perPage2)[0]
            return requester.ajax_request("/api/v1.0/list_inventory","POST",this.ac_token,this.rf_token,true,{language_id:this.language_id})
        })
        inventorydata.then(result=>{
            // console.log(result)
            this.inventoryitems=result
            this.inventoryfields=['item','expires','quantity','store','warehouse']
            this.totalRows3=result.length
        })
    },
    methods:{
        changeview(v){
            if(v=="g"){this.isgrid=true;this.islist=false;}
            else if(v=="l"){this.isgrid=true;this.islist=false;}
            else {this.isgrid=true;this.islist=false;}
        },
        executesearch(e){
            if(e.length > 0){
                var filteritems=this.catentryitems.filter((item)=>{
                    return item.name.toLowerCase().match(e.toLowerCase())
                })
                this.catentryitems=filteritems
            }else{
                let splits=requester.splitarr(this.combinedcatentries,this.perPage2)
                this.catentryitems=splits[this.currentPage2-1]
            }
        },
        selectpage(e){
            let splits=requester.splitarr(this.combinedcatentries,this.perPage2)
            this.catentryitems=splits[e-1]
        },
        changedattribute(e){
            let val=e.target.value
            if(val==''){this.attrform.attrtype_id=null}
            else{
                this.attributeitems.forEach((item)=>{
                    if(val==item.attr_id){this.attrform.attrtype_id=item.attrtype_id.trim()}
                })
            }
        },
        addattribute(){
            const payload={...this.attrform}
            requester.ajax_request("/api/v1.0/create_catentryattr","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-item-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        removeattrvaluerow(index){this.attrvalueitems.splice(index,1)},
        addattrvaluerow(data){
            const copyitems=JSON.parse(JSON.stringify(this.attrvalueitems))
            copyitems[data.index]._showDetails = false
            this.attrvalueitems.push(copyitems[data.index])
        },
        setproduct(){this.defaultoption=true},
        setcomposite(){this.defaultoption=false},
        submitattribute(){
            const payload={...this.attribute}
            requester.ajax_request("/api/v1.0/create_attribute","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.attributefields=['name','attribute_type','description']
                this.attributeitems=result.attrdata
                this.totalRows=result.attrdata.length
                this.$refs['new-attr-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitall(){
            requester.ajax_request("/api/v1.0/create_composite","POST",this.ac_token,this.rf_token,true,{components:this.relitems}).done(result=>{
                this.success_message=result.msg
                this.showSnackbar=true
                this.$refs['new-item-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        changedcontainerselection(e){
            let val=e.target.value
            console.log(val)
        },
        changedcontentselection(e){
            let val=e.target.value
            console.log(val)
        },
        submitcatentrel(){
            const payload={...this.catentrel}
            this.relitems.push({container_product:payload.container_product,content_product:payload.content_product,
            quantity:payload.quantity,catreltype_id:payload.catreltype_id})
        },
        submitparentcomposite(){
            const payload={...this.catentrycomposite}
            requester.ajax_request("/api/v1.0/create_parent_composite","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.compositetabindex+=1
                this.composites=result.entries
                this.catentryitems=result.catentryitems
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        categoryforcatalog(e){
            let val=e.target.value
            requester.ajax_request("/api/v1.0/catgroups_for_catalog","POST",this.ac_token,this.rf_token,true,{catalog_id:val}).done(result => {
                result.unshift({value:null,text:"Select Category"})
                this.itemcategories=result
            })
        },
        changedcompositecurrency(e){
            let val=e.target.value
            this.curselects.forEach((item)=>{
                if(item.setccurr==val){this.catentrycomposite.currency=item.setccurr}
            })
        },
        changedcurrency(e){
            let val=e.target.value
            this.curselects.forEach((item)=>{
                if(item.setccurr==val){this.catentry.currency=item.setccurr}
            })
        },
        showdetails(row){
            console.log(row.item)
            console.log(row.index)
        },
        previewcompositeimage(){
            let formdata = new FormData()
            let input = this.$refs.compositeimage.files[0]
            formdata.append("image",input)
            this.productphotolabelvalue=input.name
            JQuery.ajax({url:requester.baseurl+"/productuploads",type:"POST",data:formdata,
			cache:false,processData:false,contentType:false,}).done(result => {
                this.success_message = "Successfully uploaded "+result.name+" to storage."
                this.showSnackbar = true
                this.catentrycomposite.fullimage=result.url
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        previewproductimage(){
            let formdata = new FormData()
            let input = this.$refs.productimage.files[0]
            formdata.append("image",input)
            this.productphotolabelvalue=input.name
            JQuery.ajax({url:requester.baseurl+"/productuploads",type:"POST",data:formdata,
			cache:false,processData:false,contentType:false,}).done(result => {
                this.success_message = "Successfully uploaded "+result.name+" to storage."
                this.showSnackbar = true
                this.catentry.fullimage=result.url
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitnewitem(){
            const payload={...this.catentry}
            console.log(payload)
            requester.ajax_request("/api/v1.0/create_catentry","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.attrvaluefields=['show_details','attribute','type','value','action']
                this.attrvalueitems=[{attr_id:null,attribute:null,type:null,attrtype_id:null,value:null}]
                this.attrvaluevisible=true
                this.catentryitems=result.catentryitems
                this.attrform.catentry_id=result.entries[0].catentry_id
                this.catentries=result.entries
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitnewcategory(){
            const payload={...this.category}
            requester.ajax_request("/api/v1.0/create_category","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.categorylists=result.returns
                this.$refs['new-category-modal'].hide()
            }).fail((jqXHR,textStatus,errorThrown) => {
                console.log(jqXHR.responseJSON)
                console.log(textStatus)
                console.log(errorThrown)
            })
        },
        submitnewcatalog(){
            const payload={...this.catalog}
            requester.ajax_request("/api/v1.0/create_catalog","POST",this.ac_token,this.rf_token,true,payload).done(result => {
                this.success_message=result.msg
                this.showSnackbar=true
                this.cataloglists=result.returns
                result.returns.forEach((item)=>{
                    this.catalogselect.push({value:item.catalog_id,text:item.name})
                })
                this.$refs['new-catalog-modal'].hide()
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