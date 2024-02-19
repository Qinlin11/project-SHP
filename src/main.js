import Vue from 'vue';
import App from './App.vue';

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from "@/components/Pagination/index.vue";
import {Button, MessageBox} from "element-ui";
//第一个参数：全局组件的名字 第二个参数： 那个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel)
//分页器全局组件
Vue.component(Pagination.name, Pagination)
//注册全局组件
Vue.component(Button.name, Button)
//element-ui注册组件的时候，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import axios from 'axios';
axios.defaults.baseURL = '/api';
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';

Vue.config.productionTip = false;

//引入mockServe.js -- mock数据
import '@/mock/mockServe';

//引入swiper样式
import 'swiper/css/swiper.css';

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'

//引入插件
import VueLazyload from 'vue-lazyload'
import tupan from '@/assets/R-C.gif'
//注册插件
Vue.use(VueLazyload, {
  loading: tupan
})
//引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  //配置事件全局总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  //注册路由， 底下的写法kv值一致省略v【router为小写】
  router,
  //注册仓库，组件实例的身上会多个一个属性$store属性
  store
}).$mount('#app')
