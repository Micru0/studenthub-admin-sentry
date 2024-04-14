import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
//models
import { Campaign } from 'src/app/models/campaign';
import { AuthService } from 'src/app/providers/auth.service';
//services
import { CampaignService } from 'src/app/providers/logged-in/campaign.service';
import { TranslateLabelService } from 'src/app/providers/translate-label.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.page.html',
  styleUrls: ['./campaign-view.page.scss'],
})
export class CampaignViewPage implements OnInit {

  public loading: boolean = false; 
  public borderLimit: boolean = false; 

  public utm_uuid: string; 

  public campaign: Campaign;

  public candidateCampaignChartData; 
  public contactCampaignChartData; 


  public candidateAppUrl; 
  public employerAppUrl; 

  constructor(
    public platform: Platform,  
    public authService: AuthService,  
    public campaignService: CampaignService,
    public translateService: TranslateLabelService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.candidateAppUrl = environment.candidateAppUrl;
    this.employerAppUrl = environment.employerAppUrl; 

    this.utm_uuid = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  /**
   * load voucher data
   */
  loadData() {
    this.loading = true;

    //const params = '&expand=totalSale,campaignChartData';

    this.campaignService.view(this.utm_uuid).subscribe(res => {
      this.loading = false;

      this.campaign = res;

      this.candidateCampaignChartData = res.candidateCampaignChartData;
      this.contactCampaignChartData = res.contactCampaignChartData;
    });
  }

  logScrolling(e) {
    this.borderLimit = (e.detail.scrollTop > 25);
  }
}
