import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { University } from '../../models/university';

/**
 * Manages University Functionality on the server
 */
@Injectable()
export class UniversityService {

  private _universityEndpoint: string = "/universities";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._universityEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Create
   * @param {University} model
   * @returns {Observable<any>}
   */
  create(model: University): Observable<any>{
    let postUrl = `${this._universityEndpoint}`;
    let params = {
      "name_en": model.university_name_en,
      "name_ar": model.university_name_ar
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update
   * @param {University} model
   * @returns {Observable<any>}
   */
  update(model: University): Observable<any>{
    let url = `${this._universityEndpoint}/${model.university_id}`;
    let params = {
      "name_en": model.university_name_en,
      "name_ar": model.university_name_ar
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes a comment
   * @param {University} model
   * @returns {Observable<any>}
   */
  delete(model: University): Observable<any>{
    let url = `${this._universityEndpoint}/${model.university_id}`;
    return this._authhttp.delete(url);
  }


}
