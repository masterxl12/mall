<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <cart-list />
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar'

import CartList from './childComps/CartList'

import {mapGetters} from 'vuex'
export default {
name:'Cart',
computed: {
  ...mapGetters(['cartListLength'])
},
components:{
  NavBar,
  CartList
}
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
  text-align: center;
}

</style>