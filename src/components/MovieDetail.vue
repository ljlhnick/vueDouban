<template>
    <div class="container">
        <div class="jumbotron">
            <h3 class="display-4">{{detailItem.title}}({{detailItem.year}})</h3>

            <Carousel autoplay v-model="value2" loop class="carousel">
                <CarouselItem v-for="(item,index) in carsouleList" :key="index">
                    <div class="demo-carousel carItem" :name="index">
                        <img :src=item.src>
                    </div>
                </CarouselItem>
            </Carousel>

            <h4 class="display-4">演员表</h4>
            <div class="row">
                <div class="col-md-4 col-lg-3 cast" v-for="(item,index) in detailItem.casts" :key="index">
                    <img :src="item.avatars.small">
                </div>
            </div>

            <p class="lead btn-toolbar">
                <ButtonGroup>
                    <Button type="success">想看 <span class="badge badge-pill badge-light">{{detailItem.reviews_count}}</span></Button>
                    <Button type="success">重看 <span class="badge badge-pill badge-light">{{detailItem.wish_count}}</span></Button>
                    <Button type="success">收藏 <span class="badge badge-pill badge-light">{{detailItem.collect_count}}</span></Button>
                    <Button type="success">评论 <span class="badge badge-pill badge-light">{{detailItem.comments_count}}</span></Button>
                </ButtonGroup>
            </p>
            <hr class="my-4">
            <p class="desc">{{detailItem.summary}}</p>
            <p class="desc">{{detailItem.countries}}</p>
            <p class="btn-toolbar">
                <ButtonGroup>
                    <Button class="btn btn-info" v-for="(item,index) in detailItem.genres" :key="index">{{item}}</Button>
                </ButtonGroup>
            </p>
            <p class="btn-toolbar">
                <ButtonGroup>
                    <Button class="btn btn-primary" v-for="(item,index) in detailItem.aka" :key="index">{{item}}</Button>
                </ButtonGroup>
            </p>
        </div>
    </div>
</template>

<script>
    import axois from "axios";
    import {ButtonGroup, Button, Carousel, CarouselItem} from 'iview';
    export default {
        name: "MovieDetail",
        data(){
            return{
                value2: 0,
                carsouleList:[
                    {src:require("../assets/1.jpg"),name:"1"},
                    {src:require("../assets/2.jpg"),name:"2"},
                    {src:require("../assets/3.jpg"),name:"3"},
                    {src:require("../assets/4.jpg"),name:"4"},
                    {src:require("../assets/5.jpg"),name:"5"}
                ],
                detailItem:{}
            }
        },
        beforeRouteEnter(to, from, next){
            console.log('beforeRouteEnter', to.params, this);
            next();
        },
        beforeRouteUpdate(to, from, next){
            console.log('beforeRouteUpdate', to.params, this);
            next();
        },
        created() {
            let self=this;
            axois.get(`/ban/v2/movie/subject/${this.$route.params.id}?apikey=0b2bdeda43b5688921839c8ecb20399b`).then((res)=>{
                self.detailItem = res.data;
            })
        },
        components:{
            ButtonGroup, Button, Carousel, CarouselItem
        }
    }
</script>

<style scoped lang="less">
    .carItem,.carousel{
        height: 350px;
    }
    .carItem img{
        height: 350px;width: 100%;
    }
.cast{
    height: 200px;
    margin: 20px 0;
    img{
        height: 100%;
    }
}
</style>
<style scoped>
.jumbotron{
    margin-top:15px;
}
.display-4, .desc{
    color: #000;
}
</style>