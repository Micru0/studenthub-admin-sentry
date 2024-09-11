import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//models
import { TransferFile } from 'src/app/models/transfer-file';
import { Candidate } from 'src/app/models/candidate';
import { TransferCandidate } from 'src/app/models/transfer-candidate';
//services
import { TransferFileService } from 'src/app/providers/logged-in/transfer.file.service';
import { AwsService } from 'src/app/providers/aws.service';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';


@Component({
  selector: 'app-transfer-file-detail',
  templateUrl: './transfer-file-detail.page.html',
  styleUrls: ['./transfer-file-detail.page.scss'],
})
export class TransferFileDetailPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transferFile: TransferFile;

  public transferCandidates: TransferCandidate[] = [];

  public transfer_file_id;

  public loading: boolean = false; 
  
  public loadingCandidates: boolean = false; 

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public aws: AwsService,
    public candidateTransferService: CandidateTransferService,
    public transferFileService: TransferFileService
  ) { }

  ngOnInit() {
    window.analytics.page('Transfer File Detail Page');

    // Load the passed model if available
    if(window['state']) {
      this.transferFile = window['state']['model'];
    }

    this.transfer_file_id = this.activateRoute.snapshot.paramMap.get('transfer_file_id');
  
    if(!this.transferFile)
      this.loadData();

    this.loadCandidates(1);
  }

  /**
   * load transfer detail 
   */
  loadData() {
    this.loading = true; 

    this.transferFileService.view(this.transfer_file_id).subscribe(data => {

      this.transferFile = data; 

      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

  /**
   * Load list of candidates
   * @param page 
   */
  async loadCandidates(page: number) {
    
    this.loadingCandidates = true;

    this.candidateTransferService.listByTransferFile(this.transfer_file_id, page).subscribe(response => {

      this.loadingCandidates = false; 

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferCandidates = response.body;
    },() => { 
      this.loadingCandidates = false; 
    });
  }
  
  /**
   * load more candidates on scroll to bottom
   * @param event 
   */
  async doInfinite(event) {
    
    this.loadingCandidates = true;

    this.currentPage++; 

    this.candidateTransferService.listByTransferFile(this.transfer_file_id, this.currentPage).subscribe(response => {

      this.loadingCandidates = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferCandidates = this.transferCandidates.concat(response.body);

      event.target.complete(); 

    },() => { 
      this.loadingCandidates = false; 
    });
  }

  /**
   * On Candidate Selected
   * @param model 
   */
  loadDetail(model) {
    this.router.navigate(['candidate-transfer-detail', model.tc_id], {
      state: {
        'transferCandidate': model
      }
    });
  }

  /**
   * Calculating Total Price for a Candidate
   * based on the company hourly rate
   * @param candidate 
   */
  totalCompanyPaysForCandidateWithBonus(transferCandidate: TransferCandidate) {
    return transferCandidate.company_total;
    //this.totalCompanyPaysForCandidateWithoutBonus(transferCandidate) + Number(transferCandidate.bonus);
  }

  totalCompanyPaysForCandidateWithoutBonus(transferCandidate: TransferCandidate) {
    return transferCandidate.company_total - transferCandidate.bonus;
    
    //(Number(transferCandidate.company_hourly_rate) * Number(transferCandidate.hours));
  }

  /**
   * Calculating Total Cost for a Candidate
   * based on the candidate hourly rate
   * @param transferCandidate 
   */
  totalPaidToCandidateWithBoth(transferCandidate: TransferCandidate) {
    return transferCandidate.candidate_total;
    //this.totalPaidToCandidateWithoutBonus(transferCandidate) + Number(transferCandidate.candidate_bonus);
  }

  totalPaidToCandidateWithoutBonus(transferCandidate: TransferCandidate) {
    return transferCandidate.candidate_total - (transferCandidate.bonus - transferCandidate.bonus_commission)
    //(Number(transferCandidate.candidate_hourly_rate) * Number(transferCandidate.hours));
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date)
      return new Date(date.replace(/-/g, '/'));
  }
  
  /**
   * @param $event
   * @param candidate
   */
  onImageError(candidate) {
    candidate.candidate_personal_photo = null;
  }

  /**
   * click me to do nothing
   * @param event 
   */
  doNothing(event) {
    //event.preventDefault();
    event.stopPropagation();
  }
}
