import { Injectable } from '@angular/core';
import { AuthHttpService } from './authhttp.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailLogService {

  private _endpoint: string = "/mail-logs";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List mail logs
   * @returns {Observable<any>}
   */
  list(page: number, query: string = null): Observable<any>{
    let url = this._endpoint + '?page=' + page;

    if (query) {
        url += '&query='+query
    }
    return this._authhttp.get(url, true);
  }

  /**
   * view details 
   * @param mail_uuid 
   * @returns 
   */
  view(mail_uuid: string): Observable<any>{
    let url = this._endpoint + '/' + mail_uuid;
    return this._authhttp.get(url);
  }

  /**
   * get stats of email log by days 
   * @param days 
   * @returns 
   */
  stats(days: number): Observable<any>{
    let url = this._endpoint + '/stats/' + days;
    return this._authhttp.get(url);
  }
}
