<template>
  <div class="cart-bottom">
    <div class="check-content">
      <check-button class="check-btn" :is-checked="isSelectdAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <span>合计:￥{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      <span>去计算({{cartCount}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbtn/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "cart-bottom-bar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters({
      cartList: "cartList"
    }),
    totalPrice() {
      let price = this.cartList
        .filter(item => item.checked)
        .reduce((prev, curr) => {
          return (prev += curr.count * curr.price);
        }, 0)
        .toFixed(2);
      return price;
    },
    cartCount() {
      let numbers = this.cartList.filter(item => item.checked).length;
      return numbers;
    },
    isSelectdAll() {
      if (!this.cartList.length) return false;
      // 只要找到属性checkd为false的，即为未全选
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectdAll) {
        // 全都选中
        this.cartList.forEach(item => (item.checked = false)); // 全不选
      } else {
        // 部分未选中
        this.cartList.forEach(item => (item.checked = true)); //  变成全选
      }
    },
    calcClick() {
      // 如果购物车商品全都不勾选，增加提示
      if (!this.cartCount) {
        this.$toast.show("请选择购买商品",2000);
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom {
  position: relative;
  display: flex;
  justify-content: center;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}
.check-content {
  width: 100px;
  display: flex;
  align-items: center;
}
.check-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 5px 0 15px;
}
.totalPrice {
  flex: 1;
  margin-left: 20px;
}
.calculate {
  width: 90px;
  margin-right: 10px;
  background-color: var(--color-tint);
}
</style>