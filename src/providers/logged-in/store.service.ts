import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Store } from '../../models/store';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class StoreService {

  private _storeEndpoint: string = "/stores";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(): Observable<any>{
    let url = this._storeEndpoint;
    return this._authhttp.get(url);
  }

  /**
   * Create
   * @param {Store} model
   * @returns {Observable<any>}
   */
  create(model: Store): Observable<any>{
    let postUrl = `${this._storeEndpoint}`;
    let params = {
      "name": model.store_name,
      "company_id": model.company_id
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {Store} model
   * @returns {Observable<any>}
   */
  update(model: Store): Observable<any>{
    let url = `${this._storeEndpoint}/${model.store_id}`;
    let params = {
      "name": model.store_name,
      "company_id": model.company_id
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {Store} model
   * @returns {Observable<any>}
   */
  delete(model: Store): Observable<any>{
    let url = `${this._storeEndpoint}/${model.store_id}`;
    return this._authhttp.delete(url);
  }
}
