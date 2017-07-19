import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

// Pages
import { CandidateViewPage } from '../candidate-view/candidate-view';

// Providers
import { CandidateService } from '../../../../providers/logged-in/candidate.service';

// Models
import { Candidate } from '../../../../models/candidate';

@Component({
  selector: 'page-candidate-review-list',
  templateUrl: 'candidate-review-list.html'
})
export class CandidateReviewListPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public candidates: Candidate[];

  constructor(
    public navCtrl: NavController,
    public candidateService: CandidateService,
    private _loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.loadData(this.currentPage);
  }

  /**
   * Load Candidate List
   * @param page 
   */
  loadData(page: number){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.candidateService.listToReview(page).subscribe(response => {
      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];
      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 
      if(this.pageCount == 1)
        this.pages = [];

      this.candidates = response.json();
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * When a candidate is selected
   * @param model 
   */
  rowSelected(model){
    this.navCtrl.push(CandidateViewPage, {
      'model': model
    });
  }

  /**
   * pagination color
   * @param page 
   */
  pageLinkColor(page: number) {
    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }

}
