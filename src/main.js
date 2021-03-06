// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store/store';
require('./assets/font/icon.css');

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
store.dispatch('updateFavorites');
router.push('lists');