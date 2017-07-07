import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, ToastController, NavParams,Events } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

@Component({
  selector: 'page-transfer-paid',
  templateUrl: 'transfer-paid.html'
})
export class TransferPaidPage  {

  public candidateList: any = [];
  public candidatesData: any = [];
  public candidatelistData;
  public transfer_id: number;
  public count: number = 0;

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private transferService: TransferService,
    public toastCtrl: ToastController,
    private _events: Events
  ) {}


  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {

    // Load list of transfer
    let loader = this._loadingCtrl.create();
    loader.present();
    
    this.transferService.listPayableCandidates(0).subscribe(response => {

      this.candidatelistData = response.json();
      this.candidatelistData.forEach((value, index) => {
        
        value.candidates.forEach((innervalue, innerindex) => {
          this.candidateList[innervalue.tc_id] = innervalue.candidate_id;  
          this.candidatesData[innervalue.tc_id] = {
            'candidate_id' : innervalue.candidate_id,
            'child_transfer_id' : innervalue.transfer_id,
            'transfer_id' : value.transfer_id,
          }
        });
      });
      console.log(this.candidatesData);
    },
    error => {},
    () => {loader.dismiss();}
    );
  }
  
  markPaid() {
  
    let candidate_ids = [];

    this.candidateList.forEach((value, index) => {
        if(value != false) {
          candidate_ids.push({
              'candidate_id':this.candidatesData[index].candidate_id,
              'transfer_id':this.candidatesData[index].transfer_id,
              'child_transfer_id':this.candidatesData[index].child_transfer_id,
            }
          );
        } 
    });
    if (candidate_ids.length == 0) {

        let prompt = this._alertCtrl.create({
          message: 'Please select candidate(s)',
          buttons: ["Ok"]
        });
        prompt.present();

        return false;
    }  

    let loader = this._loadingCtrl.create();
    loader.present();

    this.transferService.markPaidAll(candidate_ids).subscribe(response => {
      let toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });

      //update review count 
      this._events.publish('navigation:updatePayable');

      toast.present();
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
}
