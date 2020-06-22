import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
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

  public staff_id;

  public model: Staff;
  public operation:string;

  public form: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    public staffService: StaffService,
    private _fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {

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
        password: ["", Validators.required]
      });
    }else{ // Show Update Form
      this.operation = "Update Staff";
      this.form = this._fb.group({
        name: [this.model.staff_name, Validators.required],
        email: [this.model.staff_email, [Validators.required, CustomValidator.emailValidator]],
        password: [this.model.staff_password_hash] //not required
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
    let loader = await this._loadingCtrl.create();
    loader.present();

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
      loader.dismiss();

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
}
