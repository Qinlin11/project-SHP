//引入mockjs模块
import Mock from 'mockjs'
//引入JSON数据[JSON数据格式没有对外暴露，但可以引入]
//webPack默认对外暴露的有；图片、 json数据格式、
import banner from './banner'
import floor from './floor'

//引入api/list接口数据文件
require('./searchList')
//mock数据:第一个参数请求地址， 第二个参数：请求数据
Mock.mock("/mock/banner", {code: "200", data: banner})  //模拟首页大轮播图
Mock.mock("/mock/floor", {code: "200", data: floor})


