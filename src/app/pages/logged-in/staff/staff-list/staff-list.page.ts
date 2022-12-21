import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController, AlertController, ToastController, Platform, NavController} from '@ionic/angular';
// models
import { Staff } from 'src/app/models/staff';
// pages
import { StaffFormPage } from '../staff-form/staff-form.page';
// services
import { StaffService } from 'src/app/providers/logged-in/staff.service';
import {AuthService} from '../../../../providers/auth.service';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public totalCount = 0;
  public pages: number[] = [];

  public staff: Staff[];

  public loading = false;
  public deleting = false;
  public sendingNewPassword = false;
  public statusChanging = false;
  public showFilter = false;

  public filters: {
    name: string,
    start_date: string,
    end_date: string,
    status: number,
    deleted: number,
    role: string
  } = {
    name: null,
    start_date: null,
    end_date: null,
    status: null,
    deleted: null,
    role: null
  };

  constructor(
    public platform: Platform,
    public router: Router,
    public navCtrl: NavController,
    public staffService: StaffService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
    window.analytics.page('Staff List Page');
    this.loadData(this.currentPage);
  }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
  }

  /**
   * Load list of staff
   * @param page
   */
  async loadData(page: number, silent: boolean = false) {

    if (!silent) {
      this.loading = true;
    }
    const param = this.urlParams();
    this.staffService.list(page, param).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.staff = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const param = this.urlParams();
    this.staffService.list(this.currentPage, param).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.staff = this.staff.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    const start = this.filters.start_date || 1;
    const end = this.filters.end_date || 1;
    this.router.navigate(['staff-view', model.staff_id, start, end], {
      state: {
        model,
        start_date: start,
        end_date: end
      }
    });
  }

  permission(ev, model) {
    ev.preventDefault();
    ev.stopPropagation();
    this.router.navigate(['/assign-permission/staff/', model.staff_id], {
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

    const confirm = await this._alertCtrl.create({
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
            subHeader: 'New password sent to staff',
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

    const confirm = await this._alertCtrl.create({
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

  /**
   * Close the page
   */
  /**
   * Close the page
   */
  close() {
    this._modalCtrl.getTop().then(o => {
      if(o) {
        o.dismiss({ refresh: false });
      }
      else
      {
        this.navCtrl.back();
      }
    });
  }

  /**
   * Reset question filter
   */
  resetFilter() {
    this.filters = {
      name: null,
      start_date: null,
      end_date: null,
      status: null,
      role: null,
      deleted: null
    };
    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    if (this.filters.status) {
      urlParams += '&status=' + this.filters.status;
    }

    if (this.filters.name) {
      urlParams += '&name=' + this.filters.name;
    }

    if (this.filters.start_date) {
      urlParams += '&start_date=' + this.filters.start_date;
    }

    if (this.filters.end_date) {
      urlParams += '&end_date=' + this.filters.end_date;
    }

    if (this.filters.role) {
      urlParams += '&role=' + this.filters.role;
    }
    if (this.filters.deleted) {
      urlParams += '&deleted=' + this.filters.deleted;
    }
    return urlParams;
  }

  async changeStatus(ev, staff: Staff) {
    ev.preventDefault();
    ev.stopPropagation();
    const confirm = await this._alertCtrl.create({
      header: 'Do you want to change status?',
      buttons: [
        {
          text: 'Yes',
          handler: (data) => {
            this.statusChange(staff);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }

  statusChange(staff) {
    let status = (staff.staff_status == '10') ? 0 : 10;
    this.statusChanging = true;
    this.staffService.changeStatus(staff, status).subscribe(response => {
      this.statusChanging = false;

      if (response.operation == 'success') {
        staff.staff_status = status;
      }
      this._toastCtrl.create({
        message: this.authService.errorMessage(response.message),
        duration: 2000
      }).then(toast => toast.present());
    }, () => {
      this.statusChanging = false;
    });
  }
}
