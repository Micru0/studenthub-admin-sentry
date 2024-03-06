import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { StatisticService } from 'src/app/providers/logged-in/statistics.service';
import { EventService } from 'src/app/providers/event.service';
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import {ModalController} from "@ionic/angular";
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public statistics: any;

  public statisticsFinance: any;

  public loading: boolean = false;

  public filters: {
    startDate: string
    endDate: string
  } = {
    startDate: null,
    endDate: null
  };

  public clearingCache: boolean = false; 
  
  constructor(
  	public router: Router,
  	public statisticService: StatisticService,
    private eventService: EventService,
    public authService: AuthService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit(){
    window.analytics.page('Dashboard Page');

    this.loadAllData();

    this.eventService.updatePayable$.subscribe((userEventData) => {
      this.loadData(false);
    });
  }

  /**
   * Load Stats for display
   */
  async loadData(loading = true) {

    this.loading = loading;
    
    const searchParams = this.urlParams();
    this.statisticService.get(searchParams).subscribe(response => {
      this.loading = false;
      this.statistics = response;
      this.eventService.payableCandidate$.next(this.statistics.payable.total);
    },
    () => {
      this.loading = false;
    });
  }

  /**
   * Load Stats for display
   */
  async loadFinancialData(loading = true) {

    this.loading = loading;
    const searchParams = this.urlParams();
    this.statisticService.viewTransfers(searchParams).subscribe(response => {
      this.loading = false;
      this.statisticsFinance = response;
    },
    () => {
      this.loading = false;
    });
  }

  /**
   * Load Transfer List Page for a specific status
   */
  showTransfers(transfer_status:number) {
    this.router.navigate(['transfer-list', transfer_status], {
      state: {
        'status' : transfer_status
      }
    });
  }

  /**
   * Load Candidate Review Page
   */
  loadCandidateReviewPage(){
    this.router.navigate(['candidate-review-list']);
  }

  /**
   * Load Payable Candidate Page
   */
  loadPayableCandidatesPage(){
    this.router.navigate(['payable-candidates']);
  }

  async selectDate(startDate = true) {

    if (startDate && this.filters.startDate) {
      this.filters.startDate = null;
      this.filters.endDate = null;
      return true;
    }

    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Date',
      canBackwardsSelected: true,
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();

    const date = event.data;

    if (date) {
      this.filters.startDate = date.from.string;
      this.filters.endDate = date.to.string;
    }

    this.loadAllData();
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';
    if (this.filters.startDate) {
      urlParams += '&start_date=' + this.filters.startDate;
    }

    if (this.filters.endDate) {
      urlParams += '&end_date=' + this.filters.endDate;
    }

    return urlParams;
  }

  loadAllData() {
    this.loadData();
    this.loadFinancialData();
  }

  onCurrencyChange(event) {
    //this.authService.currency_pref = event;
    this.authService.saveInStorage();

    //reload 
    //this.handleRefresh();
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }

  /**
   * Reset question filter
   */
  resetFilter() {
    this.filters = {
      startDate: null,
      endDate: null,
    };
    this.loadAllData(); // reload all result
  }

  clearCache() {
    this.clearingCache = true;
    this.statisticService.clearCache().subscribe(res => {
      window.location.reload();
      this.clearingCache = false;
    });
  }
}
