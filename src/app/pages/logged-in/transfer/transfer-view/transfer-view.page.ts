import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { EventService } from 'src/app/providers/event.service';
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
import { AwsService } from 'src/app/providers/aws.service';
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

  public loading: boolean = false;

  public loadingInvoice: boolean = false;

  public transfer: Transfer;
  public transfer_id: number;
  public invoices: Invoice[] = []; //unpaid invoices 
  public receipts: Invoice[] = []; //paid invoices 

  public transferCandidates = [];
  
  public transferStatus = "";
  public transferStatusDescription = "";

  public loadingCandidates = false;

  public processing: boolean = false;

  public candidatePageCount: number;
  public candidatePage: number;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public aws: AwsService,
    public transferService: TransferService,
    public transferCandidateService: CandidateTransferService,
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

    this.listTransferCandidates();

    this.listInvoices();
  }

  /**
   * Load Transfer Detail from Server
   */
  async loadData() {

    this.loading = true;

    this.transferService.transferIdDetails(this.transfer_id).subscribe(response => {
      this.transfer = response;

      this._updateTransferStatus();

      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * load transfer invoices
   */
  listInvoices() {
    this.loadingInvoice = true; 

    this.transferService.listInvoices(this.transfer_id).subscribe(data => {

      this.loadingInvoice = false; 

      this.receipts = [];
      this.invoices = [];

      data.forEach((value, index) => {
        if (value.invoice_status == 'paid') {
          this.receipts.push(value);
        } else {
          this.invoices.push(value);
        }
      });

    }, () => {

      this.loadingInvoice = false; 
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

      this.transferCandidates = response.body;

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

      this.transferCandidates = this.transferCandidates.concat(response.body);
      
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
    
    this.processing = true;

    this.transferService.markReceivedDistributing(this.transfer).subscribe(async response => {

      let toast = await this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();

      //update review count 
      this._eventService.updatePayable$.next();

      this.navCtrl.pop();

      this.processing = false;
    });
  }

  /**
   * Unlock the current Transfer, revert to draft
   */
  async markUnlock() {
    this.processing = true;

    this.transferService.markUnlock(this.transfer).subscribe(response => {
      
      this.navCtrl.pop();
      
      this.processing = false;
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
            
            this.processing = true;

            this.transferService.markLocked(this.transfer).subscribe(async response => {
              let result = response;

              let toast = await this.toastCtrl.create({
                message: result.message,
                duration: 3000
              });
              toast.present();

              this.navCtrl.pop();

              this.processing = false;
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
    
    this.processing = true;

    this.transferService.export(this.transfer).subscribe(response => {
      this.navCtrl.pop();
      this.processing = false;
    });
  }

  /**
   * Download Receipt
   * @param invoice 
   */
  async downloadReceipt(invoice: Invoice) {

    this.processing = true;

    this.transferService.downloadReceipt(invoice).subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Download Invoice
   * @param invoice
   */
  async downloadInvoice(invoice: Invoice) {

    this.processing = true;

    this.transferService.downloadInvoice(invoice).subscribe(response => {
      this.processing = false;
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