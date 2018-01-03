import { Component } from '@angular/core';
import { AlertController, ToastController, LoadingController, NavParams, ModalController } from 'ionic-angular';
// Pages
import { StaffFormPage } from '../staff-form/staff-form';
// Models
import { Staff } from '../../../../models/staff';
// Services
import { StaffService } from '../../../../providers/logged-in/staff.service';

@Component({
  selector: 'page-staff-view',
  templateUrl: 'staff-view.html'
})
export class StaffViewPage {

  public staff: Staff;

  constructor(
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController,
    public staffService: StaffService,
    params: NavParams
  ) {
    this.staff = params.get('model');
  }

  /**
   * Loads Form in modal to update
   */
  update() {
    let modal = this._modalCtrl.create(StaffFormPage, {
      model: this.staff
    });
    modal.present();
  }

  /**
   * Confirm password reset and send new password 
   */
  resetPassword() {
    let confirm = this._alertCtrl.create({
      title: 'Confirm password reset',
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
  sendNewPassword() {
    let loader = this._loadingCtrl.create();
    loader.present();

    this.staffService.resetPassword(this.staff).subscribe(response => {
      loader.dismiss();

      if(response.operation == 'error')
      {
        let toast = this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        
        toast.present();
      } 
      else 
      {
        let alert = this._alertCtrl.create({
            title: 'Reset Password',
            subTitle: 'New password sent to candidate',
            buttons: ['Okay']
          });
          alert.present();
      }      
    });
  }

}
