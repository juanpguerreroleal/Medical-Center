import { DoctorsPage } from './../doctors/doctors';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegistroPage } from '../registro/registro';
import { PerfilPage } from '../perfil/perfil';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams) {
  }
  async login(user: User) {
    try {

      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.push(PerfilPage);
        window.localStorage.setItem("email", this.user.email);
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    }
    catch (e) {
      console.error(e);
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
