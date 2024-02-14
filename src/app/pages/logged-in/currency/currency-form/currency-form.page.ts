 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { CurrencyService } from 'src/app/providers/logged-in/currency.service';
import { AuthService } from 'src/app/providers/auth.service';
//models
import { Currency } from 'src/app/models/currency';


@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.page.html',
  styleUrls: ['./currency-form.page.scss'],
})
export class CurrencyFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public currency_id;

  public model: Currency;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public currencyService: CurrencyService,
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
    window.analytics.page('Currency Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.currency_id = this.activateRoute.snapshot.paramMap.get('currency_id');

    if(this.currency_id && !this.model) {
      this.loadData(this.currency_id);
    } else {
      this._initForm();
    }
  }

  loadData(currency_id) {
    this.loading = true; 

    this.currencyService.view(currency_id).subscribe(currency => {
      this.model = currency; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {
    
    if(!this.currency_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        title: ["", Validators.required],
        code: ["", Validators.required],
        currency_symbol: ["", Validators.required],
        rate: ["", Validators.required],
        sort_order: ["", Validators.required],
        status: [false, Validators.required],
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        title: [this.model.title, Validators.required],
        code: [this.model.code, Validators.required],
        currency_symbol: [this.model.currency_symbol, Validators.required],
        rate: [this.model.rate, Validators.required],
        sort_order: [this.model.sort_order, Validators.required],
        status: [this.model.status, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.title = this.form.value.title;
    this.model.code = this.form.value.code;
    this.model.currency_symbol = this.form.value.currency_symbol;
    this.model.rate = this.form.value.rate;
    this.model.sort_order = this.form.value.sort_order;
    this.model.status = this.form.value.status;
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
    if(!this.model.currency_id){
      // Create
      action = this.currencyService.create(this.model);
    }else{
      // Update
      action = this.currencyService.update(this.model);
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
