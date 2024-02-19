//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "@/router/routes";
import store from "@/store";
//使用插件
Vue.use(VueRouter);

//引入路由组件

//先把VueRouter原型对象中的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数： 告诉原来push方法，你往哪里跳转（传递那些参数）
//第二个参数： 成功回调
//第三个参数： 失败回调
//call || apply区别
//相同点： 都可以调用函数一次， 都可以篡改上下文一次
//不同点： call与apply传递参数： call传递参数用逗号隔开， apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {

        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {

        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置,y=0滚动条最上方
        return {y: 0}
    }
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to: 可以获取到你要跳转到那个路由
    //from：可以获取到你从那个路由来的信息
    //next：放行函数 写法： next() 放行|| next(path) 放行到指定路由 ||next(false) 中断路由导航
    //next()
    //用户登录才回到token，未登录一定不会有token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name
    //用户登录了
    if (token) {
        //已登陆还想去login阻止, 回到首页
        if (to.path === '/login' || to.path === '/register') {
            next('/');
        } else {
            //登录，取得不是login而是【home|search|detail|shopcart】
            //如果有用户名
            if (name) {
                next()
            } else {
                //没有用户名信息，派发action让仓库储存用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    //放行
                    next()
                } catch (error) {
                    //token失效了获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面的路由 ---跳登录页

        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1){
            //把未登录的时候想去的而没去成的信息，存储与地址当中
            next('/login?redirect='+toPath)
        }else {
            //取得不是上面的这些路由[home|search|shopcart] ---放行
            next()
        }
    }
})
export default router;