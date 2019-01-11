import CommonCss from '../style/common.css';
import Vue from './vue/vue-dev-min.js';
import indexHead from '../components/index-components/index.vue'
let vm = new Vue({
    el : '#index',
    data : {
        message : '首页'
    },
    components : {
        "c-head" : indexHead 
    } 
})