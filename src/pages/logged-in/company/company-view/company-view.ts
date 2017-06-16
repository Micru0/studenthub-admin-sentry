import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
// Pages
import { CompanyFormPage } from '../company-form/company-form';
import { StoreFormPage } from '../../store/store-form/store-form';
import { StoreViewPage } from '../../store/store-view/store-view';

// Providers
import { CompanyService } from '../../../../providers/logged-in/company.service';
import { StoreService } from '../../../../providers/logged-in/store.service';

// Models
import { Company } from '../../../../models/company';
import { Store } from '../../../../models/store';

@Component({
  selector: 'page-company-view',
  templateUrl: 'company-view.html'
})
export class CompanyViewPage {

  public company: Company;
  public subcompanies: Company[];
  public stores: Store[];

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public companyService: CompanyService,
    public storeService: StoreService,
    params: NavParams
  ) {
    this.company = params.get('model');
    this.loadData();
  }

  loadData(){
    // Load list of companies
    let loader = this._loadingCtrl.create();
    loader.present();
    this.companyService.view(this.company).subscribe(response => {
      this.subcompanies = response.subcompanies;
      this.stores = response.stores; 
      loader.dismiss();
    });
  }

  /**
   * Loads Form in modal to update
   */
  update(){
    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: this.company,
      subcompany: 0
    });
    modal.present();

    this.loadData();
  }

  rowSelected(model) {
     // Load Detail Page
    this.navCtrl.push(CompanyViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  create(parent_company_id: number,subcompany: number = 0){
    var company = new Company();

    company.parent_company_id = parent_company_id;

    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: company,
      subcompany : subcompany
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

  storeSelected(model) {
     // Load Detail Page
    this.navCtrl.push(StoreViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  createStore(company_id: number){
    
    var store = new Store();

    store.company_id = company_id;

    let modal = this._modalCtrl.create(StoreFormPage, {
      model: store,
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

  /**
   * Delete store
   */
  deleteStore(store: Store){
    let loader = this._loadingCtrl.create();
    loader.present();

      let confirm = this._alertCtrl.create({
      title: 'Delete Store?',
      message: 'Do you want to delete this store?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.storeService.delete(store).subscribe(jsonResp => {
              loader.dismiss();
              // On Success
              this.loadData();

              // On Failure
              if (jsonResp.operation == "error") {
                //failer text
                let prompt = this._alertCtrl.create({
                  title: 'Delete Error!',
                  message: jsonResp.message,
                  buttons: ["Ok"]
                });
                prompt.present();
              }
            });
          }
        },
        {
          text: 'No',
          role: 'no',
          handler: () => {
            loader.dismiss();
            this.loadData();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Delete the provided model
   */
  delete(company: Company){
    let loader = this._loadingCtrl.create();
    loader.present();

    let confirm = this._alertCtrl.create({
      title: 'Delete Company?',
      message: 'Do you want to delete this Company?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.companyService.delete(company).subscribe(jsonResp => {
              loader.dismiss();
              // On Success
              if (jsonResp.operation == "success") {
                // Close the page
                this.loadData();
              }

              // On Failure
              if (jsonResp.operation == "error") {
                //failer text
                let prompt = this._alertCtrl.create({
                  title: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ["Ok"]
                });
                prompt.present();
              }
            });
          }
        },
        {
          text: 'No',
          role: 'no',
          handler: () => {
            loader.dismiss();
            this.loadData();
          }
        }
      ]
    });
    confirm.present();
  }
}
