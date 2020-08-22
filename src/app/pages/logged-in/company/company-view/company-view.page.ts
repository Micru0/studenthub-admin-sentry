import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { StoreService } from 'src/app/providers/logged-in/store.service';
import { CompanyService } from 'src/app/providers/logged-in/company.service';
import { AwsService } from '../../../../providers/aws.service';
import { BrandService } from 'src/app/providers/logged-in/brand.service';
import { CompanyContactService } from 'src/app/providers/logged-in/company-contact.service';
import { AuthService } from 'src/app/providers/auth.service';
//models
import { Company } from 'src/app/models/company';
import { Store } from 'src/app/models/store';
import { File } from '../../../../models/file';
import { CompanyContact } from 'src/app/models/company-contact';
import { Brand } from 'src/app/models/brand';
//pages
import { BrandFormPage } from '../brand-form/brand-form.page';
import { CompanyContactFormPage } from '../company-contact-form/company-contact-form.page';
import { CompanyFormPage } from '../company-form/company-form.page';
import { UploadFilePage } from '../upload-file/upload-file.page';


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
  
  public brands: Brand[] = [];

  public companyContacts: CompanyContact[] = [];

  public deleting = false;
  public loading = false;
  public sendingNewPassword = false;
  public companyStatus = false;

  public updating = false;

  constructor(
    public platform: Platform,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    public companyService: CompanyService,
    public companyContactService: CompanyContactService,
    public brandService: BrandService,
    public storeService: StoreService,
    public authService: AuthService,
    private _toastCtrl: ToastController,
    public aws: AwsService,
  ) { }

  ngOnInit() {

    // Load the passed model if available
    if (window.history.state) {
      this.company = window.history.state.model;
    }

    this.company_id = this.activatedRoute.snapshot.paramMap.get('company_id');

    this.loadData();
    this.loadContacts();

    this.companyStatus = !!(this.company.company_status);
  }

  /**
   * load compay data
   */
  async loadData(silent = false) {

    if (!silent) {
      this.loading = true;
    }

    if (!this.company) {
      this.company = new Company;
      this.company.company_id = this.company_id;
    }

    this.companyService.view(this.company).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.company = response;

      this.subCompanies = response.subCompanies;
      this.stores = response.stores;

      this.brands = response.brands;
      
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    const modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: this.company,
        company_id: this.company_id,
        subcompany: 0
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(true);
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
        model
      }
    });
  }

  /**
   * Create a new company
   * @param parent_company_id
   * @param subcompany
   */
  async create(parent_company_id: number, isSubcompany: boolean = false) {
    const company = new Company();

    company.parent_company_id = parent_company_id;

    const modal = await this._modalCtrl.create({
      component: CompanyFormPage,
      componentProps: {
        model: company,
        company_id: company.company_id,
        subcompany : isSubcompany
      }
    });

    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
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
        model
      }
    });
  }

  /**
   * form to add new brand
   */
  async addBrand() {

    let brand = new Brand;
    brand.company_id = this.company_id;
    
    const modal = await this._modalCtrl.create({
      component: BrandFormPage,
      componentProps: { 
        model: brand
      }
    });

    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(true);
      }
    });
    modal.present();
  }

  /**
   * update company follow up interval in week
   */
  async updateFollowupInterval() {
    const alert = await this._alertCtrl.create({
      header: 'Follow up',
      inputs: [
        {
          name: 'interval',
          type: 'number',
          value: this.company.company_followup_interval_weeks,
          placeholder: 'Enter interval in weeks'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: (data) => {

            this.updating = true;

            this.companyService.updateFollowupInterval(this.company_id, data.interval).subscribe(async resp => {
              this.updating = false;

              if(resp.operation != 'success') {
                const prompt = await this._alertCtrl.create({
                  header: 'Error!',
                  message: resp.message,
                  buttons: ['Ok']
                });
                prompt.present();
              }
              else 
              {
                this.company.company_followup_interval_weeks = data.interval;
              }

            }, () => {
              this.updating = false;
            });
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * delete brand
   * @param event 
   * @param brand 
   */
  async deleteBrand(event, brand) {

    event.preventDefault();
    event.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Brand?',
      message: 'Do you want to delete this brand?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.brandService.delete(brand).subscribe(async jsonResp => {

              // On Success
              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(true);
              }

              // On Failure
              if (jsonResp.operation == 'error') {

                this.deleting = false;

                // failer text
                const prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ['Ok']
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

  loadContacts() {
    this.companyContactService.companyContacts(this.company_id).subscribe(data => {
      this.companyContacts = data;
    });
  }

  async onContactSelected(companyContact) {
    const modal = await this._modalCtrl.create({
      component: CompanyContactFormPage,
      componentProps: { 
        model: companyContact
      }
    });

    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadContacts();
      }
    });
    modal.present();
  }

  async addCompanyContact() {

    let companyContact = new CompanyContact;
    companyContact.company_id = this.company_id;
    
    const modal = await this._modalCtrl.create({
      component: CompanyContactFormPage,
      componentProps: { 
        model: companyContact
      }
    });

    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadContacts();
      }
    });
    modal.present();
  }

  doNothing(event) {
    event.stopPropagation();
  }

  async deleteContact(event, companyContact) {

    event.preventDefault();
    event.stopPropagation();

    this.companyContactService.delete(companyContact).subscribe(async response => {

      if (response.operation == 'success')
      {
        this.companyContacts = this.companyContacts.filter(e => e.contact_uuid != companyContact.contact_uuid);
      }
      else
      {
        const prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(response.message),
          buttons: ['Ok']
        });
        prompt.present();
      }
    });
  }

  /**
   * open brand edit page
   * @param brand 
   */
  async brandSelected(brand) {
    const modal = await this._modalCtrl.create({
      component: BrandFormPage,
      componentProps: { 
        model: brand
      }
    });

    // Refresh List if required
    modal.onDidDismiss().then(e => {
      if (e && e.data && e.data.refresh) {
        this.loadData(true);
      }
    });
    modal.present();
  }

  /**
   * Show confirm alert to reset password
   */
  async resetPassword() {
    const alert = await this._alertCtrl.create({
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

      if (response.operation == 'error')
      {
        const toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });

        toast.present();
      }
      else
      {
        const alert = await this._alertCtrl.create({
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
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Company?',
      message: 'Do you want to delete this Company?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.companyService.delete(company).subscribe(async jsonResp => {

              // On Success
              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(true);
              }

              // On Failure
              if (jsonResp.operation == 'error') {

                this.deleting = false;

                // failer text
                const prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ['Ok']
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

  /**
   * Delete the provided model
   */
  async deleteDoc(ev, file: File) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Document?',
      message: 'Do you want to delete this Document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.companyService.deleteDoc(file).subscribe(async jsonResp => {

              // On Success
              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(true);
              }

              // On Failure
              if (jsonResp.operation == 'error') {

                this.deleting = false;

                // failer text
                const prompt = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  message: jsonResp.message,
                  buttons: ['Ok']
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

  async uploadDocument() {
    const modal = await this._modalCtrl.create({
      component: UploadFilePage,
      componentProps: {
        company: this.company,
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.refresh) {
      this.loadData();
    }
  }
  async editDoc($event, file) {
    const modal = await this._modalCtrl.create({
      component: UploadFilePage,
      componentProps: {
        company: this.company,
        file,
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.refresh) {
      this.loadData();
    }
  }

  toogleFollowup($event) {
    
    this.company.company_followup = $event.detail.checked;

    this.updating = true;

    this.companyService.updateFollowup(this.company).subscribe(async response => {
      
      this.updating = false;

      if (response && response.operation == 'success') {
        const toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        toast.present();
      }
    }, () => {
      this.updating = false;
    });
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date)
      return new Date(date.replace(/-/g, '/'));
  }
  
  changeStatus($event) {
    this.companyStatus = $event.detail.checked;
    this.updating = true;
    const status = ($event.detail.checked) ? 10 : 0;
    this.companyService.changeStatus(this.company, status).subscribe(async response => {
      this.updating = false;
      if (response && response.operation == 'success') {
        const toast = await this._toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        toast.present();
      }
    }, () => {
      this.updating = false;
    });
  }

  loadLogo($event, company) {
    company.company_logo = null;
  }
}
