import { Component } from '@angular/core';
import { TemasPage } from '../temas/temas';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

interface paciente {
  nombres: string;
  apellidop: string;
  apellidom: string;
  edad: symbol;
  correo: string;
  alergia: string;
  id: string;
}

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage {
  todoCollection: AngularFirestoreCollection<paciente>;
  paciente: paciente[];


  constructor(
    private asf: AngularFirestore,
    public navCtrl: NavController,
    public NavParams: NavParams,
    public alertCtrl: AlertController,
) {
    }

    crearp() {
      let prompt = this.alertCtrl.create({
        title: 'Crear perfil',
        message: 'Introduce los datos para tu perfil',
      inputs: [{
        name: 'nombres',
        placeholder: 'Introduce tu(s) nombre(s)'
      },
      {
        name: 'apellidop',
        placeholder: 'Introduce tu apellido paterno'
      },
      {
        name: 'apellidom',
        placeholder: 'Introduce tu apellido materno'
      },
      {
        name: 'edad',
        placeholder: 'Introduce tu edad'
      },
      {
        name: 'correo',
        placeholder: 'Introduce tu correo'
      },
      {
        name: 'alergia',
        placeholder: 'Introduce en caso de tener alguna alergia'
      }],
      buttons: [{
          text: 'Cancelar'
      },
      {
        text: 'Guardar perfil',
        handler: data => {
          this.addp(data.nombres, data.apellidop, data.apellidom, data.edad, data.correo, data.alergia);
        }
      }]
      }).present();
    }
    addp(nombres: any, apellidop: any, apellidom: any, edad: any, correo: any, alergia: any){

      var user = firebase.auth().currentUser;
      var uid;

      if (user != null) {
        uid = user.uid;
      }

      const id = this.asf.collection('pacientes').doc(uid).set(
        {
          id: uid,
          nombres:nombres,
          apellidop: apellidop,
          apellidom: apellidom,
          edad: edad,
          correo: correo,
          alergia: alergia
        }
      );
    }


  show(opcion){
  	switch (opcion) {
  		case 1:
  			this.navCtrl.push(DesarrolladoresPage);
  			break;
  		case 2:
      this.crearp();
  			break;
      case 3:
        this.navCtrl.push(TemasPage);
      default:
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
      https://github.com/juanpguerreroleal/Medical-Center
    </ion-item>
  </ion-list>
</ion-content>
	`
})


export class DesarrolladoresPage { }


