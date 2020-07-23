import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { AwsService } from 'src/app/providers/aws.service';
//models
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-payable-candidates',
  templateUrl: './payable-candidates.page.html',
  styleUrls: ['./payable-candidates.page.scss'],
})
export class PayableCandidatesPage  {

  public payableAmount: number = 0.0;
  public candidates: Candidate[] = [];

  public loading : boolean = false; 

  public processing: boolean = false; 

  constructor(
    public router: Router,
    public aws: AwsService,
    public transferService: TransferService, 
  ) { }

  ngOnInit() {
    this.loadData();
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
  async export() {
    
    this.processing = true;

    this.transferService.exportPayableCandidates().subscribe(response => {
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
  markAllPaid(candidates) {
    this.router.navigate(['transfer-paid'], {
      state: {
        'candidatelistData': candidates,
      }
    });
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
        'model': model
      }
    });
  }

  /**
  * calculating total payable amount.
  * @param candidates
  */
  totalPayableAmount (candidates) {
    this.payableAmount = 0.0;
    if (candidates) {
      candidates.forEach(element => {
        this.payableAmount = this.payableAmount + element.remainingPaymentTransferTotal;
      });
    }
  }

  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    return candidate.candidate_personal_photo_thumb = null;
  }
}
