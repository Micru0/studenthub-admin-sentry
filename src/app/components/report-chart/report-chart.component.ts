import {Component, ElementRef, Input, ViewChild, OnInit, OnChanges, AfterViewInit} from '@angular/core';
import * as ApexCharts from 'apexcharts';
// services
import { TranslateLabelService } from 'src/app/providers/translate-label.service';


declare var document: any;

@Component({
  selector: 'report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss'],
})
export class ReportChartComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('reportcanva', { read: ElementRef, static: true }) reportcanva: ElementRef;

  public chart;

  categories = [];
  categoriesReverse = [];
  seriesData = [];
  seriesDataReverse = [];

  @Input() set chartdata(value) {

    // this.chart = undefined;
    this.categories = [];

    this.categoriesReverse = [];
    
    this.seriesData = [];
    
    this.seriesDataReverse = [];

    for (const row of value) {
      if (row.month) {

        this.categories.push(row.month);
        this.categoriesReverse.push(row.month);
        // this.categoriesReverse.push(this.translateService.transform(row.month));
      } else if (row.day) {
        this.categories.push(row.day);
        this.categoriesReverse.push(row.day);
      } else if (row.item_name || row.item_name_ar) {
        this.categories.push(this.translateService.langContent(row.item_name, row.item_name_ar));
        this.categoriesReverse.push(this.translateService.langContent(row.item_name, row.item_name_ar));
      }

      this.seriesData.push(row.total);
      this.seriesDataReverse.push(row.total);
    }

    this.seriesDataReverse.reverse();
    this.categoriesReverse.reverse();

    if (this.chart) {
      // this.setData(this.seriesData, this.categories);
      if (this.translateService.currentLang == 'en') {
        this.setData(this.seriesData, this.categories);
      } else  {
        this.setData(this.seriesDataReverse, this.categoriesReverse);
      }
    }
  }

  //@Input() labels: Array<string> = [];

  @Input() id: string = '';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() type: string;
  @Input() color: string;
  @Input() currency_code: string;

  public chartOptions: any;

  constructor(
    public translateService: TranslateLabelService,
  ) { }

  ngAfterViewInit() {

  }
  ngOnChanges(){

  }
  
  ngOnInit(){
    let tooltip;

    if (this.currency_code) {
      tooltip = {
        y: {
          formatter: (val) => {
            return val + ' ' + this.currency_code;
          }
        },
        x: {
          show: false,
        }
      };
    } else {
      tooltip = {
        y: {
          formatter: (val) => {
            return val;
          }
        },
        x: {
          show: this.type == 'line'? false: true,
        }
      }
    }
    this.chartOptions = {
      series: [
        {
          name: this.translateService.transform(this.title),
          data: (this.translateService.currentLang == 'en') ? this.seriesData : this.seriesDataReverse,
        },
      ],
      markers: {
        size: 0,
        colors: this.color,
        strokeColors: this.color,
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
        type: this.type,
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
        colors: [this.color],
        curve: 'straight',
        width: (this.type == 'line') ? 2.5 : 2,
      },
      fill: {
        colors: [this.color]
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          horizontal: (this.type == 'line') ? false : true,
        }
      },
      xaxis: {
        categories: (this.translateService.currentLang == 'en') ? this.categories : this.categoriesReverse
      },
      tooltip: tooltip
    };

    if(this.title) {

      this.chartOptions.title = {
        text: this.translateService.transform(this.title),
        align: this.translateService.currentLang == 'en'? 'left': 'right',
        offsetX: this.translateService.currentLang == 'en' ? 10 : -155,
      };

      // this.chartOptions.xaxis: {
      //   categories: ["كانون الثاني", "شهر فبراير", "مارس", "مارس", "قد", "يونيو"]
      // },
      this.chartOptions.yaxis = {
        opposite: (this.translateService.currentLang == 'ar')
      };

      // this.chartOptions.xaxis = {
      //   opposite: (this.translateService.currentLang == 'ar')
      // };

      if(this.id == 'voucher')
        this.chartOptions.title.style = {
          margin: '0 auto 10px 0',
          fontFamily: 'NunitoSans',
          fontSize: '22px',
          fontWeight: '600',
          color: '#333333',
        };
    }

    if(this.subtitle) {
      this.chartOptions.subtitle = {
        text: this.subtitle,
        align: 'left'// this.translateService.currentLang == 'en'? 'left': 'right'
      };
    }

    this.chart = new ApexCharts(this.reportcanva.nativeElement, this.chartOptions);
    this.chart.render();
  }

  /**
    * update chart data
    * @param data
    * @param categories
    */
  setData(data, categories) {
    this.chart.opts.series[0].data = data;
    this.chart.opts.xaxis.categories = categories;
    this.chart.destroy();
    this.ngOnInit();

    // this.chart.ngOnChanges({} as SimpleChanges);
  }
}
