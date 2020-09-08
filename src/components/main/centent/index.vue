<template>
  <div class="swiperBox">
    <swiper class="swiper" :options="enterpriseOption">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <div class="swiperBg">
          <img :src="item" alt="图片" />
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import '../index.less'
export default {
  data() {
    return {
      enterpriseOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletElement: "li",
        },
        direction: "vertical",
        speed: 500,
  
        parallax: true,
        mousewheel: true,
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        //   hide: false
        // }
      },
      swiperList: [
        "http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg",
        "http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg",
        "http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg",
        "http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg",
      ],
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>