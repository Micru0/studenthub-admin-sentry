import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

// Providers
import { CandidateService } from '../../../../providers/logged-in/candidate.service';

// Models
import { Candidate } from '../../../../models/candidate';
import { TransferCandidate } from '../../../../models/transfer-candidate';
// Pages
import { CandidateTransferDetailPage } from '../../transfer/candidate-transfer-detail/candidate-transfer-detail';

@Component({
  selector: 'page-candidate-view',
  templateUrl: 'candidate-view.html'
})
export class CandidateViewPage {

  public candidate: Candidate;
  public salaryTransfers: any[] = [];
  public workHistory: any[] = [];
  public permanentBucketUrl = "https://sh-payroll.s3.eu-west-2.amazonaws.com/";

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    public candidateService: CandidateService,
    params: NavParams,
    private _events: Events,
    public toastCtrl: ToastController
  ) {
    this.candidate = params.get('model');
    this.loadTransfersData();
    this.loadWorkHistoryData();
  }
  
  /**
   * Load list of all salary transfers
   */
  loadTransfersData() {
    this.candidateService.transfers(this.candidate.candidate_id).subscribe(response => {
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
  approve(candidate: Candidate){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.candidateService.approve(candidate).subscribe(response => {
      loader.dismiss();
       
      if(response.operation == 'error') {
        var html = '';
        for (let i in response.message) {
          for (let j of response.message[i]) {
             html += j;
          }
        }

        let toast = this.toastCtrl.create({
          message: html,
          duration: 3000
        });
        toast.present();
      } else {
        //update review count 
        this._events.publish('navigation:totalCandidateToReview');

        //back to listing
        this.navCtrl.pop();
      }      
    });
  }
  
  /**
   * transfer to candidate transfer detail page
   * @param transfer 
   */
  candidateTransferDetails(transferCandidate:TransferCandidate) {
    this.navCtrl.push(CandidateTransferDetailPage, {
      'transferCandidate': transferCandidate
    });
  }
}
