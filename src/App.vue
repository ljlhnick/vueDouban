<template>
  <div id="app" class="container">
    <Menu mode="horizontal" :theme="theme1" :active-name="activeMenu"> 
      <router-link :to={path:item.path} v-for="(item,index) in navList" :key="index">
      <MenuItem :name=item.name>
          <Icon type="ios-paper" />
          {{item.title}}
      </MenuItem>
      </router-link>
    </Menu>
    
    <router-view mode="in-out"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.activeMenu = this.$route.path.split('/')[1];
  },
  data(){
    return{
      theme1: 'light',
      activeMenu: '',
      navList:[
        {title:"首页",name:"",path:"/"},
        {title:"电影",name:"movie",path:"/movie"},
        {title:"书籍",name:"book",path:"/book"}
      ]
    }
  },
  watch: {
    $route(to, from){
      this.activeMenu = this.$route.path.split('/')[1];
    }
  }
}
</script>

<style scoped>
*{
  list-style-type: none;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #000;
  height: 100%;
  min-height: 800px;
}
</style>
