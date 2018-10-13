import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var google;
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class Mapa {
  constructor(public navCtrl: NavController) {}
  map: any;
ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 25.73236, lng: -100.33527 },
        zoom: 15
    });
}    
}
