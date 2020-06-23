import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { EventService } from 'src/app/providers/event.service';
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
//models
import { Transfer, Invoice } from 'src/app/models/transfer';
import { TransferCandidate } from 'src/app/models/transfer-candidate';
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-transfer-view',
  templateUrl: './transfer-view.page.html',
  styleUrls: ['./transfer-view.page.scss'],
})
export class TransferViewPage implements OnInit {

  public transfer: Transfer;
  public transfer_id: number;
  public invoices: Invoice[] = []; //unpaid invoices 
  public receipts: Invoice[] = []; //paid invoices 

  public transferStatus = "";
  public transferStatusDescription = "";

  public loadingCandidates = false;

  public candidatePageCount: number;
  public candidatePage: number;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public transferService: TransferService,
    public transferCandidateService: CandidateTransferService,
    private _loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _eventService: EventService
  ) {
    this.transfer_id = parseInt(this.activatedRoute.snapshot.paramMap.get('transfer_id'));
  }

  ngOnInit() { }

  // Reload data when page is entering
  // Also used to reload data after paid to user
  ionViewWillEnter() {
    this.loadData();
  }

  /**
   * Load Transfer Detail from Server
   */
  async loadData() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.transferIdDetails(this.transfer_id).subscribe(response => {
      this.transfer = response;

      this._updateTransferStatus();

      this.listTransferCandidates();

      this.receipts = [];
      this.invoices = [];

      response.invoices.forEach((value, index) => {
        if (value.invoice_status == 'paid') {
          this.receipts.push(value);
        } else {
          this.invoices.push(value);
        }
      });

      loader.dismiss();
    });
  }

  /**
   * load transfer candidate
   */
  listTransferCandidates() {

    this.loadingCandidates = true; 

    this.candidatePage = 1; 

    this.transferCandidateService.listTransferCandidates(this.transfer_id, this.candidatePage).subscribe(response => {

      this.loadingCandidates = false;

      this.transfer.transferCandidates = response.body;

      this.candidatePageCount = response.headers.get('X-Pagination-Page-Count');
      this.candidatePage = response.headers.get('X-Pagination-Current-Page');

    }, () => {
      this.loadingCandidates = false;
    });
  }

  /**
   * load more candidate on scroll to bottom 
   * @param event 
   */
  infiniteTransferCandidates(event) {
    this.loadingCandidates = true; 

    this.candidatePage++; 

    this.transferCandidateService.listTransferCandidates(this.transfer_id, this.candidatePage).subscribe(response => {

      event.target.complete();

      this.loadingCandidates = false;

      this.transfer.transferCandidates = this.transfer.transferCandidates.concat(response.body);
      
    }, () => {
      event.target.complete();
      this.loadingCandidates = false;
    });
  }

  /**
   * Update transfer status and description based on return value from API
   */
  private _updateTransferStatus() {
    switch (this.transfer.transfer_status) {
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
   * Mark as Payment Received and Distribution in Progress for current transfer
   */
  async markReceivedAndDistribute() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.markReceivedDistributing(this.transfer).subscribe(async response => {

      let toast = await this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();

      //update review count 
      this._eventService.updatePayable$.next();

      this.navCtrl.pop();

      loader.dismiss();
    });
  }

  /**
   * Unlock the current Transfer, revert to draft
   */
  async markUnlock() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.markUnlock(this.transfer).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /**
   * Payment Sent. Revert back to locked.
   */
  async revertBackToLock() {
    let alert = await this.alertCtrl.create({
      header: 'Locked Status?',
      message: 'Do you want to revert back status to Locked?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            let loader = await this._loadingCtrl.create();
            loader.present();

            this.transferService.markLocked(this.transfer).subscribe(async response => {
              let result = response;

              let toast = await this.toastCtrl.create({
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
   */
  async exportExcel() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.export(this.transfer).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }

  /**
   * Download Receipt
   * @param invoice 
   */
  async downloadReceipt(invoice: Invoice) {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.downloadReceipt(invoice).subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Download Invoice
   * @param invoice
   */
  async downloadInvoice(invoice: Invoice) {
    let loader = await this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadInvoice(invoice).subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Calculating Total Price for a Candidate
   * based on the company hourly rate
   * @param candidate 
   */
  totalCompanyPaysForCandidateWithBonus(transferCandidate: TransferCandidate) {
    return this.totalCompanyPaysForCandidateWithoutBonus(transferCandidate) + Number(transferCandidate.bonus);
  }


  totalCompanyPaysForCandidateWithoutBonus(transferCandidate: TransferCandidate) {
    return (Number(transferCandidate.company_hourly_rate) * Number(transferCandidate.hours));
  }

  /**
   * Calculating Total Cost for a Candidate
   * based on the candidate hourly rate
   * @param transferCandidate 
   */
  totalPaidToCandidateWithBoth(transferCandidate: TransferCandidate) {
    return this.totalPaidToCandidateWithoutBonus(transferCandidate) + Number(transferCandidate.candidate_bonus);
  }

  totalPaidToCandidateWithoutBonus(transferCandidate: TransferCandidate) {
    return (Number(transferCandidate.candidate_hourly_rate) * Number(transferCandidate.hours));
  }

  /**
   * On Candidate Selected
   * @param model 
   */
  loadCandidateDetail(model: Candidate) {
    this.router.navigate(['candidate-view', model.candidate_id], {
      state: {
        'model': model
      }
    });
  }
}