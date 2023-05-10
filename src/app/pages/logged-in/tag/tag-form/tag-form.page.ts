import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
//services
import { TagService } from 'src/app/providers/logged-in/tag.service';
import { AuthService } from 'src/app/providers/auth.service';
//models
import { Tag } from 'src/app/models/tag';


@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.page.html',
  styleUrls: ['./tag-form.page.scss'],
})
export class TagFormPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public tag_id;

  public model: Tag;
  public operation:string;

  public form: FormGroup;

  constructor( 
    public activateRoute: ActivatedRoute,
    public tagService: TagService,
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
    window.analytics.page('Tag Form Page');

    // Load the passed model if available
    if(window['state']) {
      this.model = window['state']['model'];
    }

    //this.tag_id = this.activateRoute.snapshot.paramMap.get('tag_id');

    if(this.tag_id && !this.model) {
      this.loadData(this.tag_id);
    } else {
      this._initForm();
    }
  }

  loadData(tag_id) {
    this.loading = true; 

    this.tagService.view(tag_id).subscribe(tag => {
      this.model = tag; 

      this.loading = false;

      this._initForm();

    }, () => {

      this.loading = false;
    })
  }

  _initForm() {

    if(!this.tag_id) { // Show Create Form
      this.operation = "Create";
      this.form = this._fb.group({
        name: ["", Validators.required],
      });
    } else { // Show Update Form
      this.operation = "Update";
      this.form = this._fb.group({
        name: [this.model.tag, Validators.required],
      });
    }
  }

  /**
   * Update Model Data based on Form Input
   */
  updateModelDataFromForm(){
    this.model.tag = this.form.value.name;
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
    if(!this.model.tag_id){
      // Create
      action = this.tagService.create(this.model);
    }else{
      // Update
      action = this.tagService.update(this.model);
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
