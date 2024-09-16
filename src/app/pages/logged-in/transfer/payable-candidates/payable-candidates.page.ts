import { Component } from '@angular/core';
import { Router } from '@angular/router';
// services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { AwsService } from 'src/app/providers/aws.service';
import { EventService } from 'src/app/providers/event.service';
import {AuthService} from '../../../../providers/auth.service';
// models
import {Transfer} from '../../../../models/transfer';
import { PopoverController } from '@ionic/angular';
import { PayableCandidatesActionComponent } from './payable-candidates-action';


@Component({
  selector: 'app-payable-candidates',
  templateUrl: './payable-candidates.page.html',
  styleUrls: ['./payable-candidates.page.scss'],
})
export class PayableCandidatesPage  {

  public payableAmount = 0.0;
  public payableMissingAmount = 0.0;
  public payableIncompleteProfile = 0.0;
  public payableAvailAmount = 0.0;

  public candidates: Transfer[] = [];
  public totalPayableCandidate = 0;

  public loading = false;

  public processing = false;

  constructor(
    public router: Router,
    public aws: AwsService,
    public popoverCtrl: PopoverController,
    public eventService: EventService,
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

  /**
   * Load List of Payable Candidates
   */
  async loadData() {

    this.loading = true;

    this.transferService.listPayableCandidates().subscribe(response => {

      this.loading = false;

      this.candidates = response.body;
      this.totalPayableAmount(this.candidates); // calculate total payable amount
    },
    () => {
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

    if (data && data.action == 'mark-all-paid' && this.candidates && this.candidates.length > 0) {
      this.markAllPaid();
    } else if (data && data.action == 'export') {
      this.export();
    } else if (data && data.action == 'export-text') {
      this.exportText();
    } else if (data && data.action == 'download-advice') {
      this.downloadAdvice();
    } else if (data && data.action == 'export-transfer') {
      this.export(true);
    } else if (data && data.action == 'export-abk-transfer') {
      this.downloadAdviceForABK(true);
    } else if (data && data.action == 'export-abk-payment-advice') {
      this.downloadTextAdviceForABK();
    }
  }

  downloadTextAdviceForABK() {
    this.processing = true;

    this.transferService.downloadTextAdviceForABK().subscribe(() => {
      this.processing = false;
    });
  }

  async downloadAdviceForABK(onlyPayable: boolean = false) {

    this.processing = true;

    this.transferService.downloadAdviceForABK(onlyPayable).subscribe(() => {
      this.processing = false;
    });
  }

  /**
   * Export Payable Candidates as Excel
   */
  async export(onlyPayable: boolean = false) {

    this.processing = true;

    this.transferService.exportPayableCandidates(onlyPayable).subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Export Payment Advice File
   */
  async downloadAdvice() {
    this.processing = true;

    this.transferService.downloadAdvice().subscribe(response => {
      this.processing = false;
    });
  }

  /**
   * Export Payable Candidates as Text
   */
  async exportText() {
    this.processing = true;

    this.transferService.downloadTxt().subscribe(response => {
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
  totalPayableAmount(transfers) {

    this.payableAmount = 0.0;
    this.payableAvailAmount = 0.0;
    this.payableMissingAmount = 0.0;
    this.payableIncompleteProfile = 0.0;

    if (!transfers) {
      return null;
    }

    transfers.forEach(transfer => {

      this.payableAmount = this.payableAmount + transfer.remainingPaymentTransferTotal;

      transfer.unPaidTransferCandidates.forEach(transferCandidate => {
        this.totalPayableCandidate ++;
        if (!transferCandidate.candidate || !transferCandidate.candidate.bank_id || !transferCandidate.transfer_benef_iban || !transferCandidate.transfer_benef_name) {
          this.payableMissingAmount += transferCandidate.candidate_total; // missing bank info
        } else if (!transferCandidate.candidate.isProfileCompleted) {
          this.payableIncompleteProfile += transferCandidate.candidate_total;
        } else {
          this.payableAvailAmount += transferCandidate.candidate_total;
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
}
