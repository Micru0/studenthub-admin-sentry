import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,NavParams,ToastController,Events } from 'ionic-angular';

//Pages
import { CandidateTransferDetailPage } from '../../transfer/candidate-transfer-detail/candidate-transfer-detail';

// Providers
import { CandidateTransferService } from '../../../../providers/logged-in/candidate.transfer.service';

// Models
import { TransferCandidate } from '../../../../models/transfer-candidate';

@Component({
  selector: 'page-candidate-transfer-list',
  templateUrl: 'candidate-transfer-list.html'
})
export class CandidateTransferListPage {

  public transfersCandidate: TransferCandidate[];

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

  markAllUnpaid (Transfer:TransferCandidate) {
    let candidateTransferList = []; 
        this.transfersCandidate.forEach((value, index) => {
          candidateTransferList.push({
            'tc_id':this.transfersCandidate[index].tc_id,
            'candidate_id':this.transfersCandidate[index].candidate_id,
            'transfer_id':this.transfersCandidate[index].transfer_id,
            }
          );
        });

    this.alertCtrl.create({
    title: 'Mark All Unpaid',
    message: 'Are you sure you want to unmark '+candidateTransferList.length+' transfers as unPaid?',
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
          this._candidateTransferService.markUnPaidAll(candidateTransferList).subscribe(response => {
            
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

  markAllPaid (Transfer:TransferCandidate) {
    let candidateTransferList = []; 
    this.transfersCandidate.forEach((value, index) => {
      candidateTransferList.push({
        'tc_id':this.transfersCandidate[index].tc_id,
        'candidate_id':this.transfersCandidate[index].candidate_id,
        'transfer_id':this.transfersCandidate[index].transfer_id,
        }
      );
    });
   this.alertCtrl.create({
    title: 'Mark All Paid',
    message: 'Are you sure you want to mark '+candidateTransferList.length+' transfers as Paid?',
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
          this._candidateTransferService.markPaidAll(candidateTransferList).subscribe(response => {
            
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

  loadTransferDetail(model: TransferCandidate) {
    this.navCtrl.push(CandidateTransferDetailPage, {
      'transfers': model
    });
  }
}
