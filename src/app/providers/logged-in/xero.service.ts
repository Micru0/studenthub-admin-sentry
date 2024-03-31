import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//services 
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class XeroService {

  private _endpoint: string = "/xero";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * get transaction detail
   * @param bank_transaction_id 
   */
  view(bank_transaction_id): Observable<any>{
    let url = this._endpoint + '/' + bank_transaction_id + '?expand=contact';
    return this._authhttp.get(url);
  }

  /**
   * List of bank transactions
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._endpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * sync from last transaction date-time 
   * @param page 
   */
  syncTransactions(page): Observable<any>{
    let url = this._endpoint + '/sync?page=' + page;
    return this._authhttp.get(url);
  }

  /**
   * download from beginning  
   * @param page 
   */
  downloadTransactions(page): Observable<any>{
    let url = this._endpoint + '/download?page=' + page;
    return this._authhttp.get(url);
  }
}
