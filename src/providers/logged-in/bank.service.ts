import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Bank } from '../../models/bank';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class BankService {

  private _bankEndpoint: string = "/banks";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(): Observable<any>{
    let url = this._bankEndpoint;
    return this._authhttp.get(url);
  }

  /**
   * Create
   * @param {Bank} model
   * @returns {Observable<any>}
   */
  create(model: Bank): Observable<any>{
    let postUrl = `${this._bankEndpoint}`;
    let params = {
      "name": model.bank_name
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {Bank} model
   * @returns {Observable<any>}
   */
  update(model: Bank): Observable<any>{
    let url = `${this._bankEndpoint}/${model.bank_id}`;
    let params = {
      "name": model.bank_name,
      "company_id": model.bank_id
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {Bank} model
   * @returns {Observable<any>}
   */
  delete(model: Bank): Observable<any>{
    let url = `${this._bankEndpoint}/${model.bank_id}`;
    return this._authhttp.delete(url);
  }


}
