import { Component, OnInit } from '@angular/core';
import { Webhook } from 'src/app/models/webhook';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
//services
import { WebhookService } from 'src/app/providers/logged-in/webhook.service';


@Component({
  selector: 'app-webhook-test',
  templateUrl: './webhook-test.page.html',
  styleUrls: ['./webhook-test.page.scss'],
})
export class WebhookTestPage implements OnInit {

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
    window.analytics.page('Webhook Test Page');

    if (!this.model || !this.model.webhook_id) { // Show Create Test
      this.operation = "Create";
      this.form = this._fb.group({
        event: ["", Validators.required],
        endpoint: ["", Validators.required],
        method: ["", Validators.required],
        data:['{ "data" : "value" }'],
      });
    } else { // Show Update Test
      this.operation = "Update";
      this.form = this._fb.group({
        event: [this.model.event, Validators.required],
        endpoint: [this.model.endpoint, Validators.required],
        method: [this.model.method, Validators.required],
        data:['{ "data" : "value" }'],
      });
    }
  }

  /**
   * Update Model Data based on Test Input
   */
  updateModelDataFromTest() {
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

    this.updateModelDataFromTest();

    this.webhookService.test(this.model, this.form.value.data).subscribe(async jsonResponse => {
      
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
