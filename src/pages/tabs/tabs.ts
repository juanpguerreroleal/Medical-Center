import { Component } from '@angular/core';

import { UserPage } from '../user/user';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
