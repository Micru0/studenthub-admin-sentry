import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController,NavParams } from 'ionic-angular';

//Pages
import { TransferViewPage } from '../transfer-view/transfer-view';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

// Models
import { Transfer } from '../../../../models/transfer';

@Component({
  selector: 'page-transfer-list',
  templateUrl: 'transfer-list.html'
})
export class TransferListPage {
  public transferStatus:number = 0;
  public companyName: string = '';
  
  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transfers: Transfer[];

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public transferService: TransferService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { 
    // Passed from Dashboard to show filtered status results
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
    this.transferService.list(this.companyName, this.transferStatus, page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 
      if(this.pageCount == 1)
        this.pages = [];

      this.transfers = response.json();
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * Delete a transfer
   * @param transfer
   */
  delete(transfer: Transfer) {
    let loader = this._loadingCtrl.create();
    loader.present();
    this.transferService.delete(transfer).subscribe(response => {
      this.loadData(1);
      loader.dismiss();
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
   * Load Transfer Detail Page
   * @param transfer_id 
   */
  transferDetails(transfer_id: number) {
    this.navCtrl.push(TransferViewPage, {
      'transfer_id': transfer_id
    });
  }
}
