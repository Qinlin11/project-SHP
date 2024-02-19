import {reqGetSearchInfo} from '@/api'
//search模块的小仓库
const state = {
    //仓库初始状态
    searchList: {}
}

const mutations = {
    GETSERACHLIST(state, searchList) {
        state.searchList = searchList
    }
}

const actions = {
    //获取search模块数据
    //默认参数params={}
    async getSearchList({commit}, params={}){
        //当前整个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个承诺书（空对象）
        //params形参：是用户派发action的时候，第二个参数传递过来，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code === 200) {
            commit('GETSERACHLIST', result.data);
        }
    }
}
//计算属性，在项目当中，为了简化数据而生
//项目当中getter主要作用是：简化仓库中的数据
//可以把我们将来在组件当中需要的用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    //当前形参state，是当前仓库中的地state，并不是大仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}