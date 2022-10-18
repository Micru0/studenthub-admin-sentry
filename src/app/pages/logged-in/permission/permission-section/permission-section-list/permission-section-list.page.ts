import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
import {PermissionService} from 'src/app/providers/logged-in/permission.service';
// pages


@Component({
  selector: 'app-permission-section-list',
  templateUrl: './permission-section-list.page.html',
  styleUrls: ['./permission-section-list.page.scss'],
})
export class PermissionSectionListPage implements OnInit {

  public deleting = false;
  public loading = false;

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public permissionSection: any[];

  constructor(
    public platform: Platform,
    public router: Router,
    public permissionService: PermissionService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('permission List Page');

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
    this.permissionService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.permissionSection = response.body;
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

    this.permissionService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.permissionSection = this.permissionSection.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * Loads the create page
   */
  async create() {
    const alert = await this._alertCtrl.create({
      header: 'Create Section',
      inputs: [
        {
          name: 'section',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          handler: async (data) => {
            if (data.section) {
              this.permissionService.createSection(data.section).subscribe(async response => {
                if (response.operation == 'success') {
                  this.loadData(1);
                }

                const toast = await this._toastCtrl.create({
                  message: this.authService.errorMessage(response.message),
                  duration: 3000
                });
                toast.present();
                this.loading = false;
              }, () => {
                this.loading = false;
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  async edit(ev, section) {
    const alert = await this._alertCtrl.create({
      header: 'Update Section',
      inputs: [
        {
          name: 'section',
          type: 'text',
          value: section.section_name,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          handler: async (data) => {
            if (data.section) {
              this.permissionService.updateSection(data.section, section.permission_uuid).subscribe(async response => {
                if (response.operation == 'success') {
                  this.loadData(1);
                }

                const toast = await this._toastCtrl.create({
                  message: this.authService.errorMessage(response.message),
                  duration: 3000
                });
                toast.present();
                this.loading = false;
              }, () => {
                this.loading = false;
              });
            }
          }
        }
      ]
    });
    alert.present();
  }


  async editSub(ev, sub) {
    const alert = await this._alertCtrl.create({
      header: 'Update Section',
      inputs: [
        {
          name: 'section',
          type: 'text',
          value: sub.sub_section_name
        },
        {
          name: 'slug',
          type: 'text',
          value: sub.sub_section_slug
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          handler: async (data) => {
            if (data.section) {
              this.permissionService.updateSubSection(data.section, data.slug, sub.permission_sub_section_uuid).subscribe(async response => {
                if (response.operation == 'success') {
                  this.loadData(1);
                }

                const toast = await this._toastCtrl.create({
                  message: this.authService.errorMessage(response.message),
                  duration: 3000
                });
                toast.present();
                this.loading = false;
              }, () => {
                this.loading = false;
              });
            }
          }
        }
      ]
    });
    alert.present();
  }


  async addSubSection(ev, section) {
    const alert = await this._alertCtrl.create({
      header: 'Add Sub Section',
      inputs: [
        {
          name: 'section',
          type: 'text',
          placeholder: 'Sub Section Name'
        },
        {
          name: 'slug',
          type: 'text',
          placeholder: 'Subsection Slug'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          handler: async (data) => {
            if (data.section && data.slug) {
              this.permissionService.createSubSection(data.section, data.slug, section.permission_uuid).subscribe(async response => {
                if (response.operation == 'success') {
                  this.loadData(1);
                }

                const toast = await this._toastCtrl.create({
                  message: this.authService.errorMessage(response.message),
                  duration: 3000
                });
                toast.present();
                this.loading = false;
              }, () => {
                this.loading = false;
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Delete the provided model
   */
  async delete(ev, section) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Permission?',
      message: 'Are you sure you want to delete this Permission?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.permissionService.deletePermission(section).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: this.authService.errorMessage(jsonResp.message),
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

  async deleteSub(ev, section) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Permission?',
      message: 'Are you sure you want to delete this Permission?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.permissionService.deleteSubPermission(section).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: this.authService.errorMessage(jsonResp.message),
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
