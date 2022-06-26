import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
// models
import { Inspector } from 'src/app/models/inspector';
// pages
import { InspectorFormPage } from '../inspector-form/inspector-form.page';
// services
import { InspectorService } from 'src/app/providers/logged-in/inspector.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-inspector-list',
  templateUrl: './inspector-list.page.html',
  styleUrls: ['./inspector-list.page.scss'],
})
export class InspectorListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public inspectors: Inspector[];

  public loading = false;
  public deleting = false;
  public sendingNewPassword = false;

  constructor(
    public platform: Platform,
    public router: Router,
    public inspectorService: InspectorService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Inspector List Page');

    // this.loadData(this.currentPage);
  }
  ionViewDidEnter() {
    this.loadData(this.currentPage);
  }

  /**
   * Load list of admin
   * @param page
   * @param silent
   */
  async loadData(page: number, silent: boolean = false) {

    if (!silent) {
      this.loading = true;
    }

    this.inspectorService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.inspectors = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.inspectorService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.inspectors = this.inspectors.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['inspector-view', model.inspector_uuid], {
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

    const modal = await this.modalCtrl.create({
      component: InspectorFormPage,
      componentProps: {
        model: new Inspector()
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage, true);
      }
    });
    modal.present();
  }

  /**
   * Confirm password reset and send new password
   * @param staffMember
   */
  async resetPassword(ev, staffMember: Inspector) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: 'Confirm password reset',
      message: 'Do you want to send new password to admin?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.sendNewPassword(staffMember);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }

  /**
   * Reset and email the staff a new password
   */
  async sendNewPassword(staffMember: Inspector) {

    this.sendingNewPassword = true;

    this.inspectorService.resetPassword(staffMember).subscribe(async response => {

      this.sendingNewPassword = false;

      if (response.operation == 'error')
      {
        const toast = await this.toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        toast.present();
      }
      else
      {
        const alert = await this.alertCtrl.create({
            header: 'Reset Password',
            subHeader: 'New password has been sent to inspector',
            buttons: ['Okay']
          });
        alert.present();
      }
    }, () => {
      this.sendingNewPassword = false;
    });
  }

  /**
   * Delete the provided model
   */
  async delete(ev, admin: Inspector) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: 'Delete Admin?',
      message: 'Are you sure you want to delete this Admin?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.inspectorService.delete(admin).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this.alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {

                const toast = await this.toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(1, true);
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
