import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-about',
  templateUrl: 'user.html'
})
export class UserPage {
num:number;
  Menu: string = "General";
  constructor(public navCtrl: NavController, public localNotifications: LocalNotifications) {

  }
  delayednotification(){
    this.localNotifications.schedule({
       text: 'Recordatorio de toma de medicamento',
       trigger: {at: new Date(new Date().getTime() + this.num*60000)},
       led: 'FF0000',
       sound: null,
       icon: 'http://codesolution.co.in/assets/images/code/codeicon.png'
    });
  }


}
