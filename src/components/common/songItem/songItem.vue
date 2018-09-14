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
      this.isFavorite===true?store.dispatch('add',{'songInfo':this.songInfo,'targetList':'favorites'}):store.dispatch('remove',{'songInfo':this.songInfo,'targetList':'favorites'});
    },
    del :function () {
      store.dispatch('remove',{'songInfo':this.songInfo,'targetList':'favorites'});
    },
    playThis: function () {
      store.commit('playThis',this.songInfo);
    }
  }
};
</script>
<style scoped>
.songItemContainer{
  position: relative;
  /* border-radius: 1px; */
  -webkit-tap-highlight-color: transparent;
  border-bottom: 1px solid rgba(4,4,4,0.1);
}
.songItemContainer:active{
  background-color: rgba(0,0,0,0.1);
}

.songItemContainer .song,
.songItemContainer .songName,
.songItemContainer .artist {
  padding: 0;
  margin: 0;
  text-align: left;
}
.songItemContainer .song {
  display: inline-block;
  min-height: 50px;
  min-width: 220px;
  padding-left: 10px;
  padding-bottom: 4px;
  cursor: pointer;
}
.songItemContainer .songName {
  margin: 10px 0 2px;
  line-height: 18px;
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 256px;
}
.songItemContainer .artist {
  color: #808080;
}
.songItemContainer .icon-music{
  display: inline-block;
  width:24px;
  height: 25px;
  vertical-align: top;
  margin-top: 15px;
  margin-left: 10px;
  font-size: 24px;
  color: rgba(0,0,0,0.2);
}
.songItemContainer .icon-favorite,.songItemContainer .icon-del,.songItemContainer .icon-join{
  float: right;
  font-size: 24px;
  margin:12px 4px 12px;
}
.songItemContainer .icon-del{
  color: rgba(0,0,0,0.5);
}
.songItemContainer .icon-favorite.favorite{
  color: red;
}
.hide-icon-music .icon-music, .hide-icon-favorite .icon-favorite, .hide-icon-del .icon-del, .hide-icon-join .icon-join{
  display:none;
}
</style>