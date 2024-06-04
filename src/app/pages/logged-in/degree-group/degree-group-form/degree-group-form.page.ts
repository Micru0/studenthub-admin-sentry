import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
//models
import { DegreeGroup } from 'src/app/models/degree-group';
//services
import { DegreeGroupService } from 'src/app/providers/logged-in/degree-group.service';


@Component({
  selector: 'app-degree-group-form',
  templateUrl: './degree-group-form.page.html',
  styleUrls: ['./degree-group-form.page.scss'],
})
export class DegreeGroupFormPage implements OnInit {

  public saving: boolean = false;

  public model: DegreeGroup;
  public operation: string;

  public form: FormGroup;

  constructor(
    public degree_groupService: DegreeGroupService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController, 
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {
    window.analytics.page('DegreeGroup Form Page');

    if (!this.model || !this.model.degree_group_uuid) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name_en: ["", Validators.required],
        name_ar: ["", Validators.required],
        sort_order: ["", Validators.required],
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name_en: [this.model.degree_group_name_en, Validators.required],
        name_ar: [this.model.degree_group_name_ar, Validators.required],
        sort_order: [this.model.degree_group_sort_order, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm() {
    this.model.degree_group_name_en = this.form.value.name_en;
    this.model.degree_group_name_ar = this.form.value.name_ar;
    this.model.degree_group_sort_order = this.form.value.sort_order;
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
    if (!this.model.degree_group_uuid) {
      // Create
      action = this.degree_groupService.create(this.model);
    } else {
      // Update
      action = this.degree_groupService.update(this.model);
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
