//路由配置信息
//引入路由组件


import ShopCart from "@/pages/ShopCart/index.vue";
import Trade from "@/pages/Trade/index.vue";
import Pay from "@/pages/Pay/index.vue";
import PaySuccess from "@/pages/PaySuccess/index.vue";
import Center from "@/pages/Center/index.vue";

//引入二级路由组件
import myOrder from "@/pages/Center/myOrder/index.vue";
import groupOrder from "@/pages/Center/groupOrder/index.vue";
export default  [
    {
        path: '/center',
        component: () => import('@/pages/Center/index.vue'),
        meta: {show: true},
        //二级路由组件
        children:[
            {
                path:'myorder',
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess/index.vue'),
        meta: {show: true},
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay/index.vue'),
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            //去交易页，必须从购物车来
            if(from.path === '/trade'){
                next()
            }else {
                //其他的路由组建来的，停留在当前
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade/index.vue'),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页，必须从购物车来
            if(from.path === '/shopcart'){
                next()
            }else {
                //其他的路由组建来的，停留在当前
                next(false)
            }
        },
    },
    {
        path: '/shopcart',
        name:'shopcart',
        component: () => import('@/pages/ShopCart/index.vue'),
        meta: {show: true}
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess/index.vue'),
        meta: {show: true}
    },
    {

        path: '/detail/:skuid?',
        component: () => import('@/pages/Detail/index.vue'),
        meta: {show: true}
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home/index.vue'),
        meta: {show: true}
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search/index.vue'),
        meta: {show: true},
        // 布尔值写法
        // props: true
        // 对象写法
        // props: {a:1, b: 2}
        // 函数写法,可以params参数, query参数, 通过props传递给路由组件
        props: ($route) =>{
            return {
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login/index.vue'),
        meta: {show: false}
    },
    {
        name:'register',
        path: '/register',
        component: () => import('@/pages/Register/index.vue'),
        meta: {show: false}
    },
    //重定向，在项目跑起来的时候，访问/ ,立马让他定向首页
    {
        path: '*',
        redirect: '/home'
    }
]