import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { AwsService } from 'src/app/providers/aws.service';
// models
import {AuthService} from '../../../../providers/auth.service';
import {CompanyContact} from "../../../../models/company-contact";
import {CompanyContactService} from "../../../../providers/logged-in/company-contact.service";
import {CompanyPage} from "../../picker/company/company.page";
import {ModalController} from "@ionic/angular";


@Component({
  selector: 'app-company-contact-list',
  templateUrl: './company-contact-list.page.html',
  styleUrls: ['./company-contact-list.page.scss'],
})
export class CompanyContactListPage implements OnInit {

  public loading = false;

  public pageCount = 0;
  public totalCount = 0;
  public currentPage = 1;
  public showFilter = false;

  public contacts: CompanyContact[] = [];
  public filters: {
    name: string
    company_name: string
    company_id: string
  } = {
    name: null,
    company_name: null,
    company_id: null
  };

  constructor(
    public router: Router,
    public aws: AwsService,
    public companyContactService: CompanyContactService,
    public authService: AuthService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    window.analytics.page('Company Contact List Page');

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
      company_name: null,
      company_id: null
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
    if (this.filters.company_id) {
      urlParams += '&company_id=' + this.filters.company_id;
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

    this.companyContactService.list(page, search).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));
      this.contacts = response.body;
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

    this.companyContactService.list(this.currentPage, search).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.contacts = this.contacts.concat(response.body);

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
    this.router.navigate(['/company-contact-view', model.contact_uuid], {
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
      this.filters.company_name = data.company.company_name;
      this.filters.company_id = data.company.company_id;
    }
  }
}
