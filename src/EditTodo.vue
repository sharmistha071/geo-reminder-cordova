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
          description: ''
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
         axios.get('https://keep-reminder.firebaseio.com/todos/' + id + '.json').then(response => {
           this.todo.title = response.data.title;
           this.todo.description = response.data.description;
           this.todo.place_name = response.data.place_name;
           this.todo.lat = response.data.lat;
           this.todo.long = response.data.long;
         }).catch(function (error) {
              console.log(error);
          });
       },
       editTodo() {
         let id = this.$store.state.editId;
         axios.patch('https://keep-reminder.firebaseio.com/todos/' + id + '.json', this.todo).then(response => {
            console.log('submited');
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
