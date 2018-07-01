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
    }
  }
</script>
