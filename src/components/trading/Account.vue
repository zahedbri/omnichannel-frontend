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
                            <b-dropdown-item v-b-modal.new-composite-modal>Assemble composite</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <!-- <p class="mb-0">
                        <button v-b-modal.new-catalog-modal class="btn btn-primary btn-sm" type="button"><i class="fas fa-plus mr-1 text-xsmall"></i>catalog</button>
                        <button v-b-modal.new-category-modal class="btn btn-outline-secondary btn-sm ml-1" type="button"><i class="fas fa-plus mr-1 text-xsmall"></i>category</button>
                    </p> -->
                </div>
            </b-container>
        </div>
        <section>
            <b-container fluid>
                <header></header>
                <b-row>
                </b-row>
            </b-container>
        </section>
    </div>
</template>
<script>
import requester from "@/services/requester"
export default {
    name:"newaccount",
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
            perPage:10,
            filter:null,

            user_id:requester.getfromlocalstorage("user_id"),
            employer:requester.getfromlocalstorage("employer"),
            employername:requester.getfromlocalstorage("employername"),
            roledisplayname:requester.getfromlocalstorage("roledisplayname"),
            role_id:requester.getfromlocalstorage("role_id"),
            rolename:requester.getfromlocalstorage("rolename"),
            language_id:requester.getfromlocalstorage("language_id"),
            profile:requester.getfromlocalstorage("profile"),

            contractitems:null,
            contractfields:null,

        }
    },
    created(){},
    methods(){}
}
</script>

<style lang="scss" scoped>
</style>