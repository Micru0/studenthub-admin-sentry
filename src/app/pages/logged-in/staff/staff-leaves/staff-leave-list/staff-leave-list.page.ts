import { Component, OnInit } from '@angular/core';
import {AwsService} from "src/app/providers/aws.service";
import {StaffLeaveService} from "src/app/providers/logged-in/staff-leave.service";
import {AlertController, ToastController} from "@ionic/angular";
import {StaffLeave} from "src/app/models/staff-leave";

@Component({
  selector: 'app-staff-leave-list',
  templateUrl: './staff-leave-list.page.html',
  styleUrls: ['./staff-leave-list.page.scss'],
})
export class StaffLeaveListPage implements OnInit {

  public borderLimit = false;

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public loading = false;
  public loadMore = false;
  public deleting = false;
  public staffLeaves: StaffLeave[] = [];

  constructor(
    public awsService:AwsService,
    public staffLeaveService: StaffLeaveService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    window.analytics.page('Staff Leave List');
  }

  ionViewWillEnter() {
    this.loadData(1);
  }

  /**
   * load store list
   * @param page
   * @param loading
   */
  async loadData(page: number, loading = true) {

    this.loading = loading;

    this.staffLeaveService.list(this.currentPage).subscribe(response => {

        this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
        this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));
        this.staffLeaves = response.body;
      },
      error => {
      },
      () => {
        this.loading = false;
      }
    );
  }

  /**
   * load more
   * @param event
   */
  doInfinite(event) {
    this.loadMore = true;

    this.currentPage++;
    this.staffLeaveService.list(this.currentPage).subscribe(response => {

        this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

        this.staffLeaves = this.staffLeaves.concat(response.body);
      },
      error => {
      },
      () => {
        this.loadMore = false;
        event.target.complete();
      }
    );
  }

  /**
   * Delete the provided model
   */
  async delete(ev, id) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: 'Delete Leave Request?',
      message: 'Are you sure you want to delete this Leave Request?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.staffLeaveService.delete(id).subscribe(async jsonResp => {

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
   * Delete the provided model
   */
  async changeStatus(ev, id, status) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: (status == 1) ? 'Approve Request?' : 'Declined Request',
      message: (status == 1) ? 'Are you sure you want to Approve this Leave Request?' : 'Are you sure you want to Declined this Leave Request?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.staffLeaveService.changeStatus(id, status).subscribe(async jsonResp => {

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

  getFileUrl(model) {
    if (model.file) {
      return this.awsService.permanentBucketUrl + 'staff-leave/' + encodeURIComponent(model.file);
    }
  }

}
