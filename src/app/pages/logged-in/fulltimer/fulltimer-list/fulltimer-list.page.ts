import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { AwsService } from 'src/app/providers/aws.service';
// models

import {AuthService} from '../../../../providers/auth.service';
import {FulltimerService} from "../../../../providers/logged-in/fulltimer.service";
import {Fulltimer} from "../../../../models/fulltimer";


@Component({
  selector: 'app-fulltimer-list',
  templateUrl: './fulltimer-list.page.html',
  styleUrls: ['./fulltimer-list.page.scss'],
})
export class FulltimerListPage implements OnInit {

  public loading = false;

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public showFilter = false;

  public fulltimers: Fulltimer[] = [];
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
    public fulltimerService: FulltimerService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    window.analytics.page('Candidate Review List Page');

    this.loadData(this.currentPage);
  }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
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

    this.fulltimerService.list(search, page).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.fulltimers = response.body;
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

    this.fulltimerService.list(search, this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.fulltimers = this.fulltimers.concat(response.body);

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

    this.router.navigate(['/fulltimer-view', model.fulltimer_uuid], {
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
