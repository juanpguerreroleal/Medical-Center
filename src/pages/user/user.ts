import { TabsPage } from "../tabs/tabs";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { auth, database } from "firebase";
@Component({
  selector: "page-about",
  templateUrl: "user.html"
})
export class UserPage {
  num: number;
  Menu: string = "General";
  constructor(
    private afAuth: AngularFireAuth,
    private AfDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public localNotifications: LocalNotifications
  ) {}



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
