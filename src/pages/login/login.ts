import { DoctorsPage } from './../doctors/doctors';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { RegistroPage } from '../registro/registro';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams, private alertCtrl: AlertController) {
  }
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.push(TabsPage);
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

  registro(){
    this.navCtrl.push(RegistroPage)
  }

  usuario(){
    this.afAuth.auth.onAuthStateChanged(function(usuario){
      if(usuario){
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }

    });
  }
  logind() {
  this.navCtrl.push(DoctorsPage);
  }
}
