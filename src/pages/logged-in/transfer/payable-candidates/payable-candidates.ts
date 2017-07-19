import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

// Pages
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
  public payableAmount:number = 0.0;
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
      this.totalPayableAmount(this.candidates); // calculate total payable amount
    },
    error => {},
    () => {loader.dismiss();}
    );
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
