<template>
  <v-ons-page>
    <div class="background-red">
      <div class="centerDiv">
        <div class="row">
          <img src="./assets/loc_icon.png" class="loc_icon">
        </div>
      </div>
      <div class="row welcome-msg">
        <p>Welcome to geo reminder</p>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
  import axios from 'axios';
  import customToolbar from './CustomToolbar';
  import list from './List';
  export default {
    data(){
      return{
        deviceLocation: {
          lat: '',
          long: ''
        }
      }
     },
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push(list);
       },
       saveDeviceUUID(id){
         this.$store.commit('setDeviceUUID', id);
       },
     },
     mounted(){
       document.addEventListener('deviceready', () => {
           this.saveDeviceUUID(device.uuid);
           if(localStorage.getIte())
           localStorage.setItem('device_uuid', device.uuid);
           window.geofence.initialize().then(function () {
               console.log("Successful initialization");
           }, function (error) {
               console.log("Error", error);
           });
       }, false);

       setTimeout(() => {
         this.push();
       }, 1000);
     },
     props: ['pageStack'],
  }
</script>

<style scoped>
  .home-page{
    background: red !important;
    background-color: red !important;
  }
  .loc_icon{
    height: 90px;
  }
  .gps-btn{
    top: 10px;
    left: -35px;
    background-color: #fff;
    color: #000;
    border-radius: 20px;
    padding: 0px 25px 0px 25px;
  }
  .centerDiv{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .welcome-msg{
    position: absolute;
    top: 60%;
    left: 49%;
    transform: translate(-50%, -50%);
  }
</style>
