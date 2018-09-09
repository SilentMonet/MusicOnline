/*jshint esversion :6*/
import Vue from 'vue';
import Vuex from 'vuex';
import db from './localDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // {url:"http://other.web.nf01.sycdn.kuwo.cn/resource/n3/19/83/246973631.mp3"},
    currentIndex: 0,
    currentList: [],
    favorites: []
  },
  getters: {
    currentPlay: state => {
      console.log('execute getter');
      return state.currentList[state.currentIndex] || {};
    }
  },
  mutations: {
    addFavorite(state, songInfo) {
      if (state.favorites.every(
          (song) => song.MUSICRID !== songInfo.MUSICRID
        )) {
        state.favorites.push(songInfo);
      }
    },
    removeFavorite(state, songInfo) {
      let index = state.favorites.findIndex((song) => song.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
    playNext(state,songInfo) {
      
      songInfo?state.currentList.splice(state.currentIndex,0,songInfo):(++state.currentIndex);
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
