<template>
    <div class="index-head">{{index}}</div>
</template>
<script>
import vueCompiler from 'vue-template-compiler'
export default {
    data(){
        return {
            index : '首页头部组件'
        }
    },
    methods : {

    },
    computed: {
        
    },

}
</script>
<style lang="less">
    .index-head{
        background: red;
    }
</style>


