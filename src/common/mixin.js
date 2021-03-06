import { debounce } from './utils'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 上拉加载更多的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    // 对监听事件的保存
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("imageLoadFinish", () => {
      this.itemImgListener;
    });
  },
}

import BackTop from "components/content/backtop/BackTop";
export const backTop = {
  data() {
    return {
      isShowBackTop: true
    }
  },
  components: { BackTop },
  methods: {
    // 滚动到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
}