import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Company } from '../../models/company';

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
  listSubCompanies(company_id: number): Observable<any>{
    let url = this._companyEndpoint + '/sub-companies/' + company_id;
    return this._authhttp.get(url);
  }

  /**
   * List of all companies
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._companyEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Create
   * @param {Company} model
   * @returns {Observable<any>}
   */
  create(model: Company): Observable<any>{
    let postUrl = `${this._companyEndpoint}`;
    let params = {
      "parent": model.parent_company_id,
      "name": model.company_name,
      "email": model.company_email,
      "password": model.company_password_hash,
    };

    return this._authhttp.post(postUrl, params);
  }
  
  /**
   * Update
   * @param {Company} model
   * @returns {Observable<any>}
   */
  update(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}`;
    let params = {
      "parent": model.parent_company_id,
      "name": model.company_name,
      "email": model.company_email
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {Company} model
   * @returns {Observable<any>}
   */
  delete(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}`;
    return this._authhttp.delete(url);
  }

  /**
   * View company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  view(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}`;
    return this._authhttp.get(url);
  }
}
