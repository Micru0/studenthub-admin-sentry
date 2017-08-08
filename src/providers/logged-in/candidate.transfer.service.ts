import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
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
   * List of all Transfers
   * @returns {Observable<any>}
   */
  list(transferID: number, transfer_status: number, candidate_id:number, page: number): Observable<any> {
    let url = `${this._transferEndpoint}?tc_id=${transferID}&status=${transfer_status}&candidate_id=${candidate_id}&page=${page}`;
    return this._authhttp.getRaw(url);
  }
}