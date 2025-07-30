import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
import {PermissionService} from 'src/app/providers/logged-in/permission.service';
import {Staff} from "../../../../../models/staff";
import {StaffService} from "../../../../../providers/logged-in/staff.service";
// pages

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.page.html',
  styleUrls: ['./assign-permission.page.scss'],
})
export class AssignPermissionPage implements OnInit {

  public deleting = false;
  public loading = false;
  public loadingCompanies = false;
  public userPermission: { [key: string]: boolean } = {};

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public permissionSection: any[] = [];

  public staff: Staff;

  public user_id;
  public type;

  constructor(
    public platform: Platform,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public permissionService: PermissionService,
    public staffService: StaffService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) {
    if (window.history.state) {
      this.staff = window.history.state.model;
    }

    this.user_id = this.activateRoute.snapshot.paramMap.get('user_id');
    this.type = this.activateRoute.snapshot.paramMap.get('type');

    if (!this.staff) {
      this.loadStaff();
    }
    this.loadPermission();
    this.loadData(this.currentPage);
    this.loadUserPermission();


  }

  ngOnInit() {
    window.analytics.page('assign permission List Page');
  }

  loadPermission() {

    if (this.staff && this.staff.permissions) {
      this.staff.permissions.map(res => {
        this.userPermission[res.permission_sub_section_uuid] = true;
      });
    }
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

  async loadStaff() {
    this.staffService.view(this.user_id).subscribe(response => {
      this.staff = response;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }
  async loadUserPermission() {
    this.permissionService.userPermission(this.type, this.user_id).subscribe(response => {
      if (response) {
        // First, process all sub-section permissions
        response.forEach(res => {
          this.userPermission[res.permission_sub_section_uuid] = true;
        });
      }
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }


  /**
   * Check if a section has company-specific permissions
   */
  isCompanySpecific(section: any): boolean {
    return section && (section.is_company_specific_permission === 1 || section.is_company_specific_permission === true);
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
  async save() {
    this.permissionService.setUserPermission(this.userPermission, this.type, this.user_id).subscribe(async response => {
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
