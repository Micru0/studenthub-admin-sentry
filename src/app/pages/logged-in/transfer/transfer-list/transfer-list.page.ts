import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
//models
import { Transfer } from 'src/app/models/transfer';


@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.page.html',
  styleUrls: ['./transfer-list.page.scss'],
})
export class TransferListPage implements OnInit {

  public transferStatus;
  public companyName: string = '';
  
  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transfers: Transfer;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public transferService: TransferService,
    private _loadingCtrl: LoadingController
  ) { 
  }

  ngOnInit() {

    // Passed from Dashboard to show filtered status results
    const status = this.activatedRoute.snapshot.paramMap.get('transfer_status');
    
    if(status) {
      this.transferStatus = status;
    } 
    
    this.loadData(this.currentPage);  
  }

  /**
   * Load Transfer List
   * @param page 
   */
  async loadData(page: number) {

    let loader = await this._loadingCtrl.create();
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

      this.transfers = response.body;
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * Delete a transfer
   * @param transfer
   */
  async delete(transfer: Transfer) {
    let loader = await this._loadingCtrl.create();
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
    this.router.navigate(['transfer-view', transfer_id]);
  }
}
