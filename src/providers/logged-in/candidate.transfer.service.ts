import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
import { TransferCandidate } from '../../models/transfer-candidate';
/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class CandidateTransferService {

  private _transferEndpoint: string = "/transfer-candidates";

  constructor(
    private _authhttp: AuthHttpService
  ) { }
  /**
   * List of all Candidate Transfers
   * @returns {Observable<any>}
   */
  list(transferID: number, transfer_status: number, candidate_id:number, page: number): Observable<any> {
    let url = `${this._transferEndpoint}?tc_id=${transferID}&status=${transfer_status}&candidate_id=${candidate_id}&page=${page}`;
    return this._authhttp.getRaw(url);
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
}