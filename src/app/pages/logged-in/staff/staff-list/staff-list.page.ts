import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
//models
import { Staff } from 'src/app/models/staff';
//pages
import { StaffFormPage } from '../staff-form/staff-form.page';
//services
import { StaffService } from 'src/app/providers/logged-in/staff.service';


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

  public loading: boolean = false; 
  public deleting: boolean = false; 
  public sendingNewPassword: boolean = false; 

  constructor(
    public platform: Platform,
    public router: Router,
    public staffService: StaffService,
    private _modalCtrl: ModalController,
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
  async loadData(page: number, silent: boolean = false) {
    
    if(!silent)
      this.loading = true;

    this.staffService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false; 

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.staff = response.body;
    },() => { 
      this.loading = false; 
      this.deleting = false; 
    });
  }
  
  async doInfinite(event) {
    
    this.loading = true;

    this.currentPage++; 

    this.staffService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.staff = this.staff.concat(response.body);

      event.target.complete(); 

    },() => { 
      this.loading = false; 
    });
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
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    let modal = await this._modalCtrl.create({
      component: StaffFormPage,
      componentProps: {
        model: new Staff()
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
  async resetPassword(ev, staffMember: Staff) {

    ev.preventDefault(); 
    ev.stopPropagation();

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

    this.sendingNewPassword = true;

    this.staffService.resetPassword(staffMember).subscribe(async response => {
      
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
  async delete(ev, staff: Staff) {

    ev.preventDefault(); 
    ev.stopPropagation();

    let confirm = await this._alertCtrl.create({
      header: 'Delete Staff?',
      message: 'Are you sure you want to delete this Staff?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true; 

            this.staffService.delete(staff).subscribe(async jsonResp => {
            
              if (jsonResp.operation == 'error') {
                
                this.deleting = false; 

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
