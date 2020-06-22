import { Component, OnInit } from '@angular/core';
import { University } from 'src/app/models/university';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/providers/logged-in/university.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.page.html',
  styleUrls: ['./university-form.page.scss'],
})
export class UniversityFormPage implements OnInit {

  public model: University;
  public operation: string;

  public form: FormGroup;

  constructor(
    public universityService: UniversityService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {

    if (!this.model || !this.model.university_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name_en: ["", Validators.required],
        name_ar: ["", Validators.required]
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name_en: [this.model.university_name_en, Validators.required],
        name_ar: [this.model.university_name_ar, Validators.required]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm() {
    this.model.university_name_en = this.form.value.name_en;
    this.model.university_name_ar = this.form.value.name_ar;
  }

  /**
   * Close the page
   */
  close() {
    let data = { 'refresh': false };
    this.modalCtrl.dismiss(data);
  }

  /**
   * Save the model
   */
  async save() {

    let loader = await this._loadingCtrl.create();
    loader.present();

    this.updateModelDataFromForm();

    let action;
    if (!this.model.university_id) {
      // Create
      action = this.universityService.create(this.model);
    } else {
      // Update
      action = this.universityService.update(this.model);
    }

    action.subscribe(async jsonResponse => {
      loader.dismiss();

      // On Success
      if (jsonResponse.operation == "success") {
        // Close the page
        let data = { 'refresh': true };
        this.modalCtrl.dismiss(data);
      }

      // On Failure
      if (jsonResponse.operation == "error") {
        let prompt = await this._alertCtrl.create({
          message: JSON.stringify(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    });
  }
}
