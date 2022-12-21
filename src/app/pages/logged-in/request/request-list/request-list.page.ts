import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/providers/logged-in/request.service';
import { Request } from 'src/app/models/request';
import {ModalController} from '@ionic/angular';
import {StaffPage} from 'src/app/pages/logged-in/picker/staff/staff.page';
import {CompanyPage} from 'src/app/pages/logged-in/picker/company/company.page';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
})
export class RequestListPage implements OnInit {

  public requests: Request[];
  public loading = false;
  public showFilter = false;
  public currentPage;
  public totalPage;
  public totalRequest = 0;
  public filters: {
    name: string,
    status: string,
    staff: string,
    staff_id: string,
    company: null,
    company_id: null,
    type: string
  } = {
    name: null,
    status: null,
    staff: null,
    staff_id: null,
    company: null,
    company_id: null,
    type: null
  };
  constructor(
      public requestService: RequestService,
      public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
  }

  async loadData(page) {
    this.loading = true;
    let params = this.urlParams();
    params += '&expand=requestCreatedBy,company';
    this.requestService.list(page, params).subscribe(response => {

      this.requests = response.body;
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.totalRequest = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);

    }, err => this.loading = false,
        () => this.loading = false
    );
  }

  doInfinite(event) {
    this.currentPage++;
    this.loading = true;
    let params = this.urlParams();
    params += '&expand=requestCreatedBy,company';

    this.requestService.list(this.currentPage, params).subscribe(response => {

      this.requests = this.requests.concat(response.body);
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      this.totalRequest = parseInt(response.headers.get('X-Pagination-Total-Count'), 10);
      event.target.complete();

      }, err => this.loading = false,
        () => this.loading = false
    );
  }

  resetFilter() {
    this.filters = {
      name: null,
      staff: null,
      status: null,
      staff_id: null,
      company: null,
      company_id: null,
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

    if (this.filters.status) {
      urlParams += '&status=' + this.filters.status;
    }

    if (this.filters.type) {
      urlParams += '&type=' + this.filters.type;
    }
    if (this.filters.staff_id) {
      urlParams += '&staff_id=' + this.filters.staff_id;
    }

    if (this.filters.company_id) {
      urlParams += '&company_id=' + this.filters.company_id;
    }
    return urlParams;
  }

  /**
   * Loads form to initiate a new transfer
   */
  async selectStaff(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: StaffPage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
      if (e.data) {
        this.filters.staff = e.data.staff_name;
        this.filters.staff_id = e.data.staff_id;
      }
    });
    modal.present();
  }

  /**
   * Loads form to initiate a new transfer
   */
  async selectCompany(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: CompanyPage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e.data) {
        this.filters.company = e.data.company.company_common_name_en;
        this.filters.company_id = e.data.company.company_id;
      }
    });
    modal.present();
  }
}
