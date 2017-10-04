import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';

// Pages
import { CompanyFormPage } from '../company-form/company-form';
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
    private _toastCtrl: ToastController,
    params: NavParams
  ) {
    this.company = params.get('model');
    this.loadData();
  }

  /**
   * load compay data
   */
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
  }

  /**
   * Load company detail page when its selected from the list
   * @param model 
   */
  rowSelected(model) {
    this.navCtrl.push(CompanyViewPage, {
      'model': model
    });
  }

  /**
   * Create a new company
   * @param parent_company_id 
   * @param subcompany 
   */
  create(parent_company_id: number, isSubcompany: boolean = false){
    var company = new Company();

    company.parent_company_id = parent_company_id;

    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: company,
      subcompany : isSubcompany
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
   * push select company data to store view
   * @param model 
   */
  storeSelected(model) {
     // Load Detail Page
    this.navCtrl.push(StoreViewPage, {
      'model': model
    });
  }
  
  /**
   * Show confirm alert to reset password 
   */
  resetPassword() {
    let alert = this._alertCtrl.create({
      title: 'Confirm password reset',
      message: 'Do you want to send new password to company?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.sendNewPassword();
          }
        }
      ]
    });
    alert.present();    
  }


  /**
   * Reset and email the candidate a new password
   */
  sendNewPassword() {
    let loader = this._loadingCtrl.create();
    loader.present();

    this.companyService.resetPassword(this.company).subscribe(response => {
      loader.dismiss();

      if(response.operation == 'error')
      {
        let toast = this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        
        toast.present();
      } 
      else 
      {
        let alert = this._alertCtrl.create({
            title: 'Reset Password',
            subTitle: 'New password sent to company',
            buttons: ['Okay']
          });
          alert.present();
      }      
    });
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
                let toast = this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
                // Close the page
              }
              this.loadData();
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
