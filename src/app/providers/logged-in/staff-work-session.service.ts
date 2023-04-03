import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class StaffWorkSessionService {

  private _endpoint: string = "/staff-work-sessions";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * @param staffId
   * @param date
   */
  view(staffId, date) {
    let url = `${this._endpoint}/${staffId}/${date}`;
    return this._authhttp.get(url);
  }

  /**
   * List of all answer
   * @returns {Observable<any>}
   */
  list(page: number, param = ' '): Observable<any>{
    let url = this._endpoint + '?page=' + page + '&expand=staff,dayActivity' + param;
    return this._authhttp.get(url, true);
  }

  /**
   * List of all inactive
   * @returns {Observable<any>}
   */
  listInactive(page: number, param = ' '): Observable<any>{
    let url = this._endpoint + '/list-inactive?page=' + page + '&expand=staff,dayActivity' + param;
    return this._authhttp.get(url, true);
  }

  /**
   * download working hours details
   * @param {Company} model
   * @returns {Observable<any>}
   */
  downloadExcel(param: any): Observable<any> {
    const url = `${this._endpoint}/download-list-excel?download=1${param}`;
    return this._authhttp.excelget(url, `working-hours-list.xlsx`);
  }
}
