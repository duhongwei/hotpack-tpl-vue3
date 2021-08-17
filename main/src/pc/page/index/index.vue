<template>
  <div class="index">
    <h1>Hotpack Vue3 Multi Page Egxample</h1>
    <p class="user" v-if="user">welcome,{{user.name}}</p>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) of imageList"
          :key="index"
          class="swiper-slide"
          :style="'background-image: url(' + item + ')'"
        ></div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination swiper-pagination-white"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
    <div  class="link">
      <a href="/single">single page</a>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      imageList: [
        './image/nature-1.jpg',
        './image/nature-2.jpg',
        './image/nature-3.jpg',
        './image/nature-4.jpg',
        './image/nature-5.jpg'
      ]
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  mounted() {
    new Swiper('.swiper-container', {
      spaceBetween: 30,
      effect: 'fade',
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
}
</script>

<style>
.index{
  max-width: 1000px;
}
.swiper-container {
  max-width: 800px;
  height: 300px;
  margin-top:40px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}
.link{
  margin-top:30px;
}
.user{
  margin-top:10px;
  height:16px;
}
</style>