<template>
  <v-ons-page>
    <custom-toolbar>Todos</custom-toolbar>
    <div>
      <ons-gesture-detector>
        <v-ons-list v-for="(todo, index) in todos" id="detect-area">
          <v-ons-list-item class="list-item" :id="index">{{todo.title}} <span class="loc-span"><v-ons-icon icon="md-pin"></v-ons-icon>{{todo.place_name}}</span>
            <div class="right"><v-ons-icon icon="md-edit" @click="editTodo(index)"></v-ons-icon></div>
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
  import editTodo from './EditTodo'
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
       editTodo(id) {
         console.log(id);
         let key = this.todos[id].id;
         console.log(key);
         this.$store.commit('setEditId', key);
         this.pageStack.push(editTodo);
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
     beforeUpdate() {
      // this.getLists();
     },
     mounted() {
       let that = this;
       this.getLists();
       document.addEventListener('swiperight', (event) => {
          if (event.target.matches('#detect-area .list-item .list-item__center')) {
            let item_id = event.target.parentNode.id;
            event.target.parentNode.remove();
            this.deleteItem(item_id);
          }
        });

        this.$eventBus.$on("refreshItem", function(){
          that.getLists();
        });
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
