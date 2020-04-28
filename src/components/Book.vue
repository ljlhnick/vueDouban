<template>
    <div class="book">
        <!--<ul v-for="(item,index) in products" :key="index">-->
            <!--<li>{{item.name}}需要{{item.price}}钱</li>-->
        <!--</ul>-->
        <Tabs :value="currentCategory" @on-click="changeTab">
            <TabPane :label="item" :name="item" v-for="(item,index) in categorys" :key="index">
                <div class="row">
                    <div class="col-md-3 col-lg-3" v-for="(item,index) in bookLists" :key="index">
                        <div class="card">
                            <img class="card-img-top" :src="item.image" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{item.title}}</h5>
                                <p class="card-text">{{item.summary}}</p>
                                <Button type="success" @click="toDetail(item.id)">Go</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Page :current="start" :total="bookTotalCount" show-sizer show-total @on-change="changePageList"/>
            </TabPane>
        </Tabs>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
    import axios from "axios";
    
    import {mapGetters,mapState,mapActions} from "vuex";
    export default {
        name: "Book",
        data(){
            return{
                spinShow: true,
                categorys:["文学","小说","漫画","青春","科幻","武侠","旅行","美食","编程","摄影","音乐"],
                currentCategory:"文学",
                bookLists:[],
                start: 1,
                count: 12,
                bookTotalCount: 0
            }
        },
        computed:{
            ...mapGetters('index',{
                products:"saleProducts"
            }),
        },
        created(){
            this.getRequestData();
        },
        methods:{
            ...mapActions('book',[
                'newBookLists'
            ]),
            getRequestData(){
                let self=this;
                axios.get(`/ban/v2/book/search?q=${self.currentCategory}&start=${(self.start-1)*self.count}&count=${self.count}&apikey=0b2bdeda43b5688921839c8ecb20399b`).then((res)=>{
                    self.bookLists = res.data.books;
                    self.bookTotalCount = res.data.total;
                    self.spinShow = false;
                    self.newBookLists(res.data.books);
                });
            },
            changeTab(tab){
                this.currentCategory = tab;
                this.spinShow = true;
                this.getRequestData();
            },
            changePageList(page){
                this.start = page;
                this.getRequestData();
            },
            toDetail(id){
                this.$router.push({name:"BookDetail",params:{id:id}})
            }
        }
    }
</script>
<style>
 .book .ivu-tabs{
        width: 100%;
}
.container .ivu-page-item-active{
    background: #2d8cf0;
}
</style>
<style scoped lang="less">
    a{
        text-decoration: none;
        color: #592e56;
    }
    .card{
        img{
            height: 250px;
        }
        margin:10px;
        height: 500px;
        .card-title{
            height: 15px;overflow: hidden;
            font-size: 10px;
        }
        .card-text{
            color: #000;
            width: 100%;
            overflow: hidden;
            height: 160px !important;
        }
    }
</style>
