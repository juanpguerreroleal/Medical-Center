var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FIREBASE_CONFIG } from './app.firebase.config';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CalendarModule } from 'ionic3-calendar-en';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { PerfilPage } from '../pages/perfil/perfil';
import { Mapa } from '../pages/mapa/mapa';
import { ContactPage, DesarrolladoresPage } from '../pages/contact/contact';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireDatabaseModule } from 'angularfire2/database';
var AppModule = /** @class */ (function () {
  function AppModule() {
  }
  AppModule = __decorate([
      NgModule({
          declarations: [
              MyApp,
              HomePage,
              LoginPage,
              TabsPage,
              UserPage,
              ContactPage,
              Mapa,
              DesarrolladoresPage,
              PerfilPage
          ],
          imports: [
              BrowserModule,
              IonicModule.forRoot(MyApp),
              AngularFireModule.initializeApp(FIREBASE_CONFIG),
              AngularFireAuthModule,
              AngularFireDatabaseModule,
              CalendarModule,
          ],
          bootstrap: [IonicApp],
          entryComponents: [
              MyApp,
              LoginPage,
              HomePage,
              TabsPage,
              UserPage,
              ContactPage,
              Mapa,
              DesarrolladoresPage,
              PerfilPage
          ],
          providers: [
              StatusBar,
              SplashScreen,
              Geolocation,
              { provide: ErrorHandler, useClass: IonicErrorHandler }
          ]
      })
  ], AppModule);
  return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
