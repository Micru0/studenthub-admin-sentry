import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { EventService } from 'src/app/providers/event.service';
import { AuthService } from 'src/app/providers/auth.service';
import { AwsService } from 'src/app/providers/aws.service';
//models
import { TransferCandidate } from 'src/app/models/transfer-candidate';
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.page.html',
  styleUrls: ['./candidate-view.page.scss'],
})
export class CandidateViewPage implements OnInit {

  public approving: boolean = false; 
  
  public loading: boolean = false; 

  public candidate_id; 

  public candidate: Candidate;

  public salaryTransfers: any[] = [];

  public workHistory: any[] = [];

  constructor(
    public router: Router,
    public aws: AwsService,
    public authService: AuthService,
    public activateRoute: ActivatedRoute,
    public candidateService: CandidateService,
    public eventService: EventService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.candidate = window['state']['model'];
    }

    this.candidate_id = this.activateRoute.snapshot.paramMap.get('candidate_id');
  
    this.loadData();

    this.eventService.updatePayable$.subscribe((userEventData) => {
      if(this.candidate && (!userEventData || userEventData['candidate_id'] == this.candidate_id)) {
        this.loadTransfersData();
      }
    });
  }
  
  loadData() {
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
    this.candidateService.transfers(this.candidate_id).subscribe(response => {
      this.salaryTransfers = response;
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
       
      if(response.operation == 'error') {
      
        let toast = await this.toastCtrl.create({
          message: this.authService.errorMessage(response.message),
          duration: 3000
        });
        toast.present();

      } else {

        //update review count 
        this.eventService.totalCandidateToReview$.next();

        //back to listing
        this.router.navigate(['/candidate-review-list']);
      }      
    });
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
    return candidate.candidate_personal_photo_thumb = null;
  }
}
