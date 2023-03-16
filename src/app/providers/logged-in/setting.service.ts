import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// Services
import { AuthHttpService } from './authhttp.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private _endpoint: string = "/setting";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * list settings
   * @returns 
   */
  list(): Observable<any> {
    return this._authhttp.get(this._endpoint);
  }

  /**
   * update settings
   * @param params 
   * @returns 
   */
  update(params): Observable<any> {
    return this._authhttp.patch(this._endpoint, params);
  }
}
