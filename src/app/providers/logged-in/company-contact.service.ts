import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Contact } from 'src/app/models/contact';


@Injectable({
  providedIn: 'root'
})
export class CompanyContactService {

  private _endpoint: string = "/company-contacts";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * get company contacts
   * @param company_id 
   */
  companyContacts(company_id) : Observable<any>{
    const url = `${this._endpoint}?expand=contact,contactEmails,contactPhones&company_id=${company_id}`;
    return this._authhttp.get(url);
  }

  /**
   * Create university
   * @param {Contact} model
   * @returns {Observable<any>}
   */
  create(model: Contact): Observable<any>{
    let postUrl = `${this._endpoint}`;

    let params = {
      //  company_id: model.company_id,
      "name": model.contact_name,
      "position": model.contact_position,
      email: model.contact_email,
      password: model.contact_password,
      receive_email: model.contact_receive_email,
      receive_notification: model.contact_receive_notification,
      "emails": model.contactEmails,
      "phones": model.contactPhones
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update university
   * @param {Contact} model
   * @returns {Observable<any>}
   */
  update(model: Contact): Observable<any>{
    let url = `${this._endpoint}/${model.contact_uuid}`;
    let params = {
      //  company_id: model.company_id,
      "name": model.contact_name,
      "position": model.contact_position,
      email: model.contact_email,
      receive_email: model.contact_receive_email,
      receive_notification: model.contact_receive_notification,
      "emails": model.contactEmails,
      "phones": model.contactPhones
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes university
   * @param {Contact} model
   * @returns {Observable<any>}
   */
  delete(model: Contact): Observable<any>{
    let url = `${this._endpoint}/${model.contact_uuid}`;
    return this._authhttp.delete(url);
  }
}
