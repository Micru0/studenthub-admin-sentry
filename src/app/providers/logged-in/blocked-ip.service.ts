import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { BlockedIp } from '../../models/blocked-ip';


@Injectable({
  providedIn: 'root'
})
export class BlockedIpService {

  private _urlEndpoint: string = "/blocked-ips";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * load Blocked Ip detail
   * @param ip_uuid 
   */
  view(ip_uuid) {
    let url = this._urlEndpoint + '/' + ip_uuid;
    return this._authhttp.get(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._urlEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * Create BlockedIp
   * @param {BlockedIp} model
   * @returns {Observable<any>}
   */
  create(model: BlockedIp): Observable<any>{
    let postUrl = `${this._urlEndpoint}`;
    let params = {
      "note": model.note,
      "ip_address": model.ip_address,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update BlockedIp
   * @param {BlockedIp} model
   * @returns {Observable<any>}
   */
  update(model: BlockedIp): Observable<any>{
    let url = `${this._urlEndpoint}/${model.ip_uuid}`;
    let params = {
      "note": model.note,
      "ip_address": model.ip_address,
    };
    return this._authhttp.patch(url, params);
  }

  /**
   * Delete BlockedIp
   * @param {BlockedIp} model
   * @returns {Observable<any>}
   */
  delete(model: BlockedIp): Observable<any>{
    let url = `${this._urlEndpoint}/${model.ip_uuid}`;
    return this._authhttp.delete(url);
  }
}
