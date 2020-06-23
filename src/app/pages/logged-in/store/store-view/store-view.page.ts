import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { StoreService } from 'src/app/providers/logged-in/store.service';
//models
import { Store } from 'src/app/models/store';
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.page.html',
  styleUrls: ['./store-view.page.scss'],
})
export class StoreViewPage implements OnInit {

  public loading: boolean = false; 

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public store: Store;
  public candidates: Candidate[] = [];

  store_id;

  constructor( 
    public activateRoute: ActivatedRoute,
    public router: Router,
    private _loadingCtrl: LoadingController,
    public storeService: StoreService,
    private candidateService: CandidateService
  ) {}


  ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.store = window['state']['model'];
    }

    this.store_id = this.activateRoute.snapshot.paramMap.get('store_id');
  
    this.loadData();
  }

  loadData() {
    this.loading = true; 

    this.storeService.view(this.store_id).subscribe(store => {
      
      this.store = store; 
      
      this.loadCandidates(this.currentPage);

      this.loading = false;

    }, () => {

      this.loading = false;
    });
 
    
  }

  /**
   * Load data required by page
   * @param page 
   */
  async loadCandidates(page: number){
    
    let loader = await this._loadingCtrl.create();
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

      this.candidates = response.body;
      loader.dismiss();
    });
  }

  /**
   * When candidate row is selected, load detail page
   * @param model 
   */
  candidateSelected(model) {
    this.router.navigate(['candidate-view', model.candidate_id], {
      state: {
        'model': model
      }
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
