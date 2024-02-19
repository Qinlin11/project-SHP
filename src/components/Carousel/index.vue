<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in bannerList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:'Carousel',
    props: ['bannerList'],
    watch: {
    //监听bannerList数据变化，因为这条数据发生变化---由空数组变为数组里面有四个元素
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        //现在通过watch监听bannerList属性的属性值的变化
        //如果执行handler方法，代表组件实例身上这个属性的属性值已经有了【数组：四个元素】
        //当前这个函数执行：只能保证bannerList数据已经有了，但无法保证v-for已经执行完毕了
        //v-for执行完毕，才有结构【现在在watch当中没有办法保证的】
        this.$nextTick(() => {
          //当你执行这个回调之后，保证数据回来了，v-for执行完毕【一定轮播图的结构一定有了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>