import { Component } from '@angular/core';

import { UserPage } from '../user/user';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Mapa } from '../mapa/mapa';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserPage;
  tab3Root = Mapa;
  tab4Root = ContactPage;
  constructor() {

  }
}
