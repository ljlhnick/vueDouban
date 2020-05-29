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