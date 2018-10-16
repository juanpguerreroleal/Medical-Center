import { User } from './../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {

  user = {} as User;
  constructor(
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams)  {
}

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.push(TabsPage);
        window.localStorage.setItem("email", this.user.email);
      }
      else{
        this.navCtrl.setRoot(DoctorsPage);
      }
    }
    catch (e) {
      console.error(e);
    }

  }
}
