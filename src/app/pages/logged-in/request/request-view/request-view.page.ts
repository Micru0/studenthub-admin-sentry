import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from 'src/app/providers/logged-in/request.service';
import { Request } from 'src/app/models/request';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.page.html',
  styleUrls: ['./request-view.page.scss'],
})
export class RequestViewPage implements OnInit {

  public request: Request;
  public loading = false;
  public request_uuid;
  public segment = 'info';
  constructor(
      public requestService: RequestService,
      private activateRoute: ActivatedRoute,
      public platform: Platform,
  ) {
    this.request_uuid = this.activateRoute.snapshot.paramMap.get('request_uuid');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.requestService.view(this.request_uuid).subscribe(response => {
        this.request = response;
    },
        error => this.loading = false,
        () => this.loading = false
    );
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date) {
      return new Date(date.replace(/-/g, '/'));
    }
  }
}
