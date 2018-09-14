import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  getName(){
  	//Funcion para obtener nombre del user
  	//Simulacion de un usuario
  	return "Hibrido";
  }

}
