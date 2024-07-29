
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// services
import { DegreeGroupService } from 'src/app/providers/logged-in/degree-group.service';
import {AuthService} from "../../../../providers/auth.service";
// models
import { DegreeGroup } from 'src/app/models/degree-group'; 
// pages
import { DegreeGroupFormPage } from '../degree-group-form/degree-group-form.page';


@Component({
  selector: 'app-degree-group-view',
  templateUrl: './degree-group-view.page.html',
  styleUrls: ['./degree-group-view.page.scss'],
})
export class DegreeGroupViewPage implements OnInit {

  private degree_group_uuid;

  public loadingCandidates = false;

  public loading = false;

  public degree_group: DegreeGroup;
  public currentPage = 1;
  public pageCount = 0;
  public pages: number[] = []; 

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public degree_groupService: DegreeGroupService, 
    private _modalCtrl: ModalController,
    public authService: AuthService
  ) {
  }

  public ngOnInit() {
    window.analytics.page('Degree Group View Page');

    // Load the passed model if available
    if (window.history.state) {
      this.degree_group = window.history.state.model;
    }

    this.degree_group_uuid = this.activateRoute.snapshot.paramMap.get('degree_group_uuid');

    this.loadData();
  }

  /**
   * load degree_group data
   */
  loadData() {
    this.loading = true;

    this.degree_groupService.view(this.degree_group_uuid).subscribe(bank => {

      this.degree_group = bank;
 
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
      component: DegreeGroupFormPage,
      componentProps: {
        model: this.degree_group,
        degree_group_uuid: this.degree_group_uuid
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

