import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';

/**
 * Manages Company Functionality on the server
 */
@Injectable()
export class CompanyService {

  private _companyEndpoint: string = "/companies";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all companies
   * @returns {Observable<any>}
   */
  list(): Observable<any>{
    let url = this._companyEndpoint;
    return this._authhttp.get(url);
  }

  /**
   * Create
   * @param {any} model
   * @returns {Observable<any>}
   */
  create(model: any): Observable<any>{
    let postUrl = `${this._companyEndpoint}`;
    let params = {
      "name": model.name,
      "email": model.email,
      "password": model.password,
    };
    
    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {any} model
   * @returns {Observable<any>}
   */
  update(model: any): Observable<any>{
    let url = `${this._companyEndpoint}`;
    let params = {
      "id": model.id,
      "name": model.name,
      "email": model.email
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {any} model
   * @returns {Observable<any>}
   */
  delete(model: any): Observable<any>{
    let url = `${this._companyEndpoint}/${model.id}`;
    return this._authhttp.delete(url);
  }


}
