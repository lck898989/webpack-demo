import Index from './index.js';
import ComomonCSS from '../style/common.css';
import '../style/cart.css'
import '../style/test.less'
import Vue from '../js/vue/vue-dev-min.js'
import cartHead from '../components/cart-components/cart-head.vue';
console.log("vue is ",Vue);
let m = {
    x : 2,
    y : 3
}
let o = Object.freeze(m);
console.log("o is ",o);
let app = new Vue({
    el : '#app',
    data : {
        name : 'cart',
        message : '购物车页面'
    },
    components : {
        'c-cart' : cartHead
    }
})