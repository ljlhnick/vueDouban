import { expect } from 'chai';
import fetch from "node-fetch";
import Vue from "vue";
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Index from '@/components/Index.vue';
import Vuex from 'vuex';
import { moduleA } from "../../src/store/index.js";

describe('Index.vue', () => {
  //检查原始组件选项
  it('has a created hook',() => {
    expect(typeof Index.created).to.eql("function");
  });

  // 评估Index组件中Carousel组件从下标为0的图片开始
  it('sets the correct default data',() => { 
    expect(typeof Index.data).to.eql('function');
    const defaultData = Index.data();
    expect(defaultData.carouseIndex).to.exist;
    expect(defaultData.carouseIndex).to.eql(0);
  });


  //创建一个实例并检查渲染输出--图片轮播有5张
  it('render the correct message', ()=>{
    const Constructor = Vue.extend(Index);
    const vm = new Constructor().$mount();
    expect(vm.$el.carsouleList).length == 5;
  });

  //通过但是没有被覆盖
  it('check computed value', () => {
    const vm = new Vue(Index).$mount();
    expect(Index.computed.products).length === 4;
    expect(vm.$el.products).length > 0;
  })

  //测试getters
  it('check getters saleProducts', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const vuexStore = new Vuex.Store(moduleA);
    vuexStore.getters.saleProducts;
    expect(vuexStore.state.products[1].price).to.eql(120);
  })

  //测试mutataions
  it('check mutataions minuPrice', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const vuexStore = new Vuex.Store(moduleA);
    vuexStore.commit('minuPrice', 2);
    expect(vuexStore.state.products).length === 4;
  })

  it('check mutataions setActiveMenu', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const vuexStore = new Vuex.Store(moduleA);
    vuexStore.commit('setActiveMenu', '电影');
    expect(vuexStore.state.activeMenu).to.eql("电影");
  })

  //测试action
  it('check minuPriceAsync', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const vuexStore = new Vuex.Store(moduleA);
    vuexStore.dispatch('minuPriceAsync', 5);
    setTimeout(() => {
      vuexStore.commit('minuPrice', 5);
      expect(vuexStore.state.products[0].price).to.eql(246);
      done(); 
    }, 2000);
  })


  //测试get请求
  // it('check get request', () => {
  //   return fetch("/api/index").then((res) => {
  //     return res.data;
  //   }).then((res) => {
  //     expect(res.data.list).to.be.an('object');
  //   })
  // })
});
