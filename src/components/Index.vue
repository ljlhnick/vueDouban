<template>
    <div class="container">
        <Carousel autoplay v-model="carouseIndex" loop class="carousel">
            <CarouselItem v-for="(item,index) in carsouleList" :key="index">
                <div class="carItem" :name="index">
                    <img :src=item.src>
                </div>
            </CarouselItem>
        </Carousel>

        <Divider style="color: #fff">With Text</Divider>

        <Row>
            <Col span="4">
                <Button @click="value1 = true" type="primary">Open</Button>
                <Drawer title="Basic Drawer" :closable="false" v-model="value1">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </Col>
            <Col span="20">
                <Timeline>
                    <TimelineItem v-for="(item,index) in timeList" :key="index">
                        <p class="time">{{item.date}}</p>
                        <p class="content">{{item.content}}</p>
                    </TimelineItem>
                </Timeline>
            </Col>
        </Row>
    </div>
</template>

<script>
    import axios from "axios";
    import "../mock/index";
    import {mapState,mapMutations,mapActions} from 'vuex';
    export default {
        data(){
            return{
                carouseIndex: 0,
                value1: false,
                userList: [],
                carsouleList: [
                    {src:require("../assets/1.jpg"),name:"1"},
                    {src:require("../assets/2.jpg"),name:"2"},
                    {src:require("../assets/3.jpg"),name:"3"},
                    {src:require("../assets/4.jpg"),name:"4"},
                    {src:require("../assets/5.jpg"),name:"5"}
                ],
                timeList: [
                    {date:"2015-9-13",content:"大一开学"},
                    {date:"2016-10-3",content:"学习前端"},
                    {date:"2018-11-12",content:"第一份实习"}
                ]
            }
        },
        computed: {
            ...mapState('index',{
                products: (state)=>state.products
            }),
            // ...mapState('book',{
            //     bookList: (state)=>state.bookList
            // }),
            // ...mapState('movie',{
            //     movieList: (state)=>state.movieList
            // })
        },
        created() {
            this.getMockData();
        },
        methods:{
            ...mapMutations('index',[
                'minuPrice'
            ]),
            ...mapActions('index',[
                'minuPriceAsync'
            ]),
            minuPrices(){
                this.minuPrice(2); //this.$store.commit('minuPrice',2);
            },
            minuPricesAsync(){
                this.minuPriceAsync(5); //this.$store.dispatch('minuPriceAsync',5);
            },
            getMockData(){
                axios.get("/api/index").then((res)=>{
                    this.userList = res.data.list;
                });
                // axios.get("/exp/users/user/list").then((res)=>{
                //     window.console.log("express项目的数据"+res.data.data.list.length)
                //     this.userList=res.data.data.list;
                // });
            }
        }
    }
</script>

<style scoped>
a{
    text-decoration: none;
    color: #592e56;
}
.carItem,.carousel{
    height: 350px;
}
.carItem img{
    height: 100%;width: 100%;
}
</style>
<style>
.ivu-carousel-list {
    width: 100%;
}
</style>