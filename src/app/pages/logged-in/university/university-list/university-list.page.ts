import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
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

  public deleting: boolean = false; 
  public loading: boolean = false;

  public pageCount = 0;
  public currentPage = 1;

  public universities: University[];

  constructor(
    public platform: Platform,
    public router: Router,
    public universityService: UniversityService,
    private _modalCtrl: ModalController, 
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
  async loadData(page: number, silent = false) {
    
    if(!silent)
      this.loading = true; 

    this.universityService.list(page).subscribe(response => {

      this.loading = false; 
      this.deleting = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.universities = response.body;
    },() => { 
      this.loading = false; 
      this.deleting = false;
    });
  }

  /**
   * load more on scroll to bottom
   * @param event 
   */
  doInfinite(event) {

    this.currentPage++;
    
    this.loading = true;  

    this.universityService.list(this.currentPage).subscribe(response => {

      this.loading = false; 
      
      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.universities = this.universities.concat(response.body);

      event.target.complete();

    },() => { 
      this.loading = false;  
    });
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
  async delete(ev, university: University) {
    
    ev.preventDefault(); 
    ev.stopPropagation();

    let confirm = await this._alertCtrl.create({
      header: 'Delete University?',
      message: 'Are you sure you want to delete this University?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true; 

            this.universityService.delete(university).subscribe(async jsonResp => {
               
              if (jsonResp.operation == 'error') {
              
                this.deleting = false;
                
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
              this.loadData(this.currentPage, true);
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }
}
