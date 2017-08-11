import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Candidate } from '../../models/candidate';
import { Store } from '../../models/store';
import { Country } from '../../models/country';
import { University } from '../../models/university';
/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class CandidateService {
  
  private _candidateEndpoint: string = "/candidates";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all candidates
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._candidateEndpoint + '?page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * Deletes Candidate
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  delete(model: Candidate): Observable<any>{
    let url = `${this._candidateEndpoint}/${model.candidate_id}`;
    return this._authhttp.delete(url);
  }
  
  /**
   * candidate transfer list 
   * @returns {Observable<any>}
   */
  transfers(id:number): Observable<any> {
    let url = this._candidateEndpoint + '/transfers/' + id;
    return this._authhttp.get(url);
  }

  /**
   * approve candidate
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  approve(model: Candidate): Observable<any>{
    let url = `${this._candidateEndpoint}/approve/${model.candidate_id}`;
    return this._authhttp.patch(url, {});
  }
  
  /**
   * Filter data by country
   * @param country 
   * @param page 
   */
  listByCountry(country: Country, page: number): Observable<any>{
    let url = `${this._candidateEndpoint}/search?by=country_id&country_id=${country.country_id} &page=$page`;
    return this._authhttp.getRaw(url);
  }

 /**
   * List of all candidate by store
   * @returns {Observable<any>}
   */
  listByStore(store: Store, page: number): Observable<any>{
    let url = `${this._candidateEndpoint}/search?by=store_id&store_id=${store.store_id}&page=${page}`;
    return this._authhttp.getRaw(url);
  }

  /**
   * No. of all candidate to review changes 
   * @returns {Observable<any>}
   */
  totalToReview(): Observable<any>{
    let url = this._candidateEndpoint + '/total-to-review';
    return this._authhttp.get(url);
  }
  
  /**
   * List of all candidate to review changes 
   * @returns {Observable<any>}
   */
  listToReview(page: number): Observable<any>{
    let url = this._candidateEndpoint + '/search?by=review&review=0&page=' + page;
    return this._authhttp.getRaw(url);
  }

  /**
   * filter data by university
   * @param university 
   * @param page 
   */
  listByUniversity(university: University, page: number): Observable<any>{
    let url = `${this._candidateEndpoint}/search?by=university_id&university_id= ${university.university_id}&page=${page}`;
    return this._authhttp.getRaw(url);
  }

  /**
   * return work history
   * @param candidate 
   */
  workHistory(candidate:Candidate): Observable<any> {
    let url = this._candidateEndpoint +'/work-history/'+ candidate.candidate_id;
    return this._authhttp.get(url);
  }
}
