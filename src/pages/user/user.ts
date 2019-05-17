import { TabsPage } from "../tabs/tabs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Perfil } from '../../models/perfil';
import { map } from 'rxjs/operators';

export interface pacientes { 
  name: string;
  fatherLastName: string;
  motherLastName: string;
  age: number;
  alergy: string;
  id: string;
  nextMADate:string;
  nextMADescription:string;
  medicalARDates: Array<string>;
  medicalARDescriptions: Array<string>;
  }

@Component({
  selector: "page-about",
  templateUrl: "user.html"
})
export class UserPage {
  userDoc: AngularFirestoreDocument;
  uid: string;
  PerfilesCollection: AngularFirestoreCollection<pacientes>;
  PerfilDoc: AngularFirestoreDocument;
  Perfil:Observable<pacientes[]>;
  userOb: Observable<Perfil>;

  Menu: string = "Perfil";
  num: number;
  descriptions: Array<string>;
  constructor(
    public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    private asf: AngularFirestore) {
    this.uid = window.localStorage.getItem("uid");
    this.userDoc = asf.doc<any>(`pacientes/${this.uid}`);
    this.getDocData().subscribe( res => {
      this.descriptions = res.medicalARDescriptions;
      console.log(this.descriptions);
    });
    }
    ionViewDidLoad(){
    this.PerfilesCollection = this.asf.collection("pacientes");
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
  getDocData(){
    this.userOb = this.userDoc.snapshotChanges().pipe(
      map( actions => {
      const data = actions.payload.data() as Perfil;
      const id = actions.payload.id;
      return { id, ...data};
    }));
    return this.userOb;
  }
  user(item){
    if (item.id == window.localStorage.getItem('uid')) {
      return true;
    }
    else{
      return false;
    }

  }
}
