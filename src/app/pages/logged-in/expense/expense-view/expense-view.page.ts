import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services
import { ExpenseService } from 'src/app/providers/logged-in/expense.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { ExpenseFormPage } from '../expense-form/expense-form.page';
// models
import { Expense } from 'src/app/models/expense';


@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.page.html',
  styleUrls: ['./expense-view.page.scss'],
})
export class ExpenseViewPage implements OnInit {

  public expense_uuid: string;

  public expense: Expense;

  public loading = false;

  constructor(
    private expenseService: ExpenseService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    public authService: AuthService,

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
  async update() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: ExpenseFormPage,
      componentProps: {
       model: this.expense,
       expense_uuid: this.expense.expense_uuid
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.expense = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}
