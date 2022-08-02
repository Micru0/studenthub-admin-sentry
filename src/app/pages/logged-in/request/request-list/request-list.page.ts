import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/providers/logged-in/request.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
})
export class RequestListPage implements OnInit {

  public requests: Request[];
  public loading = false;
  public currentPage;
  public totalPage;

  constructor(
      public requestService: RequestService
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  async loadData(page) {
    this.loading = true;
    const params = '&expand=requestCreatedBy,company';
    this.requestService.list(page, params).subscribe(response => {

      this.requests = response.body;
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);

    }, err => this.loading = false,
        () => this.loading = false
    );
  }

  doInfinite(event) {
    this.currentPage++;
    this.loading = true;
    const params = '&expand=requestCreatedBy,company';

    this.requestService.list(this.currentPage, params).subscribe(response => {

      this.requests = this.requests.concat(response.body);
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'), 10);
      this.totalPage = parseInt(response.headers.get('X-Pagination-Page-Count'), 10);
      event.target.complete();

      }, err => this.loading = false,
        () => this.loading = false
    );
  }
}
