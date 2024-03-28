import { Injectable } from '@angular/core';
import { AuthHttpService } from './authhttp.service';

@Injectable({
  providedIn: 'root'
})
export class XeroService {

  private _endpoint: string = "/xero";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * sync 
   * @param page 
   */
  syncTransactions(page) {
    let url = this._endpoint + '/sync?page=' + page;
    return this._authhttp.get(url);
  }
}
