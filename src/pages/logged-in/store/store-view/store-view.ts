import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

// Providers
import { CandidateService } from '../../../../providers/logged-in/candidate.service';

// Pages
import { CandidateViewPage } from '../../candidate/candidate-view/candidate-view';

// Models
import { Store } from '../../../../models/store';
import { Candidate } from '../../../../models/candidate';

@Component({
  selector: 'page-store-view',
  templateUrl: 'store-view.html'
})
export class StoreViewPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public store: Store;
  public candidates: Candidate;

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private candidateService: CandidateService,
    params: NavParams
  ) {
    this.store = params.get('model');
    this.loadData(this.currentPage);
  }

  /**
   * Load data required by page
   * @param page 
   */
  loadData(page: number){
    let loader = this._loadingCtrl.create();
    loader.present();
    this.candidateService.listByStore(this.store, page).subscribe(response => {

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
      loader.dismiss();
    });
  }

  /**
   * When candidate row is selected, load detail page
   * @param model 
   */
  candidateSelected(model) {
    this.navCtrl.push(CandidateViewPage, {
      'model': model
    });
  }

  /**
   * Define page link color for pagination
   * @param page 
   */
  pageLinkColor(page: number) {
    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
}
