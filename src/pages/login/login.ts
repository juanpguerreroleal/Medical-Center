import { AlertController } from 'ionic-angular';
import { DoctorsPage } from './../doctors/doctors';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { RegistroPage } from '../registro/registro';
import { FormpacientePage } from '../formpaciente/formpaciente';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;

  constructor(
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private asFire: AngularFirestore) {
  }
  async login(user: User) {
    try {

      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        const exist = this.asFire.doc<any>(`medicos/${result.user.uid}`);
        this.navCtrl.push(TabsPage);
        window.localStorage.setItem("email", this.user.email);
      }
      else{
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
      const alert = this.alertCtrl.create({
        title: 'Fallo al iniciar sesión!',
        subTitle: 'Introduciste mal tu correo o contraseña',
        buttons: ['Entendido']
      });
      alert.present();
    }

  }
  ionViewPageLoad(){
     firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       this.self.navCtrl.setRoot(TabsPage);
      } else {
        this.navCtrl.setRoot(LoginPage);       }
    });
  }

  registro(){
    this.navCtrl.push(RegistroPage)
  }

  logind() {
  this.navCtrl.push(DoctorsPage);
  }
}
