import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { User } from '../../app/models/user';
import { TabsPage } from '../tabs/tabs';
=======
import { AngularFireAuth } from '@angular/fire/auth';
>>>>>>> 4234492fc540f3e2d3e81f018e9399936a004df3

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.push(HomePage);
      }
    }
    catch (e) {
      console.error(e);
    }

  }
<<<<<<< HEAD
  login(){
  	this.navCtrl.push(TabsPage);
  }
=======
//Falta por implementar
  // MedicoLogin(){
  //   this.navCtrl.push(HomePage);
  // }
>>>>>>> 4234492fc540f3e2d3e81f018e9399936a004df3

}
