import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import {AlertController, ModalController} from "@ionic/angular";
//models
import { Country } from 'src/app/models/country';
import {Bank} from "../../../../models/bank";
//services
import { CountryService } from 'src/app/providers/logged-in/country.service';
import {AuthService} from "../../../../providers/auth.service";

import {CountryFormPage} from "../country-form/country-form.page";


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public exporting = false;

  public loading: boolean = false;

  public countries: Country[];
  public query = null;
  constructor(
    public router: Router,
    public countryService: CountryService,
    public authService: AuthService,
    public _modalCtrl: ModalController,
    public _alertCtrl: AlertController
  ) {}

  ngOnInit() {
    window.analytics.page('Country List Page');

    this.loadData(this.currentPage);
  }

  /**
   * load country list
   * @param page 
   */
  async loadData(page: number) {
   
    this.loading = true;

    this.countryService.list(page, this.query).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.countries = response.body;
    }, 
    () => {
      this.loading = false;
    });
  }

  /**
   * load more countries on scroll 
   * @param event 
   */
  async doInfinite(event) {
   
    this.loading = true;

    this.currentPage++;

    this.countryService.list(this.currentPage, this.query).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));

      this.countries = this.countries.concat(response.body);

      event.target.complete();
    }, 
    () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['country-view', model.country_id], {
      state: {
        'model': model
      }
    });
  }

  searchFilter($event) {
    this.query = $event.target.value;
    this.loadData(1);
  }


  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: CountryFormPage,
      componentProps: {
        model: new Country()
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  async exportData(ev){
    ev.preventDefault();
    ev.stopPropagation();
    const confirm = await this._alertCtrl.create({
      header: 'Export Data?',
      message: 'Do you really wants to export university data?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.exporting = true;
            this.countryService.downloadExcel(null).subscribe(async jsonResp => {
              this.exporting = false;
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
}
