import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

// Pages
import { StaffViewPage } from '../staff-view/staff-view';
import { StaffFormPage } from '../staff-form/staff-form';
// Providers
import { StaffService } from '../../../../providers/logged-in/staff.service';
// Models
import { Staff } from '../../../../models/staff';

@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html'
})
export class StaffListPage {

  public staff: Staff[];

  constructor(
    public navCtrl: NavController,
    public staffService: StaffService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    // Load list of staff
    let loader = this._loadingCtrl.create();
    loader.present();
    this.staffService.list().subscribe(response => {
      this.staff = response;
      loader.dismiss();
    });
  }

  /**
   * When its selected
   */
  rowSelected(model){
    // Load Detail Page
    this.navCtrl.push(StaffViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  create(){
    let modal = this._modalCtrl.create(StaffFormPage, {
      model: new Staff()
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
  delete(staff: Staff){
    let loader = this._loadingCtrl.create();
    loader.present();

    this.staffService.delete(staff).subscribe(jsonResp => {
      loader.dismiss();
      this.loadData();
    });
  }

}
