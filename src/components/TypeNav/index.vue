<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click.prevent="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //储存用户鼠标移上哪个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  
  mounted() {
  
    //组件挂载完毕，让show属性变为false
    //如果不是home路由组件， 将TypeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数， 当使用这个计算属性的时候， 右侧函数会立即执行一次
      //注入一个参数state， 其实即为大仓库的数据
      categoryList: (state) => state.home.categoryList.slice(0, 15),
    }),
  },
  methods: {
    //鼠标静茹修改响应式数据currentIndex属性
    //throttle 回调函数别用箭头函数，可能会出现上下文 this
    changeIndex: throttle(function (index) {
      //index： 鼠标移上某一个一级分类的元素的索引值
      //正常情况（用户慢慢操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //异常情况（用户快速操作）：本身全部的一级分类都会触发鼠标进入事件，但是经过调试，只有部分的h3出发了
      //就是由于用户行为过快，导致浏览器反应过不来，如果当前回掉函数中有一些大量事务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移除的事件回调
    leaveShow() {
      //鼠标移出currentIndex 变为 -1
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //进行路由跳转
    goSearch(event) {
      //最好的解决方案：编程式导航 + 事件委派
      //利用事件委派存在问题： 1.点击一定是a标签 2.如何获取参数【1 2 3级分类的产品名字、id】
      //第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName， 其余的子节点是没有的
      let element = event.target;
      //获取到当前发出这个事件的节点，需要带有:data-categoryName这样的节点【一定是a标签】
      //节点有一个属性dataset属性， 可以获取节点自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上拥有categoryname属性一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else if (category3id) {
          query.category3id = category3id;
        }
        //判断，如果路由跳转的时候， 带有params参数，捎带传递过去
        if(this.$route.params) {
          location.params = this.$route.params
          //整理参数
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
        
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画样式
    //过渡动画开始状态（进入)
    .sort-enter {
      height: 0px;
      
    }
    //过渡动画结束状态（进入)
    .sort-enter-to {
      height: 461px;
      overflow: hidden;
    }
    //过渡动画开始状态（离开）
    .sort-leave {
      height: 461px;
      
    }
    .sort-leave-to {
      height: 0px;
      overflow: hidden;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    .sort-leave-active {
      transition: all 0.5s linear;;
    }
  }
}
</style>