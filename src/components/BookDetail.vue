<template>
    <div class="bookDetail">
         <Card style="width:100%;margin-top:15px;">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                {{bookDetail.title}}
            </p>
            <a href="#" slot="extra" @click.prevent="visibleDetail = true">
                <Icon type="ios-loop-strong"></Icon>
                Detail
            </a>
            {{bookDetail.catalog}}

            <!-- <div class="row">
                <List>
                    <ListItem v-for="(item, index) in bookDetail.tags" :key="index">
                        <Tag checkable color="error">{{item.title}}</Tag>
                        {{item.name}} -- {{item.count}}
                        <hr/>
                    </ListItem>
                </List>
            </div> -->
        </Card>

        <Modal
        v-model="visibleDetail"
            :title="`${bookDetail.title} 详情`"
            @on-ok="visibleDetail = false"
            @on-cancel="visibleDetail = false">
            <p>{{bookDetail.summary}}</p>
        </Modal>
    </div>
</template>

<script>
    import axois from "axios"
    export default {
        name: "BookDetail",
        data() {
            return {
                visibleDetail: false,
                bookDetail: {}
            }
        },
        created() {
            let self = this;
            axois.get(`/ban/v2/book/${this.$route.params.id}?apikey=0b2bdeda43b5688921839c8ecb20399b`).then((res)=>{
                self.bookDetail = res.data;
            })
        }
    }
</script>

<style>
.bookDetail .ivu-card-body{
    color: #000;
}
</style>