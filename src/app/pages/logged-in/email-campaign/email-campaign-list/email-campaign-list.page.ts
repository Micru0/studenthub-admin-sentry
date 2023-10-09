import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services 
import { AuthService } from 'src/app/providers/auth.service';
import { EmailCampaignService } from 'src/app/providers/logged-in/email-campaign.service';
//pages
import { EmailCampaignFormPage } from '../email-campaign-form/email-campaign-form.page';
// models
import { EmailCampaign } from 'src/app/models/email-campaign';
 

@Component({
  selector: 'app-email-campaign-list',
  templateUrl: './email-campaign-list.page.html',
  styleUrls: ['./email-campaign-list.page.scss'],
})
export class EmailCampaignListPage implements OnInit {
   
  public loading = false;

  public deleting = false;

  public pageCount = 0;
  public currentPage = 1;

  public emailCampaigns: EmailCampaign[];

  constructor(
    public platform: Platform,
    public router: Router,
    public emailCampaignService: EmailCampaignService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Email Campaign List Page');

    this.loadData(this.currentPage);
  }

  /**
   * list banks
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.emailCampaignService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.emailCampaigns = response.body;

    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.emailCampaignService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.emailCampaigns = this.emailCampaigns.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.router.navigate(['/email-campaign-view', model.campaign_uuid], {
      state: {
        model: model
      }
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: EmailCampaignFormPage,
      componentProps: {
        model: new EmailCampaign
      }
    });
    // Refresh List if required
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, emailCampaign: EmailCampaign) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Email Campaign?',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.emailCampaignService.delete(emailCampaign).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(this.currentPage, true);
              }
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }
}
