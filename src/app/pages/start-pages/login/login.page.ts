import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { EventService } from 'src/app/providers/event.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public type: string = 'password';

  public loginForm: FormGroup;

  // Disable submit button if loading response
  public isLoading = false;

  // Store old email and password to make sure user won't make same mistake twice
  public oldEmailInput = '';
  public oldPasswordInput = '';

  // Store number of invalid password attempts to suggest reset password
  private numberOfLoginAttempts = 0;

  public loading: boolean = false; 

  constructor(
    public platform: Platform,
    public auth0: Auth0Service,
    private fb: FormBuilder,
    private auth: AuthService,
    public eventService: EventService,
    private alertCtrl: AlertController
  ) {
    // Initialize the Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      password: ['', Validators.required],
      currency_code: [this.auth.currency_pref || "KWD"],
    });
  }

  ngOnInit(): void {
    window.analytics.page('Login Page');

    this.eventService.googleLoginFinished$.subscribe(() => {
      this.loading = false;
    });
  }

  /**
   * Attempts to login with the provided email and password
   */
  async onSubmit() {
    this.isLoading = true;

    const email = this.oldEmailInput = this.loginForm.value.email;
    const password = this.oldPasswordInput = this.loginForm.value.password;

    this.auth.basicAuth(email, password).subscribe(async res => {

      this.isLoading = false;

      if (res.operation == 'success') {
        // Successfully logged in, set the access token within AuthService
        this.auth.setAccessToken(res, true);
      } else if (res.operation == 'error') {
        const alert = await this.alertCtrl.create({
          header: 'Unable to Log In',
          message: res.message,
          buttons: ['Ok'],
        });
        alert.present();
      }

    }, async err => {

      this.isLoading = false;

      // Incorrect email or password
      if (err.status == 401) {
        this.numberOfLoginAttempts++;

        // Check how many login attempts this user made, offer to reset password
        if (this.numberOfLoginAttempts > 2) {
          const alert = await this.alertCtrl.create({
            header: 'Trouble Logging In?',
            message: 'If you\'ve forgotten your password, contact us to have it reset.',
            buttons: ['Ok'],
          });
          alert.present();
        }
        else {
          const alert = await this.alertCtrl.create({
            header: 'Invalid email or password',
            message: 'The information entered is incorrect. Please try again.',
            buttons: ['Try Again'],
          });
          alert.present();
        }
      } else {
        /**
         * Error not accounted for. Show Message
         */
        const alert = await this.alertCtrl.create({
          header: 'Unable to Log In',
          message: 'There seems to be an issue connecting to Payroll servers. Please contact us if the issue persists.',
          buttons: ['Ok'],
        });
        alert.present();
      }
    });
  }

  /**
   * redirec to auth0
   */
  loginWithRedirect() {
    const url = this.platform.is('hybrid') ? `co.studenthub.staff://view/tasks`: null;
    this.auth0.loginWithRedirect({ redirect_uri: url })
  }

  /**
   * login by google on capacitor app 
   */
  loginByGoogle() {
    this.loading = true; 

    this.auth.loginByGoogle();
  } 

  togglePasswordVisibility() {
    this.type = this.type == 'password'? 'text': 'password';
  }

  onCurrencyChange(event) {
    this.auth.currency_pref = event.detail.value;
    this.auth.saveInStorage();
  }
}
