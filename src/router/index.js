import Vue from 'vue'
import VueRouter from  "vue-router"
Vue.use(VueRouter);

import Index from "../components/Index";
import Movie from "../components/Movie";
import MovieDetail from "../components/MovieDetail";
import Book from "../components/Book";
import BookDetail from "../components/BookDetail";

const routes = [
    { path :"/", name: 'Index', component: Index },
    { path: '/movie', name: "Movie", component: Movie},
    { path: "/movie/:id", name: "MovieDetail", component:MovieDetail},
    { path: '/book',  name: "Book", component: Book },
    { path: "/book/:id", name: "BookDetail", component: BookDetail},
];

const router = new VueRouter({
   routes
});

// router.beforeEach((to, from, next) => {
//     console.log('to.path',to.path)
//     console.log('to.path',from.path)
//     next()
// })

export default router;

