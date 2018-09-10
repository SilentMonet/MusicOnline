<template>
    <div class="main-container">
        <div class="nav">
            <div class='tab' v-for="tab in tabs" v-bind:class="{active:tab.id==currentTab}" v-bind:key='tab.id' v-on:click="currentTab=tab.id">{{tab.name}}</div>
        </div>
        <keep-alive>
          <component v-bind:is='currentTab'></component>
        </keep-alive>
    </div>
</template>
<script>
import list from "./list/list.vue";
import search from "./search/search.vue";
export default {
  data: function() {
    return {
      tabs:[
        {
          id:'list',
          name:'列表'
        },
        {
          id:'search',
          name:'搜索'
        }
      ],
      currentTab:''
    }
  },
  components: {
    list,
    search
  },
  mounted:function(){
    this.currentTab=this.tabs===null?'':this.tabs[0].id;
  }
};
</script>
<style>
.main-container {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 40px;
}
.nav{
  display: flex;
  justify-content: space-around;
}
.tab{
  flex: 1;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: rgba(0,0,0,0.6);
}
.tab.active,.tab:hover{
  background-color: antiquewhite;
  -webkit-tap-highlight-color: transparent;
}
</style>
