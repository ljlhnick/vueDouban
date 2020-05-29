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

    // it('check axios', () => {
    //     return fetch("http://localhost:8083/ban/v2/movie/top250?start=0&count=10&apikey=0b2bdeda43b5688921839c8ecb20399b").then((res) => {
    //         console.log(res);
    //         return res;
    //     }).then((res) => {
    //         console.log(res);
    //         expect(res.subjects).to.be.an('object');
    //     })
    // })

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