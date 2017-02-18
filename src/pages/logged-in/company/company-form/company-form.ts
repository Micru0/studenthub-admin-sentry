import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';
// Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../validators/custom.validator';
// Providers
import { CompanyService } from '../../../../providers/logged-in/company.service';
// Models
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-company-form',
  templateUrl: 'company-form.html'
})
export class CompanyFormPage {

  public model: Company;
  public operation:string;

  public form: FormGroup;

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    public companyService: CompanyService,
    private _fb: FormBuilder,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ){
    // Load the passed model if available
    this.model = params.get('model');

    // Init Form
    if(!this.model.company_id){ // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name: ["", Validators.required],
        email: ["", [Validators.required, CustomValidator.emailValidator]],
        password: ["", Validators.required]
      });
    }else{ // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name: [this.model.company_name, Validators.required],
        email: [this.model.company_email, [Validators.required, CustomValidator.emailValidator]],
        password: [this.model.company_password_hash] //not required
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.company_name = this.form.value.name;
    this.model.company_email = this.form.value.email;
    this.model.company_password_hash = this.form.value.password;
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
    if(!this.model.company_id){
      // Create
      action = this.companyService.create(this.model);
    }else{
      // Update
      action = this.companyService.update(this.model);
    }

    action.subscribe(jsonResponse => {
      loader.dismiss();

      // On Success
      if(jsonResponse.operation == "success"){
        // Close the page
        let data = { 'refresh': true };
        this._viewCtrl.dismiss(data);
      }

      // On Failure
      if(jsonResponse.operation == "error"){
        let prompt = this._alertCtrl.create({
          message: JSON.stringify(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    });
  }

}
