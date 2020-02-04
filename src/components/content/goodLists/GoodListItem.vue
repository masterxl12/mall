<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt @load="imgItemLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "good-list-item",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgItemLoad() {
      this.$bus.$emit("imageLoadFinish");
    },
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  border: 1px solid var(--color-tint);
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: red;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  color: var(--color-high-text);
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>