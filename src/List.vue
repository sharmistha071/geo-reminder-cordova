<template>
  <v-ons-page>
    <custom-toolbar>Todos</custom-toolbar>
    <div>
      <!-- <ons-gesture-detector>
        <div id="detect-area" style="width: 100px; height: 100px;">
          <ul>
            <li style="background-color: #fff; margin-bottom:20px; height: 50px; width: 100%;">Item 1</li>
            <li style="background-color: #fff; width: 100%;">Item 2</li>
          </ul>
        </div>
      </ons-gesture-detector> -->
      <ons-gesture-detector>
        <v-ons-list v-for="(todo, index) in todos" id="detect-area">
          <v-ons-list-item class="list-item" :id="index">{{todo.title}} <span class="loc-span"><v-ons-icon icon="md-pin"></v-ons-icon>{{todo.place_name}}</span>
            <div class="right"><v-ons-icon icon="md-edit"></v-ons-icon></div>
          </v-ons-list-item>
        </v-ons-list>
      </ons-gesture-detector>
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
       getLists() {
         axios.get('https://keep-reminder.firebaseio.com/todos.json').then(response => {
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
       deleteItem(id) {
         let key = this.todos[id].id;
         axios.delete('https://keep-reminder.firebaseio.com/todos/' + key + '.json').then(response => {
           console.log('Item deleted successfully');
          }).catch(function (error) {
              console.log(error);
          });
       }
     },
     updated() {
       this.getLists();
     },
     mounted() {
       this.getLists();
       document.addEventListener('swiperight', (event) => {
          if (event.target.matches('#detect-area .list-item .list-item__center')) {
            let item_id = event.target.parentNode.id;
            event.target.parentNode.remove();
            this.deleteItem(item_id);
          }
        });
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
