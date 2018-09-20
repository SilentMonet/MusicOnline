<template>
  <div class="lists-container"
       v-if="favorites!==[]">
    <transition-group name="items"
                      tag="ul"
                      class="items">
      <li class="songItem"
          v-for="songItem in favorites"
          v-bind:key='songItem.MUSICRID'
          v-on:click.stop="playThis(Object.assign({},songItem))">
        <i class="icon-waste-bin"
           v-on:click.stop="del(songItem)"></i>
        <song-item v-bind:songInfo="songItem"></song-item>
      </li>
    </transition-group>

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
    del(songInfo) {
      store.dispatch("remove", { songInfo: songInfo, targetList: "favorites" });
    },
    playThis(songInfo) {
      // console.log(songInfo.SONGNAME);
      store.state.playingStatus.currentPlayingList.splice(0);
      for (let song of this.favorites) {
        store.dispatch("add", {
          songInfo: song,
          targetList: "currentPlayingList"
        });
      }
      store.commit("playThis", { songInfo });
    }
  },
  created() {}
};
</script>
<style lang="less">
.lists-container {
  height: 100%;
  overflow: auto;
  .items{
    position: relative;
  }
  .songItem {
    transition: height 1s ease;
    .icon-waste-bin {
      float: right;
      padding: 10px 8px;
    }
  }
  //列表项删除动画
  .items-move {
    transition: all 1s;
  }
  .items-leave,.items-enter-to{
    max-height: 60px;
  }
  .items-enter-active{
    transition: all 1s;
    overflow: hidden;
  }
  .items-leave-active {
    position: absolute;
    width: 100%;
    overflow: hidden;
    transition: all 1s ease;
  }
  .items-enter,
  .items-leave-to {
    max-height: 0;
  }
}
</style>
