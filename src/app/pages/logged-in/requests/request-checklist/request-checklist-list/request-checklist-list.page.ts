import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController, ModalController, ToastController } from '@ionic/angular';
//models
import { RequestChecklist } from 'src/app/models/request-checklist';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { RequestChecklistService } from 'src/app/providers/logged-in/request-checklist.service';
//pages
import { RequestChecklistFormPage } from '../request-checklist-form/request-checklist-form.page';


@Component({
  selector: 'app-request-checklist-list',
  templateUrl: './request-checklist-list.page.html',
  styleUrls: ['./request-checklist-list.page.scss'],
})
export class RequestChecklistListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public pageCount = 0;
  public currentPage = 1;

  public requestChecklists: RequestChecklist[];

  constructor(
    public platform: Platform,
    public router: Router,
    public requestChecklistService: RequestChecklistService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * load university data
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.requestChecklistService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.requestChecklists = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.currentPage++;

    this.loading = true;

    this.requestChecklistService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.requestChecklists = this.requestChecklists.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {

    this.router.navigate(['request-checklist-view', model.request_checklist_uuid], {
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
      component: RequestChecklistFormPage,
      componentProps: {
        model: new RequestChecklist()
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }

      if (e && e.data && e.data.refresh) {
        this.currentPage = 1;
        this.loadData(this.currentPage);
      }
    });
    modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, model: RequestChecklist) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Checklist?',
      message: 'Are you sure you want to delete this Checklist?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.requestChecklistService.delete(model).subscribe(async jsonResp => {

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
              }
              this.loadData(this.currentPage, true);
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
