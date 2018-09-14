<template>
    <div class="player-banner" >
      
      <i class="icon-music"></i>
      <div class="song">
          <h6 class='songName' v-html="currentPlay.SONGNAME"></h6>
          <p class='artist' v-html="currentPlay.ARTIST"></p>
      </div>
      <i
        class="icon-playList"
        v-on:click="showPlayList=!showPlayList"
        ></i>
      <i
        class="icon-next"
        v-on:click="playNext"
        ></i>
      <i 
        v-bind:class="[isPlaying?'icon-pause':'icon-play']" 
        v-on:click="isPlaying === true ? pausePlay() : startPlay()"
        ></i>
      
      <playing-list
        ref="playList"
        class="playList"
        v-show="showPlayList"
        ></playing-list>
      <audio 
        ref="audio" 
        class="audio" 
        v-bind:src="currentPlay.url" 
        v-on:playing="isPlaying=true" 
        v-on:pause="isPlaying=false" 
        v-on:timeupdate="currentTime=$refs.audio.currentTime"
        v-on:ended="playNext"
        v-on:canplay="startPlay"
        v-on:error="errorHandler"
        preload="auto"
        ></audio>

    </div>
</template>
<script>
import store from "../../store/store";
import playingList from './playingList/playingList';

export default {
  data: function() {
    return {
      isPlaying: false,
      currentTime: 0,
      showPlayList:false
    };
  },
  components:{
    playingList
  },
  computed: {
    currentPlay: {
      get: function() {
        return store.getters.currentPlay || {};
      },
      set: function() {
        this.pausePlay();
      }
    },
  },
  watch: {
    currentPlay: function(newPlay) {
      this.$refs.audio.currentTime = 0;
      this.isPlaying=false;
      this.$refs.audio.load();
    }
  },
  methods: {
    startPlay() {
      let playPromise = this.$refs.audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            
          })
          .catch(error => {
            console.log(error);
            this.isPlaying=false;
          });
      }
    },
    pausePlay() {
      this.$refs.audio.pause();
    },
    playNext() {
      console.log('playnext');
      let index;
      switch(this.$refs.playList.playModes[this.$refs.playList.currentModeIndex]){
        case 'loop-list':
          index = (store.state.currentIndex + 1) % store.state.currentList.length;
          if( store.state.currentIndex===index ){
            this.$refs.audio.currentTime=0;
            this.startPlay();
          }
          else{
            store.state.currentIndex=index;
          }
          break;
        case 'loop-one':
          this.$refs.audio.currentTime=0;
          this.startPlay();
          break;
        case 'shuffle':
          index=Math.round((store.state.currentList.length-1)*Math.random());
          if( store.state.currentIndex===index ){
            this.$refs.audio.currentTime=0;
            this.startPlay();
          }
          else{
            store.state.currentIndex=index;
          }
          break;      
      }
    },
    errorHandler (error) {
      let playing=this.currentPlay;
      console.log('play failed!');
      console.log(event.target.error.code);
      console.log(playing.SONGNAME);
      this.axios.get('/api/getSongUrl',{ params: {'rid':playing.MUSICRID} } )
        .then(response =>{
          playing.url=response.data;
          store.dispatch('updateSong',{'songInfo':playing,'targetList':'favorites'});
          console.log('updated url');
        })
        .catch(response => {
          console.log(response);
          console.log('url重获取失败');
        });
      
    }
  }
};
</script>
<style>
.player-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background: #eeeeee;
}
.player-banner>*:not(.playList) {
  background: #eeeeee;
}
.player-banner>.song,
.player-banner .songName,
.player-banner .artist {
  margin: 0;
  padding: 0;
  
}
.player-banner>.song {
  display: inline-block;
  max-width: 200px;
  
  min-height: 50px;
  padding-left: 46px;
  padding-bottom: 4px;
}
.player-banner .songName {
  margin: 10px 0 0;
  line-height: 18px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
.player-banner .artist {
  color: #808080;
  font-size: 12px;
  line-height: 1.5;
  }
.player-banner .icon-music {
  position: absolute;
  top: 14px;
  left: 10px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
}
.player-banner .icon-play,
.player-banner .icon-pause,
.player-banner .icon-next,
.player-banner .icon-playList{
  float: right;
  font-size: 24px;
  margin: 12px 4px 12px;
  color: rgba(0, 0, 0, 0.5);
}

.player-banner .icon-next{
  
  font-size: 22px;
  margin-left: 0;
  font-weight: bolder;
}
.player-banner .playList{
  position: absolute;
  bottom: 50px;
  width: 100%;
  max-height: 280px;
  min-height: 200px;
  z-index: -50;
}
</style>
