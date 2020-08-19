import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
// models
import { Company } from 'src/app/models/company';
// services
import { CompanyService } from 'src/app/providers/logged-in/company.service';
// pages
import { CompanyFormPage } from '../company-form/company-form.page';
import {AwsService} from '../../../../providers/aws.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['./company-list.page.scss'],
})
export class CompanyListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public segment = 1;
  public companies: Company[];
  public enableCompanies: Company[] = [];
  public disableCompanies: Company[] = [];
  public deleting = false;

  public loading = false;

  constructor(
    public router: Router,
    public platform: Platform,
    public companyService: CompanyService,
    public awsService: AwsService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  /**
   * load company data
   * @param page
   * @param silent
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.companyService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.companies = response.body;
      for (const company of this.companies) {
        if (company.company_status == 10) {
          this.enableCompanies.push(company);
        } else  {
          this.disableCompanies.push(company);
        }
      }
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * load more companies on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.currentPage++;

    this.loading = true;

    this.companyService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.companies = this.companies.concat(response.body);

      for (const company of this.companies) {
        if (company.company_status == 10) {
          this.enableCompanies.push(company);
        } else  {
          this.disableCompanies.push(company);
        }
      }

      event.target.complete();
    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['company-view', model.company_id], {
      state: {
        model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    const modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: new Company(),
        subcompany: 0
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(1);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, company: Company) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Company?',
      message: 'Do you want to delete this Company?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.companyService.delete(company).subscribe(async jsonResp => {

              // On Success
              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(this.currentPage, true);
              }

              // On Failure
              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ['Ok']
                });
                prompt.present();
              }
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No',
          role: 'no'
        }
      ]
    });
    confirm.present();
  }

  segmentChanged($event) {
    this.segment = $event.detail.value;
  }

  loadLogo($event, company) {
    company.company_logo = null;
  }
}
