import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//services
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class TransferFileService {

  private _transferEndpoint: string = "/transfer-files";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all transfer files
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._transferEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  view(staff_id): Observable<any>{
    let url = this._transferEndpoint + '/' + staff_id;
    return this._authhttp.get(url);
  }
}
