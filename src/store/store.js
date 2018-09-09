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
      console.log(state.favorites);
      state.favorites.push(songInfo);
    },
    removeFavorite(state, songInfo) {
      let index = state.favorites.indexOf(songInfo);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    }
  },
  actions: {
    //从本地数据库更新曲目数据到state.favorites数组
    updateFavorites(context) {
      var db, favorTab, request;
      const dbName = 'Lists';
      request = window.indexedDB.open(dbName);

      request.onerror = function (event) {
        console.log('open database failed');
      };

      request.onsuccess = function (event) {
        db = request.result;
        favorTab = db.transaction(['favorites'], 'readonly').objectStore('favorites');
        request = favorTab.getAll();
        request.onsuccess = function (event) {
          context.state.favorites = event.result||[];
        };
      };

      request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('favorites')) {
          favorTab = db.createObjectStore('favorites', {
            keyPath: 'MUSICRID'
          });
          favorTab.createIndex('NAME', 'NAME', {
            unique: false
          });
          favorTab.createIndex('ARTIST', 'ARTIST', {
            unique: false
          });
        }
      };
    },
    addFavorite(context,songInfo){
      context.commit('addFavorite',songInfo);
      db.add();
    },
    removeFavorite(context,songInfo){
      context.commit('removeFavorite',songInfo);
    }
  }
});
