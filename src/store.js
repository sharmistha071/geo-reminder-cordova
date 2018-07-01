import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lat: '',
    long: '',
    todo: {
      place_name: '',
      lat: '',
      long: '',
      title: '',
      description: ''
    }
  },
  mutations: {
    setDeviceLocation (state, deviceLocation) {
      state.lat = deviceLocation.lat;
      state.long = deviceLocation.long;
    },
    setPlace (state, place){
      state.todo.place_name = place.name;
      state.todo.lat = place.lat;
      state.todo.long = place.long;
    },
    setTodo (state, todo){
      state.todo.title = todo.title;
      state.todo.description = todo.description;
    }
  }
})
