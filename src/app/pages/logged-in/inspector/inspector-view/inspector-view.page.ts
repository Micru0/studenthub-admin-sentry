import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// services
import { InspectorService } from 'src/app/providers/logged-in/inspector.service';
// models
import { Inspector } from 'src/app/models/inspector';
// pages
import { InspectorFormPage } from '../inspector-form/inspector-form.page';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-inspector-view',
  templateUrl: './inspector-view.page.html',
  styleUrls: ['./inspector-view.page.scss'],
})
export class InspectorViewPage implements OnInit {

  public inspector: Inspector;

  public inspector_uuid;

  public loading = false;

  public sendingNewPassword = false;

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public inspectorService: InspectorService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if (window.history.state) {
      this.inspector = window.history.state.model;
    }

    this.inspector_uuid = this.activateRoute.snapshot.paramMap.get('inspector_uuid');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.inspectorService.view(this.inspector_uuid).subscribe(inspector => {

      this.inspector = inspector;

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
      component: InspectorFormPage,
      componentProps: {
        model: this.inspector,
        admin_id: this.inspector.inspector_uuid
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
      message: 'Do you want to send new password to Inspector?',
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

    this.inspectorService.resetPassword(this.inspector).subscribe(async response => {

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
            subHeader: 'New password sent to inspector',
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
