import { Component, OnInit } from '@angular/core';
//models
import { BankTransaction } from 'src/app/models/bank-transaction';
//services
import { XeroService } from 'src/app/providers/logged-in/xero.service';


@Component({
  selector: 'app-bank-transactions',
  templateUrl: './bank-transactions.page.html',
  styleUrls: ['./bank-transactions.page.scss'],
})
export class BankTransactionsPage implements OnInit {

  public loading: boolean = false; 

  public pageCount = 0;
  public currentPage = 1;

  public bankTransactions: BankTransaction[] = [];

  constructor(public xeroService: XeroService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    this.loading = true; 

    this.xeroService.list(this.currentPage).subscribe(response => {

      this.loading = false;
      
      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.bankTransactions = response.body;
    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more on scroll to bottom
   * @param event 
   */
  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.xeroService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.bankTransactions = this.bankTransactions.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date)
      return new Date(date.replace(/-/g, '/'));
  }
} 
