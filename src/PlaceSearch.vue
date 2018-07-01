<template>
  <v-ons-page>
    <custom-toolbar :back-label="'Page 1'">
      <label class="place-search">
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
      </label>
    </custom-toolbar>
    <div id="map_canvas">
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import app from './App';
  import addTodo from './AddTodo';

  export default {
    data() {
      return {
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null,

        place: {
          name: '',
          lat: '',
          long: ''
        }
      };
    },
    methods: {
      pop() {
        this.pageStack.pop();
      },
      push() {
        this.pageStack.push(addTodo);
      },
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
        this.place.name = place.name;
        this.place.lat = place.geometry.location.lat();
        this.place.long = place.geometry.location.lng();
        this.$store.commit('setPlace', this.place);
        this.addMarker();
      },
      addMarker() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.markers.pop();
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;

          setTimeout(() => {
            this.push();
          }, 1500);
        }
      },
      geolocate: function() {
       navigator.geolocation.getCurrentPosition(position => {
         this.center = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
       });
       if (this.center) {
         const marker = {
           lat: this.center.lat,
           lng: this.center.lng
         };
         this.markers.push({ position: marker });
         this.center = marker;
         this.currentPlace = null;
       }
     }
    },
    props: ['pageStack'],
    components: { customToolbar },
    mounted(){
      this.center.lat = this.$store.state.lat;
      this.center.lng = this.$store.state.long;
      this.geolocate();
    }
  }
</script>
<style scoped>

#map_canvas{
  height: 100%;
  width: 100%;
}
</style>
