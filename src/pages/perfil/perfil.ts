import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Perfil } from '../../models/perfil';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  perfil = {} as Perfil;
  constructor(private afAuth: AngularFireAuth,
   private AfDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

 crearperfil(){
   this.afAuth.authState.take(1).subscribe(auth =>{
     this.AfDatabase.list(`perfil/${auth.uid}`).push(this.perfil)
     .then(() => this.navCtrl.setRoot('TabsPage'));
   })
 }

}
