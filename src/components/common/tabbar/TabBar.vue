<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#tab-bar {
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100,100,100,.1);
  z-index:9
}

</style>