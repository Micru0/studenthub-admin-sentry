import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { AuthHttpService } from './authhttp.service';
import {Country} from "../../models/country";

/**
 * Manages Country Functionality on the server
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _countryEndpoint: string = "/countries";

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * List countries
   * @returns {Observable<any>}
   */
  list(page: number, query: string = null): Observable<any>{
    let url = this._countryEndpoint + '?page=' + page;
    console.log(query);
    if (query) {
        url += '&query='+query
    }
    return this._authhttp.get(url, true);
  }

  view(country_id: number): Observable<any>{
    let url = this._countryEndpoint + '/' + country_id;
    return this._authhttp.get(url);
  }

  /**
   * create country
   * @param model
   */
  create(model: Country): Observable<any>{
    let postUrl = `${this._countryEndpoint}`;
    let params = {
      "name_en": model.country_name_en,
      "name_ar": model.country_name_ar,
      "nationality_name_en": model.country_nationality_name_en,
      "nationality_name_ar": model.country_nationality_name_ar,
      "google_map": model.country_from_google_map
    };

    return this._authhttp.post(postUrl, params);
  }

  /**
   * Update country
   * @param {country} model
   * @returns {Observable<any>}
   */
  update(model: Country): Observable<any>{
    let url = `${this._countryEndpoint}/${model.country_id}`;
    let params = {
      "name_en": model.country_name_en,
      "name_ar": model.country_name_ar,
      "nationality_name_en": model.country_nationality_name_en,
      "nationality_name_ar": model.country_nationality_name_ar,
      "google_map": model.country_from_google_map
    };

    return this._authhttp.patch(url, params);
  }
}
