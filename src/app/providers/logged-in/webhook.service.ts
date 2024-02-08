import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
// Models
import { Webhook } from '../../models/webhook';


/**
 * Manages Webhook Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class WebhookService {

  private _webhookEndpoint: string = "/webhooks";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List of all webhook
   * @returns {Observable<any>}
   */
  list(page: number): Observable<any>{
    let url = this._webhookEndpoint + '?page=' + page;
    return this._authhttp.get(url, true);
  }
  
  /**
   * return webhook detail 
   * @param webhook_id 
   */
  view(webhook_id: number): Observable<any>{
    let url = this._webhookEndpoint + '/' + webhook_id;
    return this._authhttp.get(url);
  }

  /**
   * Create webhook
   * @param {Webhook} model
   * @returns {Observable<any>}
   */
  create(model: Webhook): Observable<any>{
    let postUrl = `${this._webhookEndpoint}`;
    let params = {
      "event": model.event,
      "endpoint": model.endpoint,
      "method": model.method
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * test model
   * @param model 
   * @param data 
   * @returns 
   */
  test(model, data = null) : Observable<any>{
    let url = `${this._webhookEndpoint}/test/${model.webhook_id}`;
    let params = {
      "event": model.event,
      "endpoint": model.endpoint,
      "method": model.method,
      "data": data
    };
    return this._authhttp.post(url, params);
  }

  /**
   * Update webhook
   * @param {Webhook} model
   * @returns {Observable<any>}
   */
  update(model: Webhook): Observable<any>{
    let url = `${this._webhookEndpoint}/${model.webhook_id}`;
    let params = {
      "event": model.event,
      "endpoint": model.endpoint,
      "method": model.method
    };

    return this._authhttp.patch(url, params);
  }

  /**
   * Deletes webhook
   * @param {Webhook} model
   * @returns {Observable<any>}
   */
  delete(model: Webhook): Observable<any>{
    let url = `${this._webhookEndpoint}/${model.webhook_id}`;
    return this._authhttp.delete(url);
  }
}
