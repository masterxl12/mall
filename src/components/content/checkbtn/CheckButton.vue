<template>
  <div class="check-btn" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "check-btn",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-btn {
  border-radius: 50%;
  border: 2px solid #ccc;
}
.active {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>