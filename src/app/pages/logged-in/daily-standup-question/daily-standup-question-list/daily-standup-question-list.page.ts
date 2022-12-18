import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services
import { DailyStandupQuestionService } from 'src/app/providers/logged-in/daily-standup-question.service';
import { AuthService } from 'src/app/providers/auth.service';
// models
import { DailyStandupQuestion } from 'src/app/models/daily-standup-question';
// pages
import { DailyStandupQuestionFormPage } from '../daily-standup-question-form/daily-standup-question-form.page';


@Component({
  selector: 'app-daily-standup-question-list',
  templateUrl: './daily-standup-question-list.page.html',
  styleUrls: ['./daily-standup-question-list.page.scss'],
})
export class DailyStandupQuestionListPage implements OnInit {

  public loading = false;

  public deleting = false;

  public pageCount = 0;
  public currentPage = 1;

  public questions: DailyStandupQuestion[];

  constructor(
    public platform: Platform,
    public router: Router,
    public questionService: DailyStandupQuestionService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Daily Standup Question List Page');

    this.loadData(this.currentPage);
  }

  /**
   * list banks
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.questionService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.questions = response.body;

    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.questionService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.questions = this.questions.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.router.navigate(['/bank-view', model.bank_id], {
      state: {
        model: model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: DailyStandupQuestionFormPage,
      componentProps: {
        model: new DailyStandupQuestion()
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, bank: DailyStandupQuestion) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Daily Standup Question?',
      message: 'Are you sure you want to delete this Daily Standup Question?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.questionService.delete(bank).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(this.currentPage, true);
              }
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }

}
