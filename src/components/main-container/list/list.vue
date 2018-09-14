<template>
    <div class="lists-container" v-if="favorites!==[]">
        <song-item 
            v-for="songItem in favorites" 
            v-bind:key='songItem.MUSICRID' 
            v-bind:songInfo="songItem" 
            class="hide-icon-favorite hide-icon-join"
            ></song-item>
    </div>
</template>
<script>
import store from '../../../store/store.js';
import songItem from '../../common/songItem/songItem';

export default {
    components:{
        songItem
    },
    computed:{
        favorites:function () {
            return store.state.favorites;
        }
    },
    mounted(){
        store.dispatch('updateFavorites');
    }
}
</script>
<style>
.lists-container{
    height: 100%;
    overflow: auto;
    padding-bottom: 50px;
}
</style>
