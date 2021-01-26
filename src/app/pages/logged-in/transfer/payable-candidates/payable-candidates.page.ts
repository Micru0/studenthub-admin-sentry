import { Component } from '@angular/core';
import { Router } from '@angular/router';
// services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { AwsService } from 'src/app/providers/aws.service';
import { EventService } from 'src/app/providers/event.service';
// models
import {AuthService} from '../../../../providers/auth.service';
import {Transfer} from '../../../../models/transfer';


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

  public loading = false;

  public processing = false;

  constructor(
    public router: Router,
    public aws: AwsService,
    public eventService: EventService,
    public transferService: TransferService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
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
        if (!transferCandidate.bank_id || !transferCandidate.transfer_benef_iban || !transferCandidate.transfer_benef_name) {
          this.payableMissingAmount += transferCandidate.total_amount;
        } else {
          this.payableAvailAmount += transferCandidate.total_amount;
        }

        if (!transferCandidate.candidate.isProfileCompleted) {
          this.payableIncompleteProfile += transferCandidate.total_amount;
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
