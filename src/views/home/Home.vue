<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
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
      isShowBackTop: true
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
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
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
    },
    backTop() {
      // console.log(this.$refs.scroll.scrollTo);
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听回到顶部组件的显示与隐藏
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    // 上拉加载更多
    loadMore(){
      // console.log('上拉加载更多！')
      this.getHomeGoods(this.currentType);
      // 手动刷新
      this.$refs.scroll.scroll.refresh()
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
        // 完成加载更多
        this.$refs.scroll.finishPullUp()
        // console.log(res);
      });
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 43px; /*顶部navbar的高度*/
  z-index: 9;
}
.content {
  overflow: hidden;
  height: 623px;
  margin-top: 44px;
}
/**switch  // position: absolute;
  // top: 44px;
  height:calc(100%-93px);

  // bottom: 49px;
  // right: 0;
  // left: 0; */
</style>