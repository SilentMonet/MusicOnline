<template>
  <div id="app">
    <player-banner></player-banner>
    <main-container></main-container>
  </div>
</template>

<script>
import playerBanner from './components/player-banner/player-banner.vue';
import mainContainer from './components/main-container/mainContainer.vue'

export default {
  name: 'App',
  components:{
    playerBanner,
    mainContainer
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  color: #2c3e50;
}
</style>
