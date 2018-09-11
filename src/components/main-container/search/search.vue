<template>
<div id='search'>
    <div class='searchBox'>
      <input 
        type='text' 
        v-model.trim.lazy='searchArgs.queryString' 
        placeholder='search' 
        v-on:keyup.enter='search' 
        class='search'>
    </div>
    <ul v-show='songItems!==[]' class='songList'>
        <li 
          v-for='songItem in songItems' 
          v-bind:key='songItem.MUSICRID' 
          class='song-container'>
            <song-item 
              v-bind:songInfo='songItem' 
              class='show-icon-music show-icon-favorite'
            ></song-item>
          </li>
        <li class='tips'></li>
    </ul>
</div>
</template>
<script>
import songItem from '../../common/songItem/songItem.vue';
import store from '../../../store/store.js';

export default {
  data: function() {
    return {
      searchArgs: {
        queryString: '',
        page: 1,
        counts: 10
      },
      songItems: []
    };
  },
  methods: {
    search: function() {
      this.axios
        .get(`/api/search/`, { params:this.searchArgs })
        .then(response => {
          this.songItems = response.data.abslist;
        })
        .catch(response => {
          console.log(response);
        });
    }
  },
  components: {
    songItem
  }
};
</script>
<style>
#search {
  height: 100%;
}
.searchBox {
  background-color: #f4f4f4;
  text-align: center;
}
.search {
  display: inline-block;
  border-radius: 8px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
  margin: 8px 12px;
  padding-left: 6px;
  border: none;
}
.search:focus {
  outline: none;
}
.songList {
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: auto;
}
.song-container {
  position: relative;
  text-align: left;
}
.song-container li::after {
  content: '';
  position: absolute;
  height: 1px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #e5e5e5;
}
.tips {
  text-align: center;
  min-height: 120px;
  width: 100%;
}
</style>