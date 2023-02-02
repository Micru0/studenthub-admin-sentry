import { Injectable } from '@angular/core';
import { AuthHttpService } from './authhttp.service';
import { Observable } from 'rxjs';
import {StaffExpense} from "../../models/staff-expense";

@Injectable({
  providedIn: 'root'
})
export class StaffExpenseService {

  private endpoint = '/staff-expenses';

  constructor(private authHttp: AuthHttpService) { }

  /**
   * load Mall detail
   * @param mallUUID
   */
  view(mallUUID) {
    return this.authHttp.get(this.endpoint + '/' + mallUUID + '?expand=staff');
  }

  /**
   * List of all Expenses
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    return this.authHttp.get(this.endpoint + '?page=' + page + '&expand=staff',true);
  }

  /**
   * create Expense
   * @param model
   */
  create(model: StaffExpense): Observable<any>{

    return this.authHttp.post(this.endpoint, {
      supplier: model.supplier,
      category: model.category,
      purchase_date: model.purchase_date,
      total_amount: model.total_amount,
      currency: model.currency,
      vat: model.vat,
      reimbursable: model.reimbursable,
      description: model.description,
      file: model.file,
    });
  }

  /**
   * update Expense
   * @param model
   */
  update(model: StaffExpense): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/${model.staff_expense_uuid}`, {
      supplier: model.supplier,
      category: model.category,
      purchase_date: model.purchase_date,
      total_amount: model.total_amount,
      currency: model.currency,
      vat: model.vat,
      reimbursable: model.reimbursable,
      description: model.description,
      file: model.file,
    });
  }

  /**
   * delete Expense
   * @param model
   */
  delete(model: StaffExpense): Observable<any>{
    return this.authHttp.delete(`${this.endpoint}/${model.staff_expense_uuid}`);
  }

  /**
   * change status
   * @param staff_expense_uuid
   * @param status
   */
  changeStatus(staff_expense_uuid, status): Observable<any>{
    return this.authHttp.patch(`${this.endpoint}/change-status/${staff_expense_uuid}`,{
      status
    });
  }
}
