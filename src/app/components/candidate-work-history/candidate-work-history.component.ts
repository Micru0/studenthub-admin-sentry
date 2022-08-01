import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AwsService} from '../../providers/aws.service';
import {CandidateWorkHistory} from '../../models/candidate-work-history';

@Component({
  selector: 'app-candidate-work-history',
  templateUrl: './candidate-work-history.component.html',
  styleUrls: ['./candidate-work-history.component.scss'],
})
export class CandidateWorkHistoryComponent implements OnInit {

  @Input() history: CandidateWorkHistory;

  constructor(
      public router: Router,
      public aws: AwsService,
  ) { }

  ngOnInit() {}

  /**
   * When a candidate is selected
   * @param model
   */
  rowSelected(model) {

    this.router.navigate(['/candidate-view', model.candidate_id], {
      state: {
        model
      }
    });
  }

  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    candidate.candidate_personal_photo = null;
  }
}
