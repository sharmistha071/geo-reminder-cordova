import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import store from './store.js';
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios';

import 'onsenui';
// Onsen UI Styling and Icons
require('onsenui/css-components-src/src/onsen-css-components.css');
require('onsenui/css/onsenui.css');
require('./styles/style.css');

import App from './App';

Vue.use(VueOnsen);
Vue.use(axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyANqCc_pPnIa9xZ92iT_gaXocQJedL-mNk",
    libraries: "places" // necessary for places input
  }
});


new Vue({
  el: '#app',
  store,
  template: '<app></app>',
  components:{App}
});
