import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
// services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { AwsService } from 'src/app/providers/aws.service';
import { EventService } from 'src/app/providers/event.service';
import {AuthService} from '../../../../providers/auth.service';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
// models
import {Transfer} from '../../../../models/transfer';
import { TransferCandidate } from 'src/app/models/transfer-candidate';
// Components
import { PayableCandidatesActionComponent } from './payable-candidates-action';
// Pages
import { CandidatePage } from '../../picker/candidate/candidate.page';


@Component({
  selector: 'app-payable-candidates',
  templateUrl: './payable-candidates.page.html',
  styleUrls: ['./payable-candidates.page.scss'],
})
export class PayableCandidatesPage  {

  public totalUnpaid = 0.0;
  public totalOfMissingBankInfo = 0.0;
  public totalOfIncompleteProfile = 0.0;
  public totalPayable = 0.0;
  public totalOfExpiredCivil = 0.0;

  public transfers: Transfer[] = [];
  public totalPayableCandidate = 0;

  public loading = false;

  public processing = false;

  public candidateTransfers: TransferCandidate[] = [];
  public pageCount = 0;
  public currentPage = 1;

  public filter = {
    searchName : null,
    candidateTransferStatus : "",
  }
 
  constructor(
    public router: Router,
    public aws: AwsService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public eventService: EventService,
    public candidateTransferService: CandidateTransferService,
    public transferService: TransferService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    window.analytics.page('Payable Candidates Page');

    this.loadData();

    this.eventService.updatePayable$.subscribe(() => {
      this.loadData();
    });
  }

  resetFilter() {
    this.filter = {
      searchName : null,
      candidateTransferStatus : null,
    }
  }

  filterByStatus(event, status) {
    this.filter.candidateTransferStatus = status;
    this.loadData();
  }

  searchByName(event) {
    this.filter.searchName = event.target.value;
    this.loadData();
  }

  getUrlParams() {
    let url ;

    if (this.filter.searchName) {
      url += '&searchName=' + this.filter.searchName;
    }

    if (this.filter.candidateTransferStatus) {
      url += '&candidateTransferStatus=' + this.filter.candidateTransferStatus;
    }

    return url;
  }

  handleRefresh(event) {
    this.loadData();
    event.target.complete();
  }

  /**
   * Load List of Payable Candidates
   */
  async loadData() {

    this.loading = true;

    this.candidateTransferService.listPayableCandidates(1, this.getUrlParams()).subscribe(response => {

      this.loading = false;

      this.candidateTransfers = response.body;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalPayableCandidate = parseInt(response.headers.get('X-Pagination-Total-Count'));
      //this.totaltotalUnpaid(this.transfers); // calculate total payable amount

      this.loadStats();
    },
    () => {
      this.loading = false;
    });
  }

  loadStats() {
    this.candidateTransferService.payableCandidateStats(this.getUrlParams()).subscribe(response => {
      this.totalUnpaid = response.totalUnpaid;
      this.totalPayable = response.totalPayable;
      this.totalOfMissingBankInfo = response.totalOfMissingBankInfo;
      this.totalOfExpiredCivil = response.totalOfExpiredCivil;
      this.totalOfIncompleteProfile = response.totalOfIncompleteProfile;
    });
  }

  async doInfinite(event) {

    if (this.currentPage >= this.pageCount) {
      event.target.complete();
      return;
    }

    this.loading = true;

    this.currentPage++;

    this.candidateTransferService.listPayableCandidates(this.currentPage, this.getUrlParams()).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalPayableCandidate = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.candidateTransfers = this.candidateTransfers.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  async openActionSheet(event) {
    event.preventDefault();
    event.stopPropagation();

    /*window.history.pushState({
      navigationId: window.history.state.navigationId
    }, null, window.location.pathname);*/

    const popover = await this.popoverCtrl.create({
      component: PayableCandidatesActionComponent,
      animated: true,
      event,
      translucent: true
    });
    /*popover.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });*/
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data && data.action == 'mark-all-paid' && this.transfers && this.transfers.length > 0) {
      this.markAllPaid();
    } else {
      this.getOffsetLimit(data);
    }
  }

  async getOffsetLimit(data) {

    const confirm = await this.alertCtrl.create({
      header: 'Pagination, Ignore to download all',
      
      inputs: [
        {
          name: 'offset',
          type: 'number',
          placeholder: 'Dataset offset'
        },
        {
          name: 'limit',
          type: 'number',
          placeholder: 'Dataset record limit'
        },
      ],
      buttons: [
        {
          text: 'Submit',
          handler: (formData) => {
            
            if (data && data.action == 'export') {
              this.export(formData.offset.trim(), formData.limit.trim());
            } else if (data && data.action == 'export-text') {
              this.exportText(formData.offset.trim(), formData.limit.trim());
            } else if (data && data.action == 'download-advice') {
              this.downloadAdvice(formData.offset.trim(), formData.limit.trim());
            } else if (data && data.action == 'export-transfer') {
              this.export(true, formData.offset.trim(), formData.limit.trim());
            } else if (data && data.action == 'export-abk-transfer') {
              this.downloadAdviceForABK(true, formData.offset.trim(), formData.limit.trim());
            } else if (data && data.action == 'export-abk-payment-advice') {
              this.downloadTextAdviceForABK(formData.offset.trim(), formData.limit.trim());
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }

  downloadTextAdviceForABK(offset = null, limit = null) {
    this.processing = true;

    this.transferService.downloadTextAdviceForABK(offset, limit).subscribe(() => {
      this.processing = false;
    });
  }

  async downloadAdviceForABK(onlyPayable: boolean = false, offset = null, limit = null) {

    this.processing = true;

    this.transferService.downloadAdviceForABK(onlyPayable, offset, limit).subscribe(() => {
      this.processing = false;
    });
  }

  /**
   * Export Payable Candidates as Excel
   */
  async export(onlyPayable: boolean = false, offset = null, limit = null) {

    this.processing = true;

    this.transferService.exportPayableCandidates(onlyPayable, offset, limit).subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Export Payment Advice File
   */
  async downloadAdvice(offset = null, limit = null) {
    this.processing = true;

    this.transferService.downloadAdvice(offset, limit).subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Export Payable Candidates as Text
   */
  async exportText(offset = null, limit = null) {
    this.processing = true;

    this.transferService.downloadTxt(offset, limit).subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Mark all supplied candidates as paid
   * @param candidates
   */
  markAllPaid() {
    this.router.navigate(['import-transfer-form']);
  }

  /**
   * Load Transfer Detail Page
   * @param transfer_id
   */
  transferDetails(transfer_id: number) {
    this.router.navigate(['transfer-view', transfer_id]);
  }

  /**
   * When candidate row is selected, load detail page
   * @param model
   */
  candidateSelected(model) {
    this.router.navigate(['candidate-view', model.candidate_id], {
      state: {
        model: model
      }
    });
  }

  /**
  * calculating total payable amount.
  * @param candidates
  */
  totaltotalUnpaid(transfers) {

    this.totalUnpaid = 0.0;
    this.totalPayable = 0.0;
    this.totalOfMissingBankInfo = 0.0;
    this.totalOfIncompleteProfile = 0.0;

    if (!transfers) {
      return null;
    }

    transfers.forEach(transfer => {

      this.totalUnpaid = this.totalUnpaid + transfer.remainingPaymentTransferTotal;

      transfer.unPaidTransferCandidates.forEach(transferCandidate => {
        this.totalPayableCandidate ++;
        if (!transferCandidate.candidate || !transferCandidate.candidate.bank_id || !transferCandidate.transfer_benef_iban || !transferCandidate.transfer_benef_name) {
          this.totalOfMissingBankInfo += transferCandidate.candidate_total; // missing bank info
        } else if (!transferCandidate.candidate.isProfileCompleted) {
          this.totalOfIncompleteProfile += transferCandidate.candidate_total;
        } else {
          this.totalPayable += transferCandidate.candidate_total;
        }
      });
    });
  }

  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    candidate.candidate_personal_photo = null;
  }

  async replace(event, tc) {
    event.preventDefault();
    event.stopPropagation();

    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: CandidatePage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
      if (e.data) {
        this.candidateTransferService.replace(tc.tc_id, e.data.candidate_id).subscribe(async res => {
          if (res.operation == "success") {
            tc.candidate = res.candidate; 
            tc.candidate_id = res.candidate.candidate_id;
            tc.transfer_benef_name = res.transfer.transfer_benef_name;
            tc.transfer_benef_iban = res.transfer.transfer_benef_iban;
            tc.bank_id = res.transfer.bank_id;
          } else {
            const prompt = await this.alertCtrl.create({
              message: this.authService.errorMessage(res.message),
              buttons: ['Ok']
            });
            prompt.present();
          }
        });
      }
    });
    modal.present();
  }
}
