<template>
  <div id="detail">
    <detail-nav class="detail-nav-bar" @titleClick="titleClick" />
    <scroll class="scroll-height" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goodLists/GoodList";

import { itemListenerMixin } from "common/mixin";
import { debounce } from "common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themePosY: [],
      getThemeTop: null
    };
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList
  },
  mixins: [itemListenerMixin],
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.id;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
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
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3. 获取推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 4.给getThemeTop赋值（对给this.getThemeTop赋值的操作进行防抖）
    this.getThemeTop = debounce(() => {
      this.themePosY = [];
      this.themePosY.push(0);
      this.themePosY.push(this.$refs.param.$el.offsetTop);
      this.themePosY.push(this.$refs.comment.$el.offsetTop);
      this.themePosY.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themePosY)
    });
  },
  methods: {
    imgLoad() {
      // 重新刷新
      // this.$refs.scroll.refresh();
      // 混入方法定义的属性
      this.newRefresh();
      // 图片加载完成之后，获取对应的offsetTop值
      this.getThemeTop();
      // console.log(this.themePosY);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themePosY[index], 100);
    }
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off("imageLoadFinish", this.itemImgListener);
  }
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
/*.scroll-height {
  height: calc(100% - 44px);
  background-color: #fff;
}*/
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