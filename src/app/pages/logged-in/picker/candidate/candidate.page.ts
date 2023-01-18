import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
// models
import {AuthService} from 'src/app/providers/auth.service';
import {Candidate} from "../../../../models/candidate";
import {CandidateService} from "../../../../providers/logged-in/candidate.service";
import {AwsService} from "../../../../providers/aws.service";


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.page.html',
  styleUrls: ['./candidate.page.scss'],
})
export class CandidatePage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];
  public searchName;

  public candidates: Candidate[];

  public loading = false;
  public deleting = false;
  public sendingNewPassword = false;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public candidateService: CandidateService,
    private _modalCtrl: ModalController,
    public authService: AuthService,
    public aws: AwsService,
  ) {
  }

  ngOnInit() {
    window.analytics.page('Candidate List Page');
    this.loadData(this.currentPage);
  }

  /**
   * Load list of staff
   * @param page
   */
  async loadData(page: number, silent: boolean = false) {

    if (!silent) {
      this.loading = true;
    }
    let param;
    if (this.searchName) {
        param = '&name='+this.searchName
    }

    this.candidateService.list(param, page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.candidates = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    let param;
    if (this.searchName) {
      param = '&name='+this.searchName
    }
    this.candidateService.list(param, this.currentPage).subscribe(response => {

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
   * Close the page
   */
  close(data = null) {
    this._modalCtrl.getTop().then(o => {
      if(o) {
        o.dismiss(data);
      }
      else
      {
        this.navCtrl.back();
      }
    });
  }

  searchByName($event) {
    this.searchName = $event.detail.value;
    this.loadData(1); // reload all result
  }

  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    candidate.candidate_personal_photo = null;
  }
}
