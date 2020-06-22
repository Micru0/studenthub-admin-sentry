import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { UniversityService } from 'src/app/providers/logged-in/university.service';
//models
import { University } from 'src/app/models/university';
import { Candidate } from 'src/app/models/candidate';
//pages
import { UniversityFormPage } from '../university-form/university-form.page';


@Component({
  selector: 'app-university-view',
  templateUrl: './university-view.page.html',
  styleUrls: ['./university-view.page.scss'],
})
export class UniversityViewPage implements OnInit {

  private university_id; 

  public loading: boolean = false; 

  public university: University;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = [];
  public candidates: Candidate[];

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public universityService: UniversityService,
    public candidateService: CandidateService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
  ) {
  }

  public ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.university = window['state']['model'];
    }

    this.university_id = this.activateRoute.snapshot.paramMap.get('university_id');
  
    this.loadData();
  }

  /**
   * load university data
   */
  loadData() {
    this.loading = true; 

    this.universityService.view(this.university_id).subscribe(bank => {

      this.university = bank; 

      this.loadUniversityCandidate(this.university, this.currentPage);

      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }
  /**
   * Loads Form in modal to update
   */
  async update() {
    let modal = await this._modalCtrl.create({
      component: UniversityFormPage,
      componentProps: {
        model: this.university,
        university_id: this.university_id
      }
    });
    modal.present();
  }

  /**
   * load university candidate
   * @param university 
   * @param page 
   */
  async loadUniversityCandidate(university: University, page: number) {
    
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.candidateService.listByUniversity(university, page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.candidates = response.body;

      loader.dismiss();
    });
  }

  /**
   * candidate detail
   * @param candidate 
   */
  candidateDetail(candidate: Candidate) {
    
    this.router.navigate(['candidate-view', candidate.candidate_id], {
      state: {
        'model': candidate
      }
    });
  }
}
