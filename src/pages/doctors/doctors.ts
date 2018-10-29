import { FormpacientePage } from './../formpaciente/formpaciente';
import { User } from './../../models/user';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {

  user = {} as User;

  constructor(
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams)  {
}

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.setRoot(FormpacientePage);
        window.localStorage.setItem("email", this.user.email);
      }
      else{
        this.navCtrl.setRoot(DoctorsPage);
        const alert = this.alertCtrl.create({
          title: 'Fallo al iniciar sesión!',
          subTitle: 'Introduciste mal tu correo o contraseña',
          buttons: ['Entendido']
        });
        alert.present();
      }
    }
    catch (e) {
      console.error(e);
    }

  }
}
