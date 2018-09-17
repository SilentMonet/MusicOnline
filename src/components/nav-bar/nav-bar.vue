<template>
  <div class="navBar">
    <router-link to="searcher">
      <i class="icon-music-searcher"></i>
    </router-link>
    <router-link to="lists">
      <i class="icon-songs-list"></i>
    </router-link>
    <br>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.navBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  line-height: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  a {
    float: right;
    margin: 4px 6px;
    font-size: 24px;
    text-decoration: none;
    color: #777;
    -webkit-tap-highlight-color: transparent;
    &.router-link-active {
      color: #222;
    }
  }
}
</style>
