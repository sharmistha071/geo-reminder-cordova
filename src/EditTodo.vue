<template>
  <v-ons-page>
    <custom-toolbar>Edit Todo</custom-toolbar>
    <div class="add-form">
      <v-ons-row>
        <v-ons-col class="input-col">
          <v-ons-input placeholder="Location" class="location" float input-id="Location" modifier="material" v-model="todo.place_name"></v-ons-input>
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
        <v-ons-button @click="editTodo" class="save-btn">
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

  export default {
    data(){
      return{
        todo: {
          place_name: '',
          lat: '',
          long: '',
          title: '',
          description: '',
          geoFenceId: null
        }
      }
    },
     methods: {
       pop(){
         this.pageStack.pop();
         this.$eventBus.$emit("refreshItem");
       },
       push() {
         this.pageStack.splice(2);
       },
       getTodo(id) {
         axios.get('https://keep-reminder.firebaseio.com/todos/' + this.$store.state.device_uuid + '/' + id + '.json').then(response => {
           this.todo.title = response.data.title;
           this.todo.description = response.data.description;
           this.todo.place_name = response.data.place_name;
           this.todo.lat = response.data.lat;
           this.todo.long = response.data.long;
           this.todo.geoFenceId = response.data.geoFenceId;
         }).catch(function (error) {
              console.log(error);
          });
       },
       editTodo() {
         let id = this.$store.state.editId;
         axios.patch('https://keep-reminder.firebaseio.com/todos/' + this.$store.state.device_uuid + '/' + id + '.json', this.todo).then(response => {
            //console.log(response);
            window.geofence.addOrUpdate({
                id:             response.data.geoFenceId, //A unique identifier of geofence
                latitude:       response.data.lat, //Geo latitude of geofence
                longitude:      response.data.long, //Geo longitude of geofence
                radius:         50, //Radius of geofence in meters
                transitionType: 3, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
                notification: {         //Notification object
                    id:             1, //optional should be integer, id of notification
                    title:          response.data.title, //Title of notification
                    text:           response.data.descrition, //Text of notification
                    smallIcon:      './assets/loc_icon.png', //Small icon showed in notification area, only res URI
                    icon:           './assets/loc_icon.png', //icon showed in notification drawer
                    openAppOnClick: true,//is main app activity should be opened after clicking on notification
                    vibration:      [1000], //Optional vibration pattern - see description
                    data:           {}  //Custom object associated with notification
                }
            }).then(response => {
                console.log('Geofence successfully edited');
                //alert(response);
            },function (error) {
               alert('Adding geofence failed', error);
            });
            this.pop();
          }).catch(error => {
            this.errors.push(error);
          })
       }
     },
     mounted(){
       this.getTodo(this.$store.state.editId);
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
