<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backBtn">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
          class="title-item" 
          @click="titleBtn(index)"
          :class="{active:currentIndex===index}"
          >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";

export default {
  name: "detailNav",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleBtn(index){
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backBtn(){
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.left{
  margin-top:5px;
}
.active{
  color:var(--color-tint)
}
</style>