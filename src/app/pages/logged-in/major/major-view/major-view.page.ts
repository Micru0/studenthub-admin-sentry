import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// services
import { MajorService } from 'src/app/providers/logged-in/major.service';
import {AuthService} from "../../../../providers/auth.service";
// models
import { Major } from 'src/app/models/major'; 
// pages
import { MajorFormPage } from '../major-form/major-form.page';


@Component({
  selector: 'app-major-view',
  templateUrl: './major-view.page.html',
  styleUrls: ['./major-view.page.scss'],
})
export class MajorViewPage implements OnInit {

  private major_uuid;

  public loadingCandidates = false;

  public loading = false;

  public major: Major;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = []; 

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public majorService: MajorService, 
    private _modalCtrl: ModalController,
    public authService: AuthService
  ) {
  }

  public ngOnInit() {
    window.analytics.page('Major View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.major = window.history.state.model;
    }

    this.major_uuid = this.activateRoute.snapshot.paramMap.get('major_uuid');

    this.loadData();
  }

  /**
   * load major data
   */
  loadData() {
    this.loading = true;

    this.majorService.view(this.major_uuid).subscribe(bank => {

      this.major = bank;
 
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
      component: MajorFormPage,
      componentProps: {
        model: this.major,
        major_uuid: this.major_uuid
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

