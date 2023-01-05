import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import {Fulltimer} from "../../models/fulltimer";


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class FulltimerService {

  private _candidateEndpoint: string = "/fulltimers";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all candidates
   * @returns {Observable<any>}
   */
  list(search, page: number): Observable<any>{
    const url = this._candidateEndpoint + '?page=' + page + search + '&expand=nationality,country';
    return this._authhttp.get(url, true);
  }

  /**
   * view candidate detail
   * @returns {Observable<any>}
   */
  view(fulltimer_uuid): Observable<any>{
    let url = this._candidateEndpoint + '/' + fulltimer_uuid + '?expand=university,area,nationality,country';
    return this._authhttp.get(url);
  }

  /**
   * Deletes Candidate
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  delete(model: Fulltimer): Observable<any>{
    let url = `${this._candidateEndpoint}/${model.fulltimer_uuid}`;
    return this._authhttp.delete(url);
  }

}
