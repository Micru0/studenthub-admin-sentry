import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Company } from '../../models/company';
import {File} from '../../models/file';


/**
 * Manages Company Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _companyEndpoint = '/companies';

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all companies
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    const url = this._companyEndpoint + '?page=' + page + '&expand=files';
    return this._authhttp.get(url, true);
  }

  /**
   * Create company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  create(model: Company): Observable<any>{
    const postUrl = `${this._companyEndpoint}`;
    const params = {
      parent: model.parent_company_id,
      name: model.company_name,
      email: model.company_email,
      password: model.company_password_hash,
      bonus_commission: model.company_bonus_commission,
      hourly_rate: model.company_hourly_rate,
      common_name_en : model.company_common_name_en,
      common_name_ar : model.company_common_name_ar,
      description_en : model.company_description_en,
      description_ar : model.company_description_ar,
      website : model.company_website,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  update(model: Company): Observable<any>{
    const params = {
      parent: model.parent_company_id,
      name: model.company_name,
      email: model.company_email,
      bonus_commission: model.company_bonus_commission,
      hourly_rate: model.company_hourly_rate,
      common_name_en : model.company_common_name_en,
      common_name_ar : model.company_common_name_ar,
      description_en : model.company_description_en,
      description_ar : model.company_description_ar,
      website : model.company_website,
    };

    return this._authhttp.patch(`${this._companyEndpoint}/${model.company_id}`, params);
  }

  /**
   * Deletes company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  delete(model: Company): Observable<any>{
    return this._authhttp.delete(`${this._companyEndpoint}/${model.company_id}`);
  }

  /**
   * View company detail
   * @param {Company} model
   * @returns {Observable<any>}
   */
  view(model: Company): Observable<any>{
    const url = `${this._companyEndpoint}/${model.company_id}?expand=subCompanies,stores,files,brands`;
    return this._authhttp.get(url);
  }

  /**
   * Reset Password
   * @param {Company} model
   * @returns {Observable<any>}
   */
  resetPassword(model: Company): Observable<any> {
    const url = `${this._companyEndpoint}/reset-password/${model.company_id}`;
    return this._authhttp.patch(url, {});
  }


  /**
   * create file for company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  createFile(model: File): Observable<any>{
    const url = `${this._companyEndpoint}/file-create/${model.company_id}`;
    const params = {
      file_title: model.file_title,
      file_description: model.file_description,
      file_s3_path: model.file_s3_path,
    };

    return this._authhttp.post(url, params);
  }

  /**
   * create file for company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  updateFile(model: File): Observable<any>{
    const url = `${this._companyEndpoint}/file-update/${model.file_uuid}`;
    const params = {
      file_title: model.file_title,
      file_description: model.file_description
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes company
   * @param {Company} model
   * @returns {Observable<any>}
   */
  deleteDoc(model: File): Observable<any>{
    const url = `${this._companyEndpoint}/remove-file/${model.file_uuid}`;
    return this._authhttp.delete(url);
  }

  /**
   * change company status
   * @param model
   * @param status
   */
  changeStatus(model: Company, status: number = 10): Observable<any> {
    const url = `${this._companyEndpoint}/change-status/${model.company_id}`;
    return this._authhttp.patch(url, {status});
  }
}
