//当前这个模块： API进行同意管理
import requests from "./request";
import mockReqursts from "./mockAjax"
import Mock from 'mockjs'
import searchListData from '@/mock/searchList'
import {date} from "mockjs/src/mock/random/date";
//三级联动的接口
//  /api/product/getBaseCategoryList get  无参数
//发送请求： axios发送请求结果promise对象
//对外暴露一个函数， 只要外部调用这个函数，就向服务器发起ajax请求，获取三级菜单数据，当前这个函数只需要把服务器返回结果返回即可
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})
//切记:当前函数执行需要把服务器返回结果返回

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockReqursts.get('/banner')

//获取floor数据
export const reqFloorList = () => mockReqursts.get('/floor')

//获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要参数

/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个函数需不需要接受外部传递参数
//当前这个接口，给服务器传递默认参数params，至少是一个空对象
// Mock 接口
// Mock.mock("/mock/list", "post", searchListData);
// export const reqGetSearchInfo = (params) => mockReqursts.post('/list', params)
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});

//获取产品详情信息的接口 URL:/api/item/{ skuId } 请求方式：get

export const reqGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method:'get'})

//添加产品到购物车中（获取更新某个产品的个数）api: /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

//获取购物车列表
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'})

//删除购物车产品
export const reqDeletCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method: 'delete'})

//产品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

//获取验证码
//URL: /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

//注册
//URL: /api/user/passport/register  post
export const reqUserRegister = (data) => requests({url:'/user/passport/register', data, method: 'post'})

//登陆
//URL: /api/user/passport/login   post
export const reqUserLogin = (data) => requests({url: '/user/passport/login', data, method: 'post'})

//获取用户的信息【需要带着用户的token向服务器要用户信息】
//URL: /api/user/passport/auth/getUserInfo      get
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})

//退出登录
//URL: /api/user/passport/logout    get
export const reqLogoout = () => requests({url:'/user/passport/logout', method:'get'})

//获取用户地址信息
//URL: /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})

//获取商品清单
//URL： /api/order/auth/trade    get
export const reqOrderInfo = () => requests({url: '/order/auth/trade', method:'get'})

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSummitOrder = (tradeNo, data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}    get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'});

//获取支付订单状态
//URL: /api/payment/weixin/queryPayStatus/{orderId}     get
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})

//获取个人中心的数据
//URL: /api/order/auth/{page}/{limit} get
export const reqMyorderList = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method:'get'})