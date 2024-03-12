import { Component, OnInit } from '@angular/core';
//services
import { StatisticService } from 'src/app/providers/logged-in/statistics.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  public totalTransferCandidate; 
  public totalPaymentAmountReceived;
  public totalBelongingToCandidates;
  public totalProfit;

  public loading: boolean = false;

  //public range = 'this-week';

  constructor(
    public statisticService: StatisticService
  ) { }

  ngOnInit() {
    window.analytics.page('Statistics Page');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.statisticService.viewTransfers().subscribe(data => {
      
      this.loading = false;

      this.totalTransferCandidate = data.totalTransferCandidate;
      this.totalPaymentAmountReceived = data.totalPaymentAmountReceived;
      this.totalBelongingToCandidates = data.totalBelongingToCandidates;
      this.totalProfit = data.totalProfit;
    });
  }
}
