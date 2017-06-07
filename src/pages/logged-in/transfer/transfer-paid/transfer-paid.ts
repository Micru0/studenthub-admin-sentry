import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';

// Providers
import { TransferService } from '../../../../providers/logged-in/transfer.service';

@Component({
  selector: 'page-transfer-paid',
  templateUrl: 'transfer-paid.html'
})
export class TransferPaidPage  {

  public candidates: any = [];
  public candidatesData: any = [];
  public candidatelistData;
  public transfer_id: number;
  public count: number = 0;


  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private transferService: TransferService,
    public toastCtrl: ToastController
  ) {
    this.candidates = [];
  }


  ionViewWillEnter() {
    this.loadData(this.currentPage);
  }

  loadData(page: number) {

    // Load list of transfer
    let loader = this._loadingCtrl.create();
    loader.present();
    
    this.transferService.listPayableCandidates(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 

      if(this.pageCount == 1)
        this.pages = [];

      this.candidatelistData = response.json();
      this.candidatelistData.forEach((value, index) => {
        this.candidates[index] = value.candidate_id;  
      });
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
  
  markPaid() {
  
    let candidate_ids = [];

    this.candidates.forEach((value, index) => {
        if(value === true) {
          candidate_ids.push({
              'candidate_id':this.candidatelistData[index].candidate_id,
              'transfer_id':this.candidatelistData[index].transfer_id,
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
      toast.present();
      this.navCtrl.pop();
      loader.dismiss();
    });
  }
}
