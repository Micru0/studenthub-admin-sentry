import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';
// Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Providers
import { UniversityService } from '../../../../providers/logged-in/university.service';
// Models
import { University } from '../../../../models/university';

@Component({
  selector: 'page-university-form',
  templateUrl: 'university-form.html'
})
export class UniversityFormPage {

  public model: University;
  public operation:string;

  public form: FormGroup;

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    public universityService: UniversityService,
    private _fb: FormBuilder,
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ){
    // Load the passed model if available
    this.model = params.get('model');

    // Init Form
    if(!this.model.university_id){ // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name_en: ["", Validators.required],
        name_ar: ["", Validators.required]
      });
    }else{ // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name_en: [this.model.university_name_en, Validators.required],
        name_ar: [this.model.university_name_ar, Validators.required]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.university_name_en = this.form.value.name_en;
    this.model.university_name_ar = this.form.value.name_ar;
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
    if(!this.model.university_id){
      // Create
      action = this.universityService.create(this.model);
    }else{
      // Update
      action = this.universityService.update(this.model);
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
