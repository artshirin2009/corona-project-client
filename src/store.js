import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: {
      host: 'http://localhost:3000'
    },
    category: {
      folder: 'category',
      title: "Категории",
      createItem: "Создать категорию",
      updateItem: "Редактировать категорию",
      deleteItem: "Удалить категорию?"
    },
    product: {
      folder: 'product',
      title: "Товары",
      createItem: "Создать товар",
      updateItem: "Редактировать товар",
      deleteItem: "Удалить товар?"
    },
    isAuthorized: false,
    isAdmin: false
  },
  mutations: {
    authorize: state => state.isAuthorized = true,
    exit: state => {
      state.isAuthorized = false;
      state.isAdmin = false
    },
    authorizeAsAdmin: state => {
      state.isAuthorized = true;
      state.isAdmin = true
    },
  },
  actions: {

  }
})