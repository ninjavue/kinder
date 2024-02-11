import { createStore } from 'vuex'
import helper from './helper';
import product from './modules/product';
import food from './modules/food';
import type from './modules/type'

export default createStore({
  state: {
    url: "http://localhost:3000"
  },
  getters: {
    url(state) {
      return state.url
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    helper,
    product,
    type,
    food
  }
})
