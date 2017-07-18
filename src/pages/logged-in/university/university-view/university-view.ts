import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';
// Pages
import { UniversityFormPage } from '../university-form/university-form';
import { CandidateViewPage } from '../../candidate/candidate-view/candidate-view';
// Providers
import { CandidateService } from '../../../../providers/logged-in/candidate.service';
// Models
import { University } from '../../../../models/university';
import { Candidate } from '../../../../models/candidate';

@Component({
  selector: 'page-university-view',
  templateUrl: 'university-view.html'
})
export class UniversityViewPage {

  public university: University;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = [];
  public candidates : Candidate[];

  constructor(
    public navCtrl: NavController,
    public candidateService: CandidateService,
    private _modalCtrl: ModalController,
    params: NavParams,
    private _loadingCtrl: LoadingController,
  ) {
    this.university = params.get('model');
    this.loadUniversityCandidate(this.university,this.currentPage);
  }

  /**
   * Loads Form in modal to update
   */
  update(){
    let modal = this._modalCtrl.create(UniversityFormPage, {
      model: this.university
    });
    modal.present();
  }

  loadUniversityCandidate(university:University,page: number) {
    let loader = this._loadingCtrl.create();
    loader.present();
      this.candidateService.listByUniversity(university,page).subscribe(response => {

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

  candidateDetail(candidate:Candidate) {
    // Load Detail Page
    this.navCtrl.push(CandidateViewPage, {
      'model': candidate
    });
  }

}
