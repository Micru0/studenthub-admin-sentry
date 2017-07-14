import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { StatisticService } from '../../../providers/logged-in/statistic.service';

//page 
import { TransferListPage } from '../transfer/transfer-list/transfer-list';
import { CandidateReviewListPage } from '../candidate/candidate-review-list/candidate-review-list';

@Component({
  selector: 'page-default',
  templateUrl: 'default.html'
})
export class DefaultPage {

  public statistics: any;

  constructor(
  	public navCtrl: NavController,
  	public statisticService: StatisticService,
  	private _loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidLoad() {
    this.loadData();
  }

  /**
   * Load Stats for display
   */
  loadData() {
    let loader = this._loadingCtrl.create();
    loader.present();
    
    this.statisticService.get().subscribe(response => {
        this.statistics = response;
      },
      error => {},
      () => {loader.dismiss();}
    );
  }

  /**
   * Load Transfer List Page for a specific status
   */
  showTransfers(transfer_status:number) {
    this.navCtrl.push(TransferListPage, {
      'status' : transfer_status
    });
  }

  /**
   * Load Candidate Review Page
   */
  loadCandidateReviewPage(){
    this.navCtrl.push(CandidateReviewListPage);
  }
}
