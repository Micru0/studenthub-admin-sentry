import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { PermissionService } from 'src/app/providers/logged-in/permission.service';
import { CompanyService } from 'src/app/providers/logged-in/company.service';
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
  public companies: any[] = [];
  public companyPermissions: { [key: string]: number[] } = {};


  constructor(
    public platform: Platform,
    public router: Router,
    public permissionService: PermissionService,
    private companyService: CompanyService,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('permission List Page');
    this.loadCompanies();
    this.loadData(this.currentPage);
  }

  loadCompanies() {
    this.companyService.list(1, '', {
      fields: 'company_id,company_name,company_email',
      'pagination': 0,
      'isParent': 0
    }).subscribe(companies => {
      this.companies = companies.body || [];
    });
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
      // Initialize companyPermissions for company-specific sections
      if (this.permissionSection && this.permissionSection.length) {
        this.permissionSection.forEach(section => {
          if (section.is_company_specific_permission === 1 || section.is_company_specific_permission === true) {
            // If section has companies assigned, set them; else empty array
            this.companyPermissions[section.permission_uuid] = Array.isArray(section.companies) ? section.companies : [];
          }
        });
      }
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

  async updateSection(ev: any, section) {
    // If company-specific, update companies only
    console.log(section)
    if (section.is_company_specific_permission == 1) {
      this.loading = true;
      const companies = this.companyPermissions[section.permission_uuid] || [];
      this.permissionService.updateSection(section.permission_uuid, {section_name: section.section_name, companies}).subscribe(async response => {
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
