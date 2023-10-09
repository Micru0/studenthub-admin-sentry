import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services
import { EmailCampaignService } from 'src/app/providers/logged-in/email-campaign.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { EmailCampaignFormPage } from '../email-campaign-form/email-campaign-form.page';
// models
import { EmailCampaign } from 'src/app/models/email-campaign';


@Component({
  selector: 'app-email-campaign-view',
  templateUrl: './email-campaign-view.page.html',
  styleUrls: ['./email-campaign-view.page.scss'],
})
export class EmailCampaignViewPage implements OnInit {

  public campaign_uuid: string;

  public emailCampaign: EmailCampaign;

  public loading = false;

  constructor(
    private emailCampaignService: EmailCampaignService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    public authService: AuthService,

  ) {
    // this.emailCampaign = params.get('model');
  }

  ngOnInit() {
    window.analytics.page('Email Campaign View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.emailCampaign = window.history.state.model;
    }

    this.campaign_uuid = this.activateRoute.snapshot.paramMap.get('campaign_uuid');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.emailCampaignService.view(this.campaign_uuid).subscribe(emailCampaign => {

      this.emailCampaign = emailCampaign;

      this.loading = false;

    }, () => {

      this.loading = false;
    });
  }

  /**
   * Loads Form in modal to update
   */
  async update() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: EmailCampaignFormPage,
      componentProps: {
       model: this.emailCampaign,
       campaign_uuid: this.emailCampaign.campaign_uuid
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.emailCampaign = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}

