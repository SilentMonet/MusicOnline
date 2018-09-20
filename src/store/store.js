/*jshint esversion :6*/
//向state.playingStatus.currentPlayingList添加歌曲时必须检查url是否有效

import Vue from 'vue';
import Vuex from 'vuex';
import db from './localDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playingStatus: {
      currentPlayingIndex: 0,
      currentPlayingList: []
    },
    searchStatus: {
      currentSearch: "",
      currentSearchResult: {
        queryString: "",
        songItems: []
      }
    },
    lists: {
      favorites: []
    }
  },
  getters: {
    currentPlay: state => {
      return state.playingStatus.currentPlayingList[state.playingStatus.currentPlayingIndex] || {};
    }
  },
  mutations: {
    add(state, {
      songInfo,
      targetList
    }) {
      let list=targetList === 'currentPlayingList'?state.playingStatus.currentPlayingList:state.lists[targetList];
      if (list.every(
          (song) => song.MUSICRID !== songInfo.MUSICRID
        )) {
        list.push(songInfo);
      }
    },
    remove(state, {
      songInfo,
      targetList
    }) {let list=targetList === 'currentPlayingList'?state.playingStatus.currentPlayingList:state.lists[targetList];
      let index = list.findIndex((song) => song.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        list.splice(index, 1);
      }
    },
    playThis(state, {
      songInfo = {}
    }) {
      let index = state.playingStatus.currentPlayingList.findIndex((song) => song.MUSICRID === songInfo.MUSICRID);
      if (index !== -1) {
        state.playingStatus.currentPlayingIndex = -1; //不可删除本行，否则在列表中点击当前正在播放的曲目时无法引起动态响应
        state.playingStatus.currentPlayingIndex = index;
      } else if (songInfo.url !== undefined) {
        state.playingStatus.currentPlayingList.splice(state.playingStatus.currentPlayingIndex, 0, songInfo);
      }
    }
  },
  actions: {
    //从本地数据库更新曲目数据到state.favorites数组
    async updateFavorites(context) {
      await db.getTable(context.state.lists, 'favorites');
      await db.getTable(context.state.playingStatus,'currentPlayingList');
    },
    add(context, {
      songInfo,
      targetList
    }) {
      context.commit('add', {
        songInfo,
        targetList
      });
      db.add(songInfo, targetList);
    },
    remove(context, {
      songInfo,
      targetList
    }) {
      context.commit('remove', {
        songInfo,
        targetList
      });
      db.remove(songInfo, targetList);
    },
    updateSong(context, {
      songInfo,
      targetList
    }) {
      db.put(songInfo, targetList);
    }
  }
});
