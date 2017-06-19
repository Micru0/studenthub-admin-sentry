import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';

// Pages
import { BankViewPage } from '../bank-view/bank-view';
import { BankFormPage } from '../bank-form/bank-form';
// Providers
import { BankService } from '../../../../providers/logged-in/bank.service';
// Models
import { Bank } from '../../../../models/bank';

@Component({
  selector: 'page-bank-list',
  templateUrl: 'bank-list.html'
})
export class BankListPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public bank: Bank[];

  constructor(
    public navCtrl: NavController,
    public bankService: BankService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    this.loadData(this.currentPage);
  }

  loadData(page: number) {
    // Load list of bank
    let loader = this._loadingCtrl.create();
    loader.present();
    this.bankService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.bank = response.json();
    },
      error => { },
      () => { loader.dismiss(); }
    );
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.navCtrl.push(BankViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  create() {
    let modal = this._modalCtrl.create(BankFormPage, {
      model: new Bank()
    });
    // Refresh List if required
    modal.onDidDismiss(data => {
      if (data) {
        if (data.refresh) {
          this.loadData(this.currentPage);
        }
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  delete(bank: Bank) {
    let loader = this._loadingCtrl.create();
    loader.present();
    let confirm = this._alertCtrl.create({
      title: 'Delete Bank?',
      message: 'Are you sure you want to delete this Bank?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.bankService.delete(bank).subscribe(jsonResp => {
              loader.dismiss();

              if (jsonResp.operation == 'error') {
                let alert = this._alertCtrl.create({
                  title: 'Deletion Error!',
                  subTitle: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                let toast = this._toastCtrl.create({
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
          text: 'No',
          handler: () => {
            this.loadData(this.currentPage);
            loader.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
