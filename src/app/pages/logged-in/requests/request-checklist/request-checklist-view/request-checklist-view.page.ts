import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
//models
import { RequestChecklist } from 'src/app/models/request-checklist';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { RequestChecklistService } from 'src/app/providers/logged-in/request-checklist.service';
//pages
import { RequestChecklistFormPage } from '../request-checklist-form/request-checklist-form.page';


@Component({
  selector: 'app-request-checklist-view',
  templateUrl: './request-checklist-view.page.html',
  styleUrls: ['./request-checklist-view.page.scss'],
})
export class RequestChecklistViewPage implements OnInit {

  private request_checklist_uuid;

  public loading = false;

  public model: RequestChecklist;

  constructor(
    public activateRoute: ActivatedRoute,
    public requestChecklistService: RequestChecklistService,
    private _modalCtrl: ModalController,
    public authService: AuthService
  ) {
  }

  public ngOnInit() {

    // Load the passed model if available
    if (window.history.state) {
      this.model = window.history.state.model;
    }

    this.request_checklist_uuid = this.activateRoute.snapshot.paramMap.get('request_checklist_uuid');

    this.loadData();
  }

  /**
   * load university data
   */
  loadData() {
    this.loading = true;

    this.requestChecklistService.view(this.request_checklist_uuid).subscribe(data => {

      this.model = data;

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
      component: RequestChecklistFormPage,
      componentProps: {
        model: this.model,
        request_checklist_uuid: this.request_checklist_uuid
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
