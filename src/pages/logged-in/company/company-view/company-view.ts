import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    params: NavParams
  ) {
    this.company = params.get('model');
  }

  /**
   * Loads Modal form to update
   */
  update(){
    console.log("Attempting to update");
  }

}
