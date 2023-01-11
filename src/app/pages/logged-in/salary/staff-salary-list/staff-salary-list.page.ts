import { Component, OnInit } from '@angular/core';
import {StaffSalaryService} from "src/app/providers/logged-in/staff.salary.service";
import {AuthService} from "../../../../providers/auth.service";
import {StaffPage} from "../../picker/staff/staff.page";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {format, parseISO} from "date-fns";
import {Staff} from "../../../../models/staff";
import {StaffSalaryFormPage} from "../../staff/staff-salary-form/staff-salary-form.page";
import {StaffSalary} from "../../../../models/staff_salary";

@Component({
  selector: 'app-staff-salary-list',
  templateUrl: './staff-salary-list.page.html',
  styleUrls: ['./staff-salary-list.page.scss'],
})
export class StaffSalaryListPage implements OnInit {

  public currentPage;
  public totalPage;
  public totalRecord;
  public loading = false;
  public deleting = false;
  public showFilter = false;
  public staffSalaries: any[];
  public date;
  public filters: {
    staff: string,
    staff_id: number,
    month: string,
    month_actual: string,
  } = {
    staff: null,
    staff_id: null,
    month: null,
    month_actual: null,
  };

  constructor(
    public staffSalaryService: StaffSalaryService,
    public authService: AuthService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) { }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
  }

  async ngOnInit() {

  }
  ionViewWillEnter() {
    this.loadData(1);
  }

  async loadData(page, filterApply = false) {
    let params = '&expand=staff' + this.urlParams();

    this.staffSalaryService.list(page, params).subscribe(response => {
        this.staffSalaries = response.body;
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
        this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
        this.totalRecord = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);

      }, err => this.loading = false,
      () => this.loading = false
    );
  }

  doInfinite(event) {
    this.currentPage++;
    this.loading = true;
    let params = this.urlParams() + '&expand=staff';

    this.staffSalaryService.list(this.currentPage, params).subscribe(response => {

        this.staffSalaries = this.staffSalaries.concat(response.body);
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
        this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
        this.totalRecord = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);
        event.target.complete();

      }, err => this.loading = false,
      () => this.loading = false
    );
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    if (this.filters.staff_id) {
      urlParams += '&staff_id=' + this.filters.staff_id;
    }

    if (this.filters.month_actual) {
      urlParams += '&month=' + this.filters.month_actual;
    }
    return urlParams;
  }

  resetFilter() {
    this.filters = {
      staff: null,
      staff_id: null,
      month: null,
      month_actual: null,
    };
    this.date = null;
    this.loadData(1); // reload all result
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
        this.filters.staff = e.data.staff_name;
        this.filters.staff_id = e.data.staff_id;
      }
    });
    modal.present();
  }

  /**
   * close update prompt
   */
  close($event) {
    if ($event && $event.detail.value === undefined) {
      this.formatDate((new Date()).toISOString());
    } else {
      this.formatDate($event.detail.value);
    }
  }

  formatDate(date) {
    const dateFromIonDatetime = date;
    this.filters.month_actual = format(parseISO(dateFromIonDatetime), 'yyyy-MM-dd');
    this.date = format(parseISO(dateFromIonDatetime), 'MMM yyyy');
  }

  /**
   * Delete the provided model
   */
  async delete(ev, id) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: 'Delete Salary Entry?',
      message: 'Are you sure you want to delete this Salary?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.staffSalaryService.delete(id).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this.alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {

                const toast = await this.toastCtrl.create({
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
   * show popup to add salary
   */
  async editSalary($env, salary) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);
    const modal = await this.modalCtrl.create({
      component: StaffSalaryFormPage,
      componentProps: {
        model: salary,
        staff_id: salary.staff_id,
        staff_salary_uuid: salary.staff_salary_uuid
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(1);
      }
    });
    modal.present();
  }
}
