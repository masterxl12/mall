export const mutations = {
  addCount(state, payLoad) {
    payLoad.count++
  },
  addToCart(state,payLoad){
    payLoad.checked = true;
    state.cartList.push(payLoad)
  }
}