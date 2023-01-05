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
   * load detail
   * @param question_uuid
   */
  view(question_uuid) {
    let url = this._endpoint + '/' + question_uuid;
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
}
