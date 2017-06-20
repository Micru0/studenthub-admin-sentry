import { Component } from '@angular/core';
import { Events, NavController, LoadingController, ModalController, ToastController } from 'ionic-angular';

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
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _events: Events,
    public toastCtrl: ToastController
  ) {}

  ionViewWillEnter () {
    this.loadData(this.currentPage);
  }

  loadData(page: number){
    // Load list of candidates
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
   * When its selected
   */
  rowSelected(model){
    // Load Detail Page
    this.navCtrl.push(CandidateViewPage, {
      'model': model
    });
  }

  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }

  /**
   * Approve the provided model
   */
  approve(candidate: Candidate){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.candidateService.approve(candidate).subscribe(response => {
      loader.dismiss();
      
      if (response.operation == 'error') {
        var html = '';
        for (let i in response.message) {
          for (let j of response.message[i]) {
             html += j;
          }
        }
        let toast = this.toastCtrl.create({
          message: html,
          duration: 3000
        });
        toast.present();
      } else {
        this.loadData(this.currentPage);

        //update review count 
        this._events.publish('navigation:totalCandidateToReview');
      }
    });
  }
}
