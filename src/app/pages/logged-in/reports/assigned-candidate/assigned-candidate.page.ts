import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AwsService} from '../../../../providers/aws.service';
import {CandidateService} from '../../../../providers/logged-in/candidate.service';
import {AuthService} from '../../../../providers/auth.service';
import {ModalController} from '@ionic/angular';
import {CompanyPage} from '../../picker/company/company.page';
import {CandidateWorkHistory} from '../../../../models/candidate-work-history';

@Component({
  selector: 'app-assigned-candidate',
  templateUrl: './assigned-candidate.page.html',
  styleUrls: ['./assigned-candidate.page.scss'],
})
export class AssignedCandidatePage implements OnInit {

  public loading = false;
  public showFilter = false;
  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;

  public candidateWorkHistory: CandidateWorkHistory[] = [];
  public filters: {
    name: string,
    company_id: number,
    start: string,
    end: number,
    currentlyWorking: number
  } = {
    name: null,
    company_id: null,
    start: null,
    end: null,
    currentlyWorking: null
  };

  constructor(
      public router: Router,
      public aws: AwsService,
      public candidateService: CandidateService,
      public authService: AuthService,
      public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    window.analytics.page('Assigned Candidate List Page');
  }

  ionViewWillEnter() {
    this.loadData(this.currentPage);
  }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
  }

  /**
   * Load Candidate List
   * @param page
   */
  async loadData(page: number) {

    const search = this.urlParams();

    this.loading = true;

    this.candidateService.reportList(search, page).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);

      this.candidateWorkHistory = response.body;
    }, () => {
      this.loading = false;
    });
  }

  /**
   * Reset question filter
   */
  resetFilter() {
    this.filters = {
      name: null,
      company_id: null,
      start: null,
      end: null,
      currentlyWorking: null
    };
    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    // if (this.filters.name) {
    //   urlParams += '&name=' + this.filters.name;
    // }

    if (this.filters.start) {
      urlParams += '&start=' + this.filters.start;
    }

    if (this.filters.end) {
      urlParams += '&end=' + this.filters.end;
    }
    if (this.filters.company_id) {
      urlParams += '&company_id=' + this.filters.company_id;
    }
    if (this.filters.currentlyWorking) {
      urlParams += '&currently_working=' + this.filters.currentlyWorking;
    }
    urlParams += '&assigned=1';
    return urlParams;
  }

  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const search = this.urlParams();

    this.candidateService.reportList(search, this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);

      this.candidateWorkHistory = this.candidateWorkHistory.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }
  /**
   * When a candidate is selected
   * @param model
   */
  rowSelected(model) {

    this.router.navigate(['/candidate-view', model.candidate_id], {
      state: {
        model
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

  async selectCompany(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: CompanyPage,
    });
    modal.present();
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });

    const { data } = await modal.onWillDismiss();

    if (data && data.company) {
      this.filters.name = data.company.company_name;
      this.filters.company_id = data.company.company_id;
    }
  }
}
