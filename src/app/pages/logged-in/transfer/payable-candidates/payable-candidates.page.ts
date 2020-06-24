import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
//models
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-payable-candidates',
  templateUrl: './payable-candidates.page.html',
  styleUrls: ['./payable-candidates.page.scss'],
})
export class PayableCandidatesPage  {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];
  public payableAmount:number = 0.0;
  public candidates: Candidate[] = [];

  constructor(
    public router: Router,
    public transferService: TransferService,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * Load List of Payable Candidates
   * @param page 
   */
  async loadData(page: number) {

    let loader = await this._loadingCtrl.create();
    loader.present();
    
    this.transferService.listPayableCandidates(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 
      if(this.pageCount == 1)
        this.pages = [];

      this.candidates = response.body;
      this.totalPayableAmount(this.candidates); // calculate total payable amount
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * Export Payable Candidates as Excel
   */
  async export() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.exportPayableCandidates().subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Export Payable Candidates as Text
   */
  async exportText() {
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.downloadTxt().subscribe(response => {
      loader.dismiss();
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
   * Page link color for pagination
   * @param page 
   */
  pageLinkColor(page: number) {
    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }

  /**
  * calculating total payable amount.
  * @param candidates
  */
  totalPayableAmount (candidates) {
    this.payableAmount = 0.0;
    if (candidates) {
      candidates.forEach(element => {
        this.payableAmount = this.payableAmount + element.total;
      });
    }
  }
}
