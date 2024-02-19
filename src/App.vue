<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home search 显示的,在登陆、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// Header组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //组件挂载完毕：可以向服务器发送请求
    //通知Vuex发送请求，获得数据，储存在仓库中
    //派发action 获取商品分类三级列表的数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
