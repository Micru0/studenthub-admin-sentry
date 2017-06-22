import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Staff } from '../../models/staff';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class StaffService {

  private _staffEndpoint: string = "/staff";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._staffEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Create
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  create(model: Staff): Observable<any>{
    let postUrl = `${this._staffEndpoint}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email,
      "password": model.staff_password_hash,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  update(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  delete(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    return this._authhttp.delete(url);
  }
}
