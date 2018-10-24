import { Component , NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class Mapa {
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  //loading: any; 
  nearbyItems: any = new Array<any>();
  constructor(public navCtrl: NavController,public zone: NgZone,public geolocation: Geolocation,public loadingCtrl: LoadingController){
  this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    //this.loading = this.loadingCtrl.create();

 }
ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 25.73236, lng: -100.33527 },
        zoom: 15
    });
} 
updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
  //this.loading.present();
  this.autocompleteItems = [];
  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      this.autocompleteItems = [];
      this.GooglePlaces.nearbySearch({
        location: results[0].geometry.location,
        radius: '1500',
        types: ['pharmacy'],
        key: 'AIzaSyBU9-8bFA_hBrhxqaLQBCuDh2H4f9aCtpc'
      }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
              let marker = new google.maps.Marker({
              position: near_places[i].geometry.location,
              map: this.map
              });
              this.markers.push(marker);
              }
            //this.loading.dismiss();
            this.map.setCenter(results[0].geometry.location);
          });
        })
      }
    })
  }

    tryGeolocation(){
    this.clearMarkers();//remove previous markers

    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }      
}
