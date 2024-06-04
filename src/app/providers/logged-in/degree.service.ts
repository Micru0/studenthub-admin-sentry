import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Degree } from '../../models/degree';


/**
 * Manages Degree Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  private _degreeEndpoint: string = "/degrees";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all degree
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._degreeEndpoint + '?expand=degreeGroup&page=' + page;
    return this._authhttp.get(url, true);
  }
  
  /**
   * return degree detail 
   * @param degree_uuid 
   */
  view(degree_uuid: number): Observable<any>{
    let url = this._degreeEndpoint + '/' + degree_uuid + '?expand=degreeGroup';
    return this._authhttp.get(url);
  }

  /**
   * Create degree
   * @param {Degree} model
   * @returns {Observable<any>}
   */
  create(model: Degree): Observable<any>{
    let postUrl = `${this._degreeEndpoint}`;
    let params = {
      "name_en": model.degree_name_en,
      "name_ar": model.degree_name_ar,
      "degree_group_uuid": model.degree_group_uuid,
      "sort_order": model.degree_sort_order
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update degree
   * @param {Degree} model
   * @returns {Observable<any>}
   */
  update(model: Degree): Observable<any>{
    let url = `${this._degreeEndpoint}/${model.degree_uuid}`;
    let params = {
      "name_en": model.degree_name_en,
      "name_ar": model.degree_name_ar,
      "degree_group_uuid": model.degree_group_uuid,
      "sort_order": model.degree_sort_order
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes degree
   * @param {Degree} model
   * @returns {Observable<any>}
   */
  delete(model: Degree): Observable<any>{
    let url = `${this._degreeEndpoint}/${model.degree_uuid}`;
    return this._authhttp.delete(url);
  }
}
