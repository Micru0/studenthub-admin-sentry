import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
//models
import { Major } from 'src/app/models/major';
//services
import { MajorService } from 'src/app/providers/logged-in/major.service';


@Component({
  selector: 'app-major-form',
  templateUrl: './major-form.page.html',
  styleUrls: ['./major-form.page.scss'],
})
export class MajorFormPage implements OnInit {

  public saving: boolean = false;

  public model: Major;
  public operation: string;

  public form: FormGroup;

  constructor(
    public majorService: MajorService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController, 
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {
    window.analytics.page('Major Form Page');

    if (!this.model || !this.model.major_uuid) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name_en: ["", Validators.required],
        name_ar: ["", Validators.required],  
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name_en: [this.model.major_name_en, Validators.required],
        name_ar: [this.model.major_name_ar, Validators.required]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm() {
    this.model.major_name_en = this.form.value.name_en;
    this.model.major_name_ar = this.form.value.name_ar;
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

    this.saving = true;

    this.updateModelDataFromForm();

    let action;
    if (!this.model.major_uuid) {
      // Create
      action = this.majorService.create(this.model);
    } else {
      // Update
      action = this.majorService.update(this.model);
    }

    action.subscribe(async jsonResponse => {
      
      this.saving = false;

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
    }, () => {

      this.saving = false;

    });
  }
}
