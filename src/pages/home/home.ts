import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Menu: string = "Inicio";
  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {}
  getName(){
  	return window.localStorage.getItem("email");
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Bienvenido otra vez, ${data.email}`,
          duration: 3000

      }).present();
      window.localStorage.setItem("email", data.email);
  }
  else{
    this.toast.create({
      message: `Autenticación fallida`,
      duration: 3000
  }).present();
  }
    })
  }
}
