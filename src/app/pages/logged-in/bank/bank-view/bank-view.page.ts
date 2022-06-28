import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// services
import { BankService } from 'src/app/providers/logged-in/bank.service';
import { AuthService } from 'src/app/providers/auth.service';
// pages
import { BankFormPage } from '../bank-form/bank-form.page';
// models
import { Bank } from 'src/app/models/bank';


@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.page.html',
  styleUrls: ['./bank-view.page.scss'],
})
export class BankViewPage implements OnInit {

  public bank_id: string;

  public bank: Bank;

  public loading = false;

  constructor(
    private bankService: BankService,
    private activateRoute: ActivatedRoute,
    private _modalCtrl: ModalController,
    public authService: AuthService,

  ) {
    // this.bank = params.get('model');
  }

  ngOnInit() {
    window.analytics.page('Bank View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.bank = window.history.state.model;
    }

    this.bank_id = this.activateRoute.snapshot.paramMap.get('bank_id');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.bankService.view(this.bank_id).subscribe(bank => {
      this.bank = bank;

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
      component: BankFormPage,
      componentProps: {
       model: this.bank,
       bank_id: this.bank.bank_id
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.model) {
        this.bank = e.data.model; //  load data on update close
      }
    });
    modal.present();
  }
}
