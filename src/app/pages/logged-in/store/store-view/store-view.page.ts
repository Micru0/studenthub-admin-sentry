import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { StoreService } from 'src/app/providers/logged-in/store.service';
//models
import { Store } from 'src/app/models/store';
import { Candidate } from 'src/app/models/candidate';
import { AwsService } from 'src/app/providers/aws.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.page.html',
  styleUrls: ['./store-view.page.scss'],
})
export class StoreViewPage implements OnInit {

  public loading: boolean = false; 

  public pageCount = 0;
  public currentPage = 1;

  public store: Store;
  public candidates: Candidate[] = [];

  store_id;

  public loadingLoginUrl: boolean = false; 

  constructor( 
    public aws: AwsService,
    public alertCtrl: AlertController, 
    public authService: AuthService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public storeService: StoreService,
    private candidateService: CandidateService
  ) {}


  ngOnInit() {
    window.analytics.page('Store View Page');

    // Load the passed model if available
    // if(window['state']) {
    //   this.store = window['state']['model'];
    // }

    this.store_id = this.activateRoute.snapshot.paramMap.get('store_id');

    if (this.store_id) {
      this.loadData();
    }
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
    
    this.loading = true;

    this.candidateService.listByStore(this.store, page).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = response.body;

    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more candidates
   * @param event 
   */
  doInfiniteCandidates(event) {

    this.loading = true;

    this.currentPage++;

    this.candidateService.listByStore(this.store, this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = this.candidates.concat(response.body);

      event.target.complete();

    }, () => {
      
      event.target.complete();
      
      this.loading = false;
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

  login() {
    this.loadingLoginUrl = true; 

    this.storeService.login(this.store_id).subscribe(async res => {

      this.loadingLoginUrl = false;
       
      if(res.operation == "error") {
        const alert = await this.alertCtrl.create({
          header: 'Oops',
          subHeader: this.authService.errorMessage(res.message),
          buttons: ['Okay']
        });
        alert.present();
      } else {
        window.open(res.redirect, "_blank");
      }
    });
  }

  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    candidate.candidate_personal_photo = null;
  }
}
