import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff';
import { StaffService } from 'src/app/providers/logged-in/staff.service';
import { Router } from '@angular/router';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { StaffFormPage } from '../staff-form/staff-form.page';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public staff: Staff[];

  constructor(
    public router: Router,
    public staffService: StaffService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * Load list of staff
   * @param page 
   */
  async loadData(page: number) {
    
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.staffService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.staff = response.body;
    },
      error => { },
      () => { loader.dismiss(); }
    );
  }

  /**
   * pagination current page color
   * @param page 
   */
  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
  
  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['staff-view', model.staff_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    let modal = await this._modalCtrl.create({
      component: StaffFormPage,
      componentProps: {
        model: new Staff()
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Confirm password reset and send new password 
   * @param staffMember 
   */
  async resetPassword(staffMember: Staff) {
    let confirm = await this._alertCtrl.create({
      header: 'Confirm password reset',
      message: 'Do you want to send new password to staff?',
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
  async sendNewPassword(staffMember: Staff) {

    let loader = await this._loadingCtrl.create();
    loader.present();

    this.staffService.resetPassword(staffMember).subscribe(async response => {
      loader.dismiss();

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
            subHeader: 'New password sent to candidate',
            buttons: ['Okay']
          });
          alert.present();
      }      
    });
  }

  /**
   * Delete the provided model
   */
  async delete(staff: Staff) {

    let loader = await this._loadingCtrl.create();
    loader.present();

    let confirm = await this._alertCtrl.create({
      header: 'Delete Staff?',
      message: 'Are you sure you want to delete this Staff?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.staffService.delete(staff).subscribe(async jsonResp => {
              loader.dismiss();

              if (jsonResp.operation == 'error') {

                let alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {

                let toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(this.currentPage);
              }              
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            this.loadData(this.currentPage);
            loader.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
