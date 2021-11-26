import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//models
import { RequestChecklist } from 'src/app/models/request-checklist';
//services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class RequestChecklistService {

  private _endpoint: string = "/request-checklists";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all university
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._endpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  /**
   * return university detail 
   * @param request_checklist_uuid 
   */
  view(request_checklist_uuid: number): Observable<any>{
    let url = this._endpoint + '/' + request_checklist_uuid;
    return this._authhttp.get(url);
  }

  /**
   * Create university
   * @param {RequestChecklist} model
   * @returns {Observable<any>}
   */
  create(model: RequestChecklist): Observable<any>{
    let postUrl = `${this._endpoint}`;
    return this._authhttp.post(postUrl, model);
  }

  /**
   * Update university
   * @param {RequestChecklist} model
   * @returns {Observable<any>}
   */
  update(model: RequestChecklist): Observable<any>{
    let url = `${this._endpoint}/${model.request_checklist_uuid}`;
    return this._authhttp.patch(url, model);
  }

  /**
   * Deletes university
   * @param {RequestChecklist} model
   * @returns {Observable<any>}
   */
  delete(model: RequestChecklist): Observable<any>{
    let url = `${this._endpoint}/${model.request_checklist_uuid}`;
    return this._authhttp.delete(url);
  }
}
