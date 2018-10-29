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
  apiKey: "AIzaSyAMkgo_NH4jm4CJzxZEnUr3MCDlHa_9La8",
  authDomain: "id-m-4d828.firebaseapp.com",
  databaseURL: "https://id-m-4d828.firebaseio.com",
  projectId: "id-m-4d828",
  storageBucket: "id-m-4d828.appspot.com",
  messagingSenderId: "241174700997"
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
