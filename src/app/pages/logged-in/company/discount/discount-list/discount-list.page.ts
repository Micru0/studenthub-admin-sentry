import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// models
import { Discount } from 'src/app/models/discount';
import { Company } from 'src/app/models/company';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { DiscountService } from 'src/app/providers/logged-in/discount.service';
import { AwsService } from 'src/app/providers/aws.service';
// pages
import { DiscountFormPage } from '../discount-form/discount-form.page';
import { DiscountViewPage } from '../discount-view/discount-view.page';


@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.page.html',
  styleUrls: ['./discount-list.page.scss'],
})
export class DiscountListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public discounts: Discount[] = [];

  @Input() public company: Company;

  constructor(
    public platform: Platform,
    public router: Router,
    public aws: AwsService,
    public discountService: DiscountService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Discount List Page');

    this.loadData(this.currentPage);
  }

  /**
   * load data
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    const urlParams = "&company_id=" + this.company.company_id;

    this.discountService.list(page, urlParams).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.discounts = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.currentPage++;

    this.loading = true;

    const urlParams = "&company_id=" + this.company.company_id;

    this.discountService.list(this.currentPage, urlParams).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.discounts = this.discounts.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  async rowSelected(model) {

    /*this.router.navigate(['discount-view', model.discount_uuid], {
      state: {
        model: model
      }
    });*/

    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);
 
    const modal = await this._modalCtrl.create({
      component: DiscountViewPage,
      componentProps: {
        model: model
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });
    modal.present();
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    let model = new Discount;
    model.company_id = this.company.company_id; 

    const modal = await this._modalCtrl.create({
      component: DiscountFormPage,
      componentProps: {
        model: model,
        company: this.company
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.currentPage = 1;
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  async edit(ev, model: Discount) {

    ev.preventDefault();
    ev.stopPropagation(); 

    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: DiscountFormPage,
      componentProps: {
        model: model,
        company: this.company
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.currentPage = 1;
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, model: Discount) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Discount?',
      message: 'Are you sure you want to delete this Discount?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.discountService.delete(model).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
              }
              this.loadData(this.currentPage, true);
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }
}
