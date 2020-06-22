import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
import { TransferCandidate } from '../../models/transfer-candidate';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class CandidateTransferService {

  private _transferEndpoint: string = "/transfer-candidates";

  constructor(
    private _authhttp: AuthHttpService
  ) { }

  /**
   * List of all Candidate Transfers
   * @returns {Observable<any>}
   */
  list(tc_id: number): Observable<any> {
    let url = `${this._transferEndpoint}?tc_id=${tc_id}`;
    return this._authhttp.get(url, true);
  }
  
  /**
   * transfer candidate detail 
   * @param tc_id 
   */
  view(tc_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/${tc_id}`;
    return this._authhttp.get(url);
  }

  /**
   * mark unpaid candidate
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  unpaid(model: TransferCandidate): Observable<any>{
    let url = `${this._transferEndpoint}/unpaid/${model.tc_id}`;
    return this._authhttp.patch(url, {});
  }
  
  /**
   * mark paid candidate
   * @param {Candidate} model
   * @returns {Observable<any>}
   */
  paid(model: TransferCandidate): Observable<any>{
    let url = `${this._transferEndpoint}/paid/${model.tc_id}`;
    return this._authhttp.patch(url, {});
  }

  /**
   * Mark All transfer as paid 
   * @param {array} candidates
   * @returns {Observable<any>}
   */
  markPaidAll(TransferCandidate: any): Observable<any> {
    let url = `${this._transferEndpoint}/mark-paid-all`;
    let params = {
      "transferCandidate": TransferCandidate,
    };
    return this._authhttp.patch(url, params);
  }

  /**
   * Mark All transfer as unpaid 
   * @param {array} candidates
   * @returns {Observable<any>}
   */
  markUnPaidAll(TransferCandidateList: any): Observable<any> {
    let url = `${this._transferEndpoint}/mark-unpaid-all`;
    let params = {
      "transferCandidate": TransferCandidateList,
    };
    return this._authhttp.patch(url, params);
  }
}