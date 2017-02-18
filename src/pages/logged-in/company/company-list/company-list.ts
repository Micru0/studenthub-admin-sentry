import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

// Pages
import { CompanyViewPage } from '../company-view/company-view';
import { CompanyFormPage } from '../company-form/company-form';
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
    public companyService: CompanyService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
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

  /**
   * Loads the create page
   */
  create(){
    let modal = this._modalCtrl.create(CompanyFormPage, {
      //model: newNote
    });
    // Refresh List if required
    modal.onDidDismiss(data => {
      if(data){
        if(data.refresh){
          this.loadData();
        }
      }
    });
    modal.present();
  }

}
