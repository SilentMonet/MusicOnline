<template>
    <div class="lists-container" v-if="favorites!==[]">
        <song-item v-for="songItem in favorites" v-bind:key='songItem.MUSICRID' v-bind:songInfo="songItem" class="show-icon-music show-icon-del"></song-item>
    </div>
</template>
<script>
import store from '../../../store/index';
import songItem from '../../common/songItem/songItem';

export default {
    components:{
        songItem
    },
    computed:{
        favorites:function () {
            console.log(store.state.favorites);
            return store.state.favorites;
        }
    }
}
</script>
<style>

</style>
