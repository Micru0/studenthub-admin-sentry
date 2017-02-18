import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

// Pages
import { CompanyViewPage } from '../company-view/company-view';
// Providers
import { CompanyService } from '../../../../providers/logged-in/company.service';

@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html'
})
export class CompanyListPage {

  public companies;

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private companyService: CompanyService
  ) {}

  ionViewDidLoad() {
    // Load list of companies
    let loader = this._loadingCtrl.create();
    loader.present();
    this.companyService.list().subscribe(response => {
      this.companies = response;
      loader.dismiss();
    });
  }

  /**
   * When its selected
   */
  rowSelected(model){
    // Load Detail Page
    this.navCtrl.push(CompanyViewPage, {
      'model': model
    });
  }

}
