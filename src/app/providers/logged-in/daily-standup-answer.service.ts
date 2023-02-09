import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class DailyStandupAnswerService {

  private _endpoint: string = "/daily-standup-answers";

  constructor(private _authhttp: AuthHttpService) { }

  listAnswers(page: number): Observable<any>{
    let url = this._endpoint + '/list-answers?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * @param staffId
   * @param date
   */
  view(staffId, date) {
    let url = `${this._endpoint}/${staffId}/${date}`;
    return this._authhttp.get(url);
  }

  /**
   * List of all answer
   * @returns {Observable<any>}
   */
  list(page: number, param = ' '): Observable<any>{
    let url = this._endpoint + '?page=' + page + '&expand=staff,question' + param;
    return this._authhttp.get(url, true);
  }

  /**
   * List of all inactive
   * @returns {Observable<any>}
   */
  listInactive(page: number, param = ' '): Observable<any>{
    let url = this._endpoint + '/list-inactive?page=' + page + '&expand=staff' + param;
    return this._authhttp.get(url, true);
  }
}
