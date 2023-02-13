import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthHttpService} from "../logged-in/authhttp.service";

@Injectable({
  providedIn: 'root'
})
export class StaffLeaveService {

  private _endpoint: string = "/staff-leave";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * leave request
   * @param model
   * @returns
   */
  create(model): Observable<any>{
    const url = `${this._endpoint}`;
    return this._authhttp.post(url, {
      from_date: model.from_date,
      to_date: model.to_date,
      note: model.note,
      type: model.type,
      file: model.file,
    });
  }

  /**
   * leave request
   * @param page
   * @returns
   */
  list(page): Observable<any>{
    return this._authhttp.get(this._endpoint + '?page=' + page+'&expand=staff', true);
  }

  /**
   * leave request
   * @param UUID
   * @returns
   */
  delete(UUID): Observable<any>{
    return this._authhttp.delete(this._endpoint + '/' + UUID);
  }

  /**
   * change status
   * @param UUID
   * @param status
   * @constructor
   */
  changeStatus(UUID, status): Observable<any>{
    return this._authhttp.patch(this._endpoint + '/' + UUID,{status});
  }
}
