import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import {ModalController} from "@ionic/angular";
//models
import { Country } from 'src/app/models/country';
import { Candidate } from 'src/app/models/candidate';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { CountryService } from 'src/app/providers/logged-in/country.service';
import {AuthService} from "../../../../providers/auth.service";
import {CountryFormPage} from "../country-form/country-form.page";


@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.page.html',
  styleUrls: ['./country-view.page.scss'],
})
export class CountryViewPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public country: Country;
  public candidates: Candidate[];

  public country_id;

  public loading: boolean = false;

  public deletingCandidates: boolean = false; 

  public loadingCandidates: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public candidateService: CandidateService,
    public countryService: CountryService,
    public authService: AuthService,
    public _modalCtrl: ModalController
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if (window['state']) {
      this.country = window['state']['model'];
    }

    this.country_id = this.activateRoute.snapshot.paramMap.get('country_id');

    this.loadData();
  }

  /**
   * load country detail
   */
  loadData() {

    this.loading = true;

    this.countryService.view(this.country_id).subscribe(country => {

      this.country = country;

      this.loadCandidates(1);

      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

  /**
   * load country data
   * @param page 
   */
  async loadCandidates(page: number) {

    this.loadingCandidates = true;

    this.candidateService.listByCountry(this.country, page).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = response.body;

      this.loadingCandidates = false;
    }, () => {
      this.loadingCandidates = false;
    });
  }

  /**
   * load more candidates on scroll to bottom 
   * @param event 
   */
  doInfinite(event) {

    this.loadingCandidates = true;

    this.currentPage++; 

    this.candidateService.listByCountry(this.country, this.currentPage).subscribe(response => {

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = this.candidates.concat(response.body);

      this.loadingCandidates = false;

      event.target.complete();

    }, () => {
      this.loadingCandidates = false;
    });
  }

  /**
   * selected candidate
   * @param candidate 
   */
  candidateSelected(candidate) {
    this.router.navigate(['candidate-view', candidate.candidate_id], {
      state: {
        'model': candidate
      }
    });
  }

  /**
   * delete candidate
   * @param candidate 
   */
  async deleteCandidates(candidate) {

    this.deletingCandidates = true;

    this.candidateService.delete(candidate).subscribe(jsonResp => {
     
      this.deletingCandidates = false;

      this.currentPage = 1;
      this.loadCandidates(this.currentPage);
    }, () => {
      this.deletingCandidates = false;
    });
  }


  /**
   * Loads Form in modal to update
   */
  async update() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: CountryFormPage,
      componentProps: {
        model: this.country,
        country_id: this.country.country_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.country = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}
