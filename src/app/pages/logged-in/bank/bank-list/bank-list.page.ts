import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services
import { BankService } from 'src/app/providers/logged-in/bank.service';
import { AuthService } from 'src/app/providers/auth.service';
// models
import { Bank } from 'src/app/models/bank';
// pages
import { BankFormPage } from '../bank-form/bank-form.page';



@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.page.html',
  styleUrls: ['./bank-list.page.scss'],
})
export class BankListPage implements OnInit {

  public loading = false;

  public deleting = false;

  public pageCount = 0;
  public currentPage = 1;

  public banks: Bank[];

  constructor(
    public platform: Platform,
    public router: Router,
    public bankService: BankService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * list banks
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.bankService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.banks = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.bankService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.banks = this.banks.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.router.navigate(['/bank-view', model.bank_id], {
      state: {
        model: model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: BankFormPage,
      componentProps: {
        model: new Bank()
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, bank: Bank) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Bank?',
      message: 'Are you sure you want to delete this Bank?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.bankService.delete(bank).subscribe(async jsonResp => {

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

                this.loadData(this.currentPage, true);
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
