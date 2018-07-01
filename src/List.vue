<template>
  <v-ons-page>
    <custom-toolbar>Todos</custom-toolbar>
    <div>
      <v-ons-list v-for="todo in todos">
        <v-ons-list-item class="list-item">{{todo.title}} <span class="loc-span"><v-ons-icon icon="md-pin"></v-ons-icon>{{todo.place_name}}</span>
          <div class="right"><v-ons-icon icon="md-edit"></v-ons-icon></div>
        </v-ons-list-item>
      </v-ons-list>
    </div>

    <v-ons-fab position='bottom right'>
      <v-ons-icon icon="md-plus" @click="push"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import placeSearch from './PlaceSearch';
  import axios from 'axios';

  export default {
    data(){
      return{
        todos: []
      }
    },
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push(placeSearch);
       }
     },
     created() {
       axios.get('https://keep-reminder.firebaseio.com/todos.json').then(response => {
         console.log(response.data);
            let todosArray = [];
            for(let key in response.data){
                console.log(key);
                response.data[key].id = key;
                todosArray.push(response.data[key]);
            }
            this.todos = todosArray;
            console.log(this.todos);
        }).catch(function (error) {
            console.log(error);
        });
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
