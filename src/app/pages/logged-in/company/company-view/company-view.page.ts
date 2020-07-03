import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Store } from 'src/app/models/store';
import { ToastController, AlertController, ModalController, Platform } from '@ionic/angular';
import { StoreService } from 'src/app/providers/logged-in/store.service';
import { CompanyService } from 'src/app/providers/logged-in/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyFormPage } from '../company-form/company-form.page';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.page.html',
  styleUrls: ['./company-view.page.scss'],
})
export class CompanyViewPage implements OnInit {

  public company_id;

  public company: Company;
  public subCompanies: Company[] = [];
  public stores: Store[] = [];

  public deleting: boolean = false;
  public loading: boolean = false;
  public sendingNewPassword: boolean = false; 

  constructor(
    public platform: Platform,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    public companyService: CompanyService,
    public storeService: StoreService,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.company = window['state']['model'];
    }

    this.company_id = this.activatedRoute.snapshot.paramMap.get('company_id');

    this.loadData();
  }

  /**
   * load compay data
   */
  async loadData(silent = false) {
    
    if(silent)
      this.loading = true;

    if(!this.company) {
      this.company = new Company; 
      this.company.company_id = this.company_id;
    };

    this.companyService.view(this.company).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.company = response;

      this.subCompanies = response.subCompanies;
      this.stores = response.stores; 
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    let modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: this.company,
        company_id: this.company_id,
        subcompany: 0
      }
    });
    modal.present();
  }

  /**
   * Load company detail page when its selected from the list
   * @param model 
   */
  rowSelected(model) {
    this.router.navigate(['company-view', model.company_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * Create a new company
   * @param parent_company_id 
   * @param subcompany 
   */
  async create(parent_company_id: number, isSubcompany: boolean = false) {
    var company = new Company();

    company.parent_company_id = parent_company_id;

    let modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: company,
        company_id: company.company_id,
        subcompany : isSubcompany
      }
    });
    
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if(e && e.data && e.data.refresh) {
        this.loadData(true);
      }
    });
    modal.present();
  }

  /**
   * push select company data to store view
   * @param model 
   */
  storeSelected(model) {
    this.router.navigate(['store-view', model.store_id], {
      state: {
        'model': model
      }
    });
  }
  
  /**
   * Show confirm alert to reset password 
   */
  async resetPassword() {
    let alert = await this._alertCtrl.create({
      header: 'Confirm password reset',
      message: 'Do you want to send new password to company?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.sendNewPassword();
          }
        }
      ]
    });
    alert.present();    
  }

  /**
   * Reset and email the candidate a new password
   */
  async sendNewPassword() {

    this.sendingNewPassword = true;

    this.companyService.resetPassword(this.company).subscribe(async response => {

      this.sendingNewPassword = false;

      if(response.operation == 'error')
      {
        let toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        
        toast.present();
      } 
      else 
      {
        let alert = await this._alertCtrl.create({
            header: 'Reset Password',
            subHeader: 'New password sent to company',
            buttons: ['Okay']
          });
          alert.present();
      }      
    }, () => {
      this.sendingNewPassword = false;
    });
  }
  
  /**
   * Delete the provided model
   */
  async delete(ev, company: Company) {

    ev.preventDefault(); 
    ev.stopPropagation();;

    let confirm = await this._alertCtrl.create({
      header: 'Delete Company?',
      message: 'Do you want to delete this Company?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.companyService.delete(company).subscribe(async jsonResp => {
             
              // On Success
              if (jsonResp.operation == "success") {
                let toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
                
                this.loadData(true);
              }
              
              // On Failure
              if (jsonResp.operation == "error") {

                this.deleting = false;
            
                //failer text
                let prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ["Ok"]
                });
                prompt.present();
              }

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
