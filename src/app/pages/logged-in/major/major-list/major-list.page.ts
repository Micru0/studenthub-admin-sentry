 import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// models
import { Major } from 'src/app/models/major';
// services
import { MajorService } from 'src/app/providers/logged-in/major.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { MajorFormPage } from '../major-form/major-form.page';


@Component({
  selector: 'app-major-list',
  templateUrl: './major-list.page.html',
  styleUrls: ['./major-list.page.scss'],
})
export class MajorListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public majors: Major[];

  constructor(
    public platform: Platform,
    public router: Router,
    public majorService: MajorService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Major List Page');

    this.loadData(this.currentPage);
  }

  /**
   * load major data
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.majorService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.majors = response.body;
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

    this.majorService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.majors = this.majors.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {

    this.router.navigate(['major-view', model.major_uuid], {
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
      component: MajorFormPage,
      componentProps: {
        model: new Major()
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
  async delete(ev, major: Major) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Major?',
      message: 'Are you sure you want to delete this Major?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.majorService.delete(major).subscribe(async jsonResp => {

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
