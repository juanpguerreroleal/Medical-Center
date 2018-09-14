import { TabsPage } from './../tabs/tabs';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';


@NgModule({
  declarations: [
    LoginPage,
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
