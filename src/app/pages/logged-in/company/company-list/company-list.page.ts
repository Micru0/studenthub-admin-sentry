import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
// models
import { Company } from 'src/app/models/company';
// services
import { CompanyService } from 'src/app/providers/logged-in/company.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { CompanyFormPage } from '../company-form/company-form.page';
import {AwsService} from '../../../../providers/aws.service';
import {EventService} from '../../../../providers/event.service';



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
  public filters: {
    name: string,
    status: any
  } = {
    name: null,
    status: 4
  };

  constructor(
    public router: Router,
    public platform: Platform,
    public companyService: CompanyService,
    public awsService: AwsService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.loadData(1);

    this.eventService.reloadCompanyList$.subscribe(res => {
      this.loadData(1);
    });
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
    const searchParams = this.urlParams();
    this.companyService.list(page, searchParams).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.companies = response.body;
      this.loading = false;
      this.deleting = false;

    }, () => {
      // this.deleting = false;
    });
  }

  /**
   * load more companies on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.currentPage++;

    this.loading = true;
    const searchParams = this.urlParams();
    this.companyService.list(this.currentPage, searchParams).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      const companies = response.body;
      this.companies = this.companies.concat(companies);
      this.loading = false;
      event.target.complete();
    }, () => {
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
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: new Company(),
        subcompany: 0
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

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

  loadLogo($event, company) {
    company.company_logo = null;
  }

  resetFilter() {
    this.filters = {
      name: null,
      status: null
    };

    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';
    if (this.filters.name) {
      urlParams += '&name=' + this.filters.name;
    }

    if (this.filters.status) {
      urlParams += '&status=' + this.filters.status;
    }

    return urlParams;
  }

  searchByName($event) {
    this.filters.name = $event.detail.value;
    this.loadData(1); // reload all result
  }

  filterByStatus($event, status) {
    this.filters.status = status;
    this.loadData(1); // reload all result
  }
}
