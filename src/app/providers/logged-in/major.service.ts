import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Major } from '../../models/major';


/**
 * Manages Major Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private _majorEndpoint: string = "/majors";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all major
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._majorEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  /**
   * return major detail 
   * @param major_uuid 
   */
  view(major_uuid: number): Observable<any>{
    let url = this._majorEndpoint + '/' + major_uuid;
    return this._authhttp.get(url);
  }

  /**
   * Create major
   * @param {Major} model
   * @returns {Observable<any>}
   */
  create(model: Major): Observable<any>{
    let postUrl = `${this._majorEndpoint}`;
    let params = {
      "name_en": model.major_name_en,
      "name_ar": model.major_name_ar
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update major
   * @param {Major} model
   * @returns {Observable<any>}
   */
  update(model: Major): Observable<any>{
    let url = `${this._majorEndpoint}/${model.major_uuid}`;
    let params = {
      "name_en": model.major_name_en,
      "name_ar": model.major_name_ar
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes major
   * @param {Major} model
   * @returns {Observable<any>}
   */
  delete(model: Major): Observable<any>{
    let url = `${this._majorEndpoint}/${model.major_uuid}`;
    return this._authhttp.delete(url);
  }
}
