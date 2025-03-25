import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
//services
import { SettingService } from 'src/app/providers/logged-in/setting.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public loading: boolean = false; 

  public saving: boolean = false; 
  
  public form: FormGroup;

  public settings; 

  public type = {};

  public isProduction: boolean = false;
  
  constructor(
    private _fb: FormBuilder, 
    private _toastCtrl: ToastController,
    private _alertCtrl: AlertController,
    public authService: AuthService,
    public settingService: SettingService
  ) { }

  ngOnInit() {
    window.analytics.page('Setting Page');

    this.isProduction = environment.production;

    this.loadData();
  }

  loadData() {

    this.loading = true; 

    this.settingService.list().subscribe(data => {

      this.settings = data; 

      this._initForm();

      this.loading = false;

      this._initForm();
    }, () => {

      this.loading = false;
    })
  }

  _initForm() {
    const group: any = {};

    this.settings.forEach(setting => {
      group[setting.key] = new FormControl(setting.value);
    });

    this.form = this._fb.group(group); 
  }

  /**
   * Close the page
   *
  close() {
    let data = { 'refresh': false };
    this.modalCtrl.dismiss(data);
  }*/

  /**
   * Save the model
   */
  async save() {
    
    this.saving = true;
 
    this.settingService.update(this.form.value).subscribe(async jsonResponse => {
      
      this.saving = false;

      // On Success
      if(jsonResponse.operation == "success") {
        
        //success toast
        let toast = await this._toastCtrl.create({
          message: jsonResponse.message,
          duration: 3000
        });
        toast.present();
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

  togglePasswordVisibility(field) {
    if(!this.type[field] || this.type[field] == 'password')
      this.type[field] = 'text'; 
    else 
      this.type[field] = 'password';
  }
}
