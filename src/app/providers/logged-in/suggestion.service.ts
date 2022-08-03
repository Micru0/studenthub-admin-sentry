import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private _endPoint = '/suggestions';

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List request
   * @returns {Observable<any>}
   */
  list(page: number, params): Observable<any>{
    const url = this._endPoint + '?page=' + page + params;
    return this._authhttp.get(url, true);
  }
}
