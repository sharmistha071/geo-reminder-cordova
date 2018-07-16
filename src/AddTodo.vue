<template>
  <v-ons-page>
    <custom-toolbar>Add Todo</custom-toolbar>
    <div class="add-form">
      <v-ons-row>
        <v-ons-col class="input-col">
          <v-ons-input placeholder="Location" class="location" float input-id="Location" modifier="material" v-model="location"></v-ons-input>
        </v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col class="input-col">
          <v-ons-input placeholder="Title" class="title" float input-id="title" modifier="material" v-model="todo.title"></v-ons-input>
        </v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col class="input-col">
          <textarea class="textarea description" rows="3" placeholder="Description" float input-id="Description" modifier="material" v-model="todo.description"></textarea>
        </v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-button @click="saveTodo" class="save-btn">
            <v-ons-icon></v-ons-icon>
            Save
        </v-ons-button>
      </v-ons-row>
    </div>
  </v-ons-page>
</template>
<script>
  import axios from 'axios';
  import customToolbar from './CustomToolbar';
  import placeSearch from './PlaceSearch';
  import list from './List'
  const uuidv1 = require('uuid/v1');

  export default {
    data(){
      return{
        location: '',
        todo: {
          title: '',
          description: ''
        }
      }
    },
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.splice(2);
         //this.$emit('push-page', list);
         //this.pageStack.push(list);
         this.$eventBus.$emit("refreshItem");
       },
       saveTodo() {
         this.$store.commit('setTodo', this.todo);
         //console.log(this.$store.state.todo);
         //console.log(this.$store.state.todo);
         let geoFenceId = uuidv1();
         this.$store.commit('setGeoFenceId', geoFenceId);
         window.geofence.addOrUpdate({
             id:             geoFenceId, //A unique identifier of geofence
             latitude:       this.$store.state.todo.lat, //Geo latitude of geofence
             longitude:      this.$store.state.todo.long, //Geo longitude of geofence
             radius:         100, //Radius of geofence in meters
             transitionType: 3, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
             notification: {         //Notification object
                 id:             1, //optional should be integer, id of notification
                 title:          this.todo.title, //Title of notification
                 text:           this.todo.descrition, //Text of notification
                 smallIcon:      './assets/loc_icon.png', //Small icon showed in notification area, only res URI
                 icon:           './assets/loc_icon.png', //icon showed in notification drawer
                 openAppOnClick: true,//is main app activity should be opened after clicking on notification
                 vibration:      [1000], //Optional vibration pattern - see description
                 data:           {}  //Custom object associated with notification
             }
         }).then(() => {
             console.log('Geofence successfully added');
         },function (error) {
            console.log('Adding geofence failed', error);
         });

         axios.post('https://keep-reminder.firebaseio.com/todos/'+ this.$store.state.device_uuid +'.json', this.$store.state.todo).then(response => {
            console.log('submited');
            this.push();
          }).catch(error => {
            this.errors.push(error);
          });
       }
     },
     mounted(){
       this.location = this.$store.state.todo.place_name;
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
