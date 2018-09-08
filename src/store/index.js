/*jshint esversion :6*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    addFavorite (state,songInfo) {
      state.favorites.push(songInfo);
    },
    removeFavorite(state,songInfo){
      let index=state.favorites.indexOf(songInfo);
      if(index!==-1){
        state.favorites.splice(index,1);
      }
    }
  }
});