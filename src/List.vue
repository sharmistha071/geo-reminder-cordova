<template>
  <v-ons-page>
    <custom-toolbar>Todos</custom-toolbar>
    <div>
      <p v-show="listEmpty" class="list-empty-msg">To add an item please click the button</p>
      <ons-gesture-detector>
        <v-ons-list v-for="(todo, index) in todos">
          <v-ons-list-item class="list-item" :id="index">{{todo.title}} <span class="loc-span"><v-ons-icon icon="md-pin"></v-ons-icon>{{todo.place_name}}</span>
            <div class="right"><v-ons-icon icon="md-edit" @click="editTodo(index)"></v-ons-icon></div>
          </v-ons-list-item>
        </v-ons-list>
      </ons-gesture-detector>
    </div>
    <v-ons-fab position='bottom right'>
      <v-ons-icon icon="md-plus" @click="openGPS"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import placeSearch from './PlaceSearch';
  import editTodo from './EditTodo'
  import axios from 'axios';

  export default {
    data(){
      return{
        deviceLocation: {
          lat: '',
          long: ''
        },
        todos: [],
        todos_list: []
      }
    },
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push(placeSearch);
       },
       openGPS() {
         let onSuccess = (position) => {
            console.log(this.$store);
            this.deviceLocation.lat = position.coords.latitude;
            this.deviceLocation.long = position.coords.longitude;
            this.$store.commit('setDeviceLocation', this.deviceLocation);
            console.log(this.$store.state.lat);
            console.log(this.$store.state.long);
            this.push();
          };
          function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          };
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
      },
       getLists() {
         axios.get('https://keep-reminder.firebaseio.com/todos/' + this.$store.state.device_uuid + '.json').then(response => {
           let todosArray = [];
            for(let key in response.data){
              response.data[key].id = key;
              todosArray.push(response.data[key]);
            }
            this.todos = todosArray;
          }).catch(function (error) {
              console.log(error);
          });
       },
       editTodo(id) {
         console.log(id);
         let key = this.todos[id].id;
         console.log(key);
         this.$store.commit('setEditId', key);
         this.pageStack.push(editTodo);
       },
       deleteItem(id) {
         let key = this.todos[id].id;
         axios.delete('https://keep-reminder.firebaseio.com/todos/' + this.$store.state.device_uuid + '/' + key + '.json').then(response => {
           console.log('Item deleted successfully');
           console.log(response);
           window.geofence.remove(geofenceId)
            .then(function () {
                console.log('Geofence sucessfully removed');
            }
            , function (error){
                console.log('Removing geofence failed', error);
            });
          }).catch(function (error) {
              console.log(error);
          });
       }
     },
     beforeUpdate() {
      // this.getLists();
     },
     mounted() {
       let that = this;
       this.getLists();
       document.addEventListener('swiperight', (event) => {
          if (event.target.matches('.list-item .list-item__center')) {
            let item_id = event.target.parentNode.id;
            console.log(event.target.parentNode);
            event.target.parentNode.remove();
            this.deleteItem(item_id);
          }else if(event.target.className === 'loc-span'){
            let item_id = event.target.parentNode.parentNode.id;
            event.target.parentNode.parentNode.remove();
            this.deleteItem(item_id);
          }
        });

        this.$eventBus.$on("refreshItem", function(){
          that.getLists();
        });
     },
     props: ['pageStack'],
     components: { customToolbar },
     computed: {
       listEmpty: function(){
         return this.todos.length === 0;
         // if(this.todos.length === 0){
         //   return true;
         // }else{
         //   return false;
         // }
       }
     }
  }
</script>
<style>
.list-empty-msg{
  color: #717171;
  padding-left: 10px;
}
</style>
