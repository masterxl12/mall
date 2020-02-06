<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      ref="tabControl1"
      class="tab-control"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperLoadFinish" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行','新款','精选']"
        ref="tabControl2"
        :class="{fixed:isTabFixed}"
        @tabClick="tabClick"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goodLists/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childComs/HomeSwipers";
import RecommendView from "./childComs/RecommendView";
import FeatureView from "./childComs/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin,backTop } from "common/mixin";
export default {
  name: "home",
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: true,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [itemListenerMixin,backTop],
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 点击的是流行，精选还是新品类型
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听回到顶部组件的显示与隐藏
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2. 决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      // console.log('上拉加载更多！')
      this.getHomeGoods(this.currentType);
    },
    // 首页轮播图加载完成
    swiperLoadFinish() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 44;
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    /**
     * 强求网络接口相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  activated() {
    // console.log('activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)
    // 离开home页面取消对全局事件总线的监听
    this.$bus.$off("imageLoadFinish", this.itemImgListener);
  }
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.fixed {
  position: fixed;
  left: 0;
  top: 44px;
  right: 0;
}
.content {
  overflow: hidden;
  height: 623px;
}
/**switch  // position: absolute;
  // top: 44px;
  height:calc(100%-93px);

  // bottom: 49px;
  // right: 0;
  // left: 0; */
</style>