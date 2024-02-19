import Vue from "vue";
import Vuex from "vuex";

//需要使用插件一次
Vue.use(Vuex);
import home from "./home"
import search from "./search";
import detail from "@/store/detail";
import shopcart from "@/store/shopcart";
import user from "@/store/user";
import trade from "@/store/trade";
//对外暴露store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发储存数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})