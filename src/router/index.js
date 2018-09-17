/* jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import lists from '../components/content-view/lists/lists';
import searcher from '../components/content-view/searcher/searcher';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/lists',
      name: 'lists',
      component: lists
    },
    {
      path:'/searcher',
      name:'searcher',
      component:searcher
    }
  ]
});
