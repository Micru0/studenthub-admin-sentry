import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//models
import { DailyStandupQuestion } from 'src/app/models/daily-standup-question';
//services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class DailyStandupQuestionService {

  private _endpoint: string = "/daily-standup-questions";

  constructor(private _authhttp: AuthHttpService) { }

  listAnswers(page: number, param): Observable<any>{
    let url = this._endpoint + '/list-answers?page=' + page + param;
    return this._authhttp.get(url, true);
  }

  /**
   * load bank detail
   * @param question_uuid
   */
  view(question_uuid) {
    let url = this._endpoint + '/' + question_uuid;
    return this._authhttp.get(url);
  }

  /**
   * List of all question
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._endpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * Create DailyStandupQuestion
   * @param {DailyStandupQuestion} model
   * @returns {Observable<any>}
   */
  create(model: DailyStandupQuestion): Observable<any>{
    let postUrl = `${this._endpoint}`;
    let params = {
      "question": model.question
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update DailyStandupQuestion
   * @param {DailyStandupQuestion} model
   * @returns {Observable<any>}
   */
  update(model: DailyStandupQuestion): Observable<any>{
    let url = `${this._endpoint}/${model.question_uuid}`;
    let params = {
      "question": model.question
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Delete DailyStandupQuestion
   * @param {DailyStandupQuestion} model
   * @returns {Observable<any>}
   */
  delete(model: DailyStandupQuestion): Observable<any>{
    let url = `${this._endpoint}/${model.question_uuid}`;
    return this._authhttp.delete(url);
  }
}
