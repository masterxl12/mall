<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="item.title + index">
        <a :href="item.link">
          <img :src="item.image" alt @load="swiperImgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "home-swipers",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>