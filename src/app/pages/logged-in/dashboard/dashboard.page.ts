import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';
// services
import { StatisticService } from 'src/app/providers/logged-in/statistics.service';
import { EventService } from 'src/app/providers/event.service';
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import {ModalController, Platform} from "@ionic/angular";
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

  public revenueStats: {

    candidate_clv: number,
    total_candidate: number,
    total_company: number,
    recruitment_cost_ratio: any,
    company_stats: {
     total_revenue: number,
     min_revenue: number,
     max_revenue: number,
    },
    candidate_stats: {
     total_revenue: number,
     min_revenue: number,
     max_revenue: number,

    }
  }
  
  @ViewChild('reportcanva', { read: ElementRef, static: false }) reportcanva: ElementRef;

  public chartOptions: any;

  categories = [];
  seriesData = [];

  public chart;
  
  public clearingCache: boolean = false; 
  
  public segment = "general";

  constructor(
  	public router: Router,
    public platform: Platform,
  	public statisticService: StatisticService,
    private eventService: EventService,
    public authService: AuthService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit(){
    window.analytics.page('Dashboard Page');

    this.loadData();

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

  async loadRevenue() {
    this.statisticService.getRevenue().subscribe(res => {
      this.revenueStats = res;
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

    this.loadData();
    //this.loadAllData();
    //this.getInvitationGraphData();
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
    this.loadRevenue();
    this.getInvitationGraphData();
  }

  onFilterSubmit() {
    switch (this.segment) {
      case "general":
        this.loadData();
        break;
      case "financial":
        this.loadFinancialData();
        break;
      case "revenue":
        this.loadRevenue();
        break;
      case "invitation":
        this.getInvitationGraphData();
        break;
    }
  }

  segmentChanged(event) {
    this.segment = event.target.value;
    this.onFilterSubmit();
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
    this.loadData(); 
    //this.loadAllData() reload all result
  }

  /**
   * remove backend cache 
   */
  clearCache() {
    this.clearingCache = true;
    this.statisticService.clearCache().subscribe(res => {
      window.location.reload();
      this.clearingCache = false;
    });
  }

  /**
   * 
   */
  getInvitationGraphData() {

    this.statisticService.getInvitationGraphData().subscribe(data => {

      /*for (const row of data.series) {
        if (row.name == "Total") {
          this.totalInvitation.push(row.month);
        } else if (row.day) {
          this.categories.push(row.day);
        }
  
        //this.seriesData.push(row.total); 
      }*/

      this.categories = data.categories;
      this.seriesData = data.series; 

      this.renderChart();
    })
  }

  renderChart() {
    
    this.chartOptions = {
      series: this.seriesData,
      /*markers: {
        size: 0,
        colors: "#000",
        strokeColors: "#000",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: 4,
          sizeOffset: 3
        }
      },*/
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      /*stroke: {
        colors: ["#000"],
        curve: 'straight',
        width: 2.5,
      },
      fill: {
        colors: ["#000"]
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          horizontal: false,
        }
      },*/
      xaxis: {
        categories: this.categories
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return val;
          }
        },
        x: {
          show: true,
        }
      }
    };

    this.chart = new ApexCharts(this.reportcanva.nativeElement, this.chartOptions);
    this.chart.render();
  } 
}
