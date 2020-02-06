<template>
  <div class="cart-list">
    <scroll class="scrollHeight" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index + item.iid" :product="item" />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";
import CartBottomBar from './CartBottomBar'

import { mapGetters } from "vuex";
export default {
  name: "cart-list",
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    // console.log('-----');
    // 进入购物车页面刷新购物车页面，否则无法滚动
    this.$refs.scroll.refresh()
  },
  components: {
    Scroll,
    CartListItem,
    CartBottomBar
  }
};
</script>

<style scoped>
.cart-list {
  height: 100vh ;
}
.scrollHeight {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>