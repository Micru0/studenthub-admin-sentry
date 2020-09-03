import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// services
import { AdminService } from 'src/app/providers/logged-in/admin.service';
// models
import { Admin } from 'src/app/models/admin';
// pages
import { AdminFormPage } from '../admin-form/admin-form.page';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.page.html',
  styleUrls: ['./admin-view.page.scss'],
})
export class AdminViewPage implements OnInit {

  public admin: Admin;

  public admin_id;

  public loading = false;

  public sendingNewPassword = false;

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public adminService: AdminService
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if (window.history.state) {
      this.admin = window.history.state.model;
    }

    this.admin_id = this.activateRoute.snapshot.paramMap.get('admin_id');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.adminService.view(this.admin_id).subscribe(admin => {

      this.admin = admin;

      this.loading = false;

    }, () => {

      this.loading = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: AdminFormPage,
      componentProps: {
        model: this.admin,
        admin_id: this.admin.admin_id
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
   * Confirm password reset and send new password
   */
  async resetPassword() {

    const confirm = await this.alertCtrl.create({
      header: 'Confirm password reset',
      message: 'Do you want to send new password to staff?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.sendNewPassword();
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
  async sendNewPassword() {

    this.sendingNewPassword = true;

    this.adminService.resetPassword(this.admin).subscribe(async response => {

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
            subHeader: 'New password sent to admin',
            buttons: ['Okay']
          });
        alert.present();
      }

    }, () => {
      this.sendingNewPassword = false;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({});
  }
}
