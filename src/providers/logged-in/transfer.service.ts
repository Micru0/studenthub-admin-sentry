import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
//import { File } from '@ionic-native/file';

// Services
import { AuthHttpService } from './authhttp.service';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class TransferService {

  private _transferEndpoint: string = "/transfers";

  constructor(
    //private transfer: Transfer, 
    //private file: File,    
    private _authhttp: AuthHttpService
  ) { }

  /**
   * List of all payable candidates
   * @returns {Observable<any>}
   */
  listPayableCandidates(page: number): Observable<any> {
    let url = `${this._transferEndpoint}/payable-candidates?page=${page}`;
    return this._authhttp.getRaw(url);
  }
  
  /**
   * List of all payable candidates
   * @returns {Observable<any>}
   */
  listAllPayableCandidates(): Observable<any> {
    let url = `${this._transferEndpoint}/all-payable-candidates`;
    return this._authhttp.getRaw(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(company_name: string, transfer_status: number, page: number): Observable<any> {
    let url = `${this._transferEndpoint}?company_name=${company_name}&transfer_status=${transfer_status}&page=${page}`;
    return this._authhttp.getRaw(url);
  }

  /**
   * Download excel containing payable canidates' info 
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  exportPayableCandidates(): Observable<any> {
    let url = `${this._transferEndpoint}/export-payable-candidates`;
    return this._authhttp.excelget(url, `Payable Candidates.xlsx`);
  }

  /**
   * Download excel
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  export(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/export/${invoice_id}`;
    return this._authhttp.excelget(url, `Invoice ${invoice_id} Details.xlsx`);
  }

  /**
   * Generating Invoice copy
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  downloadInvoice(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice_id}`;
    return this._authhttp.pdfget(url, 'Invoice ' + invoice_id + ' Details.pdf');
  }

  /**
   * Generating Invoice copy
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  downloadReceipt(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice_id}`;
    return this._authhttp.pdfget(url, 'Receipt ' + invoice_id + ' Details.pdf');
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

  /**
   * Get all unpaid candidates in transfer
   * @param {number} transfer_id
   * @returns {Observable<any>}
   */
  listUnpaidCandidates(transfer_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/unpaid-candidates/${transfer_id}`;
    return this._authhttp.get(url);
  }

  /**
   * Mark candidates as paid 
   * @param {number} transfer_id
   * @param {array} candidates
   * @returns {Observable<any>}
   */
  markPaid(transfer_id: number, candidates: any): Observable<any> {
    let url = `${this._transferEndpoint}/mark-paid/${transfer_id}`;
    let params = {
      "candidates": candidates,
    };
    return this._authhttp.patch(url, params);
  }

  /**
   * Mark All candidates as paid 
   * @param {array} candidates
   * @returns {Observable<any>}
   */
  markPaidAll( candidates: any): Observable<any> {
    let url = `${this._transferEndpoint}/mark-paid-all`;
    let params = {
      "candidates": candidates,
    };
    return this._authhttp.patch(url, params);
  }

  /**
   * Download text file
   * @returns {Observable<any>}
   */
  downloadTxt() {
    let url = `${this._transferEndpoint}/text`;
    return this._authhttp.downloadTextFile(url);
  }

  /**
   * Mark as Lock
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  marklock(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/lock/${invoice_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Delete Transfer 
   * @param {number} transfer_id
   * @returns {Observable<any>}
   */
  delete(transfer_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/${transfer_id}`;
    return this._authhttp.delete(url);
  }
}