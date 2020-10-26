import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
// models
import { Admin } from 'src/app/models/admin';
// pages
import { AdminFormPage } from '../admin-form/admin-form.page';
// services
import { AdminService } from 'src/app/providers/logged-in/admin.service';
import {AuthService} from "../../../../providers/auth.service";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public admins: Admin[];

  public loading = false;
  public deleting = false;
  public sendingNewPassword = false;

  constructor(
    public platform: Platform,
    public router: Router,
    public adminService: AdminService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
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

    this.adminService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.admins = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.adminService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.admins = this.admins.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['admin-view', model.admin_id], {
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
      component: AdminFormPage,
      componentProps: {
        model: new Admin()
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
  async resetPassword(ev, staffMember: Admin) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
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
  async sendNewPassword(staffMember: Admin) {

    this.sendingNewPassword = true;

    this.adminService.resetPassword(staffMember).subscribe(async response => {

      this.sendingNewPassword = false;

      if (response.operation == 'error')
      {
        const toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        toast.present();
      }
      else
      {
        const alert = await this._alertCtrl.create({
            header: 'Reset Password',
            subHeader: 'New password sent to candidate',
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
  async delete(ev, admin: Admin) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Admin?',
      message: 'Are you sure you want to delete this Admin?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.adminService.delete(admin).subscribe(async jsonResp => {

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
