<template>
  <div class='searcher'>
    <div class='searchBox'>
      <input type='text'
             v-model.trim='queryString'
             placeholder='search'
             v-on:keyup.enter.stop='search'
             class='search'>
      <button class="searchButton"
              v-on:click='search'>搜索</button>
    </div>
    <transition-group name="resultList" tag="ul" v-show='resultItems!==[]'
        class='songList'>
      <li v-for='songItem in resultItems'
          v-bind:key='songItem.MUSICRID'
          v-on:click="playThis(songItem)"
          class='songContainer'>
        <i class="icon-loving-heart-shape"
           v-bind:class="{'isFavorite':songItem.isFavorite||false}"
           v-on:click.stop="toggleFavor(songItem)"></i>
        <song-item v-bind:songInfo='songItem'></song-item>
      </li>
    </transition-group>
  </div>
</template>
<script>
import songItem from "../../common/songItem/songItem";
import store from "../../../store/store.js";

export default {
  data: function() {
    return {
      searchArgs: {
        page: 0,
        counts: 10
      }
    };
  },
  computed: {
    queryString: {
      get() {
        return store.state.searchStatus.currentSearch || "";
      },
      set(string) {
        store.state.searchStatus.currentSearch = string;
      }
    },
    resultItems: {
      get() {
        return store.state.searchStatus.currentSearchResult.songItems;
      },
      set (items) {
        store.state.searchStatus.currentSearchResult.songItems=items;
      }
    }
  },
  methods: {
    search: function() {
      if (this.queryString === "") {
        this.resultItems = [];
      } else {
        this.axios
          .get("/api/search/", {
            params: { ...this.searchArgs, queryString: this.queryString }
          })
          .then(response => {
            this.queryString = response.data.queryString;
            for(let song of response.data.abslist){
              song.isFavorite=!store.state.lists.favorites.every( (s) => {
                return s.MUSICRID !== song.MUSICRID
              });
            }
            this.resultItems = response.data.abslist;
          })
          .catch(response => {
            alert("请求搜索失败");
          });
      }
    },
    toggleFavor(songItem) {
      songItem.isFavorite = !songItem.isFavorite;
      songItem.isFavorite === true
        ? store.dispatch("add", { songInfo: songItem, targetList: "favorites" })
        : store.dispatch("remove", {
            songInfo: songItem,
            targetList: "favorites"
          });
    },
    playThis(songItem){
      store.commit('playThis',{'songInfo':songItem})
    }
  },
  components: {
    songItem
  }
};
</script>
<style lang="less">
.searcher {
  height: 100%;
  width: 100%;
  .searchBox {
    padding: 4px 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.1);
    .search {
      height: 20px;
      border-radius: 8px;
      border: none;
      padding-left: 8px;
      outline: none;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.3);
    }
    .searchButton {
      font-size: 14px;
      padding: 1px 8px;
      border-radius: 8px;
      color: rgba(0, 0, 0, 0.4);
      background-color: rgba(0, 0, 0, 0.1);
      border: none;
      outline: none;
    }
  }
  .songList {
    position: absolute;
    top: 38px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    .songContainer {
      .icon-loving-heart-shape {
        float: right;
        padding: 10px 8px;
        z-index: 50;
        &.isFavorite {
          color: chocolate;
        }
      }
    }
  }
  .resultList-enter-to,.resultList-leave{
    max-height: 60px;
  }
  .resultList-enter-active {
    transition: all 1s;
    overflow: hidden;
  }
  .resultList-enter,
  .resultList-leave-to {
    max-height: 0;
  }
}
</style>