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
      description: '',
      geoFenceId: null,
      device_uuid: null
    },
    editId: null,
    device_uuid: null
  },
  mutations: {
    setDeviceUUID (state, id){
      state.device_uuid = id;
    },
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
    },
    setEditId (state, id){
      state.editId = id;
    },
    setGeoFenceId (state, id){
      state.todo.geoFenceId = id;
    }
  }
})
