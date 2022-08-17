import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController, AlertController, ToastController, Platform, NavController} from '@ionic/angular';
// models
import { Staff } from 'src/app/models/staff';
// pages
// services
import { StaffService } from 'src/app/providers/logged-in/staff.service';
import {AuthService} from 'src/app/providers/auth.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public staff: Staff[];

  public loading = false;
  public deleting = false;
  public sendingNewPassword = false;

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

  /**
   * Load list of staff
   * @param page
   */
  async loadData(page: number, silent: boolean = false) {

    if (!silent) {
      this.loading = true;
    }

    this.staffService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.staff = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.staffService.list(this.currentPage).subscribe(response => {

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
   * Close the page
   */
  close(data = null) {
    this._modalCtrl.getTop().then(o => {
      if(o) {
        o.dismiss(data);
      }
      else
      {
        this.navCtrl.back();
      }
    });
  }
}
