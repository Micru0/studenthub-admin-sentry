import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
//services
import { StaffService } from 'src/app/providers/logged-in/staff.service';
//models
import { Staff } from 'src/app/models/staff';
//pages
import { StaffFormPage } from '../staff-form/staff-form.page';


@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.page.html',
  styleUrls: ['./staff-view.page.scss'],
})
export class StaffViewPage implements OnInit {
 
  public staff: Staff;

  public staff_id;

  public loading: boolean = false; 
  
  public sendingNewPassword: boolean = false;

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public staffService: StaffService
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.staff = window['state']['model'];
    }

    this.staff_id = this.activateRoute.snapshot.paramMap.get('staff_id');
  
    this.loadData();
  }

  loadData() {
    this.loading = true; 

    this.staffService.view(this.staff_id).subscribe(staff => {

      this.staff = staff; 

      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    let modal = await this._modalCtrl.create({
      component: StaffFormPage,
      componentProps: {
        model: this.staff,
        staff_id: this.staff.staff_id
      }
    });
    modal.present();
  }

  /**
   * Confirm password reset and send new password 
   */
  async resetPassword() {
    
    let confirm = await this._alertCtrl.create({
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

    this.staffService.resetPassword(this.staff).subscribe(async response => {
      
      this.sendingNewPassword = false;

      if(response.operation == 'error')
      {
        let toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        
        toast.present();
      } 
      else 
      {
        let alert = await this._alertCtrl.create({
            header: 'Reset Password',
            subHeader: 'New password sent to staff',
            buttons: ['Okay']
          });
          alert.present();
      }      

    }, () => {
      this.sendingNewPassword = false;
    });
  }
}
