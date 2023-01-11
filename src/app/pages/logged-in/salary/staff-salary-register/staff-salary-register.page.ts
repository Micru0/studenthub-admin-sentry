import { Component, OnInit } from '@angular/core';
import {StaffService} from "src/app/providers/logged-in/staff.service";
import {Staff} from "../../../../models/staff";
import {format, parseISO} from "date-fns";
import {AlertController, NavController, ToastController} from "@ionic/angular";
import {StaffSalaryService} from "../../../../providers/logged-in/staff.salary.service";

@Component({
  selector: 'app-staff-salary-register',
  templateUrl: './staff-salary-register.page.html',
  styleUrls: ['./staff-salary-register.page.scss'],
})
export class StaffSalaryRegisterPage implements OnInit {

  public staffList: Staff[];
  public totalPages;
  public totalRecords;
  public currentPage = 1;
  public month;
  public monthLabel;
  public loading = false;
  public staffSalaryList:any[] = [];
  constructor(
    public staffService: StaffService,
    public staffSalaryService: StaffSalaryService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  async loadData(page) {
    let param = '&deleted=0,status=active';
    this.staffService.list(page,param).subscribe(response => {

      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalPages = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.totalRecords = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);

      this.staffList = response.body
    })
  }

  doInfinite(event) {
    this.currentPage++;
    this.loading = true;
    let params = '&deleted=0,status=active&expand=staff';

    this.staffService.list(this.currentPage, params).subscribe(response => {

        this.staffList = this.staffList.concat(response.body);
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
        this.totalPages = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
        this.totalRecords = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);
        event.target.complete();

      }, err => this.loading = false,
      () => this.loading = false
    );
  }

  async onSelected(event) {

    // console.log(event);
    event.preventDefault();
    event.stopPropagation();

    if(!this.staffSalaryList) {
      this.staffSalaryList = [];
    }
    const staff_id = parseInt(event.target.value);

    // for candidate operations

    if (event.detail.checked) { // on check
      this.staffSalaryList.push(staff_id);
    } else {
      this.staffSalaryList = this.staffSalaryList.filter((c) => c != staff_id);
    }

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
    this.month = format(parseISO(dateFromIonDatetime), 'yyyy-MM-dd');
    this.monthLabel = format(parseISO(dateFromIonDatetime), 'yyyy-MM-dd');
  }

  save($event) {
    if (this.staffSalaryList.length == 0 || this.month  === undefined) {
        this.alertCtrl.create({
          header: 'Error!',
          message: 'Please select date and staff from list to save salary',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                //no
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                //
              },
            },
          ],
        }).then((alert) => alert.present());
    } else {
      this.alertCtrl.create({
        header: 'Do you really want to save this data?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //no
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.staffSalaryService.create(this.staffSalaryList, this.month).subscribe(async jsonResponse => {
                let toast = await this.toastCtrl.create({
                    message: jsonResponse.message,
                    duration: 3000
                  });
                  toast.present();

                this.navCtrl.navigateBack('/staff-salary-list');
              })
            },
          },
        ],
      }).then((alert) => alert.present());
    }
  }
}
