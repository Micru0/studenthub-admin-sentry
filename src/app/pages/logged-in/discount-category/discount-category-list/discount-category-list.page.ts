import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// models
import { DiscountCategory } from 'src/app/models/discount-category';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { DiscountCategoryService } from 'src/app/providers/logged-in/discount-category.service';
// pages
import { DiscountCategoryFormPage } from '../discount-category-form/discount-category-form.page';
import { AwsService } from 'src/app/providers/aws.service';


@Component({
  selector: 'app-discount-category-list',
  templateUrl: './discount-category-list.page.html',
  styleUrls: ['./discount-category-list.page.scss'],
})
export class DiscountCategoryListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public discountCategories: DiscountCategory[];

  constructor(
    public platform: Platform,
    public router: Router,
    public aws: AwsService,
    public discountCategoryService: DiscountCategoryService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Discount Category List Page');

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

    this.discountCategoryService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.discountCategories = response.body;
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

    this.discountCategoryService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.discountCategories = this.discountCategories.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {

    this.router.navigate(['discount-category-view', model.category_id], {
      state: {
        model: model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: DiscountCategoryFormPage,
      componentProps: {
        model: new DiscountCategory()
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

  async edit(ev, model: DiscountCategory) {

    ev.preventDefault();
    ev.stopPropagation(); 

    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: DiscountCategoryFormPage,
      componentProps: {
        model: model,
        category_id: model.category_id
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
  async delete(ev, model: DiscountCategory) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Discount Category?',
      message: 'Are you sure you want to delete this Discount Category?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.discountCategoryService.delete(model).subscribe(async jsonResp => {

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
