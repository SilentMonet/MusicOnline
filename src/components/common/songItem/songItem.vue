<template>
    <div class="songItemContainer" v-if="songInfo!==null">
      <i class="icon-music"></i>
        <div class="song" v-on:click="playThis">
          <h6 class='songName' v-html="songInfo.SONGNAME"></h6>
          <p class='artist' v-html="songInfo.ARTIST"></p>
        </div>
        <i class="icon-favorite" v-on:click='toggleFavor' v-bind:class="{'favorite':isFavorite}"></i>
        <i class="icon-del" v-on:click='del'></i>
        <i class="icon-join"></i>
    </div>
</template>
<script>
import store from '../../../store/store';

export default {
  data:function () {
    return {
      isFavorite : false
    }
  },
  props: ["songInfo"],
  methods:{
    toggleFavor: function () {
      this.isFavorite=!this.isFavorite;  
      this.isFavorite===true?store.dispatch('addFavorite',this.songInfo):store.dispatch('removeFavorite',this.songInfo);
    },
    del :function () {
      store.dispatch('removeFavorite',this.songInfo);
    },
    playThis: function () {
      store.commit('playNext',this.songInfo);
    }
  }
};
</script>
<style scoped>
.songItemContainer{
  position: relative;
}
.songItemContainer [class^='icon-']{
  display: none;
}
.show-icon-music>.icon-music, .show-icon-favorite>.icon-favorite, .show-icon-del>.icon-del, .show-icon-join>.icon-join{
  display: initial;
}
.song,
.songName,
.artist {
  padding: 0;
  margin: 0;
  text-align: left;
}
.song {
  display: inline-block;
  min-height: 50px;
  padding-left: 46px;
  padding-bottom: 4px;
}
.songName {
  margin: 10px 0 2px;
  line-height: 18px;
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 256px;
}
.artist {
  color: #808080;
}
.icon-music{
  position: absolute;
  top:14px;
  left: 10px;
  font-size: 24px;
  color: rgba(0,0,0,0.2);
}
.icon-favorite,.icon-del,.icon-join{
  float: right;
  font-size: 24px;
  margin:12px 4px 12px;
}
.icon-favorite.favorite{
  color: red;
}

</style>