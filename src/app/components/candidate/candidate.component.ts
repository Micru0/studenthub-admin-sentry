import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../models/candidate';
import {AwsService} from '../../providers/aws.service';
import {SuggestionService} from "src/app/providers/logged-in/suggestion.service";
import {AuthService} from "src/app/providers/auth.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {

  @Input() candidate: Candidate;
  @Input() suggestion: any;

  constructor(
      public router: Router,
      public aws: AwsService,
      public suggestionService: SuggestionService,
      public authService: AuthService
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

  changeStatus(event, suggestion, status) {
    event.preventDefault();
    event.stopPropagation();
    this.suggestionService.changeStatus(suggestion.suggestion_uuid, status).subscribe(res => {
      if (res.operation == 'success') {
        this.suggestion.suggestion_status = status;
      }
    })
  }
}
