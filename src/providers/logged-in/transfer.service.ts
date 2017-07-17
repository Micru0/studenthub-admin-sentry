import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Transfer } from '../../models/transfer';

/**
 * Manages Staff Functionality on the server
 */
@Injectable()
export class TransferService {

  private _transferEndpoint: string = "/transfers";

  constructor(
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
   * Download excel containing payable canidates' info 
   * @returns {Observable<any>}
   */
  exportPayableCandidates(): Observable<any> {
    let url = `${this._transferEndpoint}/export-payable-candidates`;
    return this._authhttp.excelget(url, `Payable Candidates.xlsx`);
  }

  /**
   * List of all Transfers
   * @returns {Observable<any>}
   */
  list(company_name: string, transfer_status: number, page: number): Observable<any> {
    let url = `${this._transferEndpoint}?company_name=${company_name}&transfer_status=${transfer_status}&page=${page}&expand=profit`;
    return this._authhttp.getRaw(url);
  }

  /**
   * Download excel
   * @param {Transfer} transfer
   * @returns {Observable<any>}
   */
  export(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/export/${transfer.transfer_id}`;
    return this._authhttp.excelget(url, `Transfer ${transfer.transfer_id}.xlsx`);
  }

  /**
   * Details of each transfer_id
   * @param {number} transfer
   * @returns {Observable<any>}
   */
  transferIdDetails(transfer_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/${transfer_id}?expand=invoices,transferCandidates,totalPaid,totalUnpaid,profit`;
    return this._authhttp.get(url);
  }

  /**
   * Mark as Payment Received 
   * @param {Transfer} transfer
   * @returns {Observable<any>}
   */
  markReceivedDistributing(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/payment-received-distributing/${transfer.transfer_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Mark as Unlocked
   * @param {Transfer} transfer
   * @returns {Observable<any>}
   */
  markUnlock(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/unlock/${transfer.transfer_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Mark candidates as paid 
   * @param {Transfer} transfer
   * @param {array} candidates
   * @returns {Observable<any>}
   */
  markPaid(transfer: Transfer, candidates: any): Observable<any> {
    let url = `${this._transferEndpoint}/mark-paid/${transfer.transfer_id}`;
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
  markPaidAll(candidates: any): Observable<any> {
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
   * Mark the passed transfer as locked
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  markLocked(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/lock/${transfer.transfer_id}`;
    return this._authhttp.patch(url, '');
  }

  /**
   * Delete Transfer 
   * @param {Transfer} transfer
   * @returns {Observable<any>}
   */
  delete(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/${transfer.transfer_id}`;
    return this._authhttp.delete(url);
  }

  /**
   * Generating Invoice copy
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  downloadInvoice(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice_id}`;
    return this._authhttp.pdfget(url, 'Invoice ' + invoice_id + '.pdf');
  }

  /**
   * Generating Invoice copy
   * @param {number} invoice_id
   * @returns {Observable<any>}
   */
  downloadReceipt(invoice_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice_id}`;
    return this._authhttp.pdfget(url, 'Receipt ' + invoice_id + '.pdf');
  }
}