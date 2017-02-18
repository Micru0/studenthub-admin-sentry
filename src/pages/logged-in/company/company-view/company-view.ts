import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
// Pages
import { CompanyFormPage } from '../company-form/company-form';
// Models
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-company-view',
  templateUrl: 'company-view.html'
})
export class CompanyViewPage {

  public company: Company;

  constructor(
    public navCtrl: NavController,
    private _modalCtrl: ModalController,
    params: NavParams
  ) {
    this.company = params.get('model');
  }

  /**
   * Loads Form in modal to update
   */
  update(){
    let modal = this._modalCtrl.create(CompanyFormPage, {
      model: this.company
    });
    modal.present();
  }

}
