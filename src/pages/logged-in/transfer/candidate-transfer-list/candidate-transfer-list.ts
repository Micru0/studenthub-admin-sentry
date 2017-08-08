import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,NavParams } from 'ionic-angular';

//Pages
import { TransferViewPage } from '../transfer-view/transfer-view';

// Providers
import { CandidateTransferService } from '../../../../providers/logged-in/candidate.transfer.service';

// Models
import { TransferCandidate } from '../../../../models/transfer-candidate';

@Component({
  selector: 'page-candidate-transfer-list',
  templateUrl: 'candidate-transfer-list.html'
})
export class CandidateTransferListPage {
  public transferStatus:number = 0;
  public transferID: number = 0;
  public candidate_id: number = 0;
  
  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transfersCandidate: TransferCandidate[];

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public _candidateTransferService: CandidateTransferService,
    private _loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { 
    // Passed from Dashboard to show filtered status results
    if (params.get('candidate_transfer_id')) {
      this.transferID = params.get('candidate_transfer_id');
    }
    
    if (params.get('status')) {
      this.transferStatus = params.get('status');
    }
  }

  ionViewWillEnter() {
    this.loadData(this.currentPage);  
  }

  /**
   * Load Transfer List
   * @param page 
   */
  loadData(page: number) {
    let loader = this._loadingCtrl.create();
    loader.present();

    //subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    this._candidateTransferService.list(this.transferID, this.transferStatus,this.candidate_id, page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 
      if(this.pageCount == 1)
        this.pages = [];

      this.transfersCandidate = response.json();
    },
    error => {},
    () => {loader.dismiss();}
    );
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
   * Load Transfer Detail Page
   * @param transfer_id 
   */
  transferDetails(transfer_id: number) {
    this.navCtrl.push(TransferViewPage, {
      'transfer_id': transfer_id
    });
  }
}
