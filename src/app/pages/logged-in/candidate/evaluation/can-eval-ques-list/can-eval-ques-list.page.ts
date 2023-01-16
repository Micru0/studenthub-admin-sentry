import { Component, OnInit } from '@angular/core';
import {CandidateEvaluationService} from "src/app/providers/logged-in/candidate-evaluation.service";
import {CandidateEvalQues} from "src/app/models/candidate-evaluation";
import {AlertController, ModalController} from "@ionic/angular";
import {CanEvalQuesDeptFormPage} from "../can-eval-ques-dept-form/can-eval-ques-dept-form.page";

@Component({
  selector: 'app-can-eval-ques-list',
  templateUrl: './can-eval-ques-list.page.html',
  styleUrls: ['./can-eval-ques-list.page.scss'],
})
export class CanEvalQuesListPage implements OnInit {

  public loading = false;
  public totalRecord = 0;
  public totalPages = 0;
  public currentPage = 0;
  public questions: any[];

  constructor(
    public candidateEvaluationService: CandidateEvaluationService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page) {
    this.loading = true;
    let param = '&expand=department,departmentQuestion,departmentQuestion.question';
    this.candidateEvaluationService.listQuestion(page, param).subscribe(response => {
      this.loading = false;
      this.questions = response.body;
      this.currentPage = response.headers.get('X-Pagination-Current-Page');
      this.totalPages = response.headers.get('X-Pagination-Page-Count');
      this.totalRecord = response.headers.get('X-Pagination-Total-Count');
    })
  }

  async addUpdateQuestion(event, model = new CandidateEvalQues()) {
      window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

      const modal = await this.modalCtrl.create({
        component: CanEvalQuesDeptFormPage,
        componentProps: {
          model
        }
      });
      modal.onDidDismiss().then(e => {

        if (!e.data || e.data.from != 'native-back-btn') {
          window['history-back-from'] = 'onDidDismiss';
          window.history.back();
        }
        if (e.data) {
          this.loadData(1);
        }
      });
      modal.present();
    }

  async delete(event, QuestionUUID) {

    this.alertCtrl.create({
      header:'Delete Question!',
      message: 'Are you sure you want to delete this question?',
      buttons: [
        {
          text:'Yes',
          role:'',
          handler: () => {
            this.candidateEvaluationService.delete(QuestionUUID).subscribe(response => {
                if (response.operation != 'success') {
                  this.alertCtrl.create({
                    message:response.message
                  }).then(alert => alert.present());
                }
                this.loadData(1);
            });
          }
        },
        {
          text:'No',
          role:'cancel',
          handler: function() {

          }
        }
      ]
    }).then(alert => alert.present())
  }
}
