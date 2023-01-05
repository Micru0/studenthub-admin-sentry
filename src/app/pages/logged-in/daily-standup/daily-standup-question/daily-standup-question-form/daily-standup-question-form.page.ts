import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { DailyStandupQuestionService } from 'src/app/providers/logged-in/daily-standup-question.service';
//models
import { DailyStandupQuestion } from 'src/app/models/daily-standup-question';


@Component({
  selector: 'app-daily-standup-question-form',
  templateUrl: './daily-standup-question-form.page.html',
  styleUrls: ['./daily-standup-question-form.page.scss'],
})
export class DailyStandupQuestionFormPage implements OnInit {

  public loading: boolean = false;

  public saving: boolean = false;

  public question_uuid;

  public model: DailyStandupQuestion;

  public operation:string;

  public form: FormGroup;

  constructor(
    public activateRoute: ActivatedRoute,
    public questionService: DailyStandupQuestionService,
    public authService: AuthService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController,
    private _alertCtrl: AlertController
  ){
  }

  ionViewDidEnter(){
    if (this.authService.admin_limited_access) {
      this.close();
    }
  }

  ngOnInit() {
    window.analytics.page('Daily Standup Question Form Page');

    if (this.model && this.model.question_uuid) {
      this.question_uuid = this.model.question_uuid;
    }

    // Load the passed model if available
    // if(window['state']) {
    //   this.model = window['state']['model'];
    // }

    //this.question_uuid = this.activateRoute.snapshot.paramMap.get('question_uuid');

    if(this.question_uuid && !this.model) {
      this.loadData(this.question_uuid);
    } else {
      this._initForm();
    }
  }

  loadData(question_uuid) {
    this.loading = true;

    this.questionService.view(question_uuid).subscribe(bank => {
      this.model = bank;

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.question_uuid) { // Show Create Form
      this.operation = "Add new question";
      this.form = this._fb.group({
        question: ["", Validators.required]
      });
    } else { // Show Update Form
      this.operation = "Update question";
      this.form = this._fb.group({
        question: [this.model.question, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.question = this.form.value.question;
  }

  /**
   * Close the page
   */
  close(){
    let data = { 'refresh': false };
    this.modalCtrl.dismiss(data);
  }

  /**
   * Save the model
   */
  async save() {

    this.saving = true;

    this.updateModelDataFromForm();

    let action;
    if(!this.model.question_uuid){
      // Create
      action = this.questionService.create(this.model);
    }else{
      // Update
      action = this.questionService.update(this.model);
    }

    action.subscribe(async jsonResponse => {

      this.saving = false;

      // On Success
      if(jsonResponse.operation == "success"){
        // Close the page
        let data = { 'refresh': true,'model':jsonResponse.detail };
        this.modalCtrl.dismiss(data);
      }

      // On Failure
      if (jsonResponse.operation == "error") {

        //failer text
        let prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    }, () => {
      this.saving = false;
    });
  }
}
