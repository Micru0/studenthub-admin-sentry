import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AwsService} from '../../providers/aws.service';
import {Fulltimer} from "../../models/fulltimer";
import {SuggestionService} from "src/app/providers/logged-in/suggestion.service";
import {AuthService} from "src/app/providers/auth.service";

@Component({
  selector: 'app-fulltimer',
  templateUrl: './fulltimer.component.html',
  styleUrls: ['./fulltimer.component.scss'],
})
export class FulltimerComponent implements OnInit {

  @Input() fulltimer: Fulltimer;
  @Input() suggestion: any;
  public resume;
  constructor(
      public router: Router,
      public aws: AwsService,
      public suggestionService: SuggestionService,
      public authService: AuthService,
  ) { }

  ngOnInit() {
    this.resume = `https://studenthub-uploads.s3.amazonaws.com/fulltimer-resume/${this.fulltimer.fulltimer_pdf_cv}`;
  }

  /**
   * When a candidate is selected
   * @param model
   */
  rowSelected(model) {

    this.router.navigate(['/fulltimer-view', model.fulltimer_uuid], {
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
