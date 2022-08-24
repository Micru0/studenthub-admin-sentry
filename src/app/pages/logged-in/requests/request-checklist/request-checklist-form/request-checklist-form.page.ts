import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
//models
import { RequestChecklist } from 'src/app/models/request-checklist';
//services
import { RequestChecklistService } from 'src/app/providers/logged-in/request-checklist.service';
import {AuthService} from "../../../../../providers/auth.service";


@Component({
  selector: 'app-request-checklist-form',
  templateUrl: './request-checklist-form.page.html',
  styleUrls: ['./request-checklist-form.page.scss'],
})
export class RequestChecklistFormPage implements OnInit {

  public saving: boolean = false;

  public model: RequestChecklist;
  public operation: string;

  public form: FormGroup;

  constructor(
    public requestChecklistService: RequestChecklistService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController, 
    private authService: AuthService,
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {

    if (!this.model || !this.model.request_checklist_uuid) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        status_name: ["", Validators.required],
        status_name_ar: [""],
        is_require: [true],
        sort_order: [],
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        status_name: [this.model.status_name, Validators.required],
        status_name_ar: [this.model.status_name_ar],
        is_require: [this.model.is_require],
        sort_order: [this.model.sort_order]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm() {
    this.model.status_name = this.form.value.status_name;
    this.model.status_name_ar = this.form.value.status_name_ar;
    this.model.is_require = this.form.value.is_require ? 1 : 0;
    this.model.sort_order = this.form.value.sort_order;
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
    if (!this.model.request_checklist_uuid) {
      // Create
      action = this.requestChecklistService.create(this.model);
    } else {
      // Update
      action = this.requestChecklistService.update(this.model);
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
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    }, () => {
      this.saving = false;
    });
  }
}
