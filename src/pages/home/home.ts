import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth'
import { Perfil } from '../../models/perfil';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Menu: string = "Inicio";
  uid: string;
  note: string;

  DatosdePerfil: AngularFireObject<Perfil>;
  userDoc: AngularFirestoreDocument<Perfil>;
  userItem: Observable<Perfil>;
  constructor(private afAuth: AngularFireAuth,private AfDatabase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private asf: AngularFirestore) {
    this.uid = window.localStorage.getItem("uid");
    this.userDoc = this.asf.doc<any>(`pacientes/${this.uid}`);
    this.userItem = this.userDoc.valueChanges();
    this.note = "";
  }
  getName(){
  	return window.localStorage.getItem("email");
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Bienvenido otra vez, ${data.email}`,
          duration: 1000

      }).present();
      this.DatosdePerfil = this.AfDatabase.object(`perfil/${data.uid}`)
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
  hasANextMADate(){
    return true;
  }
}
