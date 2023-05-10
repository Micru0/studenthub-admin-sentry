import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Tag } from '../../models/tag';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _tagEndpoint: string = "/tags";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * load tag detail
   * @param tag_id 
   */
  view(tag_id) {
    let url = this._tagEndpoint + '/' + tag_id;
    return this._authhttp.get(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._tagEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * Create Tag
   * @param {Tag} model
   * @returns {Observable<any>}
   */
  create(model: Tag): Observable<any>{
    let postUrl = `${this._tagEndpoint}`;
    let params = {
      "tag": model.tag,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update Tag
   * @param {Tag} model
   * @returns {Observable<any>}
   */
  update(model: Tag): Observable<any>{
    let url = `${this._tagEndpoint}/${model.tag_id}`;
    let params = {
      "tag": model.tag, 
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Delete Tag
   * @param {Tag} model
   * @returns {Observable<any>}
   */
  delete(model: Tag): Observable<any>{
    let url = `${this._tagEndpoint}/${model.tag_id}`;
    return this._authhttp.delete(url);
  }
}
