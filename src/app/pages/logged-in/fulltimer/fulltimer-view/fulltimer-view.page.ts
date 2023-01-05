import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertController, Platform, ToastController} from '@ionic/angular';
//services

import { EventService } from 'src/app/providers/event.service';
import { AuthService } from 'src/app/providers/auth.service';
import { AwsService } from 'src/app/providers/aws.service';
//models
import {Fulltimer} from "../../../../models/fulltimer";
import {FulltimerService} from "../../../../providers/logged-in/fulltimer.service";


@Component({
  selector: 'app-fulltimer-view',
  templateUrl: './fulltimer-view.page.html',
  styleUrls: ['./fulltimer-view.page.scss'],
})
export class FulltimerViewPage implements OnInit {

  public approving: boolean = false;

  public loading: boolean = false;
  public deleting: boolean = false;

  public loadingSalaryTransfers: boolean = false;

  public fulltimer_uuid;

  public fulltimer: Fulltimer;

  public salaryTransfers: any[] = [];

  public workHistory: any[] = [];
  public sections = 'personal';

  constructor(
    public router: Router,
    public platform: Platform,
    public aws: AwsService,
    public authService: AuthService,
    public activateRoute: ActivatedRoute,
    public fulltimerService: FulltimerService,
    public eventService: EventService,
    public toastCtrl: ToastController,
    public _alertCtrl: AlertController
  ) { }

  ngOnInit() {
    window.analytics.page('Fulltimer View Page');

    // Load the passed model if available
    if(window['state']) {
      this.fulltimer = window['state']['model'];
    }

    this.fulltimer_uuid = this.activateRoute.snapshot.paramMap.get('fulltimer_uuid');

    this.loadData();
  }

  /**
   * load candidate details
   * @param loading
   */
  loadData(loading = true) {

    if(loading)
      this.loading = true;

    this.fulltimerService.view(this.fulltimer_uuid).subscribe(bank => {

      this.fulltimer = bank;

      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

  /**
   * Delete the provided model
   */
  async delete(ev, fulltimer: Fulltimer) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Candidate?',
      message: 'Are you sure you want to delete this Candidate?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.fulltimerService.delete(fulltimer).subscribe(async jsonResp => {
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
                const toast = await this.toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.router.navigate(['/fulltimer-list']);
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


  /**
   * @param $event
   * @param candidate
   */
  loadLogo($event, candidate) {
    candidate.candidate_personal_photo = null;
  }

  public segmentChanged($e){
    this.sections = $e.detail.value;
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date)
      return new Date(date.replace(/-/g, '/'));
  }

  getResumeUrl() {
    return this.aws.permanentBucketUrl + 'fulltimer-resume/' + encodeURIComponent(this.fulltimer.fulltimer_pdf_cv);
  }
}
