import { Component } from '@angular/core';
import { ViewController, LoadingController, AlertController, NavParams, ToastController } from 'ionic-angular';

// Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../validators/custom.validator';

// Providers
import { StaffService } from '../../../../providers/logged-in/staff.service';

// Models
import { Staff } from '../../../../models/staff';

@Component({
  selector: 'page-staff-form',
  templateUrl: 'staff-form.html'
})
export class StaffFormPage {

  public model: Staff;
  public operation:string;

  public form: FormGroup;

  constructor(
    params: NavParams,
    public staffService: StaffService,
    private _fb: FormBuilder,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ){
    // Load the passed model if available
    this.model = params.get('model');

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
    this._viewCtrl.dismiss(data);
  }

  /**
   * Save the model
   */
  save(){
    let loader = this._loadingCtrl.create();
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

    action.subscribe(jsonResponse => {
      loader.dismiss();

      // On Success
      if(jsonResponse.operation == "success"){
        
        // Close the page
        let data = { 'refresh': true };
        this._viewCtrl.dismiss(data);
        
        //success toast
        let toast = this._toastCtrl.create({
          message: "Staff Member "+this.model.staff_name+' account created successfully',
          duration: 3000
        });
        toast.present();
      }

      // On Failure
      if (jsonResponse.operation == "error") {
        var html = '';

        for (let i in jsonResponse.message) {
          for (let j of jsonResponse.message[i]) {
             html += j + '<br />';
          }
        }
        
        //failer text
        let prompt = this._alertCtrl.create({
          message: html,
          buttons: ["Ok"]
        });
        prompt.present();
      }
    });
  }
}
