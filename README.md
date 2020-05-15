# vue-douban

### vue + vue-router + vuex + iview  + Jest
use Menu in App.vue
use Carousel Divider Drawer Timeline in Index.Vue
use Button ButtonGroup Page Spin in Movie.vue/Book.vue

## Project setup
```
npm install
npm run build
npm run test
npm run lint
npm run test:e2e
npm run test:unit
```

### vue UI
```
vue ui
```


### unit测试Index.vue组件
```
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
```

### E2E测试
```
// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })
})
```
### this project showCase
![index.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/index.png)
![movie.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/movie.png])
![movieDetail.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/movieDetail.png)
![book.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/book.png)
![bookDetail.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/bookDetail.png)
![page.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/page.png)


```
question: 1.单元测试
```


### API
```
douba api  must has apikey=0b2bdeda43b5688921839c8ecb20399b
the document is here:  https://douban-api-docs.zce.me/
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
