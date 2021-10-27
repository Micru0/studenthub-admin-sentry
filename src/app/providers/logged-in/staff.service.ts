import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Staff } from '../../models/staff';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private _staffEndpoint: string = "/staff";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._staffEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  view(staff_id): Observable<any>{
    let url = this._staffEndpoint + '/' + staff_id;
    return this._authhttp.get(url);
  }

  /**
   * Create staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  create(model: Staff): Observable<any>{
    let postUrl = `${this._staffEndpoint}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email,
      "password": model.staff_password_hash,
      "gmail_username": model.staff_gmail_username,
      "gmail_password": model.staff_gmail_password,
      "role": model.staff_role
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  update(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email,
      "gmail_username": model.staff_gmail_username,
      "gmail_password": model.staff_gmail_password,
      "role": model.staff_role
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Send new password to staff
   * @param model 
   */
  resetPassword(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/reset-password/${model.staff_id}`;
    return this._authhttp.patch(url, {});
  }

  /**
   * Deletes staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  delete(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    return this._authhttp.delete(url);
  }
}
