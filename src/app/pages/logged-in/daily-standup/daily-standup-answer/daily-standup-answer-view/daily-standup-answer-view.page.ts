import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {DailyStandupAnswerService} from "../../../../../providers/logged-in/daily-standup-answer.service";
import {DailyStandupAnswer} from "../../../../../models/daily-standup-answer";

@Component({
  selector: 'app-daily-standup-answer-view',
  templateUrl: './daily-standup-answer-view.page.html',
  styleUrls: ['./daily-standup-answer-view.page.scss'],
})
export class DailyStandupAnswerViewPage implements OnInit {

  public model:DailyStandupAnswer;
  public data;
  public loading = false;

  constructor(
    public modalCtrl: ModalController,
    public dailyStandupAnswerService: DailyStandupAnswerService
  ) { }

  ngOnInit() {
    if (this.model) {
      this.loadData();
    }
  }


  loadData() {
    this.dailyStandupAnswerService.view(this.model.staff_id,this.model.created_at).subscribe(response => {
      this.data = response;
    })
  }
  /**
   * Close the page
   */
  close($ev){
    this.modalCtrl.dismiss({});
  }
}
