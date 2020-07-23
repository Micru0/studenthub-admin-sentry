import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  public transfers: Transfer[] = [];

  public loading: boolean = false;

  public deleting: boolean = false;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public transferService: TransferService
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
  async loadData(page: number, silent: boolean  = false) {

    if(!silent)
      this.loading = true;

    this.transferService.list(this.companyName, this.transferStatus, page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.transfers = response.body;

      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++; 
    
    this.transferService.list(this.companyName, this.transferStatus, this.currentPage).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.transfers = this.transfers.concat(response.body);

      event.target.complete();

      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * Delete a transfer
   * @param transfer
   */
  async delete(transfer: Transfer) {
    
    this.deleting = true;

    this.transferService.delete(transfer).subscribe(response => {
      this.loadData(1, true);
      
      this.deleting = false;
    });
  }

  /**
   * Load Transfer Detail Page
   * @param transfer_id 
   */
  transferDetails(transfer_id: number) {
    this.router.navigate(['transfer-view', transfer_id]);
  }
}
