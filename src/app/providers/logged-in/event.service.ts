import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpService } from './authhttp.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _endpoint = '/events';

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * import excel 
   * @param {eventName} String
   * @param {excelUrl} String
   * @returns {Observable<any>}
   */
   importExcel(eventName: string, excelUrl: string): Observable<any> {
    let url = `${this._endpoint}`;
    return this._authhttp.post(url, {
      event: eventName,
      excel: excelUrl
    });
  }
}
