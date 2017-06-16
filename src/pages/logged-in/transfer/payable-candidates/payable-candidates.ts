import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

//page 
import { TransferPaidPage } from '../transfer-paid/transfer-paid';

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

  ionViewDidLoad() {
    // this.loadData();   
  }

  ionViewWillEnter() {
    this.loadData(this.currentPage);
  }

  loadData(page: number) {

    // Load list of transfer
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

  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }

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

      this.loadData(1);
    });
  }

  export() {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.exportPayableCandidates().subscribe(response => {
      loader.dismiss();
    });
  }

  exportText() {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.downloadTxt().subscribe(response => {
      loader.dismiss();
    });
  }

  markAllPaid(candidates) {
      this.navCtrl.push(TransferPaidPage, {
        'candidates': candidates,
      });
  }

  markComplete(invoice_id: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.markComplete(invoice_id).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
}
