import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, Platform, ToastController} from "@ionic/angular";
import {StaffExpense} from "../../../../../models/staff-expense";
import {StaffExpenseService} from "../../../../../providers/logged-in/staff.expense.service";

@Component({
  selector: 'app-staff-expense-list',
  templateUrl: './staff-expense-list.page.html',
  styleUrls: ['./staff-expense-list.page.scss'],
})
export class StaffExpenseListPage implements OnInit {

  public borderLimit = false;

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public loading = false;
  public loadMore = false;
  public deleting = false;
  public expenses: StaffExpense[] = [];

  constructor(
    private expenseService: StaffExpenseService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    window.analytics.page('Expense List Page');

    this.loadData(this.currentPage);
  }

  /**
   * load store list
   * @param page
   * @param loading
   */
  async loadData(page: number, loading = true) {

    this.loading = loading;

    this.expenseService.list(this.currentPage).subscribe(response => {

        this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
        this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));
        this.expenses = response.body;
      },
      error => {
      },
      () => {
        this.loading = false;
      }
    );
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    // this.navCtrl.navigateForward('mall-view/' + model.mall_uuid, {
    //   state: {
    //     model
    //   }
    // });
  }

  /**
   * Loads the create page
   */
  // async create($event, mall: Mall = new Mall()) {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);
  //
  //   const modal = await this.modalCtrl.create({
  //     component: MallFormPage,
  //     componentProps: {
  //       model: mall
  //     }
  //   });
  //   modal.onDidDismiss().then(e => {
  //
  //     if (!e.data || e.data.from != 'native-back-btn') {
  //       window['history-back-from'] = 'onDidDismiss';
  //       window.history.back();
  //     }
  //
  //     if (e.data && e.data.refresh) {
  //       this.loadData(this.currentPage);
  //     }
  //   });
  //   return await modal.present();
  // }

  async delete(event, expense: StaffExpense) {
    event.preventDefault();
    event.stopPropagation();

    const confirm = await this.alertCtrl.create({
      header: 'Delete Expense?',
      message: 'Are you sure you want to delete this Expense?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            const load = await this.loadingCtrl.create();
            load.present();
            this.expenseService.delete(expense).subscribe(async jsonResp => {
              load.dismiss();

              if (jsonResp.operation == 'error') {
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
              }
              this.loadData(this.currentPage);
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
   * load more
   * @param event
   */
  doInfinite(event) {
    this.loadMore = true;

    this.currentPage++;
    this.expenseService.list(this.currentPage).subscribe(response => {

        this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
        this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

        this.expenses = this.expenses.concat(response.body);
      },
      error => {
      },
      () => {
        this.loadMore = false;
        event.target.complete();
      }
    );
  }

  logScrolling(e) {
    this.borderLimit = (e.detail.scrollTop > 20);
  }

}
