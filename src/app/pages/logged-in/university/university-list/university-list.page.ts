import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//models
import { University } from 'src/app/models/university';
//services
import { UniversityService } from 'src/app/providers/logged-in/university.service';
//pages
import { UniversityFormPage } from '../university-form/university-form.page';


@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.page.html',
  styleUrls: ['./university-list.page.scss'],
})
export class UniversityListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public universities: University[];

  constructor(
    public router: Router,
    public universityService: UniversityService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * load university data
   * @param page 
   */
  async loadData(page: number) {
    
    let loader = await this._loadingCtrl.create();
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

      this.universities = response.body;
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
   
    this.router.navigate(['university-view', model.university_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    let modal = await this._modalCtrl.create({
      component: UniversityFormPage,
      componentProps: {
        model: new University()
      }
    });
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.currentPage = 1;
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(university: University) {
    
    let loader = await this._loadingCtrl.create();
    loader.present();
    
    let confirm = await this._alertCtrl.create({
      header: 'Delete University?',
      message: 'Are you sure you want to delete this University?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.universityService.delete(university).subscribe(async jsonResp => {
              loader.dismiss();

              if (jsonResp.operation == 'error') {
                let alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                let toast = await this._toastCtrl.create({
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
