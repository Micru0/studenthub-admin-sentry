import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { ActivatedRoute } from '@angular/router';
//models
import { Staff } from 'src/app/models/staff';
//services
import { StaffService } from 'src/app/providers/logged-in/staff.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.page.html',
  styleUrls: ['./staff-form.page.scss'],
})
export class StaffFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public staff_id;

  public model: Staff;

  public operation:string;

  public form: FormGroup;

  public type: string = 'password';

  constructor( 
    private authService: AuthService,
    public staffService: StaffService,
    private _fb: FormBuilder, 
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    window.analytics.page('Staff Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.staff_id = this.activateRoute.snapshot.paramMap.get('staff_id');

    if(this.staff_id && !this.model) {
      this.loadData(this.staff_id);
    } else {
      this._initForm();
    }
  }

  loadData(staff_id) {

    this.loading = true; 

    this.staffService.view(staff_id).subscribe(model => {
      this.model = model; 

      this.loading = false;

      this._initForm();
    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    // Init Form
    if(!this.model.staff_id){ // Show Create Form
      this.operation = "Create Staff";
      this.form = this._fb.group({
        name: ["", Validators.required],
        email: ["", [Validators.required, CustomValidator.emailValidator]],
        password: ["", Validators.required],
        gmail_username: [""],
        gmail_password: [""],
        role: [null],
        job_title: ['', Validators.required],
        salary: ['', Validators.required],
        salary_currency: ['KWD', Validators.required],
      });
    }else{ // Show Update Form
      this.operation = "Update Staff";
      this.form = this._fb.group({
        name: [this.model.staff_name, Validators.required],
        email: [this.model.staff_email, [Validators.required, CustomValidator.emailValidator]],
        password: [this.model.staff_password_hash], // not required,
        gmail_username: [this.model.staff_gmail_username],
        gmail_password: [this.model.staff_gmail_password],
        role: [this.model.staff_role + ''],
        job_title: [this.model.staff_job_title, Validators.required],
        salary: [this.model.staff_salary, Validators.required],
        salary_currency: [this.model.staff_salary_currency, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.staff_name = this.form.value.name;
    this.model.staff_email = this.form.value.email;
    this.model.staff_password_hash = this.form.value.password;
    this.model.staff_gmail_username = this.form.value.gmail_username;
    this.model.staff_gmail_password = this.form.value.gmail_password;
    this.model.staff_role = this.form.value.role;
    this.model.staff_job_title = this.form.value.job_title;
    this.model.staff_salary = this.form.value.salary;
    this.model.staff_salary_currency = this.form.value.salary_currency;
  }

  /**
   * Close the page
   */
  close(){
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
    if(!this.model.staff_id){
      // Create
      action = this.staffService.create(this.model);
    }else{
      // Update
      action = this.staffService.update(this.model);
    }

    action.subscribe(async jsonResponse => {
      
      this.saving = false;

      // On Success
      if(jsonResponse.operation == "success") {
        
        // Close the page
        let data = { 'refresh': true };
        this.modalCtrl.dismiss(data);
        
        //success toast
        let toast = await this._toastCtrl.create({
          message: "Staff Member "+this.model.staff_name+' account created successfully',
          duration: 3000
        });
        toast.present();
      }

      // On Failure
      if (jsonResponse.operation == "error") {

        let prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.type = this.type == 'password'? 'text': 'password';
  }
}
