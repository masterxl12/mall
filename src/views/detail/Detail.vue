<template>
  <div id="detail">
    <detail-nav class="detail-nav-bar" ref="navDetail" @titleClick="titleClick" />
    <scroll class="scroll-height" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom @addCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop" />
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
import DetailBottom from "./childComps/DetailBottom";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goodLists/GoodList";
import BackTop from "components/content/backtop/BackTop";

import { itemListenerMixin, backTop } from "common/mixin";
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
      getThemeTop: null,
      currentIndex: 0,
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
    GoodList,
    DetailBottom,
  },
  mixins: [itemListenerMixin, backTop],
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
      this.recommends = res.data.list;
    });
    // 4.给getThemeTop赋值（对给this.getThemeTop赋值的操作进行防抖）
    this.getThemeTop = debounce(() => {
      this.themePosY = [];
      this.themePosY.push(0);
      this.themePosY.push(this.$refs.param.$el.offsetTop);
      this.themePosY.push(this.$refs.comment.$el.offsetTop);
      this.themePosY.push(this.$refs.recommend.$el.offsetTop);
      this.themePosY.push(Number.MIN_VALUE);
      // console.log(this.themePosY);
    });
  },
  methods: {
    // 添加商品到购物车
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.title = this.goods.title;
      product.iid = this.iid;
      // 2. 将商品添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch("addCart", product).then(res => {
        // 显示添加商品到购物车信息，调用内部组件
        // console.log(this.$toast.show);
        this.$toast.show(res,2000)
        
      });
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      // 获取y值
      const positionY = -position.y;
      let len = this.themePosY.length;
      // this.themePosY = [0, 19809, 20471, 20780],positionY的区间位置：

      // 第一种情况
      // positionY在0~19809，     index = 0
      // positionY在19809~20471   index = 1
      // positionY在20471~20780   index = 2

      // 第二种情况
      // positionY > 20471       index = 3

      /**
       * 普通做法：
       *条件1成立：this.currentIndex !== i
          说明：防止赋值的操作过于频繁
       条件2成立：(i < len - 1 &&
            positionY >= this.themePosY[i] &&
            positionY < this.themePosY[i + 1]) ||
            (i === len - 1 && positionY >= this.themePosY[i])
          说明：
          [1] (i < len - 1 && positionY >= this.themePosY[i] && 
          positionY < this.themePosY[i + 1])
          * 判断区间：在 0 和 某个数字之间（i < len - 1）
          [2] (i === len - 1 && positionY >= this.themePosY[i]))
          * 判断大于大于： i === len - 1
        *
        * hack技术：
        * 对数组末尾增加一个最大数Number.MAX_VALUE(空间换时间)
        * this.themsY.push(Number.MAX_VALUE);
        * 都转换成关于条件[1]的判断
        * [注]:只考虑len-1前的数据判断
        * 
       */

      // for (let i = 0; i < len; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < len - 1 &&
      //       positionY >= this.themePosY[i] &&
      //       positionY < this.themePosY[i + 1]) ||
      //       (i === len - 1 && positionY >= this.themePosY[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.navDetail.currentIndex = this.currentIndex;
      //   }
      // }
      for (let i = 0; i < len - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themePosY[i] &&
          positionY < this.themePosY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navDetail.currentIndex = this.currentIndex;
        }
      }
      // console.log(this.themePosY,len);
    },
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
  mounted() {},
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