const book = {
    namespaced:true,
    state:{
        bookList: []
    },
    mutations:{
        newBookList(state,msg){
            state.bookList = msg;
        }
    },
    actions:{
        newBookLists(context,msg){
            setTimeout(() => {
                context.commit('newBookList',msg);
            },2000)
        }
    }
};
export default book
