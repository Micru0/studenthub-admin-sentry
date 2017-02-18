import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

// Page Imports
import { DefaultPage } from '../default/default';
import { CompanyListPage } from '../company/company-list/company-list';
import { StaffListPage } from '../staff/staff-list/staff-list';

// Services
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})
export class NavigationPage {

  rootPage: any = DefaultPage;

  @ViewChild('loggedInContent') nav: NavController

  constructor(
    private _auth: AuthService,
    private _menuCtrl: MenuController
  ){}

  loadPage(pageName: string){
    switch(pageName){
      case "summary":
        this.rootPage = DefaultPage;
        break;
      case "companies":
        this.rootPage = CompanyListPage;
        break;
      case "staff":
        this.rootPage = StaffListPage;
        break;
    }

    this._menuCtrl.close();
  }

  /**
   * Log Agent out of the app
   */
  logout(){
    this._auth.logout();
  }

}
