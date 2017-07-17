import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

//page 
import { TransferPaidPage } from '../transfer-paid/transfer-paid';
import { TransferViewPage } from '../transfer-view/transfer-view';
import { CandidateViewPage } from '../../candidate/candidate-view/candidate-view';

@Component({
  selector: 'page-payable-candidates',
  templateUrl: 'payable-candidates.html'
})
export class PayableCandidatesPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public candidates: any[];

  constructor(
    public navCtrl: NavController,
    public transferService: TransferService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.loadPayableCandidatesList(this.currentPage);
  }

  /**
   * Load List of Payable Candidates
   * @param page 
   */
  loadPayableCandidatesList(page: number) {
    let loader = this._loadingCtrl.create();
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

      this.candidates = response.json();
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * Mark Candidate as Paid
   * @param transfer_id 
   * @param candidate_id 
   */
  markPaid(transfer_id: number, candidate_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();

    let candidate_ids = [];
    candidate_ids.push(candidate_id);

    this.transferService.markPaid(transfer_id, candidate_ids).subscribe(response => {

      let prompt = this._alertCtrl.create({
          message: 'Candidate marked as paid!',
          buttons: ["Ok"]
        });
      prompt.present();

      loader.dismiss();

      this.loadPayableCandidatesList(1);
    });
  }

  /**
   * Export Payable Candidates as Excel
   */
  export() {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.exportPayableCandidates().subscribe(response => {
      loader.dismiss();
    });
  }

  /**
   * Export Payable Candidates as Text
   */
  exportText() {
    let loader = this._loadingCtrl.create();
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
    this.navCtrl.push(TransferPaidPage, {
      'candidates': candidates,
    });
  }
  /**
   * Load Transfer Detail Page
   * @param transfer_id 
   */
  transferDetails(transfer_id: number) {
    this.navCtrl.push(TransferViewPage, {
      'transfer_id': transfer_id
    });
  }

  /**
   * When candidate row is selected, load detail page
   * @param model 
   */
  candidateSelected(model) {
    this.navCtrl.push(CandidateViewPage, {
      'model': model
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
}
