
<template>
    <div class="movie container">
        <Tabs :value="currentTabName" @on-click="changeTab">
            <TabPane :label="item" :name="item" v-for="(item,index) in movieTab" :key="index">
                <Divider><h3 v-text="movieTabTitle"></h3></Divider>
                <div class="row">
                    <div v-for="(item,index) in movieLists" :key="index" class="col-md-4 col-lg-3">
                        <div class="card">
                            <img :src="item.subject ? item.subject.images.small : item.images.small">
                            <div class="card-body">
                                <h5 class="card-title">{{item.subject ? item.subject.title :item.title}}</h5>
                                <p class="card-title">
                                    <!-- 兼容口碑榜和北美新票房榜的数据接口 多了一层subject -->
                                    <ButtonGroup v-if="item.subject">
                                        <Button type="info" ghost v-for="(genre,index) in item.subject.genres" :key="index">{{genre}}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup v-else>
                                        <Button type="info" ghost v-for="(genre,index) in item.genres" :key="index">{{genre}}</Button>
                                    </ButtonGroup>
                                </p>
                                <Button  type="primary" @click="toDetail(item.subject ? item.subject.id :item.id)">Go</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Page :current="start" :total="movieTotalCount" show-sizer show-total @on-change="changePageList"/>
            </TabPane>
        </Tabs>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
    import {mapActions} from "vuex"
    import "../mock/city";
    export default ({
        name: "movie",
        data() {
            return {
                spinShow: true,
                currentTabName: 'Top250',
                baseUrl: '/ban/v2/movie/top250',
                movieTabTitle:"",
                movieLists:[],
                movieTotalCount: 0,
                start:1,
                count:10,
                movieTab:['Top250','正在上映','即将上映','新片榜','口碑榜','北美票房榜']
            }
        },
        mounted(){
            this.getRequestMovieData()
        },
        methods:{
            ...mapActions('movie',[
                'newMovieLists'
            ]),
            getRequestMovieData(){
                let self = this;
                this.$http.get(`${this.baseUrl}?start=${(this.start-1)*self.count}&count=${this.count}&apikey=0b2bdeda43b5688921839c8ecb20399b`).then((res)=>{
                    self.movieTabTitle = res.data.title;
                    self.movieTotalCount = res.data.total ? res.data.total : res.data.subjects.length;
                    self.movieLists = res.data.total ? res.data.subjects: res.data.subjects.slice((self.start-1)*self.count, self.start*self.count);
                    self.spinShow = false;
                    self.newMovieLists(res.data.subjects);
                });
            },
            changeTab(tab){
                this.start = 1;
                switch (tab) {
                    case 'Top250': this.baseUrl = '/ban/v2/movie/top250'; break;
                    case '正在上映': this.baseUrl = '/ban/v2/movie/in_theaters'; break;
                    case '即将上映': this.baseUrl = '/ban/v2/movie/coming_soon'; break;
                    case '新片榜': this.baseUrl = '/ban/v2/movie/new_movies'; break;
                    case '口碑榜': this.baseUrl = '/ban/v2/movie/weekly'; break;
                    case '北美票房榜': this.baseUrl = '/ban/v2/movie/us_box'; break;
                    default: break;
                }
                this.spinShow = true;
                this.getRequestMovieData();
            },
            changePageList(page){
                this.start = page;
                this.getRequestMovieData();
            },
            toDetail(id){
                this.$router.push({name:"MovieDetail",params:{id:id}});
            }
        }
    })
</script>
<style lang="less" scoped>
    h3{
        color: #fff;
    }
    .card{
        img{
            height: 250px;
        }
        margin:10px;
        height: 400px;
        .card-title{
            width: 100%;
            overflow: hidden;
            font-size: 10px;
            color: #000;
        }
    }
    .card .card-text{
        height: 40px !important;
    }
    .ivu-page .ivu-page-item a{
        color: #000;
    }
</style>
<style>
    .movie .ivu-tabs{
        width: 100%;
    }
    .ivu-page .ivu-page-item a{
        color: #000;
    }
</style>