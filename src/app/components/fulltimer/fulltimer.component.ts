import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AwsService} from '../../providers/aws.service';
import {Fulltimer} from "../../models/fulltimer";

@Component({
  selector: 'app-fulltimer',
  templateUrl: './fulltimer.component.html',
  styleUrls: ['./fulltimer.component.scss'],
})
export class FulltimerComponent implements OnInit {

  @Input() fulltimer: Fulltimer;
  public resume;
  constructor(
      public router: Router,
      public aws: AwsService,
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
}
