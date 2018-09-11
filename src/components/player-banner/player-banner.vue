<template>
    <div class="player-banner" >
      <i class="icon-music"></i>
      <div class="song">
          <h6 class='songName' v-html="currentPlay.SONGNAME"></h6>
          <p class='artist' v-html="currentPlay.ARTIST"></p>
      </div>
      <i
        v-bind:class="currentModeClass"
        v-on:click="currentModeIndex=[currentModeIndex+1]%playModes.length"
      ></i>
      <i
        class="icon-next"
        v-on:click="playNext"
      ></i>
      <i 
        v-bind:class="[isPlaying?'icon-pause':'icon-play']" 
        v-on:click="isPlaying === true ? pausePlay() : startPlay()"
        ></i>
      
      <audio 
        ref="audio" 
        class="audio" 
        v-bind:src="currentPlay.url" 
        v-on:playing="isPlaying=true" 
        v-on:pause="isPlaying=false" 
        v-on:timeupdate="currentTime=$refs.audio.currentTime"
        v-on:ended="playNext"
        v-on:canplay="startPlay"
        preload="auto"
        ></audio>

    </div>
</template>
<script>
import store from "../../store/store";
export default {
  data: function() {
    return {
      isPlaying: false,
      currentTime: 0,
        playModes:['loop-list','loop-one','shuffle'],
        currentModeIndex:0
      
    };
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
    currentModeClass: function () {
      return 'icon-'+this.playModes[this.currentModeIndex]
    }
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
            console.log("start to play");
            
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
      switch(this.playModes[this.currentModeIndex]){
        case 'loop-list':
          store.state.currentIndex = (store.state.currentIndex + 1) % store.state.currentList.length;
          break;
        case 'loop-one':
          this.$refs.audio.currentTime=0;
          this.startPlay();
          break;
        case 'shuffle':
          let index=Math.round((store.state.currentList.length-1)*Math.random());
          if( store.state.currentIndex===index ){
            this.$refs.audio.currentTime=0;
          this.startPlay();
          }
          else{
            store.state.currentIndex=index;
          }
          break;      
      }
      
    }
  },
  mounted: function() {
  },
  beforeDestroy: function() {
  }
};
</script>
<style>
.player-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background: #eeeeee;
}
.song,
.songName,
.artist {
  margin: 0;
  padding: 0;
  
}
.song {
  display: inline-block;
  max-width: 250px;
  min-height: 50px;
  padding-left: 46px;
  padding-bottom: 4px;
}
.songName {
  margin: 10px 0 0;
  line-height: 18px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;
}
.artist {
  color: #808080;
  font-size: 12px;
  line-height: 1.5;
  }
.icon-music {
  position: absolute;
  top: 14px;
  left: 10px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
}
.icon-play,
.icon-pause,
.icon-loop-list,
.icon-loop-one,
.icon-shuffle,
.icon-next{
  float: right;
  font-size: 24px;
  margin: 12px 4px 12px;
  color: rgba(0, 0, 0, 0.5);
}

.icon-loop-list,
.icon-loop-one,
.icon-shuffle{
  width: 26px;
  margin-right: 8px;
}
.icon-shuffle{
  margin-top: 10px;
}
.icon-loop-one{
  font-size: 18px;
  font-weight: bold;
  margin-top: 14px;
}
.icon-loop-list{
  margin-top: 13px;
  font-size: 18px;
  font-weight: bolder;
}
.icon-next{
  
  font-size: 22px;
  margin-left: 0;
  font-weight: bolder;
}
</style>
