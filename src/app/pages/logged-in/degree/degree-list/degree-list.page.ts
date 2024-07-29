import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// models
import { Degree } from 'src/app/models/degree';
// services
import { DegreeService } from 'src/app/providers/logged-in/degree.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { DegreeFormPage } from '../degree-form/degree-form.page';


@Component({
  selector: 'app-degree-list',
  templateUrl: './degree-list.page.html',
  styleUrls: ['./degree-list.page.scss'],
})
export class DegreeListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public degrees: Degree[];

  constructor(
    public platform: Platform,
    public router: Router,
    public degree_groupService: DegreeService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Degree List Page');

    this.loadData(this.currentPage);
  }

  /**
   * load degree_group data
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.degree_groupService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.degrees = response.body;
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

    this.degree_groupService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.degrees = this.degrees.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {

    this.router.navigate(['degree-view', model.degree_uuid], {
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
      component: DegreeFormPage,
      componentProps: {
        model: new Degree()
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
  async delete(ev, degree_group: Degree) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Degree?',
      message: 'Are you sure you want to delete this Degree?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.degree_groupService.delete(degree_group).subscribe(async jsonResp => {

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
