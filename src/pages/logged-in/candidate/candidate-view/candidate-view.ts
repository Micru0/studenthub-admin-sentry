import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// Providers
import { CandidateService } from '../../../../providers/logged-in/candidate.service';
// Models
import { Candidate } from '../../../../models/candidate';

@Component({
  selector: 'page-candidate-view',
  templateUrl: 'candidate-view.html'
})
export class CandidateViewPage {

  public candidate: Candidate;
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
}
