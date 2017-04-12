import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
// Pages
import { CompanyFormPage } from '../company-form/company-form';
// Providers
import { CompanyService } from '../../../../providers/logged-in/company.service';
// Models
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-company-view',
  templateUrl: 'company-view.html'
})
export class CompanyViewPage {

  public company: Company;
  public subcompanies: Company[];

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    public companyService: CompanyService,
    params: NavParams
  ) {
    this.company = params.get('model');
    this.loadData();
  }

  loadData(){
    // Load list of companies
    let loader = this._loadingCtrl.create();
    loader.present();
    this.companyService.listSubCompanies(this.company.company_id).subscribe(response => {
      this.subcompanies = response;
      loader.dismiss();
    });
  }

  /**
   * Loads Form in modal to update
   */
  update(){
    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: this.company
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
   * Delete the provided model
   */
  delete(company: Company){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.companyService.delete(company).subscribe(jsonResp => {
      loader.dismiss();
      this.loadData();
    });
  }

  /**
   * Loads the create page
   */
  create(parent_company_id: number){
    
    var company = new Company();

    company.parent = parent_company_id;

    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: company,
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
