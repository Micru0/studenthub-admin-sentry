import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Platform, Events, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser, NativeStorage } from 'ionic-native';

import { ConfigService } from './config.service';

/*
  Handles all Auth functions
*/
@Injectable()
export class AuthService {

  public isLoggedIn = false;

  // Logged in agent details
  private _accessToken;
  public agentId: number;
  public name: string;
  public email: string;

  private _browser: InAppBrowser;
  private _browserLoadEvents;
  private _browserCloseEvents;

  private _urlBasicAuth: string = "/auth/login";
  private _urlValidateGoogle: string = "/auth/validate";
  private _urlCreateAccount: string = "/auth/create-account";
  private _urlRequestResetPassword: string = "/auth/request-reset-password";
  private _urlResendVerificationEmail: string = "/auth/resend-verification-email";
  private _urlVerifyEmail: string = "/auth/verify";
  private _urlResetPassword: string = "/auth/update-password";

  constructor(
    private _http: Http,
    private _platform: Platform,
    private _config: ConfigService,
    private _events: Events,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
    ) {
      _platform.ready().then(() => {
        this._updateLoginStatus();
      });
    }

  /**
   * Sets this.isLoggedIn based on availability of BEARER Access Token
   */
  private _updateLoginStatus(){
    if(this.getAccessToken()){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
      this._events.publish("user:logout");
    }
  }

  /**
   * Logs a user out by setting logged in to false and clearing token from localStorage
   * @param {string} [reason]
   */
  logout(reason?: string){
    // Remove from LocalStorage
    window.localStorage.removeItem('bearer');
    window.localStorage.removeItem('agentId');
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('email');

    // Remove from NativeStorage if this is iOS or Android
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      NativeStorage.remove("loggedInAgent").then(() => {
        // alert("deleted from nativestorage");
      });
    }

    this._accessToken = null;
    this._updateLoginStatus();

    this._events.publish('user:logout', reason?reason:false);
  }

  /**
   * Set the access token
   * @param {string} token
   * @param {number} id
   * @param {string} name
   * @param {string} email
   */
  setAccessToken(token: string, id: number, name: string, email: string){
    this._accessToken = token;
    this.name = name;
    this.agentId = id;
    this.email = email;

    // Update Public Login Status
    this._updateLoginStatus();

    // Save Token in LocalStorage
    window.localStorage.setItem('bearer', token);
    window.localStorage.setItem('agentId', id+"");
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('email', email);

    // Save in NativeStorage if iOS and Android
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      NativeStorage.setItem('loggedInAgent', {
        'bearer': token,
        'agentId': id+"",
        'name': name,
        'email': email
      }).then(
        () => {
          // alert("Saved in nativestorage");
        },
        error => console.error('Error storing access token', error)
      );
    }

    // Log User In by Triggering Event that Access Token has been Set
    this._events.publish('user:login', 'TokenSet');
  }

  /**
   * Get Access Token from Service or LocalStorage
   * @returns {string} token
   */
  getAccessToken(){
    // Return Access Token if set already
    if(this._accessToken){
      return this._accessToken;
    }

    // Check Local Storage and Try Again
    if(localStorage.getItem("bearer")){
      this.setAccessToken(
        localStorage.getItem("bearer"),
        +localStorage.getItem("agentId"),
        localStorage.getItem("name"),
        localStorage.getItem("email"));
      return this.getAccessToken();
    }

    // Check Native Storage and Try Again
    // Native storage is implemented because some devices clear LocalStorage regularly to save memory
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      NativeStorage.getItem('loggedInAgent')
      .then(
        data => {
          this.setAccessToken(data.bearer, data.agentId, data.name, data.email);
          return this.getAccessToken();
        },
        error => console.error(error)
      );
    }


    // No Access Token Available
    return false;
  }

  /**
   * Basic auth, exchanges access details for a bearer access token to use in
   * subsequent requests.
   * @param  {string} email
   * @param  {string} password
   */
  basicAuth(email: string, password: string): Observable<any>{
    // Add Basic Auth Header with Base64 encoded email and password
    const authHeader = new Headers();
    authHeader.append("Authorization", "Basic "+ btoa(`${email}:${password}`));

    const url = this._config.apiBaseUrl+this._urlBasicAuth;

    return this._http.get(url, {
        headers: authHeader
      })
      .first()
      .map((res: Response) => res.json());
  }


}
