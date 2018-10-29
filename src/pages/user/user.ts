import { TabsPage } from "../tabs/tabs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface pacientes { 
  nombres: string;
  apellidop: string;
  apellidom: string;
  edad: number;
  alergia: string;
  id?: string;
  }

@Component({
  selector: "page-about",
  templateUrl: "user.html"
})
export class UserPage {
  PerfilesCollection: AngularFirestoreCollection<pacientes>;
  Perfil:Observable<pacientes[]>;
  Menu: string = "Perfil";
  num: number;
  constructor(
    public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    private asf: AngularFirestore) {
    }

    ionViewDidLoad(){
    this.PerfilesCollection = this.asf.collection('pacientes');
    this.Perfil = this.PerfilesCollection.valueChanges();
    }
  delayednotification() {
    this.localNotifications.schedule({
      text: "Recordatorio de toma de medicamento",
      trigger: { at: new Date(new Date().getTime() + this.num * 60000) },
      led: "FF0000",
      sound: null,
      icon: "http://codesolution.co.in/assets/images/code/codeicon.png"
    });
  }
}
