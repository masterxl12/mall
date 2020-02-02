<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src='item.image' />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'recommend',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding:10px 0 20px 0px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex:1
  }
  .recommend-item img{
    width: 68px;
    height: 68px;
  }
</style>