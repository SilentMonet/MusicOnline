<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="content-view">
      <router-view></router-view>
    </div>
    <player-banner></player-banner>
  </div>
</template>

<script>
import playerBanner from "./components/player-banner/player-banner";
import navBar from "./components/nav-bar/nav-bar";

export default {
  name: "App",
  components: {
    playerBanner,
    navBar
  }
};
</script>


<style lang="less">
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .content-view{
    position: absolute;
    top:36px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
}
</style>
