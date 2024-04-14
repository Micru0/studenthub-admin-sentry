import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
//models
import { Campaign } from 'src/app/models/campaign';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { EventService } from 'src/app/providers/event.service';
import { CampaignService } from 'src/app/providers/logged-in/campaign.service';
import { TranslateLabelService } from 'src/app/providers/translate-label.service';


@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.page.html',
  styleUrls: ['./campaign-form.page.scss'],
})
export class CampaignFormPage implements OnInit {

  public form: FormGroup;

  public loading;

  public campaign: Campaign; 

  public borderLimit; 

  public saving = false;

  public utm_uuid; 

  constructor(
    public fb: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public authService: AuthService,
    public eventService: EventService,
    public translateService: TranslateLabelService,
    public campaignService: CampaignService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   // this.utm_uuid = this.activatedRoute.snapshot.params.utm_uuid;

   if(!this.campaign) {
    this.campaign = new Campaign;
   }

   this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      source: [this.campaign.utm_source || '', Validators.required],
      medium: [this.campaign.utm_medium || '', Validators.required],
      campaign: [this.campaign.utm_campaign || '', Validators.required],
      content: [this.campaign.utm_content || ''],
      term: [this.campaign.utm_term || ''],
      investment: [this.campaign.investment || '']
    });
  }

  ionViewWillEnter() {
   // this.loadData();
  }

  /**
   * load voucher data
   *
  loadData() {
    this.loading = true;

    //const params = '&expand=totalSale,campaignChartData';

    this.campaignService.view(this.utm_uuid).subscribe(res => {
      this.loading = false;

      this.campaign = res;
    });
  }*/


  updateModalFromForm() {
    this.campaign.utm_source = this.form.value.source;
    this.campaign.utm_medium = this.form.value.medium;
    this.campaign.utm_campaign = this.form.value.campaign;
    this.campaign.utm_content = this.form.value.content;
    this.campaign.utm_term = this.form.value.term;
    this.campaign.investment = this.form.value.investment;
  }

  /**
   * save campaign
   */
  async save() {

    if (this.form.invalid) {
      return false;
    }

    this.updateModalFromForm(); 

    this.saving = true;

    let request;
    if (this.utm_uuid) {
      request = this.campaignService.update(this.campaign);
    } else {
      request = this.campaignService.create(this.campaign);
    }
    request.subscribe(async res => {
      
      if (res.operation == 'success') {

        this.eventService.refreshCampaign$.next({});

        this.navCtrl.back();
      } 
      else 
      {        
        const alert = await this.alertCtrl.create({
          header: this.translateService.transform('Error'),
          message: this.authService.errorMessage(res.message)
        });
        alert.present();
      }
    }, err => this.saving = false,
      () => this.saving = false
    );
  }

  logScrolling(e) {
    this.borderLimit = (e.detail.scrollTop > 25);
  }
}
