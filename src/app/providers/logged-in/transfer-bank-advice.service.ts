import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//services
import { AuthHttpService } from './authhttp.service';
//models
import { TransferBankAdvice } from 'src/app/models/trabsfer-bank-advice';


@Injectable({
  providedIn: 'root'
})
export class TransferBankAdviceService {

  private _endpoint: string = "/transfer-bank-advices";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * load bank detail
   * @param tba_uuid 
   */
  view(tba_uuid) {
    let url = this._endpoint + '/' + tba_uuid;
    return this._authhttp.get(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._endpoint + '?page=' + page + "&expand=createdBy";
    return this._authhttp.get(url, true);
  }

  /**
   * Create TransferBankAdvice
   * @param {TransferBankAdvice} model
   * @returns {Observable<any>}
   */
  create(model: TransferBankAdvice): Observable<any>{
    let postUrl = `${this._endpoint}`;
    return this._authhttp.post(postUrl, model);
  }

  /**
   * Update TransferBankAdvice
   * @param {TransferBankAdvice} model
   * @returns {Observable<any>}
   */
  update(model: TransferBankAdvice): Observable<any>{
    let url = `${this._endpoint}/${model.tba_uuid}`;
    return this._authhttp.patch(url, model);
  }

  /**
   * Delete TransferBankAdvice
   * @param {TransferBankAdvice} model
   * @returns {Observable<any>}
   */
  delete(model: TransferBankAdvice): Observable<any>{
    let url = `${this._endpoint}/${model.tba_uuid}`;
    return this._authhttp.delete(url);
  }
}
