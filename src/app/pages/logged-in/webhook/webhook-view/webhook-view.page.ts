import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
import { WebhookService } from 'src/app/providers/logged-in/webhook.service';
import {AuthService} from "../../../../providers/auth.service";
// models
import { Webhook } from 'src/app/models/webhook';
import { Candidate } from 'src/app/models/candidate';
// pages
import { WebhookFormPage } from '../webhook-form/webhook-form.page';
import { WebhookTestPage } from '../webhook-test/webhook-test.page';


@Component({
  selector: 'app-webhook-view',
  templateUrl: './webhook-view.page.html',
  styleUrls: ['./webhook-view.page.scss'],
})
export class WebhookViewPage implements OnInit {

  private webhook_id;

  public loadingCandidates = false;

  public loading = false;

  public webhook: Webhook;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = [];
  public candidates: Candidate[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public webhookService: WebhookService,
    public candidateService: CandidateService,
    private _modalCtrl: ModalController,
    public authService: AuthService
  ) {
  }

  public ngOnInit() {
    window.analytics.page('Webhook View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.webhook = window.history.state.model;
    }

    this.webhook_id = this.activateRoute.snapshot.paramMap.get('webhook_id');

    this.loadData();
  }

  /**
   * load webhook data
   */
  loadData() {
    this.loading = true;

    this.webhookService.view(this.webhook_id).subscribe(bank => {

      this.webhook = bank;
 
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
      component: WebhookFormPage,
      componentProps: {
        model: this.webhook,
        webhook_id: this.webhook_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });
    modal.present();
  }


  /**
   * Loads Form in modal to test
   */
  async test() {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this._modalCtrl.create({
      component: WebhookTestPage,
      componentProps: {
        model: this.webhook,
        webhook_id: this.webhook_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });
    modal.present();
  }
}
