import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { AlertController, ModalController } from "@ionic/angular";
import * as ApexCharts from 'apexcharts';
//models
import { MailLog } from 'src/app/models/mail-log';
//services
import {AuthService} from "../../../../providers/auth.service";
import { MailLogService } from 'src/app/providers/logged-in/mail-log.service';


@Component({
  selector: 'app-mail-log-list',
  templateUrl: './mail-log-list.page.html',
  styleUrls: ['./mail-log-list.page.scss'],
})
export class MailLogListPage implements OnInit {

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public exporting = false;

  public loading: boolean = false;

  public mailLogs: MailLog[];
  public query = null;

  
  @ViewChild('reportcanva', { read: ElementRef, static: true }) reportcanva: ElementRef;

  public chartOptions: any;

  categories = [];
  seriesData = [];

  public chart;
  
  constructor(
    public router: Router,
    public mailLogService: MailLogService,
    public authService: AuthService,
    public _modalCtrl: ModalController,
    public _alertCtrl: AlertController
  ) {}

  ngOnInit() {
    window.analytics.page('Mail Log List Page');

    this.loadData(this.currentPage);

    this.loadStats(7);
  }

  loadStats(days) {
    this.mailLogService.stats(days).subscribe(data => {

      for (const row of data) {
        if (row.month) {
          this.categories.push(row.month);
        } else if (row.day) {
          this.categories.push(row.day);
        }
  
        this.seriesData.push(row.total); 
      }

      this.renderChart();
    })
  }

  renderChart() {
    
    this.chartOptions = {
      series: [
        {
          name: "log",
          data: this.seriesData,
        },
      ],
      markers: {
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
      },
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
      stroke: {
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
      },
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

  /**
   * load country list
   * @param page 
   */
  async loadData(page: number) {
   
    this.loading = true;

    this.mailLogService.list(page, this.query).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.mailLogs = response.body;
    }, 
    () => {
      this.loading = false;
    });
  }

  /**
   * load more countries on scroll 
   * @param event 
   */
  async doInfinite(event) {
   
    this.loading = true;

    this.currentPage++;

    this.mailLogService.list(this.currentPage, this.query).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));

      this.mailLogs = this.mailLogs.concat(response.body);

      event.target.complete();
    }, 
    () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['mail-log-view', model.mail_uuid], {
      state: {
        'model': model
      }
    });
  }

  /**
   * search
   * @param $event 
   */
  searchFilter($event) {
    this.query = $event.target.value;
    this.loadData(1);
  }
}
