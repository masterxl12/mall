import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:require('./assets/img/loading.gif')
});
import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload';
// 1.添加时间总线对象
Vue.prototype.$bus = new Vue()
// 2.安装toast插件
Vue.use(toast)
// 3.解决移动端点击300ms延迟
FastClick.attach(document.body);
// 4.使用图片懒加载

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
