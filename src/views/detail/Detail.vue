<template>
  <div id="detail">
    <detail-nav class="detail-nav-bar" />
    <scroll class="scroll-height" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad='imgLoad' />
      <detail-param-info :param-info="paramInfo" />
    </scroll> 
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop,GoodsParam } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{}
    };
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.id;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 2.1 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.2 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

    });
  },
  methods: {
    imgLoad(){
      // 重新刷新
      this.$refs.scroll.refresh()
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 998;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>