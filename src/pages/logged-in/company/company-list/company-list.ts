import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

// Pages
import { CompanyViewPage } from '../company-view/company-view';
import { CompanyFormPage } from '../company-form/company-form';
// Providers
import { CompanyService } from '../../../../providers/logged-in/company.service';
// Models
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html'
})
export class CompanyListPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public companies: Company[];

  constructor(
    public navCtrl: NavController,
    public companyService: CompanyService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
  ) {}

  ionViewDidLoad() {
    this.loadData(this.currentPage);
  }

  loadData(page: number) {
    // Load list of companies
    let loader = this._loadingCtrl.create();
    loader.present();
    this.companyService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 

      if(this.pageCount == 1)
        this.pages = [];

      this.companies = response.json();
    },
    error => {},
    () => {loader.dismiss();}
    );
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
      model: new Company(),
      subcompany: 0
    });
    // Refresh List if required
    modal.onDidDismiss(data => {
      if(data){
        if(data.refresh){
          this.loadData(this.currentPage);
        }
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  delete(company: Company){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.companyService.delete(company).subscribe(jsonResp => {
      loader.dismiss();
      this.loadData(this.currentPage);
    });
  }

}
