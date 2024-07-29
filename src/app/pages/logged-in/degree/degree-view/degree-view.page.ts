import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// services
import { DegreeService } from 'src/app/providers/logged-in/degree.service';
import {AuthService} from "../../../../providers/auth.service";
// models
import { Degree } from 'src/app/models/degree'; 
// pages
import { DegreeFormPage } from '../degree-form/degree-form.page';


@Component({
  selector: 'app-degree-view',
  templateUrl: './degree-view.page.html',
  styleUrls: ['./degree-view.page.scss'],
})
export class DegreeViewPage implements OnInit {

  private degree_uuid;

  public loadingCandidates = false;

  public loading = false;

  public degree: Degree;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = []; 

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public degreeService: DegreeService, 
    private _modalCtrl: ModalController,
    public authService: AuthService
  ) {
  }

  public ngOnInit() {
    window.analytics.page('Degree View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.degree = window.history.state.model;
    }

    this.degree_uuid = this.activateRoute.snapshot.paramMap.get('degree_uuid');

    this.loadData();
  }

  /**
   * load degree data
   */
  loadData() {
    this.loading = true;

    this.degreeService.view(this.degree_uuid).subscribe(bank => {

      this.degree = bank;
 
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
      component: DegreeFormPage,
      componentProps: {
        model: this.degree,
        degree_uuid: this.degree_uuid
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

