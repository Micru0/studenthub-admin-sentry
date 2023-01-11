import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Staff } from '../../models/staff';
import { StaffSalary } from 'src/app/models/staff_salary';


/**
 * Manages Staff Salary Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class StaffSalaryService {

  private _staffEndpoint: string = "/staff-salary";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @param page
   * @param param
   */
  list(page: number, param: any = null): Observable<any>{
    let url = this._staffEndpoint + '?page=' + page + param;
    return this._authhttp.get(url, true);
  }

  create(staffIds: any, month): Observable<any>{
    let postUrl = `${this._staffEndpoint}/create-salary`;
    let params = {
      "list": staffIds,
      "month": month
    };

    return this._authhttp.post(postUrl, params);
  }

  delete(id): Observable<any>{
    let url = `${this._staffEndpoint}/${id}`;
    return this._authhttp.delete(url);
  }

  /**
   * add staff salary
   * @param staff_id
   * @param model
   * @returns
   */
  addSalary(staff_id: number, model: StaffSalary): Observable<any>{
    let postUrl = `${this._staffEndpoint}/add-salary/${staff_id}`;
    let params = {
      "salary_currency": model.salary_currency,
      "salary": model.salary,
      "comment": model.comment,
      "salary_date": model.salary_date
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * update salary
   * @param staff_salary_uuid
   * @param model
   * @returns
   */
  updateSalary(staff_salary_uuid, model: StaffSalary): Observable<any>{
    let postUrl = `${this._staffEndpoint}/update-salary/${staff_salary_uuid}`;
    let params = {
      "salary_currency": model.salary_currency,
      "salary": model.salary,
      "comment": model.comment,
      "salary_date": model.salary_date
    };

    return this._authhttp.patch(postUrl, params);
  }
}
