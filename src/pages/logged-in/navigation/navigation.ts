import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Events } from 'ionic-angular';

// Page Imports
import { DefaultPage } from '../default/default';
import { CompanyListPage } from '../company/company-list/company-list';
import { StaffListPage } from '../staff/staff-list/staff-list';
import { BankListPage } from '../bank/bank-list/bank-list';
import { UniversityListPage } from '../university/university-list/university-list';
import { TransferListPage } from '../transfer/transfer-list/transfer-list';
import { PayableCandidatesPage } from '../transfer/payable-candidates/payable-candidates';
import { CandidateReviewListPage } from '../candidate/candidate-review-list/candidate-review-list';
import { CountryListPage } from '../country/country-list/country-list';

// Services
import { AuthService } from '../../../providers/auth.service';
import { CandidateService } from '../../../providers/logged-in/candidate.service';

@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})
export class NavigationPage {

  public totalCandidateToReview: number = 0;
  public totalPayableCandidate: number = 0;

  rootPage: any = DefaultPage;

  @ViewChild('loggedInContent') nav: NavController

  constructor(
    private _auth: AuthService,
    private _menuCtrl: MenuController,
    private _events: Events,
    public candidateService: CandidateService
  ){
    this.totalToReview();
  }

  loadPage(pageName: string){
    switch(pageName){
      case "summary":
        this.rootPage = DefaultPage;
        break;
      case "candidate-review":
        this.rootPage = CandidateReviewListPage;
        break;
      case "transfers":
        this.rootPage = TransferListPage;
        break;
      case "payable-candidates":
        this.rootPage = PayableCandidatesPage;
        break;
      case "companies":
        this.rootPage = CompanyListPage;
        break;
      case "staff":
        this.rootPage = StaffListPage;
        break;
      case "bank":
        this.rootPage = BankListPage;
        break;
      case "university":
        this.rootPage = UniversityListPage;
        break;
      case "country":
        this.rootPage = CountryListPage;
        break;  
    }

    this._menuCtrl.close();
  }

  /**
   * Using Ng2 Lifecycle hooks because view lifecycle events don't trigger for Bootstrapped MyApp Component
   */
  ngOnInit(){
      // Check for network connection
      this._events.subscribe('navigation:totalCandidateToReview', (userEventData) => {
        console.log('total Review remains checking...');
        this.totalToReview();
      });
    
      this._events.subscribe('navigation:updatePayable', (ramainPayableCandidate) => {
        this.totalPayableCandidate = ramainPayableCandidate;
        console.log('remain payable candidate:'+ramainPayableCandidate)
      });
  }

  totalToReview() {
    this.candidateService.totalToReview().subscribe(result => {
      console.log('total Review remains:'+result.total);
      this.totalCandidateToReview = result.total;
      this.totalPayableCandidate = result.payable;
    });
  }

  /**
   * Log Agent out of the app
   */
  logout(){
    this._auth.logout();
  }
}
