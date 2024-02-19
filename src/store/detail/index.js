import {reqAddOrUpdateShopCart, reqGoodsInfo} from "@/api";
import {getUUID} from "@/utils/uuid_token";


const state = {
    goodInfo: {},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息的actions
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    //加入购物车后（发送请求）， 前台将参数带给服务器
    //服务器写入数据成功， 并没有返回其他数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据， 所以没必要进行三连环储存数据
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code === 200) {
            return 'ok'
        }else {
            return Promise.rejects(new Error('faile'))
        }
    }
}
//简化数据
const getters = {
    //路径导航
    categoryView(state) {
        //比如;state.goodInfo的初始的状态是空对象，空对象的category1Name属性值undefined

        return state.goodInfo.categoryView || {};
    },
    //产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}