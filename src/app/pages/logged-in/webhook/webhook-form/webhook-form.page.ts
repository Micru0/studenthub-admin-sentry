import { Component, OnInit } from '@angular/core';
import { Webhook } from 'src/app/models/webhook';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
//services
import { WebhookService } from 'src/app/providers/logged-in/webhook.service';


@Component({
  selector: 'app-webhook-form',
  templateUrl: './webhook-form.page.html',
  styleUrls: ['./webhook-form.page.scss'],
})
export class WebhookFormPage implements OnInit {

  public saving: boolean = false;

  public model: Webhook;
  public operation: string;

  public form: FormGroup;

  constructor(
    public webhookService: WebhookService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController, 
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {
    window.analytics.page('Webhook Form Page');

    if (!this.model || !this.model.webhook_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        event: ["", Validators.required],
        endpoint: ["", Validators.required],
        method: ["", Validators.required]
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        event: [this.model.event, Validators.required],
        endpoint: [this.model.endpoint, Validators.required],
        method: [this.model.method, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm() {
    this.model.event = this.form.value.event;
    this.model.endpoint = this.form.value.endpoint;
    this.model.method = this.form.value.method;
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
    if (!this.model.webhook_id) {
      // Create
      action = this.webhookService.create(this.model);
    } else {
      // Update
      action = this.webhookService.update(this.model);
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
