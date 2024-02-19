import {reqCartList, reqDeletCartById, reqUpdateCheckedByid} from "@/api";

const state = {
    cartList: [],
}
const  mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一产品
    async deletCartListByskuId({commit}, skuId) {
        let result = await reqDeletCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedByid({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('falie'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
        //context：小仓库， commit【提交mutations修改state】 getters【计算属性】 dispatch【怕发action】 state【当前仓库数据】
        //获取购车中全部产品（是一个数组）
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked===1?dispatch('deletCartListByskuId', item.skuId):'';
            PromiseAll.push(promise)
        })
        //Promise.all([p1,p2,...])
        //只要全部的p1|p2。。。都成功，返回结果即为成功
        //如果有一个失败，返回即为失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品的选中的状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        //数组
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedByid', {skuId:item.skuId, isChecked});
            PromiseAll.push(promise)
        });
        //最终返回的结果
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}


export default {
    state,
    mutations,
    actions,
    getters
}