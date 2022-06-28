import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { StatisticService } from 'src/app/providers/logged-in/statistics.service';
import { EventService } from 'src/app/providers/event.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public statistics: any;

  public loading: boolean = false;
  
  constructor(
  	public router: Router,
  	public statisticService: StatisticService,
    private eventService: EventService,
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
    
    this.statisticService.get().subscribe(response => {
      this.loading = false;
      this.statistics = response;
      this.eventService.payableCandidate$.next(this.statistics.payable.total);
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
}
