import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

// Pages
import { BankViewPage } from '../bank-view/bank-view';
import { BankFormPage } from '../bank-form/bank-form';
// Providers
import { BankService } from '../../../../providers/logged-in/bank.service';
// Models
import { Bank } from '../../../../models/bank';

@Component({
  selector: 'page-bank-list',
  templateUrl: 'bank-list.html'
})
export class BankListPage {

  public bank: Bank[];

  constructor(
    public navCtrl: NavController,
    public bankService: BankService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    // Load list of bank
    let loader = this._loadingCtrl.create();
    loader.present();
    this.bankService.list().subscribe(response => {
      this.bank = response;
      loader.dismiss();
    });
  }

  /**
   * When its selected
   */
  rowSelected(model){
    // Load Detail Page
    this.navCtrl.push(BankViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  create(){
    let modal = this._modalCtrl.create(BankFormPage, {
      model: new Bank()
    });
    // Refresh List if required
    modal.onDidDismiss(data => {
      if(data){
        if(data.refresh){
          this.loadData();
        }
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  delete(bank: Bank){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.bankService.delete(bank).subscribe(jsonResp => {
      loader.dismiss();
      this.loadData();
    });
  }

}
