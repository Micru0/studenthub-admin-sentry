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
  get(param): Observable<any>{
    let url = this._endpoint +'?param=1'+ param;
    return this._authhttp.get(url);
  }

  /**
   * clear cache in backend 
   * @returns 
   */
  clearCache(): Observable<any>{
    let url = this._endpoint +'/clear-cache';
    return this._authhttp.get(url);
  }

  /**
   * return transfer stats
   * @returns
   */
  viewTransfers(param = null): Observable<any>{
    let url = this._endpoint + '/transfer?param=1'+ param;
    return this._authhttp.get(url);
  }
}
