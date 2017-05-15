import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

@Component({
  selector: 'page-transfer-paid',
  templateUrl: 'transfer-paid.html'
})
export class TransferPaidPage  {

  public candidates: any = [];
  public candidatelistData;
  public transfer_id: number;

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private transferService: TransferService
  ) {
    this.transfer_id = params.get('transfer_id'); 
    this.candidatelistData = params.get('candidates');

    this.candidates = [];

    this.candidatelistData.forEach((value, index) => {
        this.candidates[index] = value.candidate_id;  
      });
  }

  markPaid() {
    
    if(this.candidates.length == 0)
    {
        let prompt = this._alertCtrl.create({
          message: 'Please select candidate(s)',
          buttons: ["Ok"]
        });
        prompt.present();

        return false;
    }  
    
    let loader = this._loadingCtrl.create();
    loader.present();

    let candidate_ids = [];

    this.candidates.forEach((value, index) => {
        if(value === true) {
          candidate_ids.push(this.candidatelistData[index].candidate_id);
        } 
    });

    this.transferService.markPaid(this.transfer_id, candidate_ids).subscribe(response => {
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
}
