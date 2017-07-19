import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 存储状态值
  state: {
    count: 0,
    unreadNum:''
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {
    increment(state) {
      state.count++
    },
    // 提交载荷 Payload
    add(state, n) {
      state.count += n
    },
    // 添加未读消息数量
    talk(state, n) {
      state.unreadNum = n
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    incrementAsync (context) {
      setTimeout(() => {
        context.commit('increment')
      }, 1000)
    },
    incrementAsyncWithValue (context, value) {
      setTimeout(() => {
        context.commit('add', value)
      }, 1000)
    },
    getTalkNum (context,num) {
        context.commit('talk', num)
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {
    done(state) {
      return state.count + 5;
    },
  }
})

export default store