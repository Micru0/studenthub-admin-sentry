import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
// models
import { Inspector } from 'src/app/models/inspector';
// services
import { InspectorService } from 'src/app/providers/logged-in/inspector.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-inspector-form',
  templateUrl: './inspector-form.page.html',
  styleUrls: ['./inspector-form.page.scss'],
})
export class InspectorFormPage implements OnInit {

  public loading = false;

  public saving = false;

  public inspector_uuid;

  public model: Inspector = new Inspector();

  public operation: string;

  public form: FormGroup;

  public type: string = 'password';

  constructor(
    private authService: AuthService,
    public  inspectorService: InspectorService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public  modalCtrl: ModalController
  ) {
  }

  ngOnInit() {

    // Load the passed model if available
    if (window.history.state && window.history.state.model) {
      this.model = window.history.state.model;
    }

    // this.admin_id = this.activateRoute.snapshot.paramMap.get('admin_id');

    if (this.inspector_uuid && !this.model) {
      this.loadData(this.inspector_uuid);
    } else {
      this._initForm();
    }
  }

  /**
   * load data
   * @param inspector_uuid
   */
  loadData(inspector_uuid) {

    this.loading = true;

    this.inspectorService.view(inspector_uuid).subscribe(model => {
      this.model = model;

      this.loading = false;

      this._initForm();
    }, () => {

      this.loading = false;
    });
  }

  _initForm() {
    // Init Form
    if (!this.model.inspector_uuid){ // Show Create Form
      this.operation = 'Create Inspector';
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, CustomValidator.emailValidator]],
        password: ['', Validators.required],
      });
    }else{ // Show Update Form
      this.operation = 'Update Inspector';
      this.form = this.fb.group({
        name: [this.model.inspector_name, Validators.required],
        email: [this.model.inspector_email, [Validators.required, CustomValidator.emailValidator]],
        password: [this.model.inspector_password_hash],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.inspector_name = this.form.value.name;
    this.model.inspector_email = this.form.value.email;
    this.model.inspector_password_hash = this.form.value.password;
  }

  /**
   * Close the page
   */
  close(){
    const data = { refresh: false };
    this.modalCtrl.dismiss(data);
  }

  /**
   * Save the model
   */
  async save() {

    this.saving = true;

    this.updateModelDataFromForm();

    let action;
    if (!this.model.inspector_uuid){
      // Create
      action = this.inspectorService.create(this.model);
    }else{
      // Update
      action = this.inspectorService.update(this.model);
    }

    action.subscribe(async jsonResponse => {

      this.saving = false;

      // On Success
      if (jsonResponse.operation == 'success') {

        // Close the page
        const data = { refresh: true };
        this.modalCtrl.dismiss(data);

        // success toast
        const toast = await this.toastCtrl.create({
          message: 'Inspector Member ' + this.model.inspector_name + ' account created successfully',
          duration: 3000
        });
        toast.present();
      }

      // On Failure
      if (jsonResponse.operation == 'error') {

        const prompt = await this.alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ['Ok']
        });
        prompt.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.type = this.type == 'password'? 'text': 'password';
  }
}
