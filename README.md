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
});

```

### unit测试Movie.vue组件
```
import {shallowMount, createLocalVue, mount} from '@vue/test-utils';
import {expect} from 'chai';
import Vuex from "vuex";
import App from '../../src/App';
import Movie from '../../src/components/Movie';
import MovieDetail from '../../src/components/MovieDetail';
import VueRouter from "vue-router";
import movie from '../../src/store/movie';

const wrapper = shallowMount(Movie);

describe('Movie component', () => {
    it('has a mount hook', () => {
        expect(typeof Movie.mounted).to.eql('function');
    })

    it('check default data', () =>{
        const defaultData = Movie.data();
        expect(defaultData.currentTabName).to.eql('Top250');
    })

    it('check change tab function', () => {
        wrapper.vm.changeTab("Top250");
        expect(wrapper.vm.baseUrl).to.eql("/ban/v2/movie/top250");
        wrapper.vm.changeTab("正在上映");
        expect(wrapper.vm.baseUrl).to.eql("/ban/v2/movie/in_theaters");
        wrapper.vm.changeTab("即将上映")
        expect(wrapper.vm.baseUrl).to.eql("/ban/v2/movie/coming_soon");
        wrapper.vm.changeTab("新片榜");
        expect(wrapper.vm.baseUrl).to.eql("/ban/v2/movie/new_movies");
        wrapper.vm.changeTab("口碑榜");
        expect(wrapper.vm.baseUrl).to.eql("/ban/v2/movie/weekly");
        wrapper.vm.changeTab("北美票房榜");
    })

    it('check changePageList', () =>{
        const wrapper = shallowMount(Movie);
        wrapper.vm.changePageList(2);
        expect(wrapper.vm.start).to.eql(2);
    })

    it('check the detail, render child com via routing', () => {
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        const router = new VueRouter({
            routes: [
                { path: '/movie', name: "Movie", component: Movie},
                { path: "/movie/:id", name: "MovieDetail", component:MovieDetail}
            ]
        });
        const wrapperRouter = mount(App, {localVue, router});
        router.push("/movie/1292052");
        expect(wrapperRouter.find(MovieDetail).exists()).to.be.not.ok;
    })

    it('check movie store about mutations', function() {
        const localVue = createLocalVue();
        localVue.use(Vuex);
    
        const vuexStore = new Vuex.Store(movie);
        vuexStore.commit('newMovieList', ["爱与和平"]);
        expect(vuexStore.state.movieList).length === 1;
    });

    it('chech movie store about action', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);

        const vuexStore = new Vuex.Store(movie);
        vuexStore.dispatch('newMovieLists', ["加油奋斗"]);
        expect(vuexStore.state.movieList).length === 1;
    })
})
```

### unit测试Book.vue组件
```
import {shallowMount, createLocalVue, mount} from '@vue/test-utils';
import {expect} from 'chai';
import fetch from "node-fetch";
import App from '../../src/App';
import Book from '../../src/components/Book';
import BookDetail from '../../src/components/BookDetail';
import VueRouter from "vue-router";
import  Vuex from 'vuex';
import book from '../../src/store/book';

const wrapper = shallowMount(Book);

describe('Book component', () => {
    beforeEach(() => {

    })
    it('has a created hook', () => {
        expect(typeof Book.created).to.eql('function');
    })

    it('check default data', () =>{
        expect(Book.data().currentCategory).to.eql('文学');
    })

    it('check change tab function', () => {
        const wrapper = shallowMount(Book);
        wrapper.vm.changeTab("小说");
        expect(wrapper.vm.currentCategory).to.eql('小说');
    })

    it('check changePageList', () =>{
        Book.methods.changePageList(2);
        expect(Book.data().start).to.eql(1);
    })

    it('check the detail, render child com via routing', () => {
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        const router = new VueRouter({
            routes: [
                { path: '/book',  name: "Book", component: Book },
                { path: "/book/:id", name: "BookDetail", component: BookDetail},
            ]
        });
        const wrapperRouter = mount(App, {localVue, router});
        router.push("/book/1292052");
        expect(wrapperRouter.find(BookDetail).exists()).to.be.not.ok;
    })

    it('check book store about mutations', function() {
        const localVue = createLocalVue();
        localVue.use(Vuex);
    
        const vuexStore = new Vuex.Store(book);
        vuexStore.commit('newBookList', ["爱与和平"]);
        expect(vuexStore.state.bookList).length === 1;
      });

      it('chech book store about action', () => {
          const localVue = createLocalVue();
          localVue.use(Vuex);

          const vuexStore = new Vuex.Store(book);
          vuexStore.dispatch('newBookLists', ["加油奋斗"]);
          expect(vuexStore.state.bookList).length === 1;
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
![coverage.png](https://github.com/ljlhnick/vueDouban/tree/dev/public/showCase/coverage.png)


### API
```
douba api  must has apikey=0b2bdeda43b5688921839c8ecb20399b
the document is here:  https://douban-api-docs.zce.me/
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
