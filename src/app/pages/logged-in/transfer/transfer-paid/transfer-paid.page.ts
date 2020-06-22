import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { EventService } from 'src/app/providers/event.service';


@Component({
  selector: 'app-transfer-paid',
  templateUrl: './transfer-paid.page.html',
  styleUrls: ['./transfer-paid.page.scss'],
})
export class TransferPaidPage implements OnInit {

  public candidateList: any = [];
  public candidatesData: any = [];
  public candidatelistData;
  public transfer_id: number;
  public count: number = 0;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private transferService: TransferService,
    public toastCtrl: ToastController,
    private _eventService: EventService
  ) { }

  ngOnInit() {
    
    // Load the passed model if available
    if(window['state']) {
      this.candidatelistData = window['state']['candidatelistData'];
    }

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
  }
  
  /**
   * Mark Paid
   */
  async markPaid() {
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

        let prompt = await this._alertCtrl.create({
          message: 'Please select candidate(s)',
          buttons: ["Ok"]
        });
        prompt.present();

        return false;
    }  

    let loader = await this._loadingCtrl.create();
    loader.present();

    this.transferService.markPaidAll(candidate_ids).subscribe(async response => {

      let toast = await this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();

      //update review count 
      this._eventService.updatePayable$.next();

      this.navCtrl.pop();

      loader.dismiss();
    });
  }
}
