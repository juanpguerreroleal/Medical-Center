import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public navCtrl: NavController) {

  }



  show(opcion){
  	switch (opcion) {
  		case 1:
  			this.navCtrl.push(DesarrolladoresPage);
  			break;
  		case 2:
  			this.navCtrl.push(PerfilPage);
  			break;
  	}
  }
}

@Component({
	template: `
<ion-header>
  <ion-navbar color="beauty">
    <ion-title>
      Contacto
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list no-border>
    <ion-list-header>
      Sigue nuestro proyecto
    </ion-list-header>
    <ion-item>
      <ion-icon name="logo-github" item-start></ion-icon>
      https://github.com/arcantu97/Mcenter
    </ion-item>
  </ion-list>
</ion-content>
	`
})
export class DesarrolladoresPage { }
