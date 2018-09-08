/* jshint esversion: 6 */ 
import Vue from 'vue';
import Router from 'vue-router';
import list from '../components/main-container/list/list';
import search from '../components/main-container/search/search';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path:'/search',
      name:'search',
      component:search
    }
  ]
});
