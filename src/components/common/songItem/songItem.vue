<template>
  <div class="songItemContainer"
       v-if="songInfo!==null">
    <i class="icon-music-note-quaver"></i>
    <div class="songInfo">
      <h3 class='songName'
          v-html="songInfo.SONGNAME"></h3>
      <p class='artist'
         v-html="songInfo.ARTIST"></p>
    </div>
  </div>
</template>
<script>
import store from "../../../store/store";

export default {
  data: function() {
    return {};
  },
  props: ["songInfo"],
  methods: {}
};
</script>
<style lang="less">
.songItemContainer {
  padding: 8px 0;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .songInfo {
    display: inline-block;
    width: 20em;
    .songName {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    .artist {
      color: #808080;
    }
  }
}
</style>