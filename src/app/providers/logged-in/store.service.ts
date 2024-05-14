import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Store } from '../../models/store';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _storeEndpoint: string = "/stores";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all store
   * @returns {Observable<any>}
   */
  list(): Observable<any>{
    let url = this._storeEndpoint;
    return this._authhttp.get(url);
  }
  
  /**
   * return store detail 
   * @param store_id 
   */
  view(store_id): Observable<any>{
    return this._authhttp.get(`${this._storeEndpoint}/${store_id}?expand=storeManager,candidates,brand,company,company.brands`);
  }

  /**
   * Create store
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
   * Update store
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
   * Deletes store
   * @param {Store} model
   * @returns {Observable<any>}
   */
  delete(model: Store): Observable<any>{
    let url = `${this._storeEndpoint}/${model.store_id}`;
    return this._authhttp.delete(url);
  }

  /**
   * get login url and open in new window 
   * @param store_id 
   * @returns 
   */
  login(store_id): Observable<any>{
    let url = `${this._storeEndpoint}/login/${store_id}`;
    return this._authhttp.post(url, {});
  }
}
