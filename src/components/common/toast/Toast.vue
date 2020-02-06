<template>
  <div v-show="isShow" class="toast">
    <span class="content">{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      isShow: false,
      message: ""
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    } 
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 30px;
  line-height: 30px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: 5px;
  z-index: 998;
}
.content {
  color: #fff;
  padding: 8px 10px;
}
</style>