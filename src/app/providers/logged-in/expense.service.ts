import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Expense } from '../../models/expense';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private _expenseEndpoint: string = "/expenses";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * load expense detail
   * @param expense_uuid 
   */
  view(expense_uuid) {
    let url = this._expenseEndpoint + '/' + expense_uuid;
    return this._authhttp.get(url);
  }

  /**
   * List of all staff
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._expenseEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * Create Expense
   * @param {Expense} model
   * @returns {Observable<any>}
   */
  create(model: Expense): Observable<any>{
    let postUrl = `${this._expenseEndpoint}`;
    return this._authhttp.post(postUrl, model);
  }

  /**
   * Update Expense
   * @param {Expense} model
   * @returns {Observable<any>}
   */
  update(model: Expense): Observable<any>{
    let url = `${this._expenseEndpoint}/${model.expense_uuid}`;
    return this._authhttp.patch(url, model);
  }

  /**
   * Delete Expense
   * @param {Expense} model
   * @returns {Observable<any>}
   */
  delete(model: Expense): Observable<any>{
    let url = `${this._expenseEndpoint}/${model.expense_uuid}`;
    return this._authhttp.delete(url);
  }
}
