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
    private _eventService: EventService,
  ) {}

  ngOnInit(){
    this.loadData();

    this._eventService.updatePayable$.subscribe((userEventData) => {
      this.statisticService.get().subscribe(response => {
        this.statistics = response;
        },
        error => {},
        () => {}
      );
    });
  }

  /**
   * Load Stats for display
   */
  async loadData() {
    
    this.loading = true;
    
    this.statisticService.get().subscribe(response => {
      this.loading = false;
      
      this.statistics = response;
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
