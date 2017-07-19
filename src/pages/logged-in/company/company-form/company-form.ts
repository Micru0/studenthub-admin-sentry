import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams, ToastController } from 'ionic-angular';
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
  public isSubCompany:number=0;
  public form: FormGroup;

  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public companyService: CompanyService,
    private _fb: FormBuilder,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ){
    // Load the passed model if available
    // this.isSubCompany = 0;
    this.model = this.params.get('model');
    this.isSubCompany = this.params.get('subcompany');
    // console.log('subcompany='+this.isSubCompany);

    if (this.model.parent_company_id){
      this.model.parent_company_id = this.model.parent_company_id;
      this.isSubCompany = 1;
    }
    // Init Form
  
    if(!this.model.company_id){ // Show Create Form
      
      this.operation  = (this.isSubCompany) ? "Create Sub-company" : "Create Company";
      if (this.isSubCompany) {
        this.form = this._fb.group({
          name: ["", Validators.required],
        });
      } else {
        this.form = this._fb.group({
          name: ["", Validators.required],
          email: ["", [Validators.required, CustomValidator.emailValidator]],
          password: ["", Validators.required]
        });
      }
    } else { // Show Update Form
      this.operation  = (this.isSubCompany) ? "Update  Sub-company" : "Update Company";
      if (this.isSubCompany) {
        this.form = this._fb.group({
            name: [this.model.company_name, Validators.required],
        });
      } else {
        this.form = this._fb.group({
            name: [this.model.company_name, Validators.required],
            email: [this.model.company_email, [Validators.required, CustomValidator.emailValidator]],
            password: [this.model.company_password_hash] //not required
        });
      }
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

    if (!this.model.company_id) {
      // Create
      action = this.companyService.create(this.model);
    } else {
      // Update
      action =  this.companyService.update(this.model);
    }

    action.subscribe(jsonResponse => {
      loader.dismiss();

      // On Success
      if(jsonResponse.operation == "success"){
        // Close the page
        let data = { 'refresh': true };
        this._viewCtrl.dismiss(data);

        let toast = this._toastCtrl.create({
          message: this.model.company_name+' account saved successfully',
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
