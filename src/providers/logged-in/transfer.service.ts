import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class TransferService {

  private _transferEndpoint: string = "/invoices";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any> {
    let url = `${this._transferEndpoint}?page=${page}`;
    return this._authhttp.getRaw(url);
  }

  /**
   * Generating Invoice copy
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  generateInvoiceCopy(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice_id}`;
    return this._authhttp.pdfget(url,invoice_id);
  }

  /**
   * Details of each invoice_id
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  transferIdDetails(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/${invoice_id}`;
    return this._authhttp.get(url);
  }

  /**
   * Mark as Payment Received 
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  markReceived(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/payment-received/${invoice_id}`;
    return this._authhttp.patch(url, '');
  }
 
  /**
   * Mark as Payment Distribution in progress
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  markProgress(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/payment-in-process/${invoice_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Mark as Payment Complete
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  markComplete(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/payment-completed/${invoice_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Mark as Unlocked
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  markUnlock(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/unlock/${invoice_id}`;
    return this._authhttp.patch(url, '');
  }
}