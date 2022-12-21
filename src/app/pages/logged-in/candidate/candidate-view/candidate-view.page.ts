import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertController, Platform, ToastController} from '@ionic/angular';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { EventService } from 'src/app/providers/event.service';
import { AuthService } from 'src/app/providers/auth.service';
import { AwsService } from 'src/app/providers/aws.service';
//models
import { TransferCandidate } from 'src/app/models/transfer-candidate';
import { Candidate } from 'src/app/models/candidate';
import {Bank} from "../../../../models/bank";


@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.page.html',
  styleUrls: ['./candidate-view.page.scss'],
})
export class CandidateViewPage implements OnInit {

  public approving: boolean = false; 
  
  public loading: boolean = false; 
  public deleting: boolean = false;

  public loadingSalaryTransfers: boolean = false;
  
  public candidate_id; 

  public candidate: Candidate;

  public salaryTransfers: any[] = [];

  public workHistory: any[] = [];
  public sections = 'personal';

  constructor(
    public router: Router,
    public platform: Platform,
    public aws: AwsService,
    public authService: AuthService,
    public activateRoute: ActivatedRoute,
    public candidateService: CandidateService,
    public eventService: EventService,
    public toastCtrl: ToastController,
    public _alertCtrl: AlertController
  ) { }

  ngOnInit() {
    window.analytics.page('Candidate View Page');

    // Load the passed model if available
    if(window['state']) {
      this.candidate = window['state']['model'];
    }

    this.candidate_id = this.activateRoute.snapshot.paramMap.get('candidate_id');
  
    this.loadData();

    this.eventService.markedAllUnpaid$.subscribe((userEventData: any) => {

      if(!this.candidate) {
        return null;
      }

      for(let transfer of userEventData.transferCandidateList) {
        if(transfer.candidate_id == this.candidate_id) {
          this.candidate.bank_id = null;
          this.candidate.bank_account_name = null;
          this.candidate.candidate_iban = null;
        }
      }
    });

    this.eventService.markedUnpaid$.subscribe((userEventData) => {
      if(this.candidate && userEventData['candidate_id'] == this.candidate_id) {
        this.candidate.bank_id = null;
        this.candidate.bank_account_name = null;
        this.candidate.candidate_iban = null;
      }
    });

    this.eventService.updatePayable$.subscribe((userEventData) => {
      if(this.candidate && (!userEventData || userEventData['candidate_id'] == this.candidate_id)) {
        this.loadTransfersData();
      }
    });
  }
  
  /**
   * load candidate details
   * @param loading 
   */
  loadData(loading = true) {

    if(loading)
      this.loading = true; 

    this.candidateService.view(this.candidate_id).subscribe(bank => {
      
      this.candidate = bank; 

      this.loadTransfersData();
      this.loadWorkHistoryData();
      
      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

  /**
   * Load list of all salary transfers
   */
  loadTransfersData() {

    this.loadingSalaryTransfers = true;

    this.candidateService.transfers(this.candidate_id).subscribe(response => {
      this.loadingSalaryTransfers = false;

      this.salaryTransfers = response;
    }, () => {
      this.loadingSalaryTransfers = false;
    });
  }

  /**
   * Load candidate work history data
   */
  loadWorkHistoryData() {
    this.candidateService.workHistory(this.candidate).subscribe(response => {
      this.workHistory = response;
    });
  }

  /**
   * Approve the provided model
   */
  async approve(candidate: Candidate) {

    this.approving = true;

    this.candidateService.approve(candidate).subscribe(async response => {

      this.approving = false;

      if (response.operation == 'error') {
        let toast = await this.toastCtrl.create({
          message: this.authService.errorMessage(response.message),
          duration: 3000
        });
        toast.present();

      } else {

        // update review count
        this.eventService.totalCandidateToReview$.next({});

        // back to listing
        this.router.navigate(['/candidate-review-list']);
      }
    });
  }

  /**
   * Delete the provided model
   */
  async delete(ev, candidate: Candidate) {

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

            this.candidateService.delete(candidate).subscribe(async jsonResp => {
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

                this.router.navigate(['/candidate-list']);
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
   * transfer to candidate transfer detail page
   * @param transfer 
   */
  candidateTransferDetails(transferCandidate: TransferCandidate) {
    this.router.navigate(['candidate-transfer-detail', transferCandidate.tc_id], {
      state: {
        'transferCandidate': transferCandidate
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

  getResumeUrl(candidate) {
    return this.aws.permanentBucketUrl + 'candidate-resume/' + encodeURIComponent(candidate.candidate_resume);
  }
}
