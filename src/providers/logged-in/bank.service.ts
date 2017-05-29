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
  list(page: number): Observable<any>{
    let url = this._bankEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Create
   * @param {Bank} model
   * @returns {Observable<any>}
   */
  create(model: Bank): Observable<any>{
    let postUrl = `${this._bankEndpoint}`;
    let params = {
      "name": model.bank_name,
      "swift_code": model.bank_swift_code,
      "address": model.bank_address
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
      "company_id": model.bank_id,
      "swift_code": model.bank_swift_code,
      "address": model.bank_address
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
