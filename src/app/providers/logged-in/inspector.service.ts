import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Inspector } from '../../models/inspector';

/**
 * Manages inspector Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class InspectorService {

  private endpoint = '/inspectors';

  constructor(private authHttp: AuthHttpService) { }

  /**
   * list all inspector
   * @param page
   */
  list(page: number): Observable<any>{
    return this.authHttp.get(this.endpoint + '?page=' + page, true);
  }

  /**
   * view admin detail
   * @param inspectorID
   */
  view(inspectorID): Observable<any>{
    return this.authHttp.get(this.endpoint + '/' + inspectorID);
  }

  /**
   * create inspector
   * @param model
   */
  create(model: Inspector): Observable<any>{

    return this.authHttp.post(`${this.endpoint}`, {
      name : model.inspector_name,
      email : model.inspector_email,
    });
  }

  /**
   * update inspector
   * @param model
   */
  update(model: Inspector): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/${model.inspector_uuid}`, {
      name: model.inspector_name,
      email: model.inspector_email
    });
  }

  /**
   * Send new password to inspector
   * @param model
   */
  resetPassword(model: Inspector): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/reset-password/${model.inspector_uuid}`, {});
  }

  /**
   * Deletes inspector
   * @param {Inspector} model
   * @returns {Observable<any>}
   */
  delete(model: Inspector): Observable<any>{
    return this.authHttp.delete(`${this.endpoint}/${model.inspector_uuid}`);
  }
}
