import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
// models
import {DailyStandupAnswerService} from "src/app/providers/logged-in/daily-standup-answer.service";
import {DailyStandupAnswer} from "src/app/models/daily-standup-answer";
import {DailyStandupQuestionService} from "src/app/providers/logged-in/daily-standup-question.service";
import {DailyStandupQuestion} from "src/app/models/daily-standup-question";
import {addDays, format, isToday, subDays} from "date-fns";
import {DailyStandupAnswerViewPage} from "../daily-standup-answer-view/daily-standup-answer-view.page";
import {StaffPage} from "../../../picker/staff/staff.page";

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
  public inActiveStaff = [];
  public inActivePageCount = 0;
  public inActiveCurrentPage = 1;
  public totalWorking = 0;
  public totalNonWorking = 0;
  public selected = 'working';

  public filters: {
    staff_name: string,
    staff_id: string,
    question: string,
    question_uuid: string,
    date: any,
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
    this.filters.date = new Date();
    window.analytics.page('Daily Standup Answer List Page');
    let param = this.param.snapshot.paramMap.get('orderby');

    this.loadData(this.currentPage);
    this.loadQuestion();
    this.loadInactiveData(1);
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
      urlParams += '&date=' + format(new Date(this.filters.date),'dd-MM-yyyy');
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
      this.totalWorking = parseInt(response.headers.get('X-Pagination-Total-Count'));

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
      this.totalWorking = parseInt(response.headers.get('X-Pagination-Total-Count'));

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

  todayCheck(answer) {
    return isToday(new Date(answer.created_at));
  }

  /**
   * Loads the create page
   */
  async viewAnswer(answers) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: DailyStandupAnswerViewPage,
      componentProps: {
        model: answers
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });
    modal.present();
  }

  adjustDate(param) {
    if (param) {
      this.filters.date = addDays(new Date(this.filters.date), 1);
    } else {
      this.filters.date = subDays(new Date(this.filters.date), 1);
    }
    this.loadData(1);
    this.loadInactiveData(1);
  }

  /**
   * @param page
   * @param filter
   */
  async loadInactiveData(page, filter = false) {

    this.loading = true;
    const search = this.urlParams();
    this.answerService.listInactive(page, search).subscribe(response => {

      this.inActivePageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.inActiveCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalNonWorking = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.loading = false;
      this.inActiveStaff = response.body;

    }, () => {
      this.loading = false;
    });
  }

  tabChange(event) {
    this.selected = event.detail.value;
  }

  doInfiniteInActive(event) {

    this.loading = true;

    this.inActiveCurrentPage++;
    const search = this.urlParams();
    this.answerService.listInactive(this.inActiveCurrentPage, search).subscribe(response => {

      this.loading = false;

      this.inActivePageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.inActiveCurrentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.inActiveStaff = this.inActiveStaff.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

}
