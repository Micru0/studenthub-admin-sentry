import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, Platform, ToastController} from "@ionic/angular";
import { Router } from "@angular/router";
import {AuthService} from "src/app/providers/auth.service";

import {isToday} from "date-fns";
import {StaffWorkSessionService} from "src/app/providers/logged-in/staff-work-session.service";
import { addDays,subDays,format } from 'date-fns'
import {StaffPage} from "src/app/pages/logged-in/picker/staff/staff.page";

@Component({
  selector: 'app-staff-work-session-list',
  templateUrl: './staff-work-session-list.page.html',
  styleUrls: ['./staff-work-session-list.page.scss'],
})
export class StaffWorkSessionListPage implements OnInit {

  public loading = false;

  public deleting = false;
  public exporting = false;
  public showFilter = false;

  public pageCount = 0;
  public currentPage = 1;

  public inActivePageCount = 0;
  public inActiveCurrentPage = 1;
  public totalWorking = 0;
  public totalNonWorking = 0;

  public staffWorkSessions:any[];
  public inActiveStaff:any[];
  public selected = 'working';
  public filters: {
    staff_name: string,
    staff_id: string,
    date: any,
    startDate: any,
    endDate: any,
  } = {
    staff_name: null,
    staff_id: null,
    date: null,
    startDate: null,
    endDate: null,
  };


  constructor(
    public platform: Platform,
    public router: Router,
    public modalCtrl: ModalController,
    public staffWorkService: StaffWorkSessionService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.filters.startDate = new Date();
    this.filters.endDate = new Date();
    window.analytics.page('Daily working List Page');

    this.loadData(1);
    this.loadInactiveData(1);
  }

  resetFilter() {
    this.filters = {
      staff_name: null,
      staff_id: null,
      date: null,
      startDate: null,
      endDate: null
    };
    this.filters.startDate = new Date();
    this.filters.endDate = new Date();
    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams(filter = false) {
    let urlParams = '';

    if (this.filters.staff_id) {
      urlParams += '&staff_id=' + this.filters.staff_id;
    }
    if (this.filters.startDate) {
      urlParams += '&startDate=' + format(new Date(this.filters.startDate),'dd-MM-yyyy');
    }

    if (this.filters.endDate) {
      urlParams += '&endDate=' + format(new Date(this.filters.endDate),'dd-MM-yyyy');
    }
    return urlParams;
  }


  /**
   * list banks
   * @param page
   */
  async loadData(page: number, filter = false) {

    this.loading = true;
    const search = this.urlParams(filter);
    this.staffWorkService.list(page, search).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalWorking = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.staffWorkSessions = response.body;

    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * list banks
   * @param page
   */
  async loadInactiveData(page, filter = false) {

    this.loading = true;
    const search = this.urlParams(filter);
    this.staffWorkService.listInactive(page, search).subscribe(response => {

      this.inActivePageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.inActiveCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalNonWorking = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.loading = false;
      this.inActiveStaff = response.body;

    }, () => {
      this.loading = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const search = this.urlParams();
    this.staffWorkService.list(this.currentPage, search).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.staffWorkSessions = this.staffWorkSessions.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  doInfiniteInActive(event) {

    this.loading = true;

    this.inActiveCurrentPage++;
    const search = this.urlParams();
    this.staffWorkService.listInactive(this.inActiveCurrentPage, search).subscribe(response => {

      this.loading = false;

      this.inActivePageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.inActiveCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.inActiveStaff = this.inActiveStaff.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  toggleFilter($ev) {
    this.showFilter = !this.showFilter
  }

  /**
   * Loads form to initiate a new transfer
   */
  async selectStaff(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: StaffPage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
      if (e.data) {
        this.filters.staff_name = e.data.staff_name;
        this.filters.staff_id = e.data.staff_id;
      }
    });
    modal.present();
  }

  todayCheck(answer) {
    return isToday(new Date(answer.created_at));
  }

  adjustDate(param) {
    if (param) {
      this.filters.startDate = addDays(new Date(this.filters.startDate), 1);
      this.filters.endDate = addDays(new Date(this.filters.endDate), 1);
    } else {
      this.filters.startDate = subDays(new Date(this.filters.startDate), 1);
      this.filters.endDate = subDays(new Date(this.filters.endDate), 1);
    }
    this.loadData(1);
    this.loadInactiveData(1);
  }

  getTotal(dayActivity) {
    let total = dayActivity.reduce((prev, next) => (prev + next.total_minutes), 0);
    return (total * 60); //convert into seconds
  }

  tabChange(event) {
    this.selected = event.detail.value;
  }

  async exportData(ev){
    ev.preventDefault();
    ev.stopPropagation();
    const confirm = await this._alertCtrl.create({
      header: 'Export Data?',
      message: 'Do you really wants to export company data?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.exporting = true;
            const searchParams = this.urlParams();
            this.staffWorkService.downloadExcel(searchParams).subscribe(async jsonResp => {
              this.exporting = false;
            });
          }
        },
        {
          text: 'No',
          role: 'no'
        }
      ]
    });
    confirm.present();
  }
}
