<template>
  <div class="lists-container"
       v-if="favorites!==[]">
    <ul class="items">
      <li class="songItem"
          v-for="songItem in favorites"
          v-bind:key='songItem.MUSICRID'
          v-on:click.stop="playThis(Object.assign({},songItem))">
          <i class="icon-waste-bin"
          v-on:click.stop="del(songItem)"></i>
        <song-item v-bind:songInfo="songItem"></song-item>
      </li>
    </ul>
  </div>
</template>
<script>
import store from "../../../store/store.js";
import songItem from "../../common/songItem/songItem";

export default {
  components: {
    songItem
  },
  computed: {
    favorites: function() {
      return store.state.lists.favorites;
    }
  },
  methods: {
    del (songInfo) {
      store.dispatch('remove',{'songInfo':songInfo,'targetList':'favorites'});
    },
    playThis (songInfo) {
      console.log(songInfo.SONGNAME);
      store.state.playingStatus.currentPlayingList.splice(0);
      for (let song of this.favorites){
        store.dispatch('add',{'songInfo':song,targetList:'currentPlayingList'});
      };
      store.commit('playThis',{songInfo});
    }
  },
  created() {
  }
};
</script>
<style lang="less">
.lists-container {
  height: 100%;
  overflow: auto;
  .songItem{
    .icon-waste-bin {
      float: right;
      padding: 10px 8px;
    }
  }
}
</style>
