<template>
  <v-ons-navigator :page-stack="pageStack">
    <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
  import homeScreen from './HomeScreen'
  // import list from './List';
  // import addTodo from './AddTodo';

  export default {
    data() {
      return {
        pageStack: [homeScreen]
      }
    },
    methods: {
      checkConnection(){
        document.addEventListener("offline", () => {
           var networkState = navigator.connection.type;
           if (networkState == Connection.NONE) {
             alert('No Internet :( Please turn it on');
           }
        }, false);
      }
    },
    mounted() {
      this.checkConnection();
      document.addEventListener('deviceready', function () {
          aler("geofence initialization");
        // window.geofence is now available
          window.geofence.initialize().then(function () {
              aler("Successful initialization");
          }, function (error) {
              console.log("Error", error);
          });
      }, false);
    }
  }
</script>
