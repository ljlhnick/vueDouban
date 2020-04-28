import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import book from "./book";
import movie from "./movie"

const moduleA={
    namespaced: true,
    state:{
        products:[
            {name:"键盘",price:251},
            {name:"耳机",price:120},
            {name:"鼠标",price:158},
            {name:"显示屏",price:748}
        ],
        activeMenu: ''
    },
    getters:{
        saleProducts:(state => {
            let saleProducts=state.products.map(product=>{
                return{
                    name:product.name,
                    price:product.price/2
                }
            });
            return saleProducts;
        })
    },
    mutations:{
        minuPrice(state,payload){
            state.products.forEach(product=> {
                product.price-=payload
            })
        },
        setActiveMenu(state, payload){
            state.activeMenu = payload;
        }
    },
    actions:{
        minuPriceAsync(context,payload){
            setTimeout(()=>{
                context.commit('minuPrice',payload);
            },2000)
        }
    }
};

const store = new Vuex.Store({
    modules:{
        index:moduleA,
        book:book,
        movie:movie
    }
});

export default store;