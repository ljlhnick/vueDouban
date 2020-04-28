# vue-douban

### UI 
```
iview
https://www.iviewui.com/components/button
```

use Menu in App.vue
use Carousel Divider Drawer Timeline in Index.Vue
use Button ButtonGroup Page Spin in Movie.vue/Book.vue

vue router + vuex + webpack

unit测试Index.vue组件
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
截图

E2E测试
```
// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })
})
```
截图

```
question: 1.refresh the menu not correctly active
2. 单元测试
3. bookdetail
```



### API
```
douba api  must has apikey=0b2bdeda43b5688921839c8ecb20399b
the document is here:  https://douban-api-docs.zce.me/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### vue UI
```
vue ui
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
