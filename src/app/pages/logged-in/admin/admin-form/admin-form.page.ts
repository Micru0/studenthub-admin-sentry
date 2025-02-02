import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
// models
import { Admin } from 'src/app/models/admin';
// services
import { AdminService } from 'src/app/providers/logged-in/admin.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.page.html',
  styleUrls: ['./admin-form.page.scss'],
})
export class AdminFormPage implements OnInit {

  public loading = false;

  public saving = false;

  public admin_id;

  public model: Admin = new Admin();
  public operation: string;

  public form: FormGroup;

  public type: string = 'password';

  constructor(
    private authService: AuthService,
    public adminService: AdminService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    window.analytics.page('Admin Form Page');

    // Load the passed model if available
    if (window.history.state && window.history.state.model) {
      this.model = window.history.state.model;
    }

    // this.admin_id = this.activateRoute.snapshot.paramMap.get('admin_id');

    if (this.admin_id && !this.model) {
      this.loadData(this.admin_id);
    } else {
      this._initForm();
    }
  }

  loadData(admin_id) {

    this.loading = true;

    this.adminService.view(admin_id).subscribe(model => {
      this.model = model;

      this.loading = false;

      this._initForm();
    }, () => {

      this.loading = false;
    });
  }

  _initForm() {
    // Init Form
    if (!this.model.admin_id){ // Show Create Form
      this.operation = 'Create Admin';
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, CustomValidator.emailValidator]],
        password: ['', Validators.required],
        limited_access: [0],
        enable_two_step_auth: [0]
      });
    }else{ // Show Update Form
      this.operation = 'Update Admin';
      this.form = this.fb.group({
        name: [this.model.admin_name, Validators.required],
        email: [this.model.admin_email, [Validators.required, CustomValidator.emailValidator]],
        password: [this.model.admin_password_hash],
        limited_access: [this.model.admin_limited_access],
        enable_two_step_auth: [this.model.enable_two_step_auth]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.admin_name = this.form.value.name;
    this.model.admin_email = this.form.value.email;
    this.model.admin_password_hash = this.form.value.password;
    this.model.admin_limited_access = this.form.value.limited_access;
    this.model.enable_two_step_auth = this.form.value.enable_two_step_auth;
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
    if (!this.model.admin_id){
      // Create
      action = this.adminService.create(this.model);
    }else{
      // Update
      action = this.adminService.update(this.model);
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
          message: 'Admin Member ' + this.model.admin_name + ' account created successfully',
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

  onTwoStepAuthChange(event) {
    this.model.enable_two_step_auth = (event.detail.checked) ? 1 : 0;
    this.form.patchValue({
      enable_two_step_auth: this.model.enable_two_step_auth
    });
  }

  onchange($event) {
    this.model.admin_limited_access = ($event.detail.checked) ? 1 : 0;
  }

  togglePasswordVisibility() {
    this.type = this.type == 'password'? 'text': 'password';
  }
}
