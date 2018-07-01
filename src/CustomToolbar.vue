<template>
  <v-ons-toolbar class="color-red">
    <div class="left">
      <v-ons-back-button :on-click="pop">{{ backLabel }}</v-ons-back-button>
    </div>
    <div class="center toolbar-text"><slot></slot></div>
  </v-ons-toolbar>
</template>

<script>
  export default {
    props: ['pop','backLabel']
  }
</script>
