<template>
    <div>
        {{ token }}
    </div>
</template>

<script>
export default {
    data(){
        return {
            token:this.$route.params.token
        }
    }
}
</script>

<style lang="scss" scoped>
</style>