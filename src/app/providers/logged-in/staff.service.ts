import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Staff } from '../../models/staff';
import { StaffSalary } from 'src/app/models/staff_salary';


/**
 * Manages Staff Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private _staffEndpoint: string = "/staff";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all staff
   * @param page
   * @param param
   */
  list(page: number, param: any = null): Observable<any>{
    let url = this._staffEndpoint + '?page=' + page + param + '&expand=totalSuggestions,totalAssigned,totalRequests,totalNotes,totalStories,totalInvitations,totalAcceptedInvitations,totalRejectedInvitations,permissions';
    return this._authhttp.get(url, true);
  }
  
  /**
   * view staff details
   * @param staff_id 
   * @returns 
   */
  view(staff_id): Observable<any>{
    let url = this._staffEndpoint + '/' + staff_id + '&expand=totalSuggestions,totalAssigned,totalRequests,totalNotes,totalStories,totalInvitations,totalAcceptedInvitations,totalRejectedInvitations,permissions';
    return this._authhttp.get(url);
  }
  
  /**
   * view staff salaries
   * @param staff_id 
   * @returns 
   */
  listSalaries(staff_id: number, page: number): Observable<any>{
    let url = this._staffEndpoint + '/list-salaries/' + staff_id + '?page=' + page;
    return this._authhttp.get(url, true);
  }

  /**
   * import salary
   * @param staff_salary_uuid 
   * @returns 
   */
  viewSalary(staff_salary_uuid): Observable<any>{
    let url = this._staffEndpoint + '/view-salary/' + staff_salary_uuid;
    return this._authhttp.get(url);
  }

  /**
   * import excel
   * @param excel 
   * @returns 
   */
  importSalaryExcel(excel) : Observable<any>{
    let url = this._staffEndpoint + '/import-salary';
    return this._authhttp.post(url, {
      excel: excel 
    });
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

  /**
   * Create staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  create(model: Staff): Observable<any>{
    let postUrl = `${this._staffEndpoint}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email,
      "password": model.staff_password_hash,
      "gmail_username": model.staff_gmail_username,
      "gmail_password": model.staff_gmail_password,
      "role": model.staff_role,
      'job_title': model.staff_job_title,
      'salary': model.staff_salary,
      'salary_currency': model.staff_salary_currency,
      'hours_per_day': model.hours_per_day,
      'week_start_day': model.week_start_day,
      'work_days': model.work_days,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  update(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    let params = {
      "name": model.staff_name,
      "email": model.staff_email,
      "gmail_username": model.staff_gmail_username,
      "gmail_password": model.staff_gmail_password,
      "role": model.staff_role,
      'job_title': model.staff_job_title,
      'salary': model.staff_salary,
      'salary_currency': model.staff_salary_currency,
      'hours_per_day': model.hours_per_day,
      'week_start_day': model.week_start_day,
      'work_days': model.work_days,
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Send new password to staff
   * @param model
   */
  resetPassword(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/reset-password/${model.staff_id}`;
    return this._authhttp.patch(url, {password : model.staff_password_hash});
  }

  changeStatus(model: Staff, status): Observable<any>{
    let url = `${this._staffEndpoint}/status-change/${model.staff_id}`;
    return this._authhttp.patch(url, {status : status});
  }

  recoverAccount(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/recover-account/${model.staff_id}`;
    return this._authhttp.patch(url, {});
  }

  /**
   * Deletes staff
   * @param {Staff} model
   * @returns {Observable<any>}
   */
  delete(model: Staff): Observable<any>{
    let url = `${this._staffEndpoint}/${model.staff_id}`;
    return this._authhttp.delete(url);
  }
}
