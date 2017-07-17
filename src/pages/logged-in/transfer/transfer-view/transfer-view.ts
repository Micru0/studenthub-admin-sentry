import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController,ToastController,Events } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';
// Models
import { Transfer, Invoice } from '../../../../models/transfer';
// Pages
import { CandidateViewPage } from '../../candidate/candidate-view/candidate-view';

@Component({
  selector: 'page-transfer-view',
  templateUrl: 'transfer-view.html'
})
export class TransferViewPage {
  
  public transfer: Transfer;
  public transfer_id: number;
  public invoices: Invoice[] = []; //unpaid invoices 
  public receipts: Invoice[] = []; //paid invoices 

  public transferStatus = "";
  public transferStatusDescription = "";

  constructor(
    public navCtrl: NavController,
    public transferService: TransferService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    public params: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _events: Events
  ) {
    this.transfer_id = params.get('transfer_id');
  }

  // Reload data when page is entering
  // Also used to reload data after paid to user
  ionViewWillEnter() {
    this.loadData();
  }

  /**
   * Load Transfer Detail from Server
   */
  loadData() {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.transferIdDetails(this.transfer_id).subscribe(response => {
      this.transfer = response;
      this._updateTransferStatus();
    
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

  /**
   * Update transfer status and description based on return value from API
   */
  private _updateTransferStatus(){
    switch(this.transfer.transfer_status){
      case 10: // Draft
        this.transferStatus = "Transfer Draft";
        this.transferStatusDescription = "Company needs to lock once hours are input.";
        break;
      case 5: // Transfer Locked
        this.transferStatus = "Transfer Locked";
        this.transferStatusDescription = "Invoices have been sent. Waiting for company to be mark as payment sent.";
        break;
      case 1: // Payment Sent
        this.transferStatus = "Payment has been marked as Sent by Company";
        this.transferStatusDescription = "We need to verify that payment received to start distribution.";
        break;
      case 3: // Distribution in Progress
        this.transferStatus = "Distribution in Progress";
        this.transferStatusDescription = "Payments are being distributed to candidates as specified.";
        break;
      case 4: // Transfer Complete
        this.transferStatus = "Transfer Complete";
        this.transferStatusDescription = "All done!";
        break;
    }
  }

  /**
   * Mark as Payment Received and Distribution in Progress
   * @param invoice_id 
   */
  markReceivedAndDistribute(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markReceivedDistributing(invoice_id).subscribe(response => {
      
      let toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();

      //update review count 
      this._events.publish('navigation:updatePayable');
      
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /**
   * Unlock the transfer
   * Unlock Transfer, revert to draft
   * @param invoice_id 
   */
  markUnlock(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markUnlock(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /**
   * Payment Sent. Revert back to locked.
   * @param invoice_id 
   */
  revertBackToLock(invoice_id) {
    let alert = this.alertCtrl.create({
      title: 'Locked Status?',
      message: 'Do you want to revert back status to Locked?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            let loader = this._loadingCtrl.create();
            loader.present();
            this.transferService.marklock(invoice_id).subscribe(response => {
              let result = response;
              
              let toast = this.toastCtrl.create({
                message: result.message,
                duration: 3000
              });
              toast.present();

              this.navCtrl.pop();
              loader.dismiss();
            });
          }
        }
      ]
    });
    alert.present();   
  }

  /**
   * Export as Excel
   * @param invoice_id 
   */
  export(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.export(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
  
  /**
   * Download Receipt
   * @param invoice_id 
   */
  downloadReceipt(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadReceipt(invoice_id).subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Download Invoice
   * @param invoice_id 
   */
  downloadInvoice(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadInvoice(invoice_id).subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Calculating Total Price for a Candidate
   * based on the company hourly rate
   * @param candidate 
   */
  totalCompanyPaysForCandidate(candidate) {
    return (Number(candidate.company_hourly_rate) * Number(candidate.hours)) + Number(candidate.bonus);
  }

  /**
   * Calculating Total Cost for a Candidate
   * based on the candidate hourly rate
   * @param candidate 
   */
  totalPaidToCandidate(candidate) {
    return (Number(candidate.candidate_hourly_rate) * Number(candidate.hours)) + Number(candidate.bonus);
  }

  /**
   * On Candidate Selected
   * @param model 
   */
  loadCandidateDetail(model) {
    this.navCtrl.push(CandidateViewPage, {
      'model': model
    });
  }
}

