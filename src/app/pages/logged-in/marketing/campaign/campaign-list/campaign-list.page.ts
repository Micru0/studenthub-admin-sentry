import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { EventService } from 'src/app/providers/event.service';
import { CampaignService } from 'src/app/providers/logged-in/campaign.service';
import { TranslateLabelService } from 'src/app/providers/translate-label.service';
//pages
import { CampaignFormPage } from '../campaign-form/campaign-form.page';


@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.page.html',
  styleUrls: ['./campaign-list.page.scss'],
})
export class CampaignListPage implements OnInit {

  public loading = false;

  campaigns = [];

  public borderLimit = false;

  public currentPage;
  public totalPages;
  public totalCount;

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public authService: AuthService,
    public campaignService: CampaignService,
    public translateService: TranslateLabelService
  ) { }

  ngOnInit() {
    this.eventService.refreshCampaign$.subscribe(_ => {
      this.loadData(1);
    });
  }

  logScrolling(e) {
    this.borderLimit = (e.detail.scrollTop > 25);
  }

  ionViewWillEnter() {
    this.loadData(1);
  }

  /**
   * load data
   * @param currentPage
   */
  loadData(currentPage) {

    this.loading = true;

    this.campaignService.list(currentPage).subscribe((response) => {

      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalPages = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.campaigns = response.body;

      this.loading = false;
    });
  }
  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    if(this.currentPage >= this.totalPages) {
      event.target.complete();
      return null;
    }

    this.loading = true;

    this.currentPage++;

    this.campaignService.list(this.currentPage).subscribe((response) => {

      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalPages = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.campaigns = this.campaigns.concat(response.body);

      event.target.complete();

    }, err => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  filter() {
    this.loadData(1);
  }

  /**
   * remove campaign
   * @param campaign
   */
  remove(event, campaign) {
    event.preventDefault();
    event.stopPropagation();

    this.alertCtrl.create({
      header: this.translateService.transform('Are you sure you want to delete this campaign?'),
      buttons: [
        {
          text: this.translateService.transform('Yes'),
          handler: async () => {

            this.loading = true;

            this.campaignService.delete(campaign.utm_uuid).subscribe(async response => {

              if(response.operation == 'success') {
                this.loadData(1);//refresh list
              }
              else
              {
                const alert = await this.alertCtrl.create({
                  header: this.translateService.transform('Error'),
                  message: this.translateService.errorMessage(response.message),
                  buttons: [
                    {
                      text: this.translateService.transform('Okay')
                    }
                  ]
                });
                alert.present();
              }
            });
          }
        },
        {
          text: this.translateService.transform('No'),
        }
      ]
    }).then(alert => alert.present());
  }

  /**
   * catalog action buttons /options
   * @param event
   */
   async add() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: CampaignFormPage,
      cssClass: 'popup-modal',
      componentProps : {
      }
    });
    await modal.present();

    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e.data && e.data.refresh) {
        this.filter();
      }
    });
  }
}
