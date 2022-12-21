import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
//services
import { ExpenseService } from 'src/app/providers/logged-in/expense.service';
import { AuthService } from 'src/app/providers/auth.service';
//models
import { Expense } from 'src/app/models/expense';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.page.html',
  styleUrls: ['./expense-form.page.scss'],
})
export class ExpenseFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public expense_uuid;

  public model: Expense;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public expenseService: ExpenseService,
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
    window.analytics.page('Expense Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.expense_uuid = this.activateRoute.snapshot.paramMap.get('expense_uuid');

    if(this.expense_uuid && !this.model) {
      this.loadData(this.expense_uuid);
    } else {
      this._initForm();
    }
  }

  loadData(expense_uuid) {
    this.loading = true; 

    this.expenseService.view(expense_uuid).subscribe(expense => {
      this.model = expense; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.expense_uuid) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        title: ["", Validators.required],
        type: ["", Validators.required],
        detail: [""],
        amount: ["", Validators.required],
        transaction_datetime: []
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        title: [this.model.title, Validators.required],
        type: [this.model.type, Validators.required],
        detail: [this.model.detail],
        amount: [this.model.amount, Validators.required],
        transaction_datetime: [this.model.transaction_datetime]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.title = this.form.value.title;
    this.model.type = this.form.value.type;
    this.model.detail = this.form.value.detail;
    this.model.amount = this.form.value.amount;
    this.model.transaction_datetime = this.form.value.transaction_datetime;
    
    this.model.transaction_datetime = format(parseISO(this.form.controls['transaction_datetime'].value), 
      'yyyy-MM-dd HH:mm:ss');//, { timeZone: '+3:30' }
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
    if(!this.model.expense_uuid){
      // Create
      action = this.expenseService.create(this.model);
    }else{
      // Update
      action = this.expenseService.update(this.model);
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
