import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

// Models
import { Transfer } from '../../../../models/transfer';

@Component({
  selector: 'page-transfer-view',
  templateUrl: 'transfer-view.html'
})
export class TransferViewPage {
  
  public transfer: Transfer;

  public transfer_id: number;

  constructor(
    public navCtrl: NavController,
    public transferService: TransferService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    public params: NavParams,
    public alertCtrl: AlertController
  ) {

    this.transfer_id = params.get('transfer_id');
    
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    // Load list of transfer
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.transferIdDetails(this.transfer_id).subscribe(response => {
      this.transfer = response;
      loader.dismiss();
    });
  }

  markReceived(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markReceived(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  markProgress(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markProgress(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  markComplete(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markComplete(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  markUnlock(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markUnlock(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  generateInvoice(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.generateInvoiceCopy(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
  
  // Calculating Total cost     
  totalCost(hourly_rate, hours, bonus, transfer_cost) {
    return (2 * (Number(hours) + Number(bonus)) - Number(transfer_cost));
  }
}

