import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services
import { BlockedIpService } from 'src/app/providers/logged-in/blocked-ip.service';
import { AuthService } from 'src/app/providers/auth.service';
// models
import { BlockedIp } from 'src/app/models/blocked-ip';
// pages
import { BlockedIpFormPage } from '../blocked-ip-form/blocked-ip-form.page';


@Component({
  selector: 'app-blocked-ip-list',
  templateUrl: './blocked-ip-list.page.html',
  styleUrls: ['./blocked-ip-list.page.scss'],
})
export class BlockedIpListPage implements OnInit {

  public loading = false;

  public deleting = false;

  public pageCount = 0;
  public currentPage = 1;

  public blockedIps: BlockedIp[];

  constructor(
    public platform: Platform,
    public router: Router,
    public blockedIpService: BlockedIpService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('BlockedIp List Page');

    this.loadData(this.currentPage);
  }

  /**
   * list blockedIps
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.blockedIpService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.blockedIps = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.blockedIpService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.blockedIps = this.blockedIps.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: BlockedIpFormPage,
      componentProps: {
        model: new BlockedIp()
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

  /**
   * Delete the provided model
   */
  async delete(ev, blockedIp: BlockedIp) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete BlockedIp?',
      message: 'Are you sure you want to delete this BlockedIp?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.blockedIpService.delete(blockedIp).subscribe(async jsonResp => {

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

                this.loadData(this.currentPage, true);
              }
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
