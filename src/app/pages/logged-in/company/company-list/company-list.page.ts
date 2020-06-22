import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/providers/logged-in/company.service';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { CompanyFormPage } from '../company-form/company-form.page';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['./company-list.page.scss'],
})
export class CompanyListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public companies: Company[];

  constructor(
    public router: Router,
    public companyService: CompanyService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * load company data
   * @param page 
   */
  async loadData(page: number) {
    // Load list of companies
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.companyService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.companies = response.body;
    },
      error => { },
      () => { loader.dismiss(); }
    );
  }

  /**
   * pagination current page color
   * @param page 
   */
  pageLinkColor(page: number) {

    if (page == this.currentPage)
      return 'light';

    return '';
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['company-view', model.company_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    let modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: new Company(),
        subcompany: 0
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(company: Company) {
    let loader = await this._loadingCtrl.create();
    loader.present();

    let confirm = await this._alertCtrl.create({
      header: 'Delete Company?',
      message: 'Do you want to delete this Company?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.companyService.delete(company).subscribe(async jsonResp => {
              loader.dismiss();

              // On Success
              if (jsonResp.operation == "success") {
                let toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
                // Close the page
              }

              this.loadData(this.currentPage);

              // On Failure
              if (jsonResp.operation == "error") {
                //failer text
                let prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
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
            this.loadData(this.currentPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
