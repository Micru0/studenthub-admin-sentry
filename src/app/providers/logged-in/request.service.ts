import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _endPoint = '/requests';

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List request
   * @returns {Observable<any>}
   */
  list(page: number, params): Observable<any>{
    const url = this._endPoint + '?page=' + page + params;
    return this._authhttp.get(url, true);
  }

  /**
   * view data
   * @returns {Observable<any>}
   */
  view(uuid): Observable<any>{
    const url = this._endPoint + '/' + uuid + '?expand=requestCreatedBy,company,suggestions,suggestions.candidate,invitations,invitations.candidate,staffs,requestActivities,requestActivities.updatedBy';
    return this._authhttp.get(url);
  }
}
