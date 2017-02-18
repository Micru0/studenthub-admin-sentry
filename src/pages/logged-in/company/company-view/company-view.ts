import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company-view',
  templateUrl: 'company-view.html'
})
export class CompanyViewPage {

  public company;

  constructor(
    public navCtrl: NavController,
    params: NavParams
  ) {
    this.company = params.get('model');
  }

}
