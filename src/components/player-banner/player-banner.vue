<template>
  <div class="player-banner">

    <i class="icon-musical-quaver"></i>
    <div class="song">
      <h6 class='songName'
          v-html="currentPlay.SONGNAME"></h6>
      <p class='artist'
         v-html="currentPlay.ARTIST"></p>
    </div>
    <i class="icon-music-playlist"
       v-on:click="showPlayList=!showPlayList"></i>
    <i class="icon-next"
       v-on:click="playNext"></i>
    <i v-bind:class="[isPlaying?'icon-music-player-pause-lines':'icon-music-player-play']"
       v-on:click="isPlaying === true ? pausePlay() : startPlay()"></i>
    <transition name="playList-pop">
    <playing-list ref="playList"
                  class="playList"
                  v-show="showPlayList"></playing-list>
    </transition>
    <audio ref="audio"
           class="audio"
           v-bind:src="currentPlay.url"
           v-on:playing="isPlaying=true"
           v-on:pause="isPlaying=false"
           v-on:timeupdate="currentTime=$refs.audio.currentTime"
           v-on:ended="playNext"
           v-on:canplay="() =>{startPlay()}"
           v-on:error="errorHandler"
           preload="auto"></audio>

  </div>
</template>
<script>
import store from "../../store/store";
import playingList from "./playingList/playingList";

export default {
  data: function() {
    return {
      isPlaying: false,
      currentTime: 0,
      showPlayList: false
    };
  },
  components: {
    playingList
  },
  computed: {
    currentPlay: {
      get: function() {
        return store.getters.currentPlay || {};
      }
    }
  },
  watch: {
    currentPlay: function(newPlay) {
      this.isPlaying = false;
      this.$refs.audio.load();
    }
  },
  methods: {
    startPlay() {
      let playPromise = this.$refs.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
        }).catch(error => {
          console.log(error);
        });
      }
    },
    pausePlay() {
      this.$refs.audio.pause();
    },
    playNext() {
      console.log("playnext");
      let index;
      switch (this.$refs.playList.currentModeIndex) {
        case 0:
          index =
            (store.state.playingStatus.currentPlayingIndex + 1) % store.state.playingStatus.currentPlayingList.length;
          if (store.state.playingStatus.currentPlayingIndex === index) {
            this.startPlay();
          } else {
            store.state.playingStatus.currentPlayingIndex = index;
          }
          break;
        case 1:
          this.$refs.audio.currentTime=0;
          break;
        case 2:
          index = Math.round(
            (store.state.playingStatus.currentPlayingList.length - 1) * Math.random()
          );
          if (store.state.playingStatus.currentPlayingIndex === index) {
            this.startPlay();
          } else {
            store.state.playingStatus.currentPlayingIndex = index;
          }
          break;
      }
    },
    errorHandler(error) {
      let playing = this.currentPlay;
      console.log("play failed!");
      console.log(event.target.error.code);
      console.log(playing.SONGNAME);
      this.axios
        .get("/api/getSongUrl", { params: { rid: playing.MUSICRID } })
        .then(response => {
          playing.url = response.data;
          store.dispatch("updateSong", {
            songInfo: playing,
            targetList: "favorites"
          });
          console.log("updated url");
        })
        .catch(response => {
          console.log(response);
          console.log("url重获取失败");
        });
    }
  }
};
</script>
<style lang="less">
.player-banner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 50;
  background: #bbb;
  .song {
    display: inline-block;
    height: 36px;
    max-width: 22em;
    line-height: 20px;
    vertical-align: middle;
    .songName {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
      font-weight: bold;
    }
  }
  [class^="icon-"],
  [class*=" icon-"] {
    margin: 0 4px;
    &:not(:first-child) {
      float: right;
    }
  }
  .playList-pop-enter-to,.playList-pop-leave{
    max-height: 280px;
  }
  .playList-pop-enter,.playList-pop-leave-to{
    max-height: 0;
    min-height: 0;
  }
  .playList-pop-enter-active{
    transition: all 1s;
    overflow: hidden;
    z-index: -10;
  }
  .playList {
    position: absolute;
    bottom: 50px;
    width: 100%;
  }
}
</style>
