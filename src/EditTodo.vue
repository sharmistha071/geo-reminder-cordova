<template>
  <v-ons-page>
    <custom-toolbar>Edit Todo</custom-toolbar>
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
       },
       saveTodo() {
         this.$store.commit('setTodo', this.todo);
         console.log(this.$store.state.todo);
         axios.post('https://keep-reminder.firebaseio.com/todos.json', this.$store.state.todo).then(response => {
            console.log('submited');
            this.push();
          }).catch(error => {
            this.errors.push(error);
          })
       }
     },
     mounted(){
       this.location = this.$store.state.todo.place_name;
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
