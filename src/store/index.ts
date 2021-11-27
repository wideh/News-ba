import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// 为 store state 声明类型
export interface State {
  user: {
    name: string,
    photo: any
  }
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store =  createStore<State>({
  state () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  // getters: {
  //   // ...
  //   getTodoById: (state) => (id) => {
  //     return state.todos.find(todo => todo.id === id)
  //   }
  // },
  mutations: {
    updateUserInfo (state, payload) {
      state.user = payload
    }
  }
});