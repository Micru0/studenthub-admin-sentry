import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { DegreeGroup } from '../../models/degree-group';


/**
 * Manages DegreeGroup Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class DegreeGroupService {

  private _degreeEndpoint: string = "/degree-groups";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all degree
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._degreeEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  /**
   * return degree detail 
   * @param degree_group_uuid 
   */
  view(degree_group_uuid: number): Observable<any>{
    let url = this._degreeEndpoint + '/' + degree_group_uuid;
    return this._authhttp.get(url);
  }

  /**
   * Create degree
   * @param {DegreeGroup} model
   * @returns {Observable<any>}
   */
  create(model: DegreeGroup): Observable<any>{
    let postUrl = `${this._degreeEndpoint}`;
    let params = {
      "name_en": model.degree_group_name_en,
      "name_ar": model.degree_group_name_ar,
      "sort_order": model.degree_group_sort_order
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update degree
   * @param {DegreeGroup} model
   * @returns {Observable<any>}
   */
  update(model: DegreeGroup): Observable<any>{
    let url = `${this._degreeEndpoint}/${model.degree_group_uuid}`;
    let params = {
      "name_en": model.degree_group_name_en,
      "name_ar": model.degree_group_name_ar,
      "sort_order": model.degree_group_sort_order
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes degree
   * @param {DegreeGroup} model
   * @returns {Observable<any>}
   */
  delete(model: DegreeGroup): Observable<any>{
    let url = `${this._degreeEndpoint}/${model.degree_group_uuid}`;
    return this._authhttp.delete(url);
  }
}
