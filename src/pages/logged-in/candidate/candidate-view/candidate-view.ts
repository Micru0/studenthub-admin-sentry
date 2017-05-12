import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';

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
  // public bucketUrl = "https://bawes-public.s3.eu-west-2.amazonaws.com/";
  public permanentBucketUrl = "https://sh-payroll.s3.eu-west-2.amazonaws.com/";

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    public candidateService: CandidateService,
    params: NavParams,
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
        //back to listing
        this.navCtrl.pop();
      }      
    });
  }
}
