import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Company } from 'src/app/models/company';
//models
import { Discount } from 'src/app/models/discount';
import { DiscountCategory } from 'src/app/models/discount-category';
import { Store } from 'src/app/models/store';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { DiscountCategoryService } from 'src/app/providers/logged-in/discount-category.service';
import { DiscountService } from 'src/app/providers/logged-in/discount.service';


/**
 * pass stores + model with company_id
 */
@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.page.html',
  styleUrls: ['./discount-form.page.scss'],
})
export class DiscountFormPage implements OnInit {

  public loading = false;

  public saving = false;
 
  public model: Discount; 

  public form: FormGroup;

  public operation;

  //public stores: Store[] = [];
  public company: Company;

  public discountCategories: DiscountCategory[] = []; 

  constructor(
    public discountService: DiscountService,
    public authService: AuthService,
    public discountCategoryService: DiscountCategoryService,
    private _fb: FormBuilder,
    private _alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    window.analytics.page('Discount Form Page');
 
    if (!this.model) {
      this.loadData();
    } else {
      this._initForm();
    }

    this.loadCategories();

    /*if (!this.company.stores) {
      this.loadStores();
    }*/
  }

  loadCategories() {
    this.discountCategoryService.list(-1).subscribe(res => {
      this.discountCategories = res.body;
    });
  }

  /*loadStores() {
    this.storeService.list(-1, "&company_id=" + this.company.company_id).subscribe(res => {
      this.company.stores = res;
    })
  }*/

  /**
   * load company detail
   */
  loadData() {
    this.loading = true;

    this.discountService.view(this.model.discount_uuid).subscribe(res => {
      this.model = res;

      this.loading = false;

    }, () => {

      this.loading = false;
    });
  }

  /**
   * init form
   */
  _initForm() {
 
    if (!this.model.category_id){ // Show Create Form
      this.operation  = 'Add Discount';
    } else { // Show Update Form
      this.operation  = 'Update Discount';
    }

    this.form = this._fb.group({
      category_id: [this.model.category_id, Validators.required],
      company_id: [this.model.company_id, Validators.required],
      store_id: [this.model.store_id],
      description_en: [this.model.description_en, Validators.required],
      description_ar: [this.model.description_ar, Validators.required],
      how_to_apply_en: [this.model.how_to_apply_en],
      how_to_apply_ar: [this.model.how_to_apply_ar],
      image: [this.model.image],
      valid_until: [this.model.valid_until? format(parseISO(this.model.valid_until), 'yyyy-MM-dd'): new Date()],
    }); 
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.category_id = this.form.value.category_id;
    this.model.company_id = this.form.value.company_id;
    this.model.store_id = this.form.value.store_id;
    this.model.description_en = this.form.value.description_en;
    this.model.description_ar = this.form.value.description_ar;
    this.model.how_to_apply_en = this.form.value.how_to_apply_en;
    this.model.how_to_apply_ar = this.form.value.how_to_apply_ar;
    this.model.image = this.form.value.image;
    this.model.valid_until = this.form.value.valid_until? 
      format(parseISO(this.form.value.valid_until), 'yyyy-MM-dd'): null;
  }

  /**
   * Close the page
   */
  close() {
    this.modalCtrl.dismiss({ refresh: true });
  }

  /**
   * Save the model
   */
  async save() {

    this.saving = true;

    this.updateModelDataFromForm();

    let action;

    if (!this.model.discount_uuid) {
      // Create
      action = this.discountService.create(this.model);
    } else {
      // Update
      action =  this.discountService.update(this.model);
    }

    action.subscribe(async jsonResponse => {

      this.saving = false;

      // On Success
      if (jsonResponse.operation == 'success') {

        // Close the page
        const data = { refresh: true };
        this.modalCtrl.dismiss(data);

        const toast = await this._toastCtrl.create({
          message: jsonResponse.message,
          duration: 3000
        });
        toast.present();
      }

      // On Failure
      if (jsonResponse.operation == 'error') {

        const prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ['Ok']
        });
        prompt.present();
      }
    }, () => {
      this.saving = false;
    });
  }

  onDateClosed(event) {
    if (event && event.detail.value) {
      this.form.controls['valid_until'].setValue(format(parseISO(event.detail.value), 'yyyy-MM-dd'));
      this.form.controls['valid_until'].updateValueAndValidity();
    }
  }
}
