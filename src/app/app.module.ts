import { FormularioPage } from './../pages/formulario/formulario';
import { FormpacientePage } from './../pages/formpaciente/formpaciente';
import { PerfilPage } from './../pages/perfil/perfil';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule} from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { CalendarModule } from 'ionic3-calendar-en';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { TemasPage } from '../pages/temas/temas';
import { Mapa } from '../pages/mapa/mapa';
import { ContactPage, DesarrolladoresPage } from '../pages/contact/contact';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { DoctorsPage } from '../pages/doctors/doctors';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var config = {
    apiKey: "AIzaSyDpONCe6-nBooFZW9trsE2zXnVx_xdgJBs",
    authDomain: "medicenter-firebase.firebaseapp.com",
    databaseURL: "https://medicenter-firebase.firebaseio.com",
    projectId: "medicenter-firebase",
    storageBucket: "medicenter-firebase.appspot.com",
    messagingSenderId: "934750618756"
};

@NgModule({
   declarations: [
      MyApp,
      HomePage,
      LoginPage,
      TabsPage,
      UserPage,
      ContactPage,
      Mapa,
      DesarrolladoresPage,
      RegistroPage,
      DoctorsPage,
      PerfilPage,
      FormpacientePage,
      FormularioPage,
      TemasPage
   ],
   imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(config),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule,
      CalendarModule
   ],
   bootstrap: [
      IonicApp
   ],
   entryComponents: [
      MyApp,
      LoginPage,
      HomePage,
      TabsPage,
      UserPage,
      ContactPage,
      Mapa,
      DesarrolladoresPage,
      RegistroPage,
      DoctorsPage,
      PerfilPage,
      FormpacientePage,
      FormularioPage,
      TemasPage

   ],
   providers: [
      StatusBar,
      SplashScreen,
      CalendarModule,
      Geolocation,
      LocalNotifications,
      AngularFirestoreModule
   ]
})
export class AppModule {}
