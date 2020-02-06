import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import("../views/home/Home.vue");
const Category = () => import("../views/category/Category.vue");
const ShopCart = () => import("../views/cart/Cart.vue");
const Profile = () => import("../views/Profile.vue");
const Detail = () => import("../views/detail/Detail.vue");

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/shopcart',
      component: ShopCart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:id',
      component: Detail
    },
  ],
  mode:'history'
})
