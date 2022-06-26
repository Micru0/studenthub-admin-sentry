import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { BankService } from 'src/app/providers/logged-in/bank.service';
import { AuthService } from 'src/app/providers/auth.service';
//models
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.page.html',
  styleUrls: ['./bank-form.page.scss'],
})
export class BankFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public bank_id;

  public model: Bank;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public bankService: BankService,
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
    window.analytics.page('Bank Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.bank_id = this.activateRoute.snapshot.paramMap.get('bank_id');

    if(this.bank_id && !this.model) {
      this.loadData(this.bank_id);
    } else {
      this._initForm();
    }
  }

  loadData(bank_id) {
    this.loading = true; 

    this.bankService.view(bank_id).subscribe(bank => {
      this.model = bank; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.bank_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name: ["", Validators.required],
        swift_code: ["", Validators.required],
        bank_iban_code: ["", Validators.required],
        address: ["", Validators.required],
        type: ["", Validators.required]
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name: [this.model.bank_name, Validators.required],
        swift_code: [this.model.bank_swift_code, Validators.required],
        bank_iban_code: [this.model.bank_iban_code, Validators.required],
        address: [this.model.bank_address, Validators.required],
        type: [this.model.bank_transfer_type, Validators.required]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.bank_name = this.form.value.name;
    this.model.bank_swift_code = this.form.value.swift_code;
    this.model.bank_address = this.form.value.address;
    this.model.bank_iban_code = this.form.value.bank_iban_code;
    this.model.bank_transfer_type = this.form.value.type;
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
    if(!this.model.bank_id){
      // Create
      action = this.bankService.create(this.model);
    }else{
      // Update
      action = this.bankService.update(this.model);
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
