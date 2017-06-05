import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';

import { TransferPaidPage } from '../transfer-paid/transfer-paid';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

// Models
import { Transfer, Invoice } from '../../../../models/transfer';

@Component({
  selector: 'page-transfer-view',
  templateUrl: 'transfer-view.html'
})
export class TransferViewPage {
  
  public transfer: Transfer;
  public transfer_id: number;
  public invoices: Invoice[] = []; //unpaid invoices 
  public receipts: Invoice[] = []; //paid invoices 

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

  ionViewWillLoad() {
    this.loadData();
  }

  // load data after paid to user
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    // Load list of transfer
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.transferIdDetails(this.transfer_id).subscribe(response => {
      this.transfer = response;
    
      this.receipts = [];
      this.invoices = [];
      
      response.invoices.forEach((value, index) => {
        if(value.invoice_status == 'paid') {
          this.receipts.push(value);
        }else{
          this.invoices.push(value);
        }
      });

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

  markPaid(transfer_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.listUnpaidCandidates(transfer_id).subscribe(response => {
      
      loader.dismiss();

      //all candidates paid already 

      if(response.candidates.length == 0) {
        this.markComplete(transfer_id);
      }else{
        this.navCtrl.push(TransferPaidPage, {
          'candidates': response.candidates,
          'transfer_id': this.transfer_id
        });
      }
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

  export(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.export(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
  
  /** 
   * Donwload Receipt
   */
  downloadReceipt(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadReceipt(invoice_id).subscribe(response => {
      //this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /** 
   * Donwload invoice
   */
  downloadInvoice(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadInvoice(invoice_id).subscribe(response => {
      //this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /**
   * Calculating Total per Candidate
   */     
  total(candidate) {
    return (Number(candidate.company_hourly_rate) * Number(candidate.hours)) + Number(candidate.bonus);
  }

  totalCandidate(candidate) {
    return (Number(candidate.candidate_hourly_rate) * Number(candidate.hours)) + Number(candidate.bonus);
  }
}

