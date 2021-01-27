import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Contact } from 'src/app/models/contact';
import { CompanyContact } from 'src/app/models/company-contact';


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
   * get company contact detail
   * @param contact_uuid
   */
  view(contact_uuid): Observable<any>{
    const url = `${this._endpoint}/${contact_uuid}?expand=contact.contactEmails,contact.contactPhones,company`;
    return this._authhttp.get(url);
  }

  /**
   * load contact role detail
   * @param contact_uuid 
   */
  viewCompanyContact(contact_uuid, company_id): Observable<any>{
    const url = `${this._endpoint}/view-company-contact?contact_uuid=${contact_uuid}&company_id=${company_id}`;
    return this._authhttp.get(url);
  }
  
  /**
   * check if email already exists
   * @param email
   */
  isEmailExists(email: string): Observable<any>{
    const url = `${this._endpoint}/is-email-exists?email=${email}`;
    return this._authhttp.get(url);
  }

  /**
   * add contact to team
   * @param companyContact
   */
  addToTeam(companyContact: CompanyContact): Observable<any>{
    const url = `${this._endpoint}/add-to-team`;

    const params = {
      role: companyContact.role,
      contact_uuid: companyContact.contact_uuid,
      company_id: companyContact.company_id
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Create university
   * @param {Contact} model
   * @param companyContact
   * @returns {Observable<any>}
   */
  create(model: Contact, companyContact: CompanyContact = null): Observable<any>{
    let postUrl = `${this._endpoint}`;

    const params = {
      company_id: companyContact?.company_id,
      role: companyContact?.role,
      name: model.contact_name,
      email: model.contact_email,
      password: model.contact_password,
      receive_email: model.contact_receive_email,
      receive_notification: model.contact_receive_notification,
      position: model.contact_position,
      emails: model.contactEmails,
      phones: model.contactPhones,
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update university
   * @param {Contact} model
   * @returns {Observable<any>}
   */
  update(model: Contact, companyContact: CompanyContact = null): Observable<any>{
    let url = `${this._endpoint}/${model.contact_uuid}`;
    
    const params = {
      company_id: companyContact?.company_id,
      role: companyContact?.role,
      name: model.contact_name,
      position: model.contact_position,
      email: model.contact_email,
      password: model.contact_password,
      receive_email: model.contact_receive_email,
      receive_notification: model.contact_receive_notification,
      emails: model.contactEmails,
      phones: model.contactPhones
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
