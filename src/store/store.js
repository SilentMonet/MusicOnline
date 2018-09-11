/*jshint esversion :6*/
//向state.currentList添加歌曲时必须检查url是否有效

import Vue from 'vue';
import Vuex from 'vuex';
import db from './localDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    currentList: [],
    favorites: []
  },
  getters: {
    currentPlay: state => {
      return state.currentList[state.currentIndex] || {};
    }
  },
  mutations: {
    add(state, {songInfo,targetList}) {
      if (state[targetList].every(
          (song) => song.MUSICRID !== songInfo.MUSICRID
        )) {
        state[targetList].push(songInfo);
      }
    },
    remove(state, {songInfo,targetList}) {
      let index = state[targetList].findIndex((song) => song.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        state[targetList].splice(index, 1);
      }
    },
    playThis(state, songInfo = {}) {
      let index = state.currentList.findIndex((song) => song.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        state.currentIndex = index;
      } else if (songInfo.url !== undefined) {
        state.currentList.splice(state.currentIndex, 0, songInfo);
      } 
    }
  },
  actions: {
    //从本地数据库更新曲目数据到state.favorites数组
    updateFavorites(context) {
      db.getTable(context.state, 'favorites');
    },
    add(context, {songInfo,targetList}) {
      context.commit('add', {songInfo,targetList});
      db.add(songInfo, targetList);
    },
    remove(context, {songInfo,targetList}) {
      context.commit('remove', {songInfo,targetList});
      db.remove(songInfo, targetList);
    }
  }
});