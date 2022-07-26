import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Transfer, Invoice } from '../../models/transfer';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private _transferEndpoint: string = "/transfers";

  constructor(
    private _authhttp: AuthHttpService
  ) { }

  /**
   * List of all payable candidates
   * @returns {Observable<any>}
   */
  listPayableCandidates(): Observable<any> {
    let url = `${this._transferEndpoint}/payable-candidates?expand=unPaidTransferCandidates,remainingPaymentTransferTotal,unPaidTransferCandidates.candidate`;
    return this._authhttp.get(url, true);
  }

  /**
   * Download excel containing payable canidates info 
   * @returns {Observable<any>}
   */
  exportPayableCandidates(onlyPayable: boolean = false): Observable<any> {
    let url = `${this._transferEndpoint}/export-payable-candidates`;

    if(onlyPayable) {
      url += '?only-payable=true';
    }
    
    return this._authhttp.excelget(url, `Payable Candidates.xlsx`);
  }

  /**
   * List of all Transfers
   * @returns {Observable<any>}
   */
  list(searchParams: string, page: number): Observable<any> {
    let url = `${this._transferEndpoint}?page=${page}&expand=isSuspicious,profit${searchParams}`;
    return this._authhttp.get(url, true);
  }

  /**
   * update candidate transfer total from transfer file 
   * @param transfer 
   * @returns 
   */
  updateTransferFromFile(transfer: Transfer): Observable<any> {
    let url = `${this._transferEndpoint}/update-transfer-from-file/${transfer.transfer_id}`;
    return this._authhttp.post(url, '');
  }

  /*
   * List of all Transfers
   * @returns {Observable<any>}
   */
  suspiciousList(searchParams: string, page: number): Observable<any> {
    let url = `${this._transferEndpoint}/suspicious?page=${page}&expand=profit${searchParams}`;
    return this._authhttp.get(url, true);
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
   * list transfer invoices
   * @param transfer_id 
   */
  listInvoices(transfer_id): Observable<any> {
    let url = `${this._transferEndpoint}/invoices/${transfer_id}?expand=company`;
    return this._authhttp.get(url);
  }

  /**
   * Details of each transfer_id
   * @param {number} transfer
   * @returns {Observable<any>}
   */
  transferIdDetails(transfer_id: number): Observable<any> {
    let url = `${this._transferEndpoint}/${transfer_id}?expand=isSuspicious,totalPaid,totalUnpaid,profit`;
    return this._authhttp.get(url);
  }

  /**
   * Mark as Payment Received and distributing 
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
   * import excel 
   * @param {excelUrl} String
   * @returns {Observable<any>}
   */
  importExcel(excelUrl: string): Observable<any> {
    let url = `${this._transferEndpoint}/import-excel`;
    return this._authhttp.post(url, {
      excel: excelUrl
    });
  }

  /**
   * Mark All candidates as paid 
   * @param {array} candidates
   * @param {string} excel
   * @returns {Observable<any>}
   */
  markPaidAll(candidates: any, excel: string): Observable<any> {
    let url = `${this._transferEndpoint}/mark-paid-all`;
    let params = {
      "candidates": candidates,
      "excel": excel
    };

    const retryStrategy =  {
      maxRetryAttempts: 0,
      scalingDuration: 1000,
      excludedStatusCodes: [400, 401, 404, 500] 
    }

    return this._authhttp.patch(url, params, retryStrategy);
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
   * download payment advice file
   * @returns 
   */
  downloadAdvice() {
    let url = `${this._transferEndpoint}/download-payment-advice`;
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
   * Generating and download Invoice copy
   * @param {number} invoice
   * @returns {Observable<any>}
   */
  downloadInvoice(invoice: Invoice): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice.invoice_id}/invoice`;
    return this._authhttp.pdfget(url, 'Invoice ' + invoice.invoice_id + '.pdf');
  }

  /**
   * Generating and download Invoice copy
   * @param {number} invoice
   * @returns {Observable<any>}
   */
  downloadReceipt(invoice: Invoice): Observable<any> {
    let url = `${this._transferEndpoint}/pdf/${invoice.invoice_id}/receipt`;
    return this._authhttp.pdfget(url, 'Receipt ' + invoice.invoice_id + '.pdf');
  }
}
