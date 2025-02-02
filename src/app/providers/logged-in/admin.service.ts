import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Admin } from '../../models/admin';


/**
 * Manages Admin Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private endpoint = '/admins';

  constructor(private authHttp: AuthHttpService) { }

  /**
   * list all admin
   * @param page
   */
  list(page: number): Observable<any>{
    return this.authHttp.get(this.endpoint + '?page=' + page, true);
  }

  /**
   * view admin detail
   * @param adminID
   */
  view(adminID): Observable<any>{
    return this.authHttp.get(this.endpoint + '/' + adminID);
  }

  /**
   * create admin
   * @param model
   */
  create(model: Admin): Observable<any>{

    return this.authHttp.post(`${this.endpoint}`, {
      name : model.admin_name,
      email : model.admin_email,
      password : model.admin_password_hash,
      limited_access: model.admin_limited_access,
      enable_two_step_auth: model.enable_two_step_auth
    });
  }


  update(model: Admin): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/${model.admin_id}`, {
      name: model.admin_name,
      email: model.admin_email,
      limited_access: model.admin_limited_access,
      enable_two_step_auth: model.enable_two_step_auth
    });
  }

  /**
   * Send new password to admin
   * @param model
   */
  resetPassword(model: Admin): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/reset-password/${model.admin_id}`, {});
  }


  changeStatus(model: Admin, status): Observable<any>{
    let url = `${this.endpoint}/status-change/${model.admin_id}`;
    return this.authHttp.patch(url, {status : status});
  }
  /**
   * Deletes admin
   * @param {Admin} model
   * @returns {Observable<any>}
   */
  delete(model: Admin): Observable<any>{
    return this.authHttp.delete(`${this.endpoint}/${model.admin_id}`);
  }
}
