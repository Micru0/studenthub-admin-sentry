import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CalendarModal,
  CalendarModalOptions,
  CalendarResult,
  CalendarComponentOptions
} from 'ion2-calendar';

// services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
// models
import { Transfer } from 'src/app/models/transfer';
import { EventService } from 'src/app/providers/event.service';
import {ModalController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-suspicious-transfer-list',
  templateUrl: './suspicious-transfer-list.page.html',
  styleUrls: ['./suspicious-transfer-list.page.scss'],
})
export class SuspiciousTransferListPage implements OnInit {

  public transferStatus;
  public companyName = '';
  public startdate;
  public enddate;

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transfers: Transfer[] = [];

  public loading = false;

  public deleting = false;

  public min; // min date
  public max; // max date

  public filters: {
    companyName: string,
    transferStatus: any,
    startDate: string
    endDate: string
  } = {
    companyName: null,
    transferStatus: 0,
    startDate: null,
    endDate: null
  };
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public transferService: TransferService,
    public platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.min = '1930/01/01';

    const d = new Date();
    this.max = (this.platform.is('mobile')) ? d.getFullYear() + '-12-12' : d;
  }

  ngOnInit() { }

  ionViewWillEnter() {

    // Passed from Dashboard to show filtered status results
    const status = this.activatedRoute.snapshot.paramMap.get('transfer_status');

    const state =  window.history.state;

    if (state.status) {
      this.filters.transferStatus = state.status;
    }
    if (status) {
      this.filters.transferStatus = status;
    }

    this.loadData(this.currentPage);

    this.eventService.transferUpdated$.subscribe(() => {
      this.loadData(1);
    });
  }

  /**
   * Load Transfer List
   * @param page
   * @param silent
   */
  async loadData(page: number, silent: boolean  = false) {

    if (!silent) {
      this.loading = true;
    }

    const searchParams = this.urlParams();

    this.transferService.suspiciousList(searchParams, page).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transfers = response.body;

      this.loading = false;

    }, () => {
      this.loading = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const searchParams = this.urlParams();
    this.transferService.list(searchParams, this.currentPage).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

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
   * @param transferID
   */
  transferDetails(transferID: number) {
    this.router.navigate(['suspicious-transfer-view', transferID]);
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    if (this.filters.companyName) {
      urlParams += '&company_name=' + this.filters.companyName;
    }

    if (this.filters.transferStatus) {
      urlParams += '&transfer_status=' + this.filters.transferStatus;
    }

    if (this.filters.startDate) {
      urlParams += '&start_date=' + this.filters.startDate;
    }
    if (this.filters.endDate) {
      urlParams += '&end_date=' + this.filters.endDate;
    }

    return urlParams;
  }

  /**
   * Reset question filter
   */
  resetFilter() {
    this.filters = {
      companyName: null,
      transferStatus: null,
      startDate: null,
      endDate: null
    };

    this.loadData(1); // reload all result
  }


  filterByStatus($event, status) {
    this.filters.transferStatus = status;
    this.loadData(1); // reload all result
  }
  searchByName($event) {
    this.filters.companyName = $event.detail.value;
    this.loadData(1); // reload all result
  }

  /**
   * clear selected date filter
   * @param start
   */
  clearfilter(start = false) {
    if (start){
      this.filters.startDate = null;
    } else  {
      this.filters.endDate = null;
    }
    this.loadData(1); // reload all result
  }


  async selectDate(startDate = true) {
    const options: CalendarModalOptions = {
      title: 'Select Date',
      canBackwardsSelected: true,
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    if (date) {
      if (startDate) {
        this.filters.startDate = event.data.string;
        this.loadData(1); // reload all result
      } else {
        this.filters.endDate = event.data.string;
        this.loadData(1); // reload all result
      }
    }
    console.log(date);
  }
}
