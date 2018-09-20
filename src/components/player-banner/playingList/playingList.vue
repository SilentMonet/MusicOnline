<template>
  <div class="playingList">
    <div class="toolBar">
      <i id="changeMode"
         v-bind:class="playModesClass[currentModeIndex]"
         v-on:click="currentModeIndex=[currentModeIndex+1]%playModesText.length"
         v-text="playModesText[currentModeIndex]"></i>

    </div>
    <transition-group name="list"
                      class="playItems"
                      tag="ul">
      <li class="item"
          v-for="songItem in playList"
          v-bind:key="songItem.MUSICRID"
          v-on:click="playThis(songItem)">
        <i class="icon-cancel-music"
           v-on:click.stop="remove(songItem)"></i>
        <song-item v-bind:songInfo="songItem"></song-item>

      </li>
    </transition-group>
  </div>
</template>

<script>
import store from "../../../store/store.js";
import songItem from "../../common/songItem/songItem";

export default {
  data() {
    return {
      playModesText: ["列表循环", "单曲循环", "随机播放"],
      playModesClass: [
        "icon-lines-menu",
        "icon-clockwise-arrow",
        "icon-shuffle"
      ],
      currentModeIndex: 0
    };
  },
  computed: {
    playList() {
      return store.state.playingStatus.currentPlayingList;
    }
  },
  components: {
    songItem
  },
  methods: {
    remove(song) {
      store.commit("remove", {
        songInfo: song,
        targetList: "currentPlayingList"
      });
    },
    playThis(songItem) {
      store.commit("playThis", { songInfo: songItem });
    }
  }
};
</script>

<style lang="less">
.playingList {
  max-height: 280px;
  min-height: 200px;
  background-color: rgb(75%, 75%, 75%);
  line-height: 1;
  overflow: auto;
  .toolBar {
    position: sticky;
    top: 0;
    left: 0;
    line-height: 28px;
    background-color: #bbb;
    #changeMode {
      &::before {
        font-size: 18px;
        padding: 4px;
      }
      font-size: 14px;
      font-weight: 600;
    }
  }
  .playItems {
    transition: height 1s 1s;
    .icon-cancel-music {
      float: right;
      padding: 12px 12px;
      &::before {
        font-size: 14px;
      }
    }
    .item {
      padding-left: 1em;
      line-height: 20px;
      .icon-music-note-quaver {
        display: none;
      }
    }
  }
  .list-move {
    transition: all 1s ease;
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    position: absolute;
    width: 100%;
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
}
</style>
