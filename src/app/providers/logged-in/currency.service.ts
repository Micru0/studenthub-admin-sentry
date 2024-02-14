import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Currency } from '../../models/currency';


/**
 * Manages currency Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _currencyEndpoint: string = "/currencies";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * load currency detail
   * @param currency_id 
   */
  view(currency_id) {
    let url = this._currencyEndpoint + '/' + currency_id;
    return this._authhttp.get(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._currencyEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * Create Currency
   * @param {Currency} model
   * @returns {Observable<any>}
   */
  create(model: Currency): Observable<any>{
    let postUrl = `${this._currencyEndpoint}`;
    return this._authhttp.post(postUrl, model);
  }

  /**
   * Update Currency
   * @param {Currency} model
   * @returns {Observable<any>}
   */
  update(model: Currency): Observable<any>{
    let url = `${this._currencyEndpoint}/${model.currency_id}`;
    return this._authhttp.patch(url, model);
  }

  /**
   * Delete Currency
   * @param {Currency} model
   * @returns {Observable<any>}
   */
  delete(model: Currency): Observable<any>{
    let url = `${this._currencyEndpoint}/${model.currency_id}`;
    return this._authhttp.delete(url);
  }
}
