import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
// models
import {DailyStandupAnswerService} from "../../../../../providers/logged-in/daily-standup-answer.service";
import {DailyStandupAnswer} from "../../../../../models/daily-standup-answer";
import {StaffPage} from "../../../picker/staff/staff.page";
import {DailyStandupQuestionService} from "../../../../../providers/logged-in/daily-standup-question.service";
import {DailyStandupQuestion} from "../../../../../models/daily-standup-question";

@Component({
  selector: 'app-daily-standup-answer-list',
  templateUrl: './daily-standup-answer-list.page.html',
  styleUrls: ['./daily-standup-answer-list.page.scss'],
})
export class DailyStandupAnswerListPage implements OnInit {

  public loading = false;

  public deleting = false;
  public showFilter = false;

  public pageCount = 0;
  public currentPage = 1;

  public questions: DailyStandupQuestion[];
  public answers: DailyStandupAnswer[];

  public filters: {
    staff_name: string,
    staff_id: string,
    question: string,
    question_uuid: string,
    date: string,
  } = {
    staff_name: null,
    staff_id: null,
    question: null,
    question_uuid: null,
    date: null,
  };

  constructor(
    public platform: Platform,
    public router: Router,
    public param: ActivatedRoute,
    public modalCtrl: ModalController,
    public answerService: DailyStandupAnswerService,
    public questionService: DailyStandupQuestionService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Daily Standup Answer List Page');
    let param = this.param.snapshot.paramMap.get('orderby');

    this.loadData(this.currentPage);
    this.loadQuestion();
  }

  resetFilter() {
    this.filters = {
      staff_name: null,
      staff_id: null,
      question: null,
      question_uuid: null,
      date: null
    };
    this.loadData(1); // reload all result
  }

  /**
   * Return url string to filter list
   */
  urlParams() {
    let urlParams = '';

    if (this.filters.staff_id) {
      urlParams += '&staff_id=' + this.filters.staff_id;
    }

    if (this.filters.question_uuid) {
      urlParams += '&question_uuid=' + this.filters.question_uuid;
    }

    if (this.filters.date) {
      urlParams += '&date=' + this.filters.date;
    }
    return urlParams;
  }


  /**
   * list banks
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }
    const search = this.urlParams();
    this.answerService.list(page,search).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.answers = response.body;

    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  loadQuestion() {
    this.questionService.list(1).subscribe(response => {
      this.questions = response.body;
    }, () => {});
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;
    const search = this.urlParams();
    this.answerService.list(this.currentPage,search).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.answers = this.answers.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  toggleFilter($ev) {
    this.showFilter = !this.showFilter
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
        this.filters.staff_name = e.data.staff_name;
        this.filters.staff_id = e.data.staff_id;
      }
    });
    modal.present();
  }
}
