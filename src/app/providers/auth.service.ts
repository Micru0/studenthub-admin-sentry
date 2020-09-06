import { Injectable, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { catchError, first, take, map, retryWhen } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
// services
import { EventService } from './event.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public renderer;

  public isLogin = false;

  // Logged in agent details
  private _accessToken;
  public id: number;
  public name: string;
  public email: string;
  public admin_limited_access: any;
  public theme: string;

  private _urlBasicAuth = '/auth/login';

  constructor(
    public rendererFactory: RendererFactory2,
    public _http: HttpClient,
    public router: Router,
    private eventService: EventService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    /**
     * new router changes don't wait for startup service
     * https://github.com/angular/angular/issues/14615
     */
    return new Promise(async resolve => {

      if (this.isLogin) {
        resolve(true);
      }

      const ret = await Storage.get({ key: 'loggedInAdmin' });

      const user = JSON.parse(ret.value);

      if (user) {

        this.isLogin = true;
        this._accessToken = user.token;
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.admin_limited_access = user.admin_limited_access;
        this.theme = user.theme;

        resolve(true);
      } else {
        resolve(false);
        this.logout('invalid access');
      }
    });
  }

  // This is the method you want to call at bootstrap
  async load(): Promise<any> {
    const ret = await Storage.get({ key: 'loggedInAdmin' });

    const admin = JSON.parse(ret.value);

    if (admin && admin.token) {
      return this.setAccessToken(admin);
    } else {
      // return this.logout('error with store variables',true);
    }

    const { value } = await Storage.get({ key: 'theme' });

    if (value) {
      this.setTheme(value);
    }
  }


  /**
   * Get Access Token from Service or Cookie
   * @returns {string} token
   */
  getAccessToken(redirect = false) {

    // Return Access Token if set already
    if (this._accessToken) {
      return this._accessToken;
    }

    Storage.get({ key: 'loggedInAdmin' }).then(ret => {
      const user = JSON.parse(ret.value);

      if (user) {
        this.setAccessToken(user, redirect);
        this._accessToken = user.token;
      }
    });

    return this._accessToken;
  }

  /**
   * Logs a user out by setting logged in to false and clearing token from storage
   * @param {string} [reason]
   * @param {boolean} [silent]
   */
  logout(reason?: string, silent = false) {

    this.isLogin = false;

    // Remove from Storage then process logout

    this._accessToken = null;
    this.id = null;
    this.name = null;
    this.email = null;
    this.admin_limited_access = null;
    Storage.clear();

    if (!silent) {
      this.eventService.userLogout$.next(reason ? reason : false);
    }
  }

  /**
   * set app theme
   * @param theme
   */
  setTheme(theme) {
    Storage.set({
      key: 'theme',
      value: theme
    });

    this.theme = theme;

    if (theme == 'night') {
      this.renderer.removeClass(document.body, 'day');
      this.renderer.addClass(document.body, 'night');
    } else {
      this.renderer.addClass(document.body, 'day');
      this.renderer.removeClass(document.body, 'night');
    }
  }

  /**
   * Set the access token
   */
  setAccessToken(response, redirect = false) {

    this._accessToken = response.token;
    this.id = response.id;
    this.name = response.name;
    this.email = response.email;
    this.admin_limited_access = response.admin_limited_access;

    // Save to Storage
    this.saveInStorage();

    if (this._accessToken) {
      this.isLogin = true;
      this.eventService.userLogin$.next({ redirect });
    }
  }

  /**
   * Save user data in storage
   */
  saveInStorage() {
    Storage.set({
      key: 'loggedInAdmin',
      value: JSON.stringify({
        token: this._accessToken,
        id: this.id,
        name: this.name,
        email: this.email,
        admin_limited_access: this.admin_limited_access
      })
    });
  }

  /**
   * Basic auth, exchanges access details for a bearer access token to use in
   * subsequent requests.
   * @param  {string} email
   * @param  {string} password
   */
  basicAuth(email: string, password: string): Observable<any> {
    // Add Basic Auth Header with Base64 encoded email and password

    const authHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    });

    const url = environment.apiEndpoint + this._urlBasicAuth;

    return this._http.get(url, {
      headers: authHeader
    })
      .pipe(
        take(1),
        // map((res: Response) => res)
      );
  }

  /**
   * json to string error message
   * @param message
   */
  errorMessage(message): string {

    if (message.length) {
      return message + '';
    }

    const a = [];

    for (const i in message) {

      if (!Array.isArray(message[i])) {
        a.push(message[i]);
        continue;
      }

      for (const j of message[i]) {
        a.push(j);
      }
    }

    return a.join('<br />');
  }
}
