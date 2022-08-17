import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { AwsService } from 'src/app/providers/aws.service';
// models
import { Candidate } from 'src/app/models/candidate';
import {AuthService} from '../../../../providers/auth.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {

  public loading = false;

  public pageCount = 0;
  public currentPage = 1;

  public candidates: Candidate[] = [];
  public filters: {
    name: string,
    email: string,
    phone: number,
    civil: number,
    type: string
  } = {
    name: null,
    email: null,
    phone: null,
    civil: null,
    type: null
  };

  constructor(
    public router: Router,
    public aws: AwsService,
    public candidateService: CandidateService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    window.analytics.page('Candidate Review List Page');

    this.loadData(this.currentPage);
  }

  /**
   * Reset question filter
   */
  resetFilter() {
    this.filters = {
      name: null,
      email: null,
      phone: null,
      civil: null,
      type: null
    };
    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    if (this.filters.name) {
      urlParams += '&name=' + this.filters.name;
    }

    if (this.filters.email) {
      urlParams += '&email=' + this.filters.email;
    }

    if (this.filters.phone) {
      urlParams += '&phone=' + this.filters.phone;
    }
    if (this.filters.civil) {
      urlParams += '&civil=' + this.filters.civil;
    }
    return urlParams;
  }

  /**
   * Load Candidate List
   * @param page
   */
  async loadData(page: number) {

    const search = this.urlParams();

    this.loading = true;

    this.candidateService.list(search, page).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = response.body;
    }, () => {
      this.loading = false;
    });
  }

  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const search = this.urlParams();

    this.candidateService.list(search, this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = this.candidates.concat(response.body);

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
}
