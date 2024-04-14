import { Injectable } from '@angular/core';
//models
import { Campaign } from 'src/app/models/campaign';
//services
import { AuthService } from '../auth.service';
import { AuthHttpService } from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {

    private endpoint = '/campaigns';
  
    constructor(
      public authService: AuthService,
      private http: AuthHttpService
    ) { }
  
    /**
     * return campaigns
     * @param page
     */
    list(page: number = 1) {
      let url = `${this.endpoint}?expand=totalSale&page=${page}`;  
      return this.http.get(url, true);
    }
    
    /**
     * return campaign detail
     * @param utm_uuid
     * @returns
     */
    view(utm_uuid: string) {
      const url = `${this.endpoint}/${utm_uuid}?expand=contactCampaignChartData,candidateCampaignChartData`;
      return this.http.get(url);
    }
  
    /**
     * ability to delete campaign
     * @param utm_uuid
     * @returns
     */
    delete(utm_uuid) {
      const url = `${this.endpoint}/delete/${utm_uuid}`;
      return this.http.delete(url);
    }
  
    /**
     * create campaign
     * @param campaign
     */
    create(campaign: Campaign) {
      const url = `${this.endpoint}`;
      const params = {
        utm_source: campaign.utm_source,
        utm_medium: campaign.utm_medium,
        utm_campaign: campaign.utm_campaign,
        utm_content: campaign.utm_content,
        utm_term: campaign.utm_term,
        investment: campaign.investment
      }
      return this.http.post(url, params);
    }

    /**
     * update campaign
     * @param campaign
     */
    update(campaign: Campaign) {
      const url = `${this.endpoint}/${campaign.utm_uuid}`;
      const params = {
        utm_source: campaign.utm_source,
        utm_medium: campaign.utm_medium,
        utm_campaign: campaign.utm_campaign,
        utm_content: campaign.utm_content,
        utm_term: campaign.utm_term,
        investment: campaign.investment
      }
      return this.http.patch(url, params);
    }

    /**
     * 
     * @param utm_uuid 
     * @returns 
     */
    click(utm_uuid) {
      const url = `${this.endpoint}/click/${utm_uuid}`;
      return this.http.patch(url, {});
    }
  }
  
  
