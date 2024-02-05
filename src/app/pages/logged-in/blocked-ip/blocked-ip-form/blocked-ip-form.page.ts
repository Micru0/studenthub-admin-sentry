import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { BlockedIpService } from 'src/app/providers/logged-in/blocked-ip.service';
//models
import { BlockedIp } from 'src/app/models/blocked-ip';


@Component({
  selector: 'app-blocked-ip-form',
  templateUrl: './blocked-ip-form.page.html',
  styleUrls: ['./blocked-ip-form.page.scss'],
})
export class BlockedIpFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public ip_uuid;

  public model: BlockedIp;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public blockedIpService: BlockedIpService,
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
    window.analytics.page('BlockedIp Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.ip_uuid = this.activateRoute.snapshot.paramMap.get('ip_uuid');

    if(this.ip_uuid && !this.model) {
      this.loadData(this.ip_uuid);
    } else {
      this._initForm();
    }
  }

  loadData(ip_uuid) {
    this.loading = true; 

    this.blockedIpService.view(ip_uuid).subscribe(resp => {

      this.model = resp; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.ip_uuid) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        ip_address: ["", Validators.required],
        note: [""]
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        ip_address: ["", Validators.required],
        note: [""]
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.ip_address = this.form.value.ip_address;
    this.model.note = this.form.value.note;
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
    if(!this.model.ip_uuid){
      // Create
      action = this.blockedIpService.create(this.model);
    }else{
      // Update
      action = this.blockedIpService.update(this.model);
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

