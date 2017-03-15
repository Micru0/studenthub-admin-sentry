import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
// Pages
import { BankFormPage } from '../bank-form/bank-form';
// Models
import { Bank } from '../../../../models/bank';

@Component({
  selector: 'page-bank-view',
  templateUrl: 'bank-view.html'
})
export class BankViewPage {

  public bank: Bank;

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    params: NavParams
  ) {
    this.bank = params.get('model');
  }

  /**
   * Loads Form in modal to update
   */
  update(){
    let modal = this._modalCtrl.create(BankFormPage, {
      model: this.bank
    });
    modal.present();
  }

}
