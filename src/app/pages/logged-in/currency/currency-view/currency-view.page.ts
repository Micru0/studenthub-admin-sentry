import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services
import { CurrencyService } from 'src/app/providers/logged-in/currency.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { CurrencyFormPage } from '../currency-form/currency-form.page';
// models
import { Currency } from 'src/app/models/currency';


@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.page.html',
  styleUrls: ['./currency-view.page.scss'],
})
export class CurrencyViewPage implements OnInit {

  public currency_id: string;

  public currency: Currency;

  public loading = false;

  constructor(
    private currencyService: CurrencyService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    public authService: AuthService,

  ) {
    // this.currency = params.get('model');
  }

  ngOnInit() {
    window.analytics.page('Currency View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.currency = window.history.state.model;
    }

    this.currency_id = this.activateRoute.snapshot.paramMap.get('currency_id');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.currencyService.view(this.currency_id).subscribe(currency => {
      this.currency = currency;

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
      component: CurrencyFormPage,
      componentProps: {
       model: this.currency,
       currency_id: this.currency.currency_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.currency = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}
