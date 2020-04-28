import { expect } from 'chai'
import Vue from "vue"
//import { shallowMount } from '@vue/test-utils'
import Index from '@/components/Index.vue'

describe('Index.vue', () => {
  //检查原始组件选项
  it('has a created hook',() => {
    expect(typeof Index.created).to.eql("function");
  });

  // 评估Index组件中Carousel组件从下标为0的图片开始
  it('sets the correct default data',() => { 
    expect(typeof Index.data).to.eql('function')
    const defaultData = Index.data();
    expect(defaultData.carouseIndex).to.eql(0)
  });

  // 检查 mount 中的组建实例
  it('correctly sets the message bofore request',() => {
    const vm = new Vue(Index).$mount();
    expect(vm.userList).length > 0;
  });

  //创建一个实例并检查渲染输出--图片轮播有5张
  it('render the correct message', ()=>{
    const Constructor = Vue.extend(Index);
    const vm = new Constructor().$mount();
    expect(vm.$el.carsouleList).length == 5;
  });
});
