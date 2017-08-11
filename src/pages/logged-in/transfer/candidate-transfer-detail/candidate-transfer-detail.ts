import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,NavParams,ToastController,Events } from 'ionic-angular';

// Providers
import { CandidateTransferService } from '../../../../providers/logged-in/candidate.transfer.service';

// Models
import { TransferCandidate } from '../../../../models/transfer-candidate';
import { Candidate } from '../../../../models/candidate';

// Pages
import { CandidateViewPage } from '../../candidate/candidate-view/candidate-view';

@Component({
  selector: 'page-candidate-transfer-detail',
  templateUrl: 'candidate-transfer-detail.html'
})
export class CandidateTransferDetailPage {

  public transfersCandidate: TransferCandidate;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public _candidateTransferService: CandidateTransferService,
    private _loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _events: Events
  ) { 
    // Passed from Dashboard to show filtered status results
    if (params.get('transfers')) {
      this.transfersCandidate = params.get('transfers');
    }
  }

  ionViewWillEnter() {}

  markUnPaid (Transfer:TransferCandidate) {
   this.alertCtrl.create({
    title: 'Mark Unpaid',
    message: 'Are you sure you want to mark this transfer candidate as unpaid?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          let loader = this._loadingCtrl.create();
          loader.present();
          this._candidateTransferService.unpaid(Transfer).subscribe(response => {
            
            let toast = this.toastCtrl.create({
              message: response.message,
              duration: 3000
            });
            //update review count 
            this._events.publish('navigation:updatePayable');
            toast.present();
            loader.dismiss();
            this.navCtrl.pop();
          });
        }
      }
    ]
    }).present(); 
  }

  markPaid (Transfer:TransferCandidate) {
   this.alertCtrl.create({
    title: 'Mark Paid',
    message: 'Are you sure you want to mark this transfer candidate as Paid?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          let loader = this._loadingCtrl.create();
          loader.present();
          this._candidateTransferService.paid(Transfer).subscribe(response => {
            
            let toast = this.toastCtrl.create({
              message: response.message,
              duration: 3000
            });
            //update review count 
            this._events.publish('navigation:updatePayable');
            toast.present();
            loader.dismiss();
            this.navCtrl.pop();
          });
        }
      }
    ]
    }).present(); 
  }

  /**
   * On Candidate Selected
   * @param model 
   */
  loadCandidateDetail(model: Candidate) {
    this.navCtrl.push(CandidateViewPage, {
      'model': model
    });
  }
}
