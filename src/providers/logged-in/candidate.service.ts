import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Candidate } from '../../models/candidate';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class CandidateService {

  private _candidateEndpoint: string = "/candidates";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all candidate to review changes 
   * @returns {Observable<any>}
   */
  listByStore(store_id: number, page: number): Observable<any>{
    let url = this._candidateEndpoint + '/filter/' + store_id + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * List of all candidate to review changes 
   * @returns {Observable<any>}
   */
  listToReview(page: number): Observable<any>{
    let url = this._candidateEndpoint + '/review?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._candidateEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Deletes a comment
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  delete(model: Candidate): Observable<any>{
    let url = `${this._candidateEndpoint}/${model.candidate_id}`;
    return this._authhttp.delete(url);
  }

  /**
   * Deletes a comment
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  approve(model: Candidate): Observable<any>{
    let url = `${this._candidateEndpoint}/approve/${model.candidate_id}`;
    return this._authhttp.patch(url, {});
  }

}
