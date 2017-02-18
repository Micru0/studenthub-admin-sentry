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
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   */
  create(name: string, email: string, password: string): Observable<any>{
    let postUrl = `${this._companyEndpoint}`;
    let params = {
      "name": name,
      "email": email,
      "password": password,
    };
    
    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {number} id
   * @param {string} name
   * @param {string} email
   * @returns {Observable<any>}
   */
  update(id: number, name: string, email: string): Observable<any>{
    let url = `${this._companyEndpoint}`;
    let params = {
      "id": id,
      "name": name,
      "email": email
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {number} id
   * @returns {Observable<any>}
   */
  delete(id: number): Observable<any>{
    let url = `${this._companyEndpoint}/${id}`;
    return this._authhttp.delete(url);
  }


}
