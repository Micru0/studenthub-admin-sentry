import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
//models
import { StaffSalary } from 'src/app/models/staff_salary';
//services
import { AuthService } from 'src/app/providers/auth.service';
import {StaffSalaryService} from "src/app/providers/logged-in/staff.salary.service";
import {StaffService} from "../../../../providers/logged-in/staff.service";


@Component({
  selector: 'app-staff-salary-form',
  templateUrl: './staff-salary-form.page.html',
  styleUrls: ['./staff-salary-form.page.scss'],
})
export class StaffSalaryFormPage implements OnInit {

  public loading: boolean = false;

  public saving: boolean = false;

  public staff_id;

  public staff_salary_uuid;

  public model: StaffSalary;

  public operation:string;

  public form: FormGroup;

  constructor(
    private authService: AuthService,
    public staffService: StaffService,
    public staffSalaryService: StaffSalaryService,
    private _fb: FormBuilder,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    window.analytics.page('Staff Salary Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.staff_id = this.activateRoute.snapshot.paramMap.get('staff_id');

    if(this.staff_salary_uuid && !this.model) {
      this.loadData(this.staff_salary_uuid);
    } else {
      this._initForm();
    }
  }

  loadData(staff_salary_uuid) {

    this.loading = true;

    this.staffService.viewSalary(staff_salary_uuid).subscribe(model => {
      this.model = model;

      this.loading = false;

      this._initForm();
    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    // Init Form
    if(!this.model.staff_salary_uuid){ // Show Create Form
      this.operation = "Add Staff Salary Entry";
      this.form = this._fb.group({
        salary: ["", Validators.required],
        salary_currency: ["KWD", [Validators.required]],
        comment: [""],
        salary_date: [],
      });
    }else{ // Show Update Form
      this.operation = "Update Staff Salary Entry";
      this.form = this._fb.group({
        salary: [this.model.salary, Validators.required],
        salary_currency: [this.model.salary_currency, [Validators.required]],
        comment: [this.model.comment],
        salary_date: [this.model.salary_date],
      });
    }
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

    let params = this.form.value;

    params.salary_date = format(parseISO(this.form.controls['salary_date'].value),
      'yyyy-MM-dd HH:mm:ss');//, { timeZone: '+3:30' }

    let action;
    if(!this.model.staff_id){
      // Create
      action = this.staffSalaryService.addSalary(this.staff_id, params);
    }else{
      // Update
      action = this.staffSalaryService.updateSalary(this.staff_salary_uuid, params);
    }

    action.subscribe(async jsonResponse => {

      this.saving = false;

      // On Success
      if(jsonResponse.operation == "success") {

        // Close the page
        let data = { 'refresh': true };
        this.modalCtrl.dismiss(data);

        //success toast
        /*let toast = await this._toastCtrl.create({
          message: "Staff Member "+this.model.staff_name+' account created successfully',
          duration: 3000
        });
        toast.present();*/
      }

      // On Failure
      if (jsonResponse.operation == "error") {

        let prompt = await this._alertCtrl.create({
          message: this.authService.errorMessage(jsonResponse.message),
          buttons: ["Okay"]
        });
        prompt.present();
      }
    });
  }
}
