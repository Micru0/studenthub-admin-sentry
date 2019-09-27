import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';

// Pages
import { UniversityViewPage } from '../university-view/university-view';
import { UniversityFormPage } from '../university-form/university-form';

// Providers
import { UniversityService } from '../../../../providers/logged-in/university.service';

// Models
import { University } from '../../../../models/university';

@Component({
  selector: 'page-university-list',
  templateUrl: 'university-list.html'
})
export class UniversityListPage {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public universities: University[];

  constructor(
    public navCtrl: NavController,
    public universityService: UniversityService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    this.loadData(this.currentPage);
  }

  /**
   * load university data
   * @param page 
   */
  loadData(page: number) {
    // Load list of university
    let loader = this._loadingCtrl.create();
    loader.present();
    this.universityService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.universities = response.json();
    },
      error => { },
      () => { loader.dismiss(); }
    );
  }

  /**
   * pagination current page color
   * @param page 
   */
  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
  
  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.navCtrl.push(UniversityViewPage, {
      'model': model
    });
  }

  /**
   * Loads the create page
   */
  create() {
    let modal = this._modalCtrl.create(UniversityFormPage, {
      model: new University()
    });
    // Refresh List if required
    modal.onDidDismiss(data => {
      if (data) {
        if (data.refresh) {
          this.loadData(this.currentPage);
        }
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  delete(university: University) {
    let loader = this._loadingCtrl.create();
    loader.present();
    let confirm = this._alertCtrl.create({
      title: 'Delete University?',
      message: 'Are you sure you want to delete this University?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.universityService.delete(university).subscribe(jsonResp => {
              loader.dismiss();

              if (jsonResp.operation == 'error') {
                let alert = this._alertCtrl.create({
                  title: 'Deletion Error!',
                  subTitle: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                let toast = this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
              }
              this.loadData(this.currentPage);
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            this.loadData(this.currentPage);
            loader.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
