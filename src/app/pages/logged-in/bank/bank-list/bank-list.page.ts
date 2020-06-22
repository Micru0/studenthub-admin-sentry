import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//services
import { BankService } from 'src/app/providers/logged-in/bank.service';
//models
import { Bank } from 'src/app/models/bank';
//pages
import { BankFormPage } from '../bank-form/bank-form.page';


@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.page.html',
  styleUrls: ['./bank-list.page.scss'],
})
export class BankListPage implements OnInit {
 
  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public bank: Bank[];

  constructor(
    public router: Router,
    public bankService: BankService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
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
  
  async loadData(page: number) {
    // Load list of bank
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.bankService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }

      //hide if no page = 1 

      if (this.pageCount == 1)
        this.pages = [];

      this.bank = response.body;
    },
      error => { },
      () => { loader.dismiss(); }
    );
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.router.navigate(['/bank-view', model.bank_id], {
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
      component: BankFormPage,
      componentProps: {
        model: new Bank()
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(bank: Bank) {
    let loader = await this._loadingCtrl.create();
    loader.present();

    let confirm = await this._alertCtrl.create({
      header: 'Delete Bank?',
      message: 'Are you sure you want to delete this Bank?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.bankService.delete(bank).subscribe(async jsonResp => {
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
