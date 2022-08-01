import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../models/candidate';
import {AwsService} from '../../providers/aws.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {

  @Input() candidate: Candidate;

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
