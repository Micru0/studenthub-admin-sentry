import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { AuthService } from 'src/app/providers/auth.service';
//models
import {Country} from "src/app/models/country";
import {CountryService} from "../../../../providers/logged-in/country.service";

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.page.html',
  styleUrls: ['./country-form.page.scss'],
})
export class CountryFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public country_id;

  public model: Country;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public countryService: CountryService,
    public authService: AuthService,
    private _fb: FormBuilder,
    private modalCtrl: ModalController,
    private _alertCtrl: AlertController
  ){
  }

  ionViewDidEnter(){
    if (this.authService.admin_limited_access) {
      this.close();
    }
  }

  ngOnInit() {

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.country_id = this.activateRoute.snapshot.paramMap.get('country_id');

    if(this.country_id && !this.model) {
      this.loadData(this.country_id);
    } else {
      this._initForm();
    }
  }

  loadData(country_id) {
    this.loading = true; 

    this.countryService.view(country_id).subscribe(bank => {
      this.model = bank; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.country_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name_en: ["", Validators.required],
        name_ar: ["", Validators.required],
        nationality_name_en: ["", Validators.required],
        nationality_name_ar: ["", Validators.required]
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name_en: [this.model.country_name_en, Validators.required],
        name_ar: [this.model.country_name_ar, Validators.required],
        nationality_name_en: [this.model.country_nationality_name_en, Validators.required],
        nationality_name_ar: [this.model.country_nationality_name_ar, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.country_name_en = this.form.value.name_en;
    this.model.country_name_ar = this.form.value.name_ar;
    this.model.country_nationality_name_en = this.form.value.nationality_name_en;
    this.model.country_nationality_name_ar = this.form.value.nationality_name_ar;
    this.model.country_from_google_map = 0;
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
    if(!this.model.country_id){
      // Create
      action = this.countryService.create(this.model);
    }else{
      // Update
      action = this.countryService.update(this.model);
    }

    action.subscribe(async jsonResponse => {
      
      this.saving = false;

      // On Success
      if(jsonResponse.operation == "success"){
        // Close the page
        let data = { 'refresh': true,'model':jsonResponse.detail };
        this.modalCtrl.dismiss(data);
      }

      // On Failure
      if (jsonResponse.operation == "error") {
        
        //failer text
        let prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ["Ok"]
        });
        prompt.present();
      }
    }, () => {
      this.saving = false;
    });
  }  
}
