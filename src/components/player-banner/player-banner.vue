<template>
    <div class="player-banner" v-on:click="startPlay">
      <audio ref="audio" class="audio" v-bind:src="currentPlay.url"></audio>
    </div>
</template>
<script>
import store from '../../store/store';
export default {
  data: function () {
    return {
      // currentPlay : {url:"http://other.web.nf01.sycdn.kuwo.cn/resource/n3/19/83/246973631.mp3"}
    }
  },
  computed: {
    currentPlay: function () {
      return store.getters.currentPlay||{};
    }
  },
  methods: {
    startPlay () {
      this.$refs.audio.play();
    }
  }
}
</script>
<style>
.player-banner{
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: whitesmoke;
}
</style>
