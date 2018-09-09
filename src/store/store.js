/*jshint esversion :6*/
import Vue from 'vue';
import Vuex from 'vuex';
import db from './localDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: []
  },
  getters: {},
  mutations: {
    addFavorite(state, songInfo) {
      if (state.favorites.every(
          (current) => current.MUSICRID !== songInfo.MUSICRID
        )) {
        state.favorites.push(songInfo);
      }
    },
    removeFavorite(state, songInfo) {
      let index = state.favorites.findIndex((current) => current.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    }
  },
  actions: {
    //从本地数据库更新曲目数据到state.favorites数组
    updateFavorites(context) {
      db.getTable(context.state, 'favorites');
    },
    addFavorite(context, songInfo) {
      context.commit('addFavorite', songInfo);
      db.add(songInfo, 'favorites');
    },
    removeFavorite(context, songInfo) {
      context.commit('removeFavorite', songInfo);
      db.remove(songInfo, 'favorites');
    }
  }
});
