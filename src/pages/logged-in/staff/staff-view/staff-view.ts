import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

// Pages
import { StaffFormPage } from '../staff-form/staff-form';

// Models
import { Staff } from '../../../../models/staff';

@Component({
  selector: 'page-staff-view',
  templateUrl: 'staff-view.html'
})
export class StaffViewPage {

  public staff: Staff;

  constructor(
    private _modalCtrl: ModalController,
    params: NavParams
  ) {
    this.staff = params.get('model');
  }

  /**
   * Loads Form in modal to update
   */
  update() {
    let modal = this._modalCtrl.create(StaffFormPage, {
      model: this.staff
    });
    modal.present();
  }
}
