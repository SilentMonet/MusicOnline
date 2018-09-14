<template>
  <div class="playingList">
    <div class="toolBar">
      <i
        v-bind:class="currentModeClass"
        v-on:click="currentModeIndex=[currentModeIndex+1]%playModes.length"
      ></i>
      <span class="modeTag" v-text="playModesTag[currentModeIndex]"></span>

    </div>
    <ul class="list">
      <li
      v-for="songItem in playList"
      v-bind:key="songItem.MUSICRID"
      >
        <song-item 
        v-bind:songInfo="songItem"
        class="hide-icon-music hide-icon-favorite hide-icon-del hide-icon-join"
        ></song-item>
        <i class="icon-close" v-on:click="remove(songItem)"></i>
      </li>
      
      
    </ul>
  </div>
</template>

<script>
import store from '../../../store/store.js';
import songItem from '../../common/songItem/songItem';

export default {
  data () {
    return {
      playModes:['loop-list','loop-one','shuffle'],
      playModesTag:['列表循环','单曲循环','随机播放'],
      currentModeIndex:0,
    }
  },
  computed:{
    playList () {
      return store.state.currentList;
    },
    currentModeClass: function () {
      return 'icon-'+this.playModes[this.currentModeIndex]
    }
  },
  components: {
    songItem
  },
  methods:{
    remove (song) {
      store.commit('remove',{'songInfo':song,'targetList':'currentList'});
    }
  }
}
</script>

<style>
.playList{
  background-color: #f3f3f3;
  overflow: auto;
  padding-top: 35px;
}
.toolBar{
  position: absolute;
  top:0;
  width: 100%;
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-bottom: 1px solid rgba(9, 9, 9, 0.1);
}
.icon-loop-list,
.icon-loop-one,
.icon-shuffle{
  /* float: right; */
  padding-top: 3px;
  color: rgba(0, 0, 0, 0.5);
  width: 26px;
  height: 24px;
  margin-right: 8px;
  margin-left: 10px;
}
.icon-loop-one{
  font-size: 18px;
  font-weight: bold;
}
.icon-loop-list{
  font-size: 18px;
  font-weight: bolder;
} 
.icon-shuffle{
  font-size: 20px;
}
.modeTag{
  font-weight: lighter;
  color: #444;
  vertical-align: super;
}
.list{
  width: 100%;
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: auto;
}
.list li{
  display: inline-block;
  position: relative;
  width: 100%;
}

.icon-close{
  position:absolute;
  right: 8px;
  top: 12px;
  font-size: 24px;
}
</style>
