const movie = {
    namespaced:true,
    state:{
        movieList: []
    },
    mutations:{
        newMovieList(state,msg){
            state.movieList = msg;
        }
    },
    actions:{
        newMovieLists(context,msg){
            setTimeout(() => {
                context.commit('newMovieList',msg);
            },200);
        }
    }
};
export default movie