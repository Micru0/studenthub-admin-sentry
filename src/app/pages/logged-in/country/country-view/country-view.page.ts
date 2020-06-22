import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
//models
import { Country } from 'src/app/models/country';
import { Candidate } from 'src/app/models/candidate';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { CountryService } from 'src/app/providers/logged-in/country.service';


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

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private _loadingCtrl: LoadingController,
    private countryService: CountryService
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

      this.loadCandidates(this.currentPage);

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

    let loader = await this._loadingCtrl.create();
    loader.present();

    this.candidateService.listByCountry(this.country, page).subscribe(response => {

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

    let loader = await this._loadingCtrl.create();
    loader.present();

    this.candidateService.delete(candidate).subscribe(jsonResp => {
      loader.dismiss();

      this.currentPage = 1;
      this.loadCandidates(this.currentPage);
    });
  }

  /**
   * current page link color
   * @param page 
   */
  pageLinkColor(page: number) {

    if (page == this.currentPage)
      return 'light';

    return '';
  }
}
