import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Company } from '../../models/company';


/**
 * Manages Company Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _companyEndpoint: string = "/companies";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all companies
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._companyEndpoint + '?page=' + page + '&expand=files';
    return this._authhttp.get(url, true);
  }

  /**
   * Create company
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
      "bonus_commission": model.company_bonus_commission,
      "hourly_rate": model.company_hourly_rate
    };

    return this._authhttp.post(postUrl, params);
  }
  
  /**
   * Update company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  update(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}`;
    let params = {
      "parent": model.parent_company_id,
      "name": model.company_name,
      "email": model.company_email,
      "bonus_commission": model.company_bonus_commission,
      "hourly_rate": model.company_hourly_rate
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  delete(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}`;
    return this._authhttp.delete(url);
  }

  /**
   * View company detail
   * @param {Company} model
   * @returns {Observable<any>}
   */
  view(model: Company): Observable<any>{
    let url = `${this._companyEndpoint}/${model.company_id}?expand=subCompanies,stores,files`;
    return this._authhttp.get(url);
  }  

  /**
   * Reset Password
   * @param {Company} model
   * @returns {Observable<any>}
   */
  resetPassword(model: Company): Observable<any> {
    let url = `${this._companyEndpoint}/reset-password/${model.company_id}`;
    return this._authhttp.patch(url, {});
  }
}
