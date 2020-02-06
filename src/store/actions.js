export const actions = {
  addCart({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      // 找到已经添加到购物车列表中的商品
      oldProduct = state.cartList.find(item => item.iid === payLoad.iid);
      if (oldProduct) {
        // 1.完成数量添加1的功能
        // oldProduct.count += 1
        commit('addCount', oldProduct);
        resolve('该商品添加购物车数量+1')
      } else {
        payLoad.count = 1;
        // 2.将商品添加到cartList
        // state.cartList.push(payLoad)
        commit('addToCart', payLoad);
        resolve("该商品添加购物车成功!")
      }
    })
  }
}
