import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private _endpoint: string = "/statistics";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * list statistics
   * @returns {Observable<any>}
   */
  get(): Observable<any>{
    let url = this._endpoint;
    return this._authhttp.get(url);
  }

  /**
   * return transfer stats 
   * @returns 
   */
  viewTransfers(): Observable<any>{
    let url = this._endpoint + '/transfer';
    return this._authhttp.get(url);
  }
}