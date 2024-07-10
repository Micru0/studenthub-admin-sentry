import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { DiscountCategoryCategoryService } from 'src/app/providers/logged-in/discount-category.service';
// models


@Component({
  selector: 'app-discount-category-form',
  templateUrl: './discount-category-form.page.html',
  styleUrls: ['./discount-category-form.page.scss'],
})
export class DiscountCategoryFormPage implements OnInit {

  public loading = false;

  public saving = false;

  public category_id; 

  public model; 

  public form: FormGroup;

  public operation;

  constructor(
    public discountCategoryService: DiscountCategoryCategoryService,
    public authService: AuthService,
    private _fb: FormBuilder,
    private _alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private _toastCtrl: ToastController
  ) { }

  ngOnInit() {
    window.analytics.page('Discount Category Form Page');
 
    if (!this.model) {
      this.loadData();
    } else {
      this._initForm();
    }
  }

  /**
   * load company detail
   */
  loadData() {
    this.loading = true;

    this.discountCategoryService.view(this.category_id).subscribe(bank => {
      this.model = bank;

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

      this.operation  = 'Add Category';
 
      this.form = this._fb.group({
        name_en: ['', Validators.required],
        name_ar: ['', Validators.required],
        image: [''],
      }); 
    } else { // Show Update Form
      this.operation  = 'Update Category';

      this.form = this._fb.group({
        name_en: [this.model.name_en, Validators.required],
        name_ar: [this.model.name_ar, Validators.required],
        image: [this.model.image],
      }); 
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.name_en = this.form.value.name_en;
    this.model.name_ar = this.form.value.name_ar;
    this.model.image = this.form.value.image;
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

    if (!this.model.category_id) {
      // Create
      action = this.discountCategoryService.create(this.model);
    } else {
      // Update
      action =  this.discountCategoryService.update(this.model);
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
}
