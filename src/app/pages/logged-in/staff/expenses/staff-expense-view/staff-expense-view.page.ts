import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services

import { AuthService } from 'src/app/providers/auth.service';
// pages
import { StaffExpense } from 'src/app/models/staff-expense';
import {StaffExpenseService} from "../../../../../providers/logged-in/staff.expense.service";
import {AwsService} from "../../../../../providers/aws.service";


@Component({
  selector: 'app-staff-expense-view',
  templateUrl: './staff-expense-view.page.html',
  styleUrls: ['./staff-expense-view.page.scss'],
})
export class StaffExpenseViewPage implements OnInit {

  public expense_uuid: string;

  public expense: StaffExpense;

  public loading = false;

  constructor(
    private expenseService: StaffExpenseService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public awsService: AwsService,

  ) {
    // this.expense = params.get('model');
  }

  ngOnInit() {
    window.analytics.page('Expense View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.expense = window.history.state.model;
    }

    this.expense_uuid = this.activateRoute.snapshot.paramMap.get('expense_uuid');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.expenseService.view(this.expense_uuid).subscribe(expense => {
      this.expense = expense;

      this.loading = false;

    }, () => {

      this.loading = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  // async update() {
  //   window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);
  //
  //   const modal = await this._modalCtrl.create({
  //     component: ExpenseFormPage,
  //     componentProps: {
  //      model: this.expense,
  //      expense_uuid: this.expense.expense_uuid
  //     }
  //   });
  //   modal.onDidDismiss().then(e => {
  //
  //     if (!e.data || e.data.from != 'native-back-btn') {
  //       window['history-back-from'] = 'onDidDismiss';
  //       window.history.back();
  //     }
  //
  //     if (e && e.data && e.data.model) {
  //       this.expense = e.data.model; //  load data on update close
  //     }
  //   });
  //   modal.present();
  // }

  async changeStatus(status) {
    let statusLbl;
    if (status == 1) {
      statusLbl = 'Approve';
    } else if (status == 2) {
      statusLbl = 'Mark As Reimbursed';
    } else if (status == 2) {
      statusLbl = 'Declined';
    }
    const alert = await this.alertCtrl.create({
      header: 'Change Expense status!',
      message:`Are you sure you want to change expense status to '${statusLbl}'`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            let load = await this.loadingCtrl.create();
            load.present();
            this.expenseService.changeStatus(this.expense_uuid, status).subscribe(async jsonResponse => {
              load.dismiss();

              if (jsonResponse.operation == 'success') {
                this.loadData();
              }
              const prompt = await this.alertCtrl.create({
                message: this.authService.errorMessage(jsonResponse.message),
                buttons: ['Ok']
              });
              prompt.present();
            });
          }
        }
      ]
    })
    alert.present();
  }

  getFileUrl() {
    return this.awsService.permanentBucketUrl + 'staff-expenses/' + encodeURIComponent(this.expense.file);
  }
}
