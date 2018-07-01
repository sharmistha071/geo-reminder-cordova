<template>
  <v-ons-page>
    <div class="background-red">
      <div class="centerDiv">
        <div class="row">
          <img src="./assets/loc_icon.png" class="loc_icon">
        </div>
        <div class="row">
          <v-ons-button @click="openGPS" class="gps-btn">
              <v-ons-icon></v-ons-icon>
              Enable GPS
          </v-ons-button>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
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
       openGPS() {
         let onSuccess = (position) => {
            console.log(this.$store);
            this.deviceLocation.lat = position.coords.latitude;
            this.deviceLocation.long = position.coords.longitude;
            this.$store.commit('setDeviceLocation', this.deviceLocation);
            console.log(this.$store.state.lat);
            console.log(this.$store.state.long);
            this.push();
          };
          function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          };
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
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
    left: 55%;
    transform: translate(-50%, -55%);
  }
</style>
